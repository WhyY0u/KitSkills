import { type FC } from "react";
import styles from "./style/Style.module.css";
import type { Skill } from "@/domain/entities/skill/Skill";
import { useNavigate } from "react-router";

interface SkillCardProps {
  skill: Skill;
}

const podiumIcons = ["🏆", "🥈", "🥉"];
const podiumColors = [styles.gold, styles.silver, styles.bronze];

const SkillCardComponent: FC<SkillCardProps> = ({ skill }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    // Передаем данные о компетенции через state при навигации
    navigate('/compitation/' + skill.id, {
      state: { skill }
    });
  }
  return (
    <div className={styles.skillCard}>
      <h3 className={styles.skillName}>{skill.name}</h3>
      <p className={styles.skillDescription}>{skill.description}</p>

      <div className={styles.topResults}>
        {skill.topResult.slice(0, 3).map((result, index) => (
          <div
            key={index}
            className={`${styles.resultRow} ${podiumColors[index]}`}
          >
            <div className={styles.leftSide}>
              <span className={styles.podiumIcon}>{podiumIcons[index]}</span>
              <div className={styles.userInfo}>
                <span className={styles.userName}>{result.user.fullname ? result.user.fullname : "-"}</span>
                {result.user.group && (
                  <span className={styles.userGroup}>{result.user.group}</span>
                )}              </div>
            </div>

            <div className={styles.rightSide}>
              {result.time && <span className={styles.time}>⏱ {result.time}</span>}
              {result.score && <span className={styles.score}>✔ {result.score}</span>}
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleClick} className={styles.selectButton}>Выбрать</button>
    </div>
  );
};

export default SkillCardComponent;