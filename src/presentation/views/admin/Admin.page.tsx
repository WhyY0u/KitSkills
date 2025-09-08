import { style } from 'framer-motion/client';
import styles from './style/Style.module.css'
import { MdAddBox } from "react-icons/md";
import { useState } from 'react';

const Admin = () => {
const  [isOpen, setIsOpen] = useState(false)

    return (
        <div className={styles.container}>
            <p className={`${styles.admin_title}`}>Добро пожаловать в Админ панель</p>
            <p className={`${styles.admin_sub_title}`}>Тут вы можете добовлять компетенции и тесты к ним</p>
            <div className={`${styles.compitation_container}`}>
                <p className={`${styles.compitation_not_found}`}>Компетенций пока нету, добавтье чтобы увидеть их сдесь</p>
                <button onClick={() => setIsOpen(true)} className={styles.admin_add_button}><MdAddBox />Добавить компетенцию</button>
            </div>
            <div className={styles.container_button}>
                <button className={styles.admin_start_buttm}>Начать Соревнования</button>
                <button className={styles.admin_end_buttm}>Сбросить счет</button>
            </div>

            <div>
            {isOpen && (
            <div className={styles.admin_modal_overlay}>
                <div className={styles.admin_modal}>
                    <h2>Добавление компетенции</h2>
                    <input type="text" placeholder="Название компетенции" className={styles.modal_input} />
                    <div className={styles.modal_buttons}>
                    <button className={styles.modal_save}>Сохранить</button>
                    <button onClick={() => setIsOpen(false)} className={styles.modal_cancel}> Отмена </button>
                    </div>
                </div>
            </div>
            )}
            </div>
        </div>

    );
};

export default Admin;
