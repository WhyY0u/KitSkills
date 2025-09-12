import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router";
import styles from "./style/Style.module.css";
import type { Skill } from "@/domain/entities/skill/Skill";
import { competenciesService } from "@/data/datasources/api/competenciesService";

const podiumIcons = ["🥇", "🥈", "🥉"];
const scoreIcon = "🏆";

const Competition = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [skill, setSkill] = useState<Skill | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    useEffect(() => {
        // Получаем данные о компетенции из state при навигации
        if (location.state?.skill) {
            setSkill(location.state.skill);
        } else {
            // Если данных нет в state, можно добавить запасной вариант
            // Например, загрузить данные по ID через API
            console.warn('Данные о компетенции не были переданы через state');
        }
    }, [location.state, id]);
    
    // Если данные о компетенции еще не загружены, показываем загрузку
    if (!skill) {
        return <div className={styles.loadingContainer}>Загрузка...</div>;
    }
    
    // Если идет процесс выбора компетенции, показываем загрузку
    if (isLoading) {
        return <div className={styles.loadingContainer}>Начинаем тест...</div>;
    }

    

    const sortedResults = [...skill.topResult].sort((a, b) => b.score - a.score);
    const podium = sortedResults.slice(0, 3);
    const others = sortedResults.slice(3);

    const handleStartTest = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            if (!id) {
                setError('ID компетенции не найден');
                return;
            }
            
            const response = await competenciesService.selectCompetency(id);
            
            if (response) {
                // Успешный ответ от API
                console.log('Компетенция выбрана:', response);
                // Перенаправляем на страницу теста
                navigate(`/test/${id}`);
            }
        } catch (err: any) {
            console.error('Ошибка при выборе компетенции:', err);
            
            // Проверяем различные форматы ошибки для определения статуса 403
            if (
                // Проверка прямого статуса
                err.status === 403 ||
                // Проверка вложенного статуса
                (err.error && err.error.statusCode === 403) ||
                // Проверка строки ошибки
                (typeof err === 'string' && err.includes('403')) ||
                // Проверка сообщения об ошибке
                (err.message && err.message.includes('Эта компетенция уже выбрана')) ||
                // Проверка JSON строки с ошибкой
                (typeof err === 'string' && err.includes('"statusCode":403')) ||
                // Проверка объекта ошибки в формате {message, error, statusCode}
                (err.statusCode === 403 && err.message && err.message.includes('Эта компетенция уже выбрана'))
            ) {
                setError('Эта компетенция уже выбрана и ещё активна');
            } else {
                setError('Произошла ошибка при начале теста');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.competitionContainer}>
            <h1 className={styles.competitionTitle}>{skill.name}</h1>
            <p className={styles.skillDescription}>{skill.description}</p>

            {/* ПОДИУМ */}
            <div className={styles.podium}>
                {[1, 0, 2].map((position) => {
                    const result = podium[position];
                    if (!result) return null;
                    return (
                        <div key={position} className={`${styles.podiumPlace} ${styles[`place${position + 1}`]}`}>
                            <div className={styles.podiumContent}>
                                <span className={styles.podiumIcon}>{podiumIcons[position]}</span>
                                <span className={styles.userName}>{result.user.fullname}</span>
                                {result.user.group && <span className={styles.userGroup}>{result.user.group}</span>}
                                <span className={styles.score}>{scoreIcon} {result.score} баллов</span>
                                {result.time && <span className={styles.time}>⏱ {result.time}</span>}
                            </div>
                        </div>
                    );
                })}
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
            <button 
                className={styles.startTestButton} 
                onClick={handleStartTest}
                disabled={isLoading}
            >
                {isLoading ? 'Загрузка...' : 'Начать тест'}
            </button>
        </div>
    );
};

export default Competition;
