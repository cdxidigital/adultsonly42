import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { Toaster } from "sonner";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { AgeShell } from "@/components/site/chrome";
import { AGE_KEY } from "@/lib/house/pending";
import appCss from "../styles.css?url";

const APP_NAME = "fleshsesh";

const readAgeCookie = createServerFn({ method: "GET" }).handler(async () => {
  try {
    const { getRequestHeader } = await import("@tanstack/react-start/server");
    const cookie = getRequestHeader("cookie") ?? "";
    return new RegExp(`(?:^|; )${AGE_KEY}=1(?:;|$)`).test(cookie);
  } catch {
    return false;
  }
});

export const Route = createRootRoute({
  beforeLoad: async () => ({ ageOk: await readAgeCookie() }),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      {
        name: "description",
        content:
          "Gender-fluid adult house in Perth. Membership, made-to-order atelier, academy, talent, Creator OS, and an industry atlas. Eighteen and over.",
      },
      { name: "theme-color", content: "#0B022D" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
    ],
  }),
  component: RootShell,
});

function RootShell() {
  const { ageOk } = Route.useRouteContext();
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="bg-void text-ivory font-sans">
        <PreviewHostBridge />
        <AuthProvider>
          <AgeShell ssrOk={ageOk}>
            <Outlet />
          </AgeShell>
          <Toaster
            theme="dark"
            position="bottom-center"
            toastOptions={{
              className: "font-sans",
              style: {
                background: "var(--color-navy)",
                color: "var(--color-ivory)",
                border: "1px solid var(--color-line)",
                borderRadius: 0,
              },
            }}
          />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
