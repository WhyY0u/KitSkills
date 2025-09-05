import { FaHome, FaHistory, FaUser } from "react-icons/fa";
import styles from "./style/Style.module.css";
import { NavLink } from "react-router";

const Menu = () => {
    return (
        <nav className={styles.menu}>
            <NavLink
                to="/"
                className={({ isActive }) =>
                    `${styles.menuItem} ${isActive ? styles.active : ""}`
                }
            >
                <FaHome className={styles.icon} />
                <span className={`${styles.name}`}>Главная</span>
            </NavLink>

            <NavLink
                to="/history"
                className={({ isActive }) =>
                    `${styles.menuItem} ${isActive ? styles.active : ""}`
                }
            >
                <FaHistory className={styles.icon} />
                <span className={`${styles.name}`}>История</span>
            </NavLink>

            <NavLink
                to="/profile"
                className={({ isActive }) =>
                    `${styles.menuItem} ${isActive ? styles.active : ""}`
                }
            >
                <FaUser className={styles.icon} />
                <span className={`${styles.name}`}>Профиль</span>
            </NavLink>
        </nav>
    );
};

export default Menu;
