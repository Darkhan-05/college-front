import Speakers from "@/app/[locale]/(components)/speakers";
import Program from "@/app/[locale]/(components)/program";
import AboutEvent from "@/app/[locale]/(components)/about-event";
import HeroBlock from "@/app/[locale]/(components)/hero-block";
import Contacts from "@/app/[locale]/(components)/contacts";
import Header from "@/widgets/header";
import WelcomeBlock from "@/app/[locale]/(components)/welcome-block";
import {META_INFO} from "@/shared/constants/meta/meta-info";
import {ENV} from "@/config/enviroments";
import {getMetaTags} from "@/shared/helpers/get-meta-tags";
import {Metadata} from "next";
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


export default async function Page(
    {params}:
    { params: Promise<{ locale: string }>; }
) {
    const { locale } = await params;

    return (
        <>
            <Header locale={locale}/>
            <div className="overflow-hidden pb-18">
                <HeroBlock/>
                <WelcomeBlock/>
                <AboutEvent/>
                <Speakers/>
                <Program/>
                <Contacts/>
            </div>
        </>
    );
}

