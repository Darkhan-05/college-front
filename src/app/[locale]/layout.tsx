import "./globals.css";
import {NextIntlClientProvider} from "next-intl";
import {Toaster} from "sonner";

export default async function LocaleLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode,
    params: Promise<{ locale: string }>;
}>) {
    const {locale} = await params

    return (
        <html lang={locale}>
        <body>
        <NextIntlClientProvider>
            <Toaster richColors position="top-center"/>
            {children}
        </NextIntlClientProvider>
        </body>
        </html>
    );
}
