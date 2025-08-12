"use client";

// import Speakers from "@/app/[locale]/(components)/speakers";
// import Program from "@/app/[locale]/(components)/program";
// import Faq from "@/app/[locale]/(components)/faq";
// import AboutEvent from "@/app/[locale]/(components)/about-event";
// import HeroBlock from "@/app/[locale]/(components)/hero-block";
// import GoalsCarousel from "@/app/[locale]/(components)/goals-carousel";
// import RegistrationTabs from "@/app/[locale]/(components)/registration-tabs";
// import Contacts from "@/app/[locale]/(components)/contacts";
// import Header from "@/widgets/header";
//
//
// export default function Home() {
//
//     return (
//         <>
//             <Header/>glo
//             <main className="overflow-hidden space-y-24 pb-24">
//                 <HeroBlock/>
//                 <AboutEvent/>
//                 <GoalsCarousel/>
//                 <Speakers/>
//                 <Program/>
//                 <Faq/>
//                 <Contacts/>
//                 <RegistrationTabs/>
//             </main>
//         </>
//     );
// }
//


'use client';

import React, {useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion, transform, useMotionTemplate, useScroll, useSpring, useTransform} from 'framer-motion';
import AboutEvent from "@/app/[locale]/(components)/about-event";
import GoalsCarousel from "@/app/[locale]/(components)/goals-carousel";
import Speakers from "@/app/[locale]/(components)/speakers";
import HeroBlock from './(components)/hero-block';
import Program from "@/app/[locale]/(components)/program";
import Contacts from "@/app/[locale]/(components)/contacts";
import Faq from "@/app/[locale]/(components)/faq";
import RegistrationTabs from "@/app/[locale]/(components)/registration-tabs";

