import { useState, useEffect } from "react";
import styles from "./style/Style.module.css";

export interface User {
    name: string;
    group: string;
    id: string;
    telegramUser: string;
}

const Login = () => {
    const [fullname, setFullname] = useState("");
    const [group, setGroup] = useState("");
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!fullname.trim() || !group.trim()) return;

        const newUser: User = {
            name: fullname,
            group: group,
            id: Math.random().toString(36).substring(2, 9),
            telegramUser: "",
        };

        setUser(newUser);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const isFormValid = fullname.trim() && group.trim();

    return (
        <div className={styles.login_container}>

            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Регистрация</h1>

                <input
                    type="text"
                    placeholder="Полное имя"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className={styles.input}
                />

                <input
                    type="text"
                    placeholder="Группа"
                    value={group}
                    onChange={(e) => setGroup(e.target.value)}
                    className={styles.input}
                />

                <button
                    type="submit"
                    className={`${styles.button} ${!isFormValid ? styles.disabled : ""}`}
                    disabled={!isFormValid}
                >
                    Продолжить
                </button>
            </form>
        </div>
    );
};

export default Login;
