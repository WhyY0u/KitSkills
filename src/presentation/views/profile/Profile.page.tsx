import { useState } from "react";
import styles from "./style/Style.module.css";

const Profile = () => {
  const [fullname, setFullname] = useState("Древов Даниил");
  const [group, setGroup] = useState("ИС-23");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingGroup, setIsEditingGroup] = useState(false);

  const user = {
    totalScore: 42,
    ranking: {
      "Веб-разработка": 2,
      "Мобильная разработка": 5,
    },
    bestTimes: {
      "Веб-разработка": "12:45",
      "Мобильная разработка": "15:10",
    },
  };

  const handleSaveName = () => {
    setIsEditingName(false);
    alert(`Имя изменено на: ${fullname}`);
  };

  const handleSaveGroup = () => {
    setIsEditingGroup(false);
    alert(`Группа изменена на: ${group}`);
  };

  return (
    <div className={styles.profile_container}>
      <h1 className={styles.title}>Профиль</h1>

      {/* ФИО */}
      <div className={styles.infoBlock}>
        <span className={styles.label}>ФИО:</span>
        {isEditingName ? (
          <div className={styles.editContainer}>
            <input
              className={styles.input}
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />
            <button className={styles.saveButton} onClick={handleSaveName}>
              💾
            </button>
          </div>
        ) : (
          <>
            <span className={styles.value}>{fullname}</span>
            <button
              className={styles.editButton}
              onClick={() => setIsEditingName(true)}
            >
              ✏️
            </button>
          </>
        )}
      </div>

      {/* Группа */}
      <div className={styles.infoBlock}>
        <span className={styles.label}>Группа:</span>
        {isEditingGroup ? (
          <div className={styles.editContainer}>
            <input
              className={styles.input}
              value={group}
              onChange={(e) => setGroup(e.target.value)}
            />
            <button className={styles.saveButton} onClick={handleSaveGroup}>
              💾
            </button>
          </div>
        ) : (
          <>
            <span className={styles.value}>{group}</span>
            <button
              className={styles.editButton}
              onClick={() => setIsEditingGroup(true)}
            >
              ✏️
            </button>
          </>
        )}
      </div>

      {/* Очки */}
      <div className={styles.infoBlock}>
        <span className={styles.label}>Суммарный счёт:</span>
        <span className={styles.value}>{user.totalScore} 🏆</span>
      </div>

      {/* Место в рейтинге */}
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Место в рейтинге</h2>
        {Object.entries(user.ranking).map(([skill, place]) => (
          <div key={skill} className={styles.infoBlock}>
            <span className={styles.label}>{skill}:</span>
            <span className={styles.value}>#{place}</span>
          </div>
        ))}
      </div>

      {/* Лучшие времена */}
      <div className={styles.section}>
        <h2 className={styles.subtitle}>Лучшее время</h2>
        {Object.entries(user.bestTimes).map(([skill, time]) => (
          <div key={skill} className={styles.infoBlock}>
            <span className={styles.label}>{skill}:</span>
            <span className={styles.value}>⏱ {time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;