function FullScreenSwiper({slides = [], durationMs = 700, touchThreshold = 50}) {
    const [index, setIndex] = useState(0);
    const lockRef = useRef(false);
    const touchStartY = useRef(null);

    // ==== Координаты мыши для blob ====
    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({x: e.clientX, y: e.clientY});
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const clampNext = () => {
        if (index < slides.length - 1) {
            setIndex((i) => i + 1);
            lock();
        }
    };
    const clampPrev = () => {
        if (index > 0) {
            setIndex((i) => i - 1);
            lock();
        }
    };
    const lock = () => {
        lockRef.current = true;
        setTimeout(() => (lockRef.current = false), durationMs);
    };

    // wheel + touch handlers
    useEffect(() => {
        const onWheel = (e) => {
            if (lockRef.current) {
                e.preventDefault();
                return;
            }
            e.preventDefault();
            const delta = e.deltaY;
            if (delta > 0) clampNext();
            else if (delta < 0) clampPrev();
        };

        const onTouchStart = (e) => {
            touchStartY.current = e.touches?.[0]?.clientY ?? null;
        };

        const onTouchEnd = (e) => {
            if (lockRef.current || touchStartY.current == null) return;
            const endY = e.changedTouches?.[0]?.clientY ?? null;
            if (endY == null) return;
            const diff = touchStartY.current - endY;
            if (Math.abs(diff) < touchThreshold) return;
            if (diff > 0) clampNext();
            else clampPrev();
        };

        window.addEventListener('wheel', onWheel, {passive: false});
        window.addEventListener('touchstart', onTouchStart, {passive: false});
        window.addEventListener('touchend', onTouchEnd, {passive: false});

        return () => {
            window.removeEventListener('wheel', onWheel);
            window.removeEventListener('touchstart', onTouchStart);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [index, slides.length, durationMs, touchThreshold]);

    // Прячем скролл
    useEffect(() => {
        const prev = {
            docOverflow: document.documentElement.style.overflow,
            bodyOverflow: document.body.style.overflow,
        };
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';

        return () => {
            document.documentElement.style.overflow = prev.docOverflow || '';
            document.body.style.overflow = prev.bodyOverflow || '';
        };
    }, []);

    if (!slides || slides.length === 0) return null;

    return (
        <div className="w-full h-screen relative">
            <Marquee/>
            <div
                className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-white touch-none overflow-hidden">

                {/* === ФОН с blob-шариками === */}
                <div className="absolute inset-0 -z-10 overflow-hidden">
                    {/* Медленно двигающиеся шары */}
                    <motion.div
                        className="absolute w-72 h-72 bg-midnight rounded-full blur-3xl opacity-50"
                        animate={{x: [0, 150, 0], y: [0, -230, 0]}}
                        transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                        style={{top: "20%", left: "10%"}}
                    />
                    <motion.div
                        className="absolute w-72 h-72 bg-midnight rounded-full blur-3xl opacity-50"
                        animate={{x: [0, 150, 0], y: [0, -90, 0]}}
                        transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
                        style={{top: "10%", right: "10%"}}
                    />
                    <motion.div
                        className="absolute w-96 h-96 bg-midnight rounded-full blur-3xl opacity-40"
                        animate={{x: [0, -160, 0], y: [0, 240, 0]}}
                        transition={{duration: 7, repeat: Infinity, ease: "easeInOut"}}
                        style={{bottom: "15%", right: "15%"}}
                    />
                    {/* Blob, который следует за мышкой */}
                    <motion.div
                        className="absolute w-80 h-80 bg-midnight rounded-full blur-2xl opacity-50 pointer-events-none"
                        animate={{
                            x: mousePos.x - 160,
                            y: mousePos.y - 160
                        }}
                        transition={{type: "tween", duration: 1}} // мгновенное перемещение
                    />
                </div>

                <Svg/>
                {/* === Слайды === */}
                <AnimatePresence mode="wait">

                    <motion.div
                        key={index}
                        initial={{opacity: 0, scale: 0.98}}
                        animate={{opacity: 1, scale: 1}}
                        exit={{opacity: 0, scale: 1.02}}
                        transition={{duration: durationMs / 1000, ease: 'easeOut'}}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {slides[index]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>

    );
}


// app/page.jsx (или pages/index.jsx)
function Marquee() {
    const text =
        "Вместе для будущего без рака - Медсёстры, Врачи, Учёные • ";

    return (
        <div className="absolute top-1/2 left-12 -translate-x-1/2 -translate-y-1/2 rotate-90 z-[10000]">
            <motion.div
                className="flex whitespace-nowrap font-extrabold text-gray-500 text-[18px] tracking-widest"
                animate={{ x: ["90%", "-90%"] }}
                transition={{
                    ease: "linear",
                    duration: 36,
                    repeat: Infinity,
                }}
            >
                <span className="mr-8">{text.repeat(2)}</span>
            </motion.div>
        </div>
    );
}


function Svg() {

    const [frame, setFrame] = useState({
        width: 0,
        height: 0,
        top: 0,
        left: 0
    });

    const rotateValue = 15;
    const transformValue = rotateValue * 2;
    const springValue = {stiffness: 400, damping: 30};

    const rotateX = useSpring(0, springValue);
    const rotateY = useSpring(0, springValue);
    const x = useSpring(0, springValue);
    const y = useSpring(0, springValue);
    const shadowX = useSpring(0, springValue);
    const shadowY = useSpring(30, springValue);

    /* With useMotionTemplate, you can use MotionValues (and thus, useSpring) within strings. This is useful for animating and interpolating properties like Drop Shadow, Box Shadow, Gradients, and many more. */
    const filter = useMotionTemplate`drop-shadow(${shadowX}px ${shadowY}px 20px rgba(0, 0, 68, 0.25))`;

    const convertCursorPosition = e => {
        const objectX = (e.nativeEvent.clientX - frame.left) / frame.width;
        const objectY = (e.nativeEvent.clientY - frame.top) / frame.height;

        rotateX.set(transform(objectY, [0, 1], [rotateValue, -rotateValue]));
        rotateY.set(transform(objectX, [0, 1], [-rotateValue, rotateValue]));
        x.set(transform(objectX, [0, 1], [-transformValue, transformValue]));
        y.set(transform(objectY, [0, 1], [-transformValue, transformValue]));

        shadowX.set(transform(objectX, [0, 1], [20, -20]));
        shadowY.set(transform(objectY, [0, 1], [60, 20]));
    };

    const handleMouseEnter = e => {
        const currentElement = e.target.getBoundingClientRect();

        setFrame({
            width: currentElement.width,
            height: currentElement.height,
            top: currentElement.top,
            left: currentElement.left
        });

        convertCursorPosition(e);
    };

    const handleMouseMove = e => {
        convertCursorPosition(e);
    };

    const handleMouseLeave = e => {
        rotateX.set(0);
        rotateY.set(0);
        x.set(0);
        y.set(0);
        shadowX.set(0);
        shadowY.set(40);
    };

    return (
        <motion.div
            className="absolute top-20 right-12 opacity-70 hover:opacity-100 transition duration-300 z-[1000]"
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                width: 160,
                height: 160,
                cursor: "pointer"
            }}
            whileHover={{rotate: [0]}}
            animate={{rotate: [0, 10, -12, 0]}}
            transition={{duration: 4, repeat: Infinity, ease: "easeInOut"}}
        >
            <motion.div
                style={{
                    width: 160,
                    height: 160,
                    borderRadius: 32,
                    rotateX,
                    rotateY,
                    display: "flex",
                    placeItems: "center",
                    placeContent: "center",
                    background: "linear-gradient(180deg, #0CF 0%, #86F 100%)"
                }}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                        x,
                        y,
                        filter
                    }}
                    width="110"
                    height="110"
                    viewBox="0 0 512 512"
                    fill="white"
                >
                    <rect width="512" height="512" rx="20%" fill="#28b4d7"/>

                    <path
                        d="M320 112h-128v112H80v128h112v112h128V352h112V224H320z"
                        fill="white"
                    />
                </motion.svg>
            </motion.div>
        </motion.div>
    );
}


export default function Page() {
    const slides = [
        <HeroBlock key={1}/>,
        <AboutEvent key={2}/>,
        <GoalsCarousel key={3}/>,
        <Speakers key={4}/>,
        <Program key={5}/>,
        <Faq key={6}/>,
        <Contacts key={7}/>,
        <RegistrationTabs key={8}/>
    ];

    return (
        <>
            <FullScreenSwiper slides={slides} durationMs={700} touchThreshold={60}/>;
        </>)
}
