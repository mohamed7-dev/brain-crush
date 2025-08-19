import "./globals.css";
import type { Metadata, Viewport } from "next";
import { MuiCacheProvider } from "@/components/providers/mui-cache-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { roboto } from "@/lib/fonts";
import { SessionProvider } from "@/components/providers/session-provider";
import { SnackbarProvider } from "@/components/providers/snackbar-provider";
import { TanstackQueryProvider } from "@/components/providers/tanstack-query-provider";
import { defaultMetadata, defaultViewport } from "@/config/app.config";

export const metadata: Metadata = defaultMetadata;
export const viewport: Viewport = defaultViewport;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={roboto.variable}>
          <MuiCacheProvider>
            <ThemeProvider>
              <TanstackQueryProvider>
                <SnackbarProvider>{children}</SnackbarProvider>
              </TanstackQueryProvider>
            </ThemeProvider>
          </MuiCacheProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
