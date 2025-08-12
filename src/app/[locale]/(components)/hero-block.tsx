'use client';
import { motion } from 'motion/react';
import Image from "next/image";
import {useEffect, useState} from "react";
import {AnimatePresence} from "framer-motion";

export default function HeroBlock() {
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
                    alt='Hero background image'
                />
            </motion.div>
            <motion.h1
                initial={{opacity: 0, y: 20}}
                animate={{opacity: 1, y: 0}}
                transition={{delay: 0.6, ease: 'linear'}}
                className="absolute top-1/2 right-12 -translate-y-1/2 text-gray-600      text-right leading-18 z-10 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
            >
                <CountdownTimer targetDate="2025-12-01T09:00:00"/>
                Региональная конференция <br/> Asia-Pacific Organization for Cancer Prevention
                <div className="text-2xl">
                    Место проведения: г. Кокшетау, мкр. Коктем 9/1 «Bolashaq saraiy»
                </div>
            </motion.h1>
        </section>
    )
}


function CountdownTimer({ targetDate }: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState(getTimeLeft());

    function getTimeLeft() {
        const diff = +new Date(targetDate) - +new Date();
        const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0);
        const hours = Math.max(Math.floor((diff / (1000 * 60 * 60)) % 24), 0);
        const minutes = Math.max(Math.floor((diff / 1000 / 60) % 60), 0);
        const seconds = Math.max(Math.floor((diff / 1000) % 60), 0);

        return { days, hours, minutes, seconds };
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(getTimeLeft());
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    const timeItems = [
        { label: "д", value: timeLeft.days },
        { label: "ч", value: timeLeft.hours },
        { label: "м", value: timeLeft.minutes },
        { label: "с", value: timeLeft.seconds },
    ];

    return (
        <div className="flex gap-4 text-lg mt-6 font-mono">
            <span>До начала:</span>
            {timeItems.map(({ label, value }) => (
                <div key={label} className="flex flex-col items-center justify-end">
                    <AnimatePresence mode="popLayout">
                        <motion.span
                            key={value}
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className="text-2xl font-bold"
                        >
                            {value}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-gray-400">{label}</span>
                </div>
            ))}
        </div>
    );
}
