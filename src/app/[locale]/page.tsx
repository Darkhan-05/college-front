import Speakers from "@/app/[locale]/(components)/speakers";
import Program from "@/app/[locale]/(components)/program";
import Faq from "@/app/[locale]/(components)/faq";
import AboutEvent from "@/app/[locale]/(components)/about-event";
import HeroBlock from "@/app/[locale]/(components)/hero-block";
import GoalsCarousel from "@/app/[locale]/(components)/goals-carousel";
import RegistrationTabs from "@/app/[locale]/(components)/registration-tabs";
import Contacts from "@/app/[locale]/(components)/contacts";
import Header from "@/widgets/header";


export default function Home() {

    return (
        <>
            <Header/>
            <main className="overflow-hidden space-y-24 pb-24">
                <HeroBlock/>
                <AboutEvent/>
                <GoalsCarousel/>
                <Speakers/>
                <Program/>
                <Faq/>
                <Contacts/>
                <RegistrationTabs/>
            </main>
        </>
    );
}

