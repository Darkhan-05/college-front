'use client'
import { motion } from 'motion/react';

export default function Program() {
    return (
        <motion.section
            id="program"
            className="relative py-12 overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            {/* Декоративные анимированные круги */}
            <motion.div
                className="absolute top-10 left-10 w-24 h-24 bg-blue-200 rounded-full opacity-30 blur-xl"
                animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
            />
            <motion.div
                className="absolute bottom-10 right-10 w-32 h-32 bg-pink-200 rounded-full opacity-30 blur-xl"
                animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="container mx-auto px-4 text-center relative z-10">
                {/* Анимация заголовка */}
                <motion.h2
                    className="text-3xl font-bold mb-6"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    ПРОГРАММА
                </motion.h2>

                <p className="text-gray-600 mb-6">
                    Ознакомьтесь с программой мероприятия. В ней вы найдёте расписание докладов, мастер-классов и
                    других активностей.
                </p>

                {/* Кнопка с эффектами */}
                <motion.a
                    href="/files/program.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 relative overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    <motion.span
                        className="mr-2"
                        whileHover={{ rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.4 }}
                    >
                        📄
                    </motion.span>
                    Скачать программу
                    {/* Glow эффект */}
                    <motion.div
                        className="absolute inset-0 bg-white opacity-0"
                        whileHover={{ opacity: 0.1 }}
                        transition={{ duration: 0.3 }}
                    />
                </motion.a>
            </div>
        </motion.section>
    );
}
