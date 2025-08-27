"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

export default function WelcomeSequence() {
    const t = useTranslations();
    const [current, setCurrent] = useState(1);

    useEffect(() => {
        if (current === 1) {
            const timer = setTimeout(() => setCurrent(2), 15000);
            return () => clearTimeout(timer);
        }
    }, [current]);

    const welcomeKey = `welcome_${current}`;

    return (
        <section className="max-w-4xl mx-auto px-4 py-12">
            <AnimatePresence mode="wait">
                <motion.div
                    key={welcomeKey}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.h1
                        className="text-2xl font-bold mb-6"
                        initial={{ opacity: 0, y: -30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {t(`${welcomeKey}.greeting`)}
                    </motion.h1>

                    <motion.p
                        className="text-lg leading-relaxed text-gray-700 whitespace-pre-line"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.3, duration: 1 }}
                    >
                        {t(`${welcomeKey}.body`)}
                    </motion.p>

                    <motion.p
                        className="mt-8 font-semibold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                    >
                        {t(`${welcomeKey}.closing`)}
                    </motion.p>
                </motion.div>
            </AnimatePresence>
        </section>
    );
}
