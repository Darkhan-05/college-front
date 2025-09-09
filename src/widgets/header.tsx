'use client';

import Image from "next/image";
import Link from "next/link";
import {useLocale, useTranslations} from "next-intl";
import LocaleSwitcher from "@/widgets/locale-switcher";
import RegistrationTabs from "@/app/[locale]/(components)/registration-tabs";
import {Sheet, SheetClose, SheetContent, SheetTrigger} from "@/shared/ui/sheet";

export default function Header() {
    const locale = useLocale();
    const t = useTranslations("header");

    const navItems = [
        { href: "#about-event", label: t("about_event") },
        { href: "#speakers", label: t("speakers") },
        { href: "#program", label: t("program") },
        { href: "#contacts", label: t("contacts") },
    ];

    return (
        <header className="bg-white shadow font-semibold z-50 w-full">
            <div className="custom-container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-32 items-center">
                    {/* Логотипы */}
                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-4">
                            <Image alt="test" draggable={false} className="max-md:w-16" src="/logo-aqmola.svg" width={60} height={60}/>
                            <Image alt="test" draggable={false} className="max-md:w-16 w-36"
                                   src={`/logo-smart-aqmola-${locale}.webp`} width={200} height={130}/>
                        </div>
                        <div className="flex items-center gap-10">
                            <Image alt="test" draggable={false} className="max-md:w-16" src="/logo-apocp.svg" width={60} height={60}/>
                            {locale === "kk" ? (
                                <>
                                    <Image alt="College logo" draggable={false} className="max-md:w-16"
                                           src={`/logo-college-kk.webp`} width={120} height={120}/>
                                    <Image alt="College logo" draggable={false} className=""
                                           src={`/insure-kk.webp`} width={200} height={200}/>
                                </>
                            ) : (
                                <>
                                    <Image alt="College logo" draggable={false} className="max-md:w-16"
                                           src={`/logo-college-en.webp`} width={120} height={120}/>
                                    <Image alt="College logo" draggable={false} className="max-md:w-16"
                                           src={`/insure-ru.webp`} width={200} height={200}/>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Десктоп навигация */}
                    <nav className="hidden xl:flex lg:items-center space-x-4">
                        <RegistrationTabs/>
                        {navItems.map(({ href, label }) => (
                            <Link key={href} href={href} className="text-gray-600 hover:text-black">
                                {label}
                            </Link>
                        ))}
                        <LocaleSwitcher/>
                    </nav>

                    {/* Mobile Menu с Sheet */}
                    <div className="xl:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <button className="flex items-center p-2 rounded-md hover:bg-gray-100">
                                    <svg
                                        className="w-6 h-6 text-gray-700"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 6h16M4 12h16M4 18h16"/>
                                    </svg>
                                </button>
                            </SheetTrigger>
                            <SheetContent side="right" className="w-64 p-6">
                                <nav className="flex flex-col space-y-4">
                                    {navItems.map(({ href, label }) => (
                                        <SheetClose asChild key={href}>
                                            <Link href={href} className="text-gray-600 hover:text-black">
                                                {label}
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    <RegistrationTabs/>
                                    <LocaleSwitcher/>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
