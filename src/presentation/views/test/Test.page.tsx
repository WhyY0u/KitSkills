import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router";
import styles from "./style/TestStyle.module.css";
import { testsService, type TestQuestion } from "@/data/datasources/api/testsService";

const Test = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState<TestQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [testCompleted, setTestCompleted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  
  // Получение вопросов теста
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!id) {
        setError("ID компетенции не найден");
        setIsLoading(false);
        return;
      }
      
      try {
        const questionsData = await testsService.getCompetencyTests(id);
        
        if (questionsData.length === 0) {
          setError("Вопросы для теста не найдены");
        } else {
          setQuestions(questionsData);
        }
      } catch (err) {
        setError("Ошибка при загрузке вопросов теста");
        console.error("Ошибка при загрузке вопросов теста:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuestions();
  }, [id]);
  
  // Обработчик выбора ответа
  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };
  
  // Переход к следующему вопросу
  const handleNextQuestion = async () => {
    // Сначала отправляем текущий ответ
    if (selectedAnswer && questions[currentQuestionIndex]) {
      await handleSubmitAnswer();
    }
    
    // Затем переходим к следующему вопросу
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
    }
  };
  
  // Переход к предыдущему вопросу
  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(null);
    }
  };
  
  // Отправка ответа на текущий вопрос
  const handleSubmitAnswer = async () => {
    if (!selectedAnswer || !questions[currentQuestionIndex]) return;
    
    const currentQuestion = questions[currentQuestionIndex];
    
    setIsSubmitting(true);
    
    try {
      const response = await testsService.submitTestAnswer({
        testId: currentQuestion.id,
        answer: selectedAnswer
      });
      
      if (response && response.success) {
        // Если это последний вопрос, завершаем тест
        if (currentQuestionIndex === questions.length - 1) {
          setTestCompleted(true);
          setScore(response.score || 0);
        }
        // Убираем автоматический переход к следующему вопросу отсюда,
        // так как теперь это делается в handleNextQuestion
      } else {
        setError("Ошибка при отправке ответа");
      }
    } catch (err) {
      setError("Произошла ошибка при отправке ответа");
      console.error("Ошибка при отправке ответа:", err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Возврат на главную страницу
  const handleBackToHome = () => {
    navigate("/");
  };
  
  // Отображение загрузки
  if (isLoading) {
    return <div className={styles.loadingContainer}>Загрузка вопросов...</div>;
  }
  
  // Отображение ошибки
  if (error) {
    return (
      <div className={styles.testContainer}>
        <div className={styles.errorMessage}>{error}</div>
        <button className={styles.homeButton} onClick={handleBackToHome}>
          Вернуться на главную
        </button>
      </div>
    );
  }
  
  // Отображение результатов теста
  if (testCompleted) {
    return (
      <div className={styles.testContainer}>
        <div className={styles.resultContainer}>
          <h1 className={styles.resultTitle}>Тест завершен!</h1>
          <p className={styles.resultDetails}>
            Вы успешно прошли тест. Ваш результат будет учтен в рейтинге.
          </p>
          <button className={styles.homeButton} onClick={handleBackToHome}>
            Вернуться на главную
          </button>
        </div>
      </div>
    );
  }
  
  // Отображение вопросов теста
  const currentQuestion = questions[currentQuestionIndex];
  
  if (!currentQuestion) {
    return (
      <div className={styles.testContainer}>
        <div className={styles.errorMessage}>Вопрос не найден</div>
        <button className={styles.homeButton} onClick={handleBackToHome}>
          Вернуться на главную
        </button>
      </div>
    );
  }
  
  return (
    <div className={styles.testContainer}>
      {/* Прогресс-бар */}
      <div className={styles.progressBar}>
        <div 
          className={styles.progressFill} 
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>
      
      {/* Номер вопроса */}
      <div className={styles.questionNumber}>
        Вопрос {currentQuestionIndex + 1} из {questions.length}
      </div>
      
      {/* Карточка с вопросом */}
      <div className={styles.questionCard}>
        <h2 className={styles.questionText}>{currentQuestion.question}</h2>
        
        {/* Список вариантов ответов */}
        <div className={styles.answersList}>
          {currentQuestion.answers.map((answer, index) => (
            <button
              key={index}
              className={`${styles.answerOption} ${selectedAnswer === answer ? styles.answerOptionSelected : ''}`}
              onClick={() => handleAnswerSelect(answer)}
              disabled={isSubmitting}
            >
              {answer}
            </button>
          ))}
        </div>
      </div>
      
      {/* Кнопки навигации */}
      <div className={styles.navigationButtons}>
        <button
          className={styles.navButton}
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0 || isSubmitting}
        >
          Назад
        </button>
        
        {currentQuestionIndex < questions.length - 1 ? (
          <button
            className={styles.navButton}
            onClick={handleNextQuestion}
            disabled={!selectedAnswer || isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Далее"}
          </button>
        ) : (
          <button
            className={styles.submitButton}
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer || isSubmitting}
          >
            {isSubmitting ? "Отправка..." : "Завершить тест"}
          </button>
        )}
      </div>
      
      {/* Сообщение об ошибке */}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default Test;