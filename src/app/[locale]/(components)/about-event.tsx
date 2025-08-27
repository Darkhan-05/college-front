'use client';

import Container from "@/shared/ui/wrappers/container";
import { motion } from 'motion/react';
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function AboutEvent() {
    const t = useTranslations();

    return (
        <motion.section id="about-event" className="mb-10">
            <Container className="text-left flex justify-between">
                <motion.div
                    transition={{ duration: 0.8 }}
                    initial={{ opacity: 0.1, x: -200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="w-8/12"
                >
                    <h2 className="text-3xl font-semibold mb-4">
                        {t("about_event.title")}
                    </h2>
                    <p className="text-muted-foreground text-lg whitespace-pre-line">
                        {t("about_event.description")}
                    </p>
                </motion.div>

                <motion.div
                    transition={{ duration: 0.8 }}
                    initial={{ opacity: 0.1, x: 200 }}
                    whileInView={{ opacity: 1, x: 0 }}
                >
                    <Image
                        className="w-96 h-80 rounded-3xl object-cover"
                        src="/about.webp"
                        draggable={false}
                        width={200}
                        height={100}
                        alt="about"
                    />
                </motion.div>
            </Container>
        </motion.section>
    );
}
