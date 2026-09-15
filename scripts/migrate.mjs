#!/usr/bin/env node
/**
 * Deploy-time database migrator (node-postgres, `pg`).
 *
 * Runs during `npm run build` — on every Vercel deploy — applying pending files
 * in ../migrations to DATABASE_URL. Each file is applied in one transaction and
 * recorded in a `_migrations` table, so it runs once and is safe to re-run.
 *
 * Statements are executed one at a time so Neon's pooled (PgBouncer) endpoint
 * accepts them. Dollar-quoted blocks (DO $$ … $$) stay intact.
 *
 * No DATABASE_URL (local / preview builds) -> skip; the PGLite fallback applies
 * the same files at startup instead (see src/lib/db.ts).
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import pg from "pg";
import { pendingMigrations } from "./migration-plan.mjs";

const databaseUrl = process.env.DATABASE_URL;
const migrationsDir = join(dirname(fileURLToPath(import.meta.url)), "..", "migrations");

const isMain =
  Boolean(process.argv[1]) && resolve(process.argv[1]) === fileURLToPath(import.meta.url);


/** Split a SQL file into statements, keeping dollar-quoted bodies whole. */
export function splitSqlStatements(sql) {
  const out = [];
  let buf = "";
  let i = 0;
  let dollar = null;
  let inSingle = false;
  let inDouble = false;
  let inLineComment = false;
  let inBlockComment = false;

  while (i < sql.length) {
    const c = sql[i];
    const n = sql[i + 1];

    if (inLineComment) {
      buf += c;
      if (c === "\n") inLineComment = false;
      i += 1;
      continue;
    }
    if (inBlockComment) {
      buf += c;
      if (c === "*" && n === "/") {
        buf += "/";
        i += 2;
        inBlockComment = false;
        continue;
      }
      i += 1;
      continue;
    }
    if (dollar) {
      if (sql.startsWith(dollar, i)) {
        buf += dollar;
        i += dollar.length;
        dollar = null;
        continue;
      }
      buf += c;
      i += 1;
      continue;
    }
    if (inSingle) {
      buf += c;
      if (c === "'" && n === "'") {
        buf += "'";
        i += 2;
        continue;
      }
      if (c === "'") inSingle = false;
      i += 1;
      continue;
    }
    if (inDouble) {
      buf += c;
      if (c === '"') inDouble = false;
      i += 1;
      continue;
    }
    if (c === "-" && n === "-") {
      inLineComment = true;
      buf += c;
      i += 1;
      continue;
    }
    if (c === "/" && n === "*") {
      inBlockComment = true;
      buf += c;
      i += 1;
      continue;
    }
    if (c === "'") {
      inSingle = true;
      buf += c;
      i += 1;
      continue;
    }
    if (c === '"') {
      inDouble = true;
      buf += c;
      i += 1;
      continue;
    }
    if (c === "$") {
      const m = sql.slice(i).match(/^\$[A-Za-z0-9_]*\$/);
      if (m) {
        dollar = m[0];
        buf += dollar;
        i += dollar.length;
        continue;
      }
    }
    if (c === ";") {
      const stmt = buf.trim();
      if (stmt && !/^--/.test(stmt.split("\n").filter(Boolean).join(""))) {
        out.push(stmt);
      } else if (stmt && /[a-zA-Z]/.test(stmt.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, ""))) {
        out.push(stmt);
      }
      buf = "";
      i += 1;
      continue;
    }
    buf += c;
    i += 1;
  }
  const tail = buf.trim();
  if (tail && /[a-zA-Z]/.test(tail.replace(/--.*$/gm, "").replace(/\/\*[\s\S]*?\*\//g, ""))) {
    out.push(tail);
  }
  return out;
}

async function main() {
  if (!databaseUrl) {
    console.log(
      "[migrate] DATABASE_URL not set — skipping (the PGLite fallback migrates itself).",
    );
    return;
  }
  let entries;
  try {
    entries = await readdir(migrationsDir);
  } catch {
    console.log("[migrate] no migrations/ directory — nothing to do.");
    return;
  }
  if (pendingMigrations(entries, []).length === 0) {
    console.log("[migrate] no migrations — nothing to do.");
    return;
  }

  const pool = new pg.Pool({
    connectionString: databaseUrl,
    max: 1,
    ssl: databaseUrl.includes("sslmode=disable") ? false : { rejectUnauthorized: false },
    connectionTimeoutMillis: 20_000,
  });
  const client = await pool.connect();
  try {
    await client.query(
      "CREATE TABLE IF NOT EXISTS _migrations (name TEXT PRIMARY KEY, applied_at TIMESTAMPTZ NOT NULL DEFAULT now())",
    );
    const applied = (await client.query("SELECT name FROM _migrations")).rows.map(
      (r) => r.name,
    );

    let count = 0;
    for (const { name } of pendingMigrations(entries, applied)) {
      const text = await readFile(join(migrationsDir, name), "utf8");
      const statements = splitSqlStatements(text);
      try {
        await client.query("BEGIN");
        for (const stmt of statements) {
          await client.query(stmt);
        }
        await client.query("INSERT INTO _migrations (name) VALUES ($1)", [name]);
        await client.query("COMMIT");
      } catch (err) {
        console.error(`[migrate] error applying ${name}`);
        try {
          await client.query("ROLLBACK");
        } catch {
          // ROLLBACK fails when the connection died — keep the original error.
        }
        throw err;
      }
      console.log(`[migrate] applied ${name} (${statements.length} statements)`);
      count += 1;
    }
    console.log(count ? `[migrate] done — ${count} migration(s) applied.` : "[migrate] up to date.");
  } finally {
    client.release();
    await pool.end();
  }
}

if (isMain) {
  main().catch((err) => {
    console.error("[migrate] failed:", err?.message || err);
    for (const key of ["code", "detail", "hint", "position", "where"]) {
      if (err?.[key] != null) console.error(`[migrate]   ${key}: ${err[key]}`);
    }
    process.exit(1);
  });
}
