'use client';

import {Button} from "@/shared/ui/button";
import { useRef } from "react";
import { motion } from 'motion/react';
import {Card, CardContent} from "@/shared/ui/card";
import {ChevronLeft, ChevronRight} from "lucide-react";

const data = [
    {title: 'Цель 1', number: '01', description: 'Описание цели 1'},
    {title: 'Цель 2', number: '02', description: 'Описание цели 2'},
    {title: 'Цель 3', number: '03', description: 'Описание цели 3'},
    {title: 'Цель 4', number: '04', description: 'Описание цели 4'},
    {title: 'Цель 5', number: '05', description: 'Описание цели 5'},
    {title: 'Цель 6', number: '06', description: 'Описание цели 6'},
];

export default function GoalsCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollToCard = (direction: 'left' | 'right') => {
        if (!scrollRef.current || cardRefs.current.length === 0) return;

        const scrollLeft = scrollRef.current.scrollLeft;
        const container = scrollRef.current;
        const cards = cardRefs.current;

        const currentIndex = cards.findIndex((card) => {
            if (!card) return false;
            return card.offsetLeft >= scrollLeft - 20;
        });

        const nextIndex =
            direction === 'right'
                ? Math.min(currentIndex + 1, cards.length - 1)
                : Math.max(currentIndex - 1, 0);

        const nextCard = cards[nextIndex];
        if (nextCard) {
            container.scrollTo({
                left: nextCard.offsetLeft - 20,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section id="goals" className="py-12 no-scrollbar">
            <div className="container mx-auto px-4">
                <p className="text-center mb-6 text-2xl font-medium">Наши цели</p>

                <div className="relative">
                    <div
                        className="flex space-x-4 overflow-x-auto overflow-y-hidden no-scrollbar pb-4"
                        ref={scrollRef}
                    >
                        {data.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, x: 200}}
                                whileInView={{opacity: 1, x: 0}}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.05,
                                }}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                            >
                                <Card
                                    className="min-w-[400px] max-w-[400px] flex-shrink-0 rounded-2xl border border-gray-200 shadow-sm">
                                    <CardContent className="p-6">
                                        <div className="text-4xl mb-4 text-midnight">{item.number}</div>
                                        <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <div className="absolute -top-12 right-0 flex gap-2">
                        <Button size="icon" variant="outline" onClick={() => scrollToCard('left')}>
                            <ChevronLeft className="w-5 h-5"/>
                        </Button>
                        <Button size="icon" variant="outline" onClick={() => scrollToCard('right')}>
                            <ChevronRight className="w-5 h-5"/>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
