import { useState, useEffect } from "react";
import { FaUser, FaUsers } from "react-icons/fa";
import styles from "./style/Style.module.css";
import { useNavigate } from "react-router";
import { useTelegram } from "../../hooks/useTelegram";
import { authService } from "../../../data/datasources/api/services.js";

export interface LocalUser {
    name: string;
    group: string;
    id: string;
    telegramUser: string;
}

const Login = () => {
    const [fullname, setFullname] = useState("");
    const [group, setGroup] = useState("");
    const [user, setUser] = useState<LocalUser | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { isInTelegram, webApp, isReady } = useTelegram();

    const handleClick = () => navigate('/');

    useEffect(() => {
        // Проверяем наличие токена в localStorage
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");
        
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
            navigate('/');
        }
        
        // Если приложение запущено в Telegram и готово к работе
        if (isInTelegram && isReady && webApp) {
            // Автоматически заполняем имя пользователя из Telegram, если оно доступно
            const telegramUser = webApp.initDataUnsafe.user;
            if (telegramUser) {
                const fullName = [telegramUser.first_name, telegramUser.last_name].filter(Boolean).join(' ');
                setFullname(fullName);
            }
        }
    }, [isInTelegram, isReady, webApp, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!fullname.trim() || !group.trim()) return;

        try {
            setLoading(true);
            
            // Всегда используем API для авторизации с предоставленной initData
            const response = await authService.init({
                initData: "user=%7B%22id%22%3A1139679435%2C%22first_name%22%3A%22%D0%98%D0%BB%D1%8C%D1%8F%F0%9F%8D%87%F0%9F%8D%87%F0%9F%8D%87%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22drtyui_miracle%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%2C%22photo_url%22%3A%22https%3A%5C%2F%5C%2Ft.me%5C%2Fi%5C%2Fuserpic%5C%2F320%5C%2FasFWG3pYW5eDM3oqmq9S6tJhCymRTQzmieiS4FN8u8E.svg%22%7D&chat_instance=-7081903839907005052&chat_type=sender&auth_date=1747902811&signature=BOBEDnmHbS8KaR1yEjDWFBZgeeASBAotGIAjxNGYkmWPJc3_WPVm3bEni5LvYhCrmq-wFu36Z6xt3TPBTlgnAQ&hash=09f277534c8545ec64808e4810860a821dd99839e2ee7c79e8782115437e6863",
                fio: fullname,
                group: group
            });
                
                if (response.error) {
                    setError(response.error);
                    return;
                }
                
                if (response.data) {
                    // Сохраняем токен и данные пользователя
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    
                    // Сохраняем группу и ФИО отдельно для использования в запросах
                    localStorage.setItem("fullname", fullname);
                    localStorage.setItem("group", group);
                    
                    // Переходим на главную страницу
                    navigate('/');
                }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка при авторизации');
        } finally {
            setLoading(false);
        }
    };

    const isFormValid = fullname.trim() && group.trim();

    return (
        <div className={styles.login_container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Регистрация</h1>

                {/* Поле ФИО */}
                <div className={styles.inputWrapper}>
                    <FaUser className={styles.inputIcon} />
                    <input
                        type="text"
                        placeholder="Полное имя"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className={styles.input}
                    />
                </div>

                {/* Поле группы */}
                <div className={styles.inputWrapper}>
                    <FaUsers className={styles.inputIcon} />
                    <input
                        type="text"
                        placeholder="Группа"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        className={styles.input}
                    />
                </div>

                {error && <div className={styles.error}>{error}</div>}
            
            <button
                type="submit"
                className={`${styles.button} ${!isFormValid || loading ? styles.disabled : ""}`}
                disabled={!isFormValid || loading}
            >
                {loading ? 'Загрузка...' : 'Продолжить'}
            </button>
            </form>
        </div>
    );
};

export default Login;
