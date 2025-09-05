import { useState } from "react";
import styles from "./style/Style.module.css";

interface HistoryItem {
    year: number;
    winners: { place: number; name: string }[];
}

interface HistoryData {
    [skillName: string]: HistoryItem[];
}

// Пример данных
const historyData: HistoryData = {
    "Веб-разработка": [
        { year: 2023, winners: [{ place: 1, name: "Иван Иванов" }, { place: 2, name: "Петр Петров" }, { place: 3, name: "Алибек Сеитов" }] },
        { year: 2022, winners: [{ place: 1, name: "Мария Смирнова" }, { place: 2, name: "Данил Жуков" }, { place: 3, name: "Ким Аян" }] },
    ],
    "Мобильная разработка": [
        { year: 2023, winners: [{ place: 1, name: "Вика Соколова" }, { place: 2, name: "Азамат Касымов" }, { place: 3, name: "Данияр Турсунов" }] },
    ],
};

const History = () => {
    const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
    const skills = Object.keys(historyData);

    return (
        <div className={styles.history_container}>
            {!selectedSkill ? (
                <>
                    <h2 className={styles.competitionTitle}>Выберите компетенцию</h2>
                    <div className={styles.skillsList}>
                        {skills.map((skill) => (
                            <button
                                key={skill}
                                className={styles.skillButton}
                                onClick={() => setSelectedSkill(skill)}
                            >
                                {skill}
                            </button>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    <div className={styles.headerRow}>
                        <button
                            className={styles.backButton}
                            onClick={() => setSelectedSkill(null)}
                        >
                            ← Назад
                        </button>
                        <h2 className={styles.competitionTitle}>{selectedSkill}</h2>
                    </div>

                    <div className={styles.historyCards}>
                        {historyData[selectedSkill].map((item) => (
                            <div key={item.year} className={styles.historyCard}>
                                <h3 className={styles.historyYear}>{item.year} год</h3>
                                <ul className={styles.winnersList}>
                                    {item.winners.map((winner) => (
                                        <li key={winner.place} className={styles.winnerItem}>
                                            <span
                                                className={
                                                    winner.place === 1
                                                        ? styles.firstPlace
                                                        : winner.place === 2
                                                            ? styles.secondPlace
                                                            : winner.place === 3
                                                                ? styles.thirdPlace
                                                                : styles.otherPlace
                                                }
                                            >
                                                {winner.place}-е место
                                            </span>
                                            <span className={styles.winnerName}>{winner.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default History;

