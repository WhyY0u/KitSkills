import { useState, useEffect } from "react";
import styles from './style/Style.module.css';

interface Question {
  question: string;
  options: string[];
  answer: number;
}

const questions: Question[] = [
  {
    question: "Что такое useState в React?",
    options: [
      "Хук для управления состоянием",
      "Метод жизненного цикла",
      "Компонент высшего порядка",
      "Событие DOM"
    ],
    answer: 0
  },
  {
    question: "Какой метод используется для рендера JSX в React?",
    options: [
      "render()",
      "display()",
      "show()",
      "paint()"
    ],
    answer: 0
  },
  {
    question: "Что делает useEffect?",
    options: [
      "Позволяет управлять побочными эффектами",
      "Создаёт новый компонент",
      "Удаляет элемент из DOM",
      "Обновляет state синхронно"
    ],
    answer: 0
  }
];

const Qa = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [time, setTime] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  // Таймер
  useEffect(() => {
    const interval = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (index: number) => {
    setSelected(index);
    if (index === questions[current].answer) setScore(score + 1);

    setTimeout(() => {
      setSelected(null);
      if (current + 1 < questions.length) setCurrent(current + 1);
      else setShowResult(true);
    }, 600);
  }

  const handleRestart = () => {
    setCurrent(0);
    setScore(0);
    setShowResult(false);
    setTime(0);
  }

  if (showResult) {
    return (
      <div className={styles.qaContainer}>
        <div className={styles.qaResultCard}>
          <h1 className={styles.qaTitle}>Результат теста</h1>
          <p className={styles.qaText}>
            Вы ответили правильно на {score} из {questions.length} вопросов
          </p>
          <p className={styles.qaText}>Время: {time} сек</p>
          <button className={styles.qaButton} onClick={handleRestart}>
            На главную
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.qaContainer}>
      {/* Название компетенции */}
      <h2 className={styles.qaCompetencyName}>Веб разработка</h2>
      <p className={styles.qaCompetencyDesc}>
        Тест проверяет базовые знания по веб-разработке, включая React и современные подходы к созданию интерфейсов.
      </p>

      <p className={styles.qaTimer}>Время: {time} сек</p>

      <div className={styles.qaQuestionCard}>
        <p className={styles.qaQuestionText}>{questions[current].question}</p>
        <div className={styles.qaOptions}>
          {questions[current].options.map((option, index) => (
            <button
              key={index}
              onClick={() => selected === null && handleAnswer(index)}
              className={`${styles.qaOptionButton} ${selected !== null
                  ? index === questions[current].answer
                    ? styles.correct
                    : index === selected
                      ? styles.wrong
                      : ""
                  : ""
                }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <p className={styles.qaProgress}>
        Вопрос {current + 1} из {questions.length}
      </p>
    </div>
  );
};

export default Qa;
