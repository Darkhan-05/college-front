'use client';

import { Button } from "@/shared/ui/button";
import { useRef } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/shared/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
    { title: "Цель 1", number: "01", description: "Описание цели 1" },
    { title: "Цель 2", number: "02", description: "Описание цели 2" },
    { title: "Цель 3", number: "03", description: "Описание цели 3" },
    { title: "Цель 4", number: "04", description: "Описание цели 4" },
    { title: "Цель 5", number: "05", description: "Описание цели 5" },
    { title: "Цель 6", number: "06", description: "Описание цели 6" },
];

export default function GoalsCarousel() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

    const scrollToCard = (direction: "left" | "right") => {
        if (!scrollRef.current || cardRefs.current.length === 0) return;

        const scrollLeft = scrollRef.current.scrollLeft;
        const container = scrollRef.current;
        const cards = cardRefs.current;

        const currentIndex = cards.findIndex((card) => {
            if (!card) return false;
            return card.offsetLeft >= scrollLeft - 20;
        });

        const nextIndex =
            direction === "right"
                ? Math.min(currentIndex + 1, cards.length - 1)
                : Math.max(currentIndex - 1, 0);

        const nextCard = cards[nextIndex];
        if (nextCard) {
            container.scrollTo({
                left: nextCard.offsetLeft - 20,
                behavior: "smooth",
            });
        }
    };

    return (
        <section id="goals" className="py-12 no-scrollbar relative overflow-hidden">
            {/* Фоновая анимация */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-50 via-white to-pink-50 opacity-50"
                animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                }}
                style={{
                    backgroundSize: "200% 200%",
                }}
            />

            <div className="container mx-auto px-4 relative z-10">
                <motion.p
                    className="text-center mb-6 text-2xl font-medium"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    Наши цели
                </motion.p>

                <div className="relative">
                    <div
                        className="flex space-x-4 overflow-x-auto overflow-y-hidden no-scrollbar pb-4"
                        ref={scrollRef}
                    >
                        {data.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, rotate: -5 }}
                                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                                viewport={{ once: true }}
                                transition={{
                                    duration: 0.6,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 120,
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    rotate: 1,
                                    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                }}
                                ref={(el) => {
                                    cardRefs.current[index] = el;
                                }}
                            >
                                <Card className="min-w-[400px] max-w-[400px] flex-shrink-0 rounded-2xl border border-gray-200 shadow-sm bg-white">
                                    <CardContent className="p-6">
                                        <motion.div
                                            className="text-4xl mb-4 text-midnight font-bold"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.2 + index * 0.05,
                                            }}
                                        >
                                            {item.number}
                                        </motion.div>
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {/* Кнопки с анимацией */}
                    <div className="absolute -top-12 right-0 flex gap-2">
                        <motion.div whileTap={{ scale: 0.85 }}>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => scrollToCard("left")}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </Button>
                        </motion.div>
                        <motion.div whileTap={{ scale: 0.85 }}>
                            <Button
                                size="icon"
                                variant="outline"
                                onClick={() => scrollToCard("right")}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
