import styles from "./style/Style.module.css";
import type { Skill } from "@/domain/entities/skill/Skill";

const podiumIcons = ["🥇", "🥈", "🥉"];
const scoreIcon = "🏆";

const Competition = () => {
    const skill: Skill = {
        id: "1",
        name: "Веб-разработка",
        description: "Создание современных сайтов, веб-сервисов и интерфейсов.",
        topResult: [
            { user: { fullname: "Древов Даниил", group: "ИС-23", id: "u1", telegramUser: "@alihan" }, time: "12:45", score: 9 },
            { user: { fullname: "Вика", group: "ИС-22", id: "u2", telegramUser: "@vika" }, time: "15:10", score: 8 },
            { user: { fullname: "Данияр", group: "ИС-21", id: "u3", telegramUser: "@daniyar" }, time: "20:05", score: 7 },
            { user: { fullname: "Азамат", group: "ИС-22", id: "u4", telegramUser: "@azamat" }, time: "21:15", score: 6 },
        ],
    };

    const sortedResults = [...skill.topResult].sort((a, b) => b.score - a.score);
    const podium = sortedResults.slice(0, 3);
    const others = sortedResults.slice(3);

    const handleStartTest = () => {
        alert("Начало теста!");
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

            {/* СПИСОК ОСТАЛЬНЫХ */}
            <div className={styles.resultsTable}>
                {others.length > 0 ? (
                    others.map((result, index) => (
                        <div key={index} className={styles.resultRow}>
                            <div className={styles.left}>
                                <span className={styles.placeNumber}>#{index + 4}</span>
                                <div className={styles.resultInfo}>
                                    <span className={styles.userName}>{result.user.fullname}</span>
                                    {result.user.group && <span className={styles.userGroup}>{result.user.group}</span>}
                                </div>
                            </div>
                            <div className={styles.right}>
                                {result.time && <span className={styles.time}>⏱ {result.time}</span>}
                                <span className={styles.score}>{scoreIcon} {result.score}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className={styles.noResults}>Пока никто не прошёл тест</p>
                )}
            </div>

            <button className={styles.startTestButton} onClick={handleStartTest}>
                Начать тест
            </button>
        </div>
    );
};

export default Competition;
