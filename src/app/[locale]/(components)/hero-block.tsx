'use client';
import { motion } from 'motion/react';
import Image from "next/image";
import {useEffect, useState} from "react";

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
                className="absolute top-1/2 right-12 -translate-y-1/2 text-white text-right leading-18 z-10 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
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

function CountdownTimer({targetDate}: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            const difference = +new Date(targetDate) - +new Date();
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / 1000 / 60) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft(`${days}д ${hours}ч ${minutes}м ${seconds}с`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate]);

    return <p className="text-white text-lg mt-6">До начала: {timeLeft}</p>;
}
