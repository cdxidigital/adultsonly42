import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { HouseChrome } from "@/components/site/chrome";
import { BuyButton } from "@/components/site/buy-button";
import { getProduct, type Product } from "@/lib/house/shop";
import { aud } from "@/lib/house/money";
import {
  encodeSpec,
  specComplete,
  specSchema,
  type SpecField,
} from "@/lib/house/atelier";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/atelier/$slug")({ component: ProductPage });

function ProductPage() {
  const { slug } = Route.useParams();
  const [product, setProduct] = useState<Product | null | undefined>(undefined);
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    getProduct({ data: slug }).then(setProduct).catch(() => setProduct(null));
  }, [slug]);

  const schema = product ? specSchema(product.id) : null;
  const spec = useMemo(() => encodeSpec(values), [values]);
  const ready = product ? specComplete(product.id, values) : false;

  if (product === undefined) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center pt-24 text-muted">Holding the object…</div>
      </HouseChrome>
    );
  }
  if (!product) {
    return (
      <HouseChrome>
        <div className="grid min-h-dvh place-items-center px-5 pt-24">
          <p>That object is not on the floor.</p>
          <Link to="/atelier" className="mt-4 text-heat">
            Back to atelier
          </Link>
        </div>
      </HouseChrome>
    );
  }

  const sold = product.inventory !== null && product.inventory <= 0;

  return (
    <HouseChrome>
      <section className="grid min-h-dvh pt-20 md:grid-cols-2">
        <img src={product.image} alt="" className="h-80 w-full object-cover md:h-full" />
        <div className="flex flex-col justify-center px-5 py-12 md:px-12">
          <Link to="/atelier" className="font-display text-xs tracking-widest text-heat uppercase">
            Atelier
          </Link>
          <h1 className="mt-3 font-display text-5xl tracking-wide uppercase">{product.title}</h1>
          <p className="mt-2 text-sm text-muted">{product.subtitle}</p>
          <p className="mt-5 font-display text-3xl text-heat tabular-nums">{aud(product.price_cents)}</p>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{product.description}</p>
          <p className="mt-4 text-xs text-muted">
            {sold
              ? "Sold through"
              : schema?.madeToOrder || product.inventory === null
                ? "Made to order · cut when you settle"
                : `${product.inventory} remaining`}
          </p>

          {schema ? (
            <div className="mt-8 max-w-md space-y-6">
              <p className="text-sm text-muted">{schema.blurb}</p>
              {schema.fields.map((field) => (
                <Field
                  key={field.key}
                  field={field}
                  value={values[field.key] ?? ""}
                  onChange={(v) => setValues((cur) => ({ ...cur, [field.key]: v }))}
                />
              ))}
            </div>
          ) : null}

          <div className="mt-8">
            {sold ? (
              <p className="font-display text-xs tracking-widest uppercase">Wait for the next drop</p>
            ) : (
              <BuyButton
                productId={product.id}
                spec={spec}
                disabled={!ready}
                label={schema ? "Cut this object" : "Add to tab"}
              />
            )}
          </div>
        </div>
      </section>
    </HouseChrome>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: SpecField;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="font-display text-[11px] tracking-widest text-heat uppercase">
        {field.label}
        {field.required ? "" : " · optional"}
      </p>
      {field.kind === "choice" ? (
        <div className="mt-2 flex flex-wrap gap-2">
          {field.options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => onChange(o.value)}
              className={cn(
                "min-h-11 border px-3 font-display text-xs tracking-widest uppercase",
                value === o.value ? "border-heat text-heat" : "border-line text-muted hover:border-heat hover:text-heat",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      ) : (
        <input
          value={value}
          maxLength={field.max}
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 h-12 w-full border border-line bg-navy px-3 text-sm text-ivory placeholder:text-muted focus:border-heat focus:outline-none"
        />
      )}
    </div>
  );
}
