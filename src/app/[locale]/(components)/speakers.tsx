'use client';
import { motion } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import Container from "@/shared/ui/wrappers/container";
import {useTranslations} from "next-intl";

export default function Speakers() {
    const t = useTranslations()
    const wrapperRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const [maxDrag, setMaxDrag] = useState(0);

    const speakers = t.raw('speakers') as {name: string, role: string}[];

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
        <section id="speakers" className="scroll-mt-32 my-12 sm:my-16 md:my-24 lg:my-44">
            <Container>
                <h2 className="text-3xl font-semibold mb-6 text-center">Спикеры</h2>

                <div ref={wrapperRef} className="overflow-hidden">
                    <motion.div
                        ref={innerRef}
                        className="flex gap-4 cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ left: -maxDrag, right: 0 }}
                    >
                        {speakers.map((speaker, i) => (
                            <motion.div
                                key={i}
                                className="basis-[calc(33.333%-1rem)] min-w-[280px] flex-shrink-0 rounded-lg shadow-md p-6 border text-center bg-white"
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                            >
                                <img
                                    src={`${i + 1}-speaker.png`}
                                    alt={speaker.name}
                                    draggable={false}
                                    className="w-24 h-24 mx-auto rounded-full mb-4"
                                />
                                <h3 className="font-semibold text-lg">{speaker.name}</h3>
                                <p className="text-muted-foreground text-sm">{speaker.role}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </Container>
        </section>
    );
}
