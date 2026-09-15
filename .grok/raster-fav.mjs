import { chromium } from "playwright";

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({ viewport: { width: 128, height: 128 } });
await page.goto("file:///workspace/.grok/favicon-preview.html");
await page.screenshot({ path: "/workspace/.grok/favicon-128.png", omitBackground: false });
await browser.close();
console.log("shot ok");
