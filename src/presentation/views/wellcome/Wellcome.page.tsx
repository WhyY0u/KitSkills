import styles from "./style/Style.module.css";
import TimerComponent from "./components/timer/TimerComponents";
import SkillListComponent from "./components/skill/list/SkillListComponent";
import type { Skill } from "@/domain/entities/skill/Skill";

const WellComePage = () => {
  const skills: Skill[] = [
    {
      id: "1",
      name: "Веб разработка",
      description: "Создание современных сайтов, веб-сервисов и интерфейсов.",
      topResult: [
        {
          user: { fullname: "", group: "", id: "", telegramUser: "" },
          time: "",
          score: 0
        },
        {
          user: { fullname: "", group: "", id: "", telegramUser: "" },
          time: "",
          score: 0
        },
        {
          user: { fullname: "", group: "", id: "", telegramUser: "" },
          time: "",
          score: 0
        },
      ],
    },
    {
      id: "2",
      name: "Мобильная разработка",
      description: "Разработка приложений для Android и iOS.",
      topResult: [
        {
          user: { fullname: "Саша Иванов", group: "ПМ-21", id: "u4", telegramUser: "@sasha" },
          time: "09:33",
          score: 0
        },
        {
          user: { fullname: "Маша Ким", group: "ПМ-22", id: "u5", telegramUser: "@masha" },
          time: "13:20",
          score: 0
        },
        {
          user: { fullname: "Аян Ермеков", group: "ПМ-23", id: "u6", telegramUser: "@ayan" },
          time: "18:40",
          score: 0
        },
      ],
    },
  ];


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

      <TimerComponent initialTime={2 * 24 * 60 * 60} />
      <SkillListComponent skills={skills} />
    </div>
  );

};

export default WellComePage;
