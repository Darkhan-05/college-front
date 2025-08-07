'use client';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Container from "@/shared/ui/wrappers/container";

export default function Speakers() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [maxDrag, setMaxDrag] = useState(0);

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

    return (
        <section id="speakers" className="py-12">
            <Container>
                <h2 className="text-3xl font-semibold mb-6 text-center">Спикеры</h2>

                <div ref={wrapperRef} className="overflow-hidden">
                    <motion.div
                        ref={innerRef}
                        className="flex gap-4 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: -maxDrag, right: 0 }}
                    >
                        {speakers.map((name, i) => (
                            <motion.div
                                key={name}
                                className="basis-[calc(33.333%-1rem)] min-w-[280px] flex-shrink-0 rounded-lg shadow-md p-6 border text-center bg-white"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <img
                                    src={`https://i.pravatar.cc/150?img=${i + 10}`}
                                    alt={name}
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <h3 className="font-semibold text-lg">{name}</h3>
                                <p className="text-muted-foreground text-sm">Тема: Инновации в медицине</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
