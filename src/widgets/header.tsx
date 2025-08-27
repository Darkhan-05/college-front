'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "@/widgets/locale-switcher";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const locale = useLocale();
    const t = useTranslations("header");

    const navItems = [
        { href: "#about-event", label: t("about_event") },
        { href: "#speakers", label: t("speakers") },
        { href: "#program", label: t("program") },
        { href: "#contacts", label: t("contacts") }
    ];

    return (
        <header className="bg-white shadow fixed z-50 w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-24 items-center">
                    <div className="flex items-center gap-4">
                        <Image alt="test" draggable={false} className="max-md:w-16" src="/logo-aqmola.svg" width={60} height={60}/>
                        <Image alt="test" draggable={false} className="max-md:w-16 w-36" src={`/logo-smart-aqmola-${locale}.webp`} width={200} height={130}/>
                        <Image alt="test" draggable={false} className="max-md:w-16" src="/logo-apocp.svg" width={60} height={60}/>
                        {locale === 'kk'
                            ? <Image alt="College logo" draggable={false} className="max-md:w-16" src={`/logo-college-kk.webp`} width={120} height={120}/>
                            : <Image alt="College logo" draggable={false} className="max-md:w-16" src={`/logo-college-en.webp`} width={120} height={120}/>
                        }
                    </div>

                    <nav className="hidden lg:flex lg:items-center space-x-4">
                        {navItems.map(({ href, label }) => (
                            <Link key={href} href={href} className="text-gray-600 hover:text-black">
                                {label}
                            </Link>
                        ))}
                        <LocaleSwitcher/>
                    </nav>

                    {/* Кнопка бургера */}
                    <button
                        className="lg:hidden flex items-center p-2 rounded-md hover:bg-gray-100"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-6 h-6 text-gray-700"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {menuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="lg:hidden bg-white shadow-md px-4 py-4 space-y-2">
                    {navItems.map(({ href, label }) => (
                        <Link key={href} href={href} className="block text-gray-600 hover:text-black">
                            {label}
                        </Link>
                    ))}
                    <LocaleSwitcher/>
                </div>
            )}
        </header>
    );
}
