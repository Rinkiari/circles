import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import styles from "./LogOnBlock.module.scss";
import backIcon from "./back.png";

import { LoginContext } from "../../App";

const LogOnBlock = () => {
  const [activeTab, setActiveTab] = useState("login");

  const { isLogged, setIsLogged } = useContext(LoginContext);

  return (
    <div className={styles.background}>
      <Link to="/">
        <img src={backIcon} alt="back" className={styles.back_btn} />
      </Link>
      <div className={styles.authBox}>
        {/* Вкладки */}
        <div className={styles.authTabs}>
          <span
            className={`${styles.tab} ${activeTab === "login" ? styles.active : ""}`}
            onClick={() => setActiveTab("login")}
          >
            ВХОД
          </span>
          <span
            className={`${styles.tab} ${activeTab === "register" ? styles.active : ""}`}
            onClick={() => setActiveTab("register")}
          >
            РЕГИСТРАЦИЯ
          </span>
        </div>
        <hr className={styles.divider} />

        {/* Форма входа */}
        {activeTab === "login" && (
          <div className={styles.formContainer}>
            <form>
              <input
                type="text"
                placeholder="Логин"
                className={styles.inputField}
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                className={styles.inputField}
                required
              />
              <Link to="/fillmyprofile">
                <button
                  onClick={() => setIsLogged(!isLogged)}
                  type="submit"
                  className={styles.submitBtn}
                >
                  Продолжить
                </button>
              </Link>
            </form>
          </div>
        )}

        {/* Форма регистрации */}
        {activeTab === "register" && (
          <div className={styles.formContainer}>
            <form>
              <input
                type="text"
                placeholder="Логин"
                className={styles.inputField}
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                className={styles.inputField}
                required
              />
              <input
                type="password"
                placeholder="Ещё раз пароль"
                className={styles.inputField}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.inputField}
                required
              />
              <Link to="/">
                <button
                  onClick={() => setIsLogged(!isLogged)}
                  type="submit"
                  className={styles.submitBtn}
                >
                  Продолжить
                </button>
              </Link>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogOnBlock;
