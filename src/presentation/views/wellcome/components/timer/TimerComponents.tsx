import { useEffect, useState } from "react";
import styles from "./style/Style.module.css";

interface TimerComponentProps {
    initialTime: number;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const days = Math.floor(seconds / (24 * 3600));
        const hours = Math.floor((seconds % (24 * 3600)) / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return { days, hours, minutes, secs };
    };

    const { days, hours, minutes, secs } = formatTime(timeLeft);

    return (
        <div className={styles.timer_container}>
            {timeLeft > 0 ? (
                <>
                    <h1 className={styles.title}>До конца осталось:</h1>
                    <div className={styles.timer}>
                        <div className={styles.timeBox}>
                            <span className={styles.number}>{days}</span>
                            <span className={styles.label}>Дни</span>
                        </div>
                        <div className={styles.timeBox}>
                            <span className={styles.number}>{hours}</span>
                            <span className={styles.label}>Часы</span>
                        </div>
                        <div className={styles.timeBox}>
                            <span className={styles.number}>{minutes}</span>
                            <span className={styles.label}>Мин</span>
                        </div>
                        <div className={styles.timeBox}>
                            <span className={styles.number}>{secs}</span>
                            <span className={styles.label}>Сек</span>
                        </div>
                    </div>
                </>
            ) : (
                <h1 className={styles.endMessage}>⏳ Время вышло!</h1>
            )}
        </div>
    );
};

export default TimerComponent;
