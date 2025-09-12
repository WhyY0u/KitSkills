import { useState, useEffect } from "react";
import styles from "./style/Style.module.css";
import TimerComponent from "./components/timer/TimerComponents";
import SkillListComponent from "./components/skill/list/SkillListComponent";
import type { Skill } from "@/domain/entities/skill/Skill";
import { competenciesService } from "@/data/datasources/api/competenciesService";

const WellComePage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetencies = async () => {
      try {
        const competenciesData = await competenciesService.getCompetencies();
        setSkills(competenciesData);
      } catch (err) {
        setError('Ошибка при загрузке компетенций');
        console.error('Ошибка при загрузке компетенций:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompetencies();
  }, []);


  return (
    <div className={styles.wellcome_container}>
      <div className={styles.intro}>
        <h1 className={styles.introTitle}>🏆 Добро пожаловать, студенты!</h1>
        <p className={styles.introText}>
          У вас есть уникальный шанс проявить себя, попасть в спецгруппу
          и представить наш колледж на <b>WorldSkills</b>.
        </p>
        <p className={styles.warning}>
          ⚠ Внимание: если будет обнаружено, что вы прошли тест нечестно —
          результаты будут аннулированы, и вы можете быть отстранены от участия.
        </p>
      </div>

      <TimerComponent />
      
      {loading ? (
        <div className={styles.loadingContainer}>
          <p>Загрузка компетенций...</p>
        </div>
      ) : error ? (
        <div className={styles.errorContainer}>
          <p>{error}</p>
        </div>
      ) : (
        <SkillListComponent skills={skills} />
      )}
    </div>
  );

};

export default WellComePage;