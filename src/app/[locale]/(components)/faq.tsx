'use client';

import Container from "@/shared/ui/wrappers/container";
import { motion } from 'motion/react';
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/shared/ui/accordion";

export default function Faq(){
    return (
        <motion.section initial={{opacity: 0, y: 50}}
                        whileInView={{opacity: 1, y: 0}}
                        transition={{duration: 0.6, delay: 0.2}}>
            <Container id="faq" className="max-w-2xl mx-auto">
                <h2 className="text-3xl font-semibold mb-6 text-center">Часто задаваемые вопросы</h2>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="q1">
                        <AccordionTrigger>Сколько стоит участие?</AccordionTrigger>
                        <AccordionContent>Участие бесплатное для всех студентов и преподавателей.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q2">
                        <AccordionTrigger>Нужна ли регистрация?</AccordionTrigger>
                        <AccordionContent>Да, пожалуйста, оставьте заявку ниже.</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="q3">
                        <AccordionTrigger>Где будет проходить?</AccordionTrigger>
                        <AccordionContent>Актовый зал Медицинского колледжа, ул. Здоровья, 10.</AccordionContent>
                    </AccordionItem>
                </Accordion>
            </Container>
        </motion.section>
    )
}
