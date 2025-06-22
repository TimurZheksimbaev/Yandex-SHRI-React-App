import styles from "./Header.module.css";
import uploadIcon from "../../assets/upload.png";
import circlePlusIcon from "../../assets/circle-plus.png";
import lineIcon from "../../assets/line.png";
import historyIcon from "../../assets/history.png";
import logo from "../../assets/logo.png";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
    {
        title: "CSV Аналитик",
        icon: uploadIcon,
        path: "/",
    },
    {
        title: "CSV Генератор",
        icon: circlePlusIcon,
        path: "/generator",
    },
    {
        title: "История",
        icon: historyIcon,
        path: "/history",
    },
];

export const Header = () => {
    const location = useLocation();

    return (
        <header className={styles.headerWrapper}>
            <div className={styles.leftSection}>
                <img src={logo} alt="Летящие школы" className={styles.brandIcon} />
                <div className={styles.title}>МЕЖГАЛАКТИЧЕСКАЯ АНАЛИТИКА</div>
            </div>

            <div className={styles.rightSection}>
                <nav className={styles.menu}>
                    {menuItems.map((item, index) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={index}
                                to={item.path}
                                className={`${styles.menuItem} ${isActive ? styles.active : ""
                                    }`}
                            >
                                <div className={styles.menuContent}>
                                    <img
                                        src={item.icon}
                                        alt={item.title}
                                        className={styles.menuIcon}
                                    />
                                    <span className={styles.menuTitle}>{item.title}</span>
                                    {isActive && (
                                        <img
                                            src={lineIcon}
                                            alt="active"
                                            className={styles.activeLine}
                                        />
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </header>
    );
};
