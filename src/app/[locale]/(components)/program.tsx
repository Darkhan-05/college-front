'use client';
import {motion} from 'motion/react';
import {useTranslations} from 'next-intl';
import Image from "next/image";

export default function Program() {
    const t = useTranslations();

    return (
        <div className="relative z-0 my-12 sm:my-16 md:my-24 lg:my-44">
            <div className="absolute inset-0 z-0">
                <span className="absolute top-0 inset-0 z-10 bg-black/30"/>
                <Image
                    draggable={false}
                    width={1920}
                    height={1080}
                    className="w-full h-full object-cover select-none"
                    src="/kmk-banner.webp"
                    alt="kmk-banner"
                />
            </div>
            <motion.section
                id="program"
                className="relative scroll-mt-32 z-20 py-6"
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <div className="container mx-auto h-[30vh] px-4 text-white flex flex-col justify-center text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        {t('program.title')}
                    </h2>
                    <p className="mb-4">
                        {t('program.description')}
                    </p>
                    <a
                        href="/program.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mx-auto px-6 py-3 bg-[#1488C1] rounded-lg opacity-95 shadow hover:opacity-100 transition"
                    >
                        📄 {t('program.download')}
                    </a>
                </div>
            </motion.section>
            <motion.section
                id="program"
                className="relative scroll-mt-32 z-20 py-6"
                initial={{opacity: 0, y: 50}}
                whileInView={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
            >
                <div className="container mx-auto h-[30vh] px-4 text-white flex flex-col justify-center text-center">
                    <h2 className="text-3xl font-bold mb-6">
                        {t('poster.title')}
                    </h2>
                    <p className="mb-4">
                        {t('poster.description')}
                    </p>
                    <a
                        href="/Положение постерные.docx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mx-auto px-6 py-3 bg-[#1488C1] rounded-lg opacity-95 shadow hover:opacity-100 transition"
                    >
                        📑 {t('poster.download')}
                    </a>
                </div>
            </motion.section>
        </div>
    );
}
