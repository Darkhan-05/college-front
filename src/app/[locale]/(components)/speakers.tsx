'use client';
import { motion, useAnimation } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Container from "@/shared/ui/wrappers/container";

export default function Speakers() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [maxDrag, setMaxDrag] = useState(0);
    const [progress, setProgress] = useState(0);
    const controls = useAnimation();

    const speakers = [
        "Иван Петров",
        "Ольга Смирнова",
        "Дмитрий Егоров",
        "Анастасия Лебедева",
        "Максим Орлов",
    ];

    useEffect(() => {
        const updateDragLimits = () => {
            if (wrapperRef.current && innerRef.current) {
                const wrapperWidth = wrapperRef.current.offsetWidth;
                const innerWidth = innerRef.current.scrollWidth;
                const dragLimit = innerWidth - wrapperWidth;
                setMaxDrag(dragLimit > 0 ? dragLimit : 0);
            }
        };
        updateDragLimits();
        window.addEventListener("resize", updateDragLimits);
        return () => window.removeEventListener("resize", updateDragLimits);
    }, []);

    // Автоплей карусели
    useEffect(() => {
        let position = 0;
        const interval = setInterval(() => {
            position -= 2;
            if (Math.abs(position) > maxDrag) position = 0;
            controls.start({ x: position });
            setProgress(Math.abs(position) / maxDrag);
        }, 50);
        return () => clearInterval(interval);
    }, [maxDrag, controls]);

    return (
        <section
            id="speakers"
            className="py-16 relative overflow-hidden"
        >

            <Container>
                <h2 className="text-4xl font-bold mb-8 text-center">Наши спикеры</h2>

                <div ref={wrapperRef} className="overflow-hidden">
                    <motion.div
                        ref={innerRef}
                        className="flex gap-6 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: -maxDrag, right: 0 }}
                        animate={controls}
                    >
                        {speakers.map((name, i) => (
                            <motion.div
                                key={name}
                                className="basis-[calc(33.333%-1rem)] min-w-[280px] flex-shrink-0 rounded-xl p-6 text-center bg-white shadow-md border transition-all hover:scale-105 hover:shadow-2xl"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                whileHover={{ rotate: 1 }}
                            >
                                <motion.img
                                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                                    alt={name}
                                    className="w-24 h-24 mx-auto rounded-full mb-4 border-4 border-transparent hover:border-blue-500 transition-all"
                                    whileHover={{ scale: 1.1 }}
                                />
                                <h3 className="font-semibold text-lg">{name}</h3>
                                <p className="text-muted-foreground text-sm">Тема: Инновации в медицине</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Прогресс-бар */}
                <div className="w-full h-2 bg-gray-200 rounded-full mt-6">
                    <motion.div
                        className="h-2 bg-blue-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>
            </Container>
        </section>
    );
}
