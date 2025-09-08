import { useState } from 'react';
import styles from './style/Style.module.css';
import { MdAddBox, MdDelete } from "react-icons/md";

const Admin = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [competitions, setCompetitions] = useState([]);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleAddCompetition = () => {
        if (!name.trim()) return;

        const newCompetition = {
            id: Date.now(),
            name,
            description,
            createdAt: new Date().toLocaleString()
        };

        setCompetitions([...competitions, newCompetition]);
        setName("");
        setDescription("");
        setIsOpen(false);
    };

    const handleDeleteCompetition = (id) => {
        setCompetitions(competitions.filter((comp) => comp.id !== id));
    };

    return (
        <div className={styles.container}>
            <p className={styles.admin_title}>Добро пожаловать в Админ панель</p>
            <p className={styles.admin_sub_title}>Тут вы можете добавлять компетенции и тесты к ним</p>

            <div className={styles.compitation_container}>
                {competitions.length === 0 ? (
                    <p className={styles.compitation_not_found}>
                        Компетенций пока нет, добавьте чтобы увидеть их здесь
                    </p>
                ) : (
                    <ul className={styles.compitation_list}>
                        {competitions.map((comp) => (
                            <li key={comp.id} className={styles.compitation_item}>
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    <div>
                                        <h3>{comp.name}</h3>
                                        <p>{comp.description}</p>
                                        <span className={styles.compitation_date}>Создано: {comp.createdAt}</span>
                                    </div>
                                    <button
                                        className={styles.delete_button}
                                        onClick={() => handleDeleteCompetition(comp.id)}
                                        title="Удалить компетенцию"
                                    >
                                        <MdDelete size={22} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
                <button onClick={() => setIsOpen(true)} className={styles.admin_add_button}>
                    <MdAddBox /> Добавить компетенцию
                </button>
            </div>

            <div className={styles.container_button}>
                <button className={styles.admin_start_buttm}>Начать Соревнования</button>
                <button className={styles.admin_end_buttm}>Сбросить счет</button>
            </div>

            {isOpen && (
                <div className={styles.admin_modal_overlay}>
                    <div className={styles.admin_modal}>
                        <h2 className={styles.h2}>Добавление компетенции</h2>
                        <input
                            type="text"
                            placeholder="Название компетенции"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={styles.modal_input}
                        />
                        <textarea
                            placeholder="Описание компетенции"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.modal_textarea}
                        />
                        <div className={styles.modal_buttons}>
                            <button onClick={handleAddCompetition} className={styles.modal_save}>Сохранить</button>
                            <button onClick={() => setIsOpen(false)} className={styles.modal_cancel}>Отмена</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Admin;
