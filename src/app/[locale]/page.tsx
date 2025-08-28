import Speakers from "@/app/[locale]/(components)/speakers";
import Program from "@/app/[locale]/(components)/program";
import AboutEvent from "@/app/[locale]/(components)/about-event";
import HeroBlock from "@/app/[locale]/(components)/hero-block";
import RegistrationTabs from "@/app/[locale]/(components)/registration-tabs";
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
    { params }: PropsType,
): Promise<Metadata> {
    const { locale } = await params;

    return getMetaTags({
        title: META_INFO.home.title[locale],
        description: META_INFO.home.description[locale],
        tags: META_INFO.home.keywords[locale],
        pathname: '/',
        images: `${ENV.BASE_ORIGIN}${META_INFO.cover[locale]}`,
        locale,
    });
}


export default function Home() {

    return (
        <>
            <Header/>
            <main className="overflow-hidden space-y-14 last:spacey pb-24">
                <HeroBlock/>
                <WelcomeBlock/>
                <AboutEvent/>
                <Speakers/>
                <Program/>
                <Contacts/>
                <RegistrationTabs/>
            </main>
        </>
    );
}

