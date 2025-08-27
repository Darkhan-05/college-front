'use client';
import { motion } from 'motion/react';
import { useTranslations } from 'next-intl';

export default function Program() {
    const t = useTranslations();

    return (
        <motion.section
            id="program"
            className="py-12"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-6">
                    {t('program.title')}
                </h2>
                <p className="text-gray-600 mb-4">
                    {t('program.description')}
                </p>

                <a
                    href="/program.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                >
                    📄 {t('program.download')}
                </a>
            </div>
        </motion.section>
    );
}
