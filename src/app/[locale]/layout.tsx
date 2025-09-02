import type { Metadata } from "next";
import "./globals.css";
import {NextIntlClientProvider} from "next-intl";
import {Toaster} from "sonner";

export const metadata: Metadata = {
  title: "Региональная конференция APOCP",
  description: "Региональная конференция APOCP Кокшетау",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <NextIntlClientProvider>
          <Toaster richColors position="top-center" />
          {children}
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
