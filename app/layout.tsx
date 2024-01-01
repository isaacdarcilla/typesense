import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Link } from "@nextui-org/link";
import clsx from "clsx";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={clsx(
          "min-h-screen bg-pattern font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen bg-pattern">
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full text-tiny flex gap-2 items-center justify-center py-3 mt-10 pb-16">
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href={siteConfig.website}
              >
                <small className="text-primary">Isaac Arcilla</small>
              </Link>
              &bull;
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href={siteConfig.dataset}
              >
                <small className="text-primary">Dataset</small>
              </Link>
              &bull;
              <Link
                isExternal
                className="flex items-center gap-1 text-current"
                href={siteConfig.repository}
              >
                <small className="text-primary">Repository</small>
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
