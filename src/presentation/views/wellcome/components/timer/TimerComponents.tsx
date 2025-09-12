import { useEffect, useState } from "react";
import styles from "./style/Style.module.css";
import { stageService } from "../../../../../data/datasources/api/stageService";
import type { Stage, StageStatus } from "../../../../../data/datasources/api/stageService";

interface TimerComponentProps {
    initialTime?: number; 
}

const TimerComponent: React.FC<TimerComponentProps> = ({ initialTime }) => {
    const [timeLeft, setTimeLeft] = useState<number>(initialTime || 0);
    const [stage, setStage] = useState<Stage | null>(null);
    const [stageStatus, setStageStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStageStatus = async () => {
            try {
                setLoading(true);
                const response = await stageService.getStatus();
                
                if (response && response.data && response.data.stage) {
                    console.log("Полученные данные о стадии:", response.data.stage);
                    setStage(response.data.stage);
                    setStageStatus(response.data.status);
                    
                    let endsAtTime;
                    
                    if (response.data.status === 'testing') {
                        // Для статуса testing добавляем 2 дня к дате endsAt
                        const endsAtDate = new Date(response.data.stage.endsAt);
                        endsAtDate.setDate(endsAtDate.getDate() + 2);
                        endsAtTime = endsAtDate.getTime();
                    } else {
                        // Для других статусов используем дату из бэкенда как есть
                        endsAtTime = new Date(response.data.stage.endsAt).getTime();
                    }
                    
                    const now = new Date().getTime();
                    const timeLeftInSeconds = Math.max(0, Math.floor((endsAtTime - now) / 1000));
                    
                    setTimeLeft(timeLeftInSeconds);
                } else if (response && response.data) {
                    console.error("Получен ответ без данных о стадии:", response.data);
                    setError("Получены некорректные данные о стадии");
                } else if (response) {
                    console.error("Получен ответ без данных:", response);
                    setError("Получены некорректные данные от сервера");
                }
            } catch (err) {
                setError("Не удалось загрузить информацию о стадии");
                if (initialTime) {
                    setTimeLeft(initialTime);
                }
                console.error("Ошибка при загрузке стадии:", err);
            } finally {
                setLoading(false);
            }
        };
        
        fetchStageStatus();
    }, [initialTime]);

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
            {loading ? (
                <h1 className={styles.title}>Загрузка...</h1>
            ) : error ? (
                <div>
                    <h1 className={styles.title}>Ошибка загрузки</h1>
                    <p className={styles.errorText}>{error}</p>
                    {timeLeft > 0 && (
                        <>
                            <h1 className={styles.title}>До конца осталось (резервное время):</h1>
                            <div className={styles.timer}>
                        {stageStatus === 'preparation' && (
                             <p className={`${styles.statusMessage} ${styles.preparationStatus}`}>⚠️ Нельзя решать</p>
                         )}
                         {stageStatus === 'testing' && (
                             <p className={`${styles.statusMessage} ${styles.testingStatus}`}>✅ Можно решать</p>
                         )}
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
                    )}
                </div>
            ) : timeLeft > 0 ? (
                <>
                    <h1 className={styles.title}>До конца {stage?.active ? 'активной стадии' : 'стадии'} осталось:</h1>
                    {stageStatus === 'preparation' && (
                        <p className={`${styles.statusMessage} ${styles.preparationStatus}`}>⚠️ Нельзя решать</p>
                    )}
                    {stageStatus === 'testing' && (
                        <p className={`${styles.statusMessage} ${styles.testingStatus}`}>✅ Можно решать</p>
                    )}
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
