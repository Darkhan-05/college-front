'use client';

import Container from "@/shared/ui/wrappers/container";
import { motion } from 'motion/react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { FaQuestionCircle } from "react-icons/fa";
import { useRef } from "react";

export default function Faq() {
    const faqRef = useRef<HTMLDivElement>(null);

    const faqs = [
        { q: "Сколько стоит участие?", a: "Участие бесплатное для всех студентов и преподавателей." },
        { q: "Нужна ли регистрация?", a: "Да, пожалуйста, оставьте заявку ниже." },
        { q: "Где будет проходить?", a: "Актовый зал Медицинского колледжа, ул. Здоровья, 10." },
    ];

    return (
        <motion.section
            ref={faqRef}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Container id="faq" className="max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-3 mb-6">
                    <FaQuestionCircle className="text-blue-600 text-3xl" />
                    <h2 className="text-3xl font-semibold text-center">Часто задаваемые вопросы</h2>
                </div>

                <Accordion type="single" collapsible className="w-full">
                    {faqs.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.15 }}
                        >
                            <AccordionItem
                                value={`q${index}`}
                                className="transition hover:bg-blue-50 rounded-lg px-2"
                            >
                                <AccordionTrigger className="transition-transform hover:scale-[1.02]">
                                    {item.q}
                                </AccordionTrigger>
                                <AccordionContent className="scroll-smooth">
                                    {item.a}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </Container>
        </motion.section>
    );
}
