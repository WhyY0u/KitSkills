import styles from './style/Style.module.css'

const Admin = () => {


    return (
        <div className={styles.container}>
            <p className={`${styles.admin_title}`}>Добро пожаловать в Админ панель</p>
            <p className={`${styles.admin_sub_title}`}>Тут вы можете добовлять компетенции и тесты к ним</p>
            <div className={`${styles.compitation_container}`}>
                <p className={`${styles.compitation_not_found}`}>Компетенций пока нету, добавтье чтобы увидеть их сдесь</p>
            </div>
            <button>Начать Соревнования</button>
            <button>Сбросить счет</button>
        </div>

    );
};

export default Admin;
