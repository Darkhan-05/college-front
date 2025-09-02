import type { Metadata } from "next";
import "./globals.css";
import {NextIntlClientProvider} from "next-intl";

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
            {children}
      </NextIntlClientProvider>
      </body>
    </html>
  );
}
