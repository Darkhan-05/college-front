'use client';

import {motion} from 'motion/react';
import Image from "next/image";
import {useTranslations} from "next-intl";
import {CountdownTimer} from './countdown-timer';

export default function HeroBlock() {
    const t = useTranslations("conference");

    return (
        <section className="relative h-screen mb-12">
            <motion.div
                className='w-full h-full object-cover pointer-events-none absolute inset-0 z-0'
                initial={{opacity: 0, scale: 1.4}}
                whileInView={{opacity: 1, scale: 1}}
                transition={{duration: 0.8, ease: 'linear'}}
            >
                <span className='absolute top-0 inset-0 z-10 bg-black/20'/>
                <Image
                    draggable={false}
                    width={1920}
                    height={1080}
                    className='w-full h-full object-cover select-none'
                    src="/bg.webp"
                    alt={t("title")}
                />
            </motion.div>

            <motion.div
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6, ease: 'linear'}}
                className="absolute top-1/2 right-12 -translate-y-1/2 text-white text-right leading-18 z-10"
            >
                <CountdownTimer targetDate="2025-10-02T09:00:00"/>

                <div className="flex flex-col w-full gap-2 items-end">
                    <h1 className="max-w-5xl text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold">
                        {t("title")}
                    </h1>
                    <h3 className="max-w-5xl text-2xl md:text-4x lg:text-5xl font-bold">{t("subtitle")}</h3>
                </div>

                <div className="flex w-full justify-end">
                </div>
                <p className="mt-2 max-md:text-lg text-3xl">
                    {t("location")} - {t("venue")}
                </p>

                {/*<p className="mt-2 max-md:text-lg text-3xl">{t("format")}</p>*/}
            </motion.div>
        </section>
    );
}
