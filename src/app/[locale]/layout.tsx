import "./globals.css";
import {NextIntlClientProvider} from "next-intl";
import {Toaster} from "sonner";
import {Metadata} from "next";
import {getMetaTags} from "@/shared/helpers/get-meta-tags";
import {META_INFO} from "@/shared/constants/meta/meta-info";
import {ENV} from "@/config/enviroments";
import {LocaleType} from "@/shared/types/locale.type";

type PropsType = {
    params: Promise<{
        locale: LocaleType;
    }>;
};

export async function generateMetadata(
    {params}: PropsType,
): Promise<Metadata> {
    const {locale} = await params;

    return getMetaTags({
        title: META_INFO.home.title[locale],
        description: META_INFO.home.description[locale],
        tags: META_INFO.home.keywords[locale],
        pathname: '/',
        images: `${ENV.BASE_ORIGIN}${META_INFO.cover[locale]}`,
        locale,
    });
}

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
