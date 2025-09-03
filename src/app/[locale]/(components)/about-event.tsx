'use client';

import Container from "@/shared/ui/wrappers/container";
import { motion } from 'motion/react';
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutEvent() {
    const t = useTranslations();

    return (
        <motion.section
            id="about-event"
            className="scroll-mt-32 my-12 sm:my-16 md:my-24 lg:my-44"
        >
            <Container className="text-left flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
                {/* Текст */}
                <motion.div
                    transition={{ duration: 0.8 }}
                    initial={{ opacity: 0.1, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="w-full md:w-8/12"
                >
                    <h2 className="text-3xl font-semibold mb-4">
                        {t("about_event.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg whitespace-pre-line">
                        {t("about_event.description")}
                    </p>
                </motion.div>

                {/* Картинка */}
                <motion.div
                    transition={{ duration: 0.8 }}
                    initial={{ opacity: 0.1, x: 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="w-full md:w-auto flex justify-center"
                >
                    <Image
                        className="w-full max-w-xs md:w-96 md:h-80 rounded-3xl object-cover"
                        src="/about.webp"
                        draggable={false}
                        width={384}
                        height={320}
                        alt="about"
                    />
                </motion.div>
            </Container>
        </motion.section>
    );
}
