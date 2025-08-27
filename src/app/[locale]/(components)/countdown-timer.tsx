import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

export function CountdownTimer({targetDate}: { targetDate: string }) {
    const [timeLeft, setTimeLeft] = useState("");
    const t = useTranslations("countdown");

    useEffect(() => {
        const interval = setInterval(() => {
            const diff = +new Date(targetDate) - +new Date();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            setTimeLeft(`${days}${t("days")} ${hours}${t("hours")} ${minutes}${t("minutes")} ${seconds}${t("seconds")}`);
        }, 1000);

        return () => clearInterval(interval);
    }, [targetDate, t]);

    return <p className="text-white text-lg mt-6">{t("label")}: {timeLeft}</p>;
}
