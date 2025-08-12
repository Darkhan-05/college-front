'use client';
import Container from "@/shared/ui/wrappers/container";
import {AnimatePresence, motion} from "framer-motion";
import Image from "next/image";

export default function AboutEvent() {

    return (
        <motion.section
            id="about-event"
            className="relative mb-10 overflow-hidden min-h-screen flex items-center"
        >
            <Container className="relative z-10 text-left flex justify-between items-center gap-8">
                <motion.div
                    transition={{duration: 0.8}}
                    initial={{opacity: 0.1, x: -200}}
                    whileInView={{opacity: 1, x: 0}}
                    className="w-8/12"
                >
                    <motion.h2
                        className="text-4xl font-bold mb-4 relative inline-block"
                        initial={{backgroundSize: "0% 2px"}}
                        whileInView={{backgroundSize: "100% 2px"}}
                        transition={{duration: 1}}
                        style={{
                            backgroundImage: "linear-gradient(currentColor, currentColor)",
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "0 100%",
                        }}
                    >
                        О мероприятии
                    </motion.h2>
                    <div className="space-y-2 mt-6">
                        <AnimatePresence mode="sync">
                            <motion.p className="text-muted-foreground text-lg leading-relaxed mt-6"
                                      initial={{opacity: 0, height: 0, rotateX: 90}}
                                      animate={{opacity: 1, height: "auto", rotateX: 0}}
                                      exit={{opacity: 0, height: 0, rotateX: -90}}
                                      transition={{duration: 0.5, delay: 1}}>
                                Приглашаем всех студентов, преподавателей и профессионалов в области медицины
                                на масштабное событие, которое состоится 1 декабря в медицинском колледже.
                                В программе: лекции, мастер-классы, панельные дискуссии и живое общение.
                            </motion.p>
                        </AnimatePresence>
                    </div>

                </motion.div>
                <motion.div
                    transition={{duration: 0.8}}
                    initial={{opacity: 0.1, x: 200}}
                    whileInView={{opacity: 1, x: 0}}
                >
                    <Image
                        className="w-96 h-80 rounded-3xl object-cover shadow-lg"
                        src="/about.webp"
                        draggable={false}
                        width={400}
                        height={320}
                        alt="about"
                    />
                </motion.div>
            </Container>
        </motion.section>
    );
}
