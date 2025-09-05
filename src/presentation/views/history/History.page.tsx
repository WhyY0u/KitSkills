import { useState } from "react";
import styles from "./style/Style.module.css";

interface Winner {
    place: number;
    name: string;
}

interface HistoryItem {
    year: number;
    winners: Winner[];
    description?: string;
}

interface HistoryData {
    [skillName: string]: HistoryItem[];
}

// Данные с описанием
const historyData: HistoryData = {
    "Веб-разработка": [
        {
            year: 2023,
            winners: [
                { place: 1, name: "Иван Иванов" },
                { place: 2, name: "Петр Петров" },
                { place: 3, name: "Алибек Сеитов" },
            ],
            description:
                "Создание веб-сайтов и приложений, работа с фронтендом и бэкендом, современные технологии и UX/UI.",
        },
        {
            year: 2022,
            winners: [
                { place: 1, name: "Мария Смирнова" },
                { place: 2, name: "Данил Жуков" },
                { place: 3, name: "Ким Аян" },
            ],
            description:
                "Разработка современных веб-решений с использованием популярных технологий.",
        },
    ],
    "Мобильная разработка": [
        {
            year: 2023,
            winners: [
                { place: 1, name: "Вика Соколова" },
                { place: 2, name: "Азамат Касымов" },
                { place: 3, name: "Данияр Турсунов" },
            ],
            description:
                "Создание мобильных приложений для Android и iOS, UX/UI дизайн и оптимизация.",
        },
    ],
};

const podiumIcons = ["🏆", "🥈", "🥉"];
const podiumColors = ["#FFD700", "#C0C0C0", "#CD7F32"];

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
                            <div key={skill} className={styles.skillCard}>
                                <h3 className={styles.skillName}>{skill}</h3>
                                <p className={styles.skillDescription}>
                                    {historyData[skill][0].description || "Описание недоступно."}
                                </p>
                                <button
                                    className={styles.selectButton}
                                    onClick={() => setSelectedSkill(skill)}
                                >
                                    Посмотреть историю
                                </button>
                            </div>
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

                    <p className={styles.skillDescriptionLarge}>
                        {historyData[selectedSkill][0].description}
                    </p>

                    <div className={styles.historyCards}>
                        {historyData[selectedSkill].map((item) => (
                            <div key={item.year} className={styles.historyCard}>
                                <h3 className={styles.historyYear}>{item.year} год</h3>
                                <ul className={styles.winnersList}>
                                    {item.winners.map((winner, idx) => (
                                        <li key={winner.place} className={styles.winnerItem}>
                                            <span
                                                className={styles.winnerPlace}
                                                style={{ color: podiumColors[winner.place - 1] || "#00ffcc" }}
                                            >
                                                {podiumIcons[winner.place - 1] || ""} {winner.place}-е место
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
