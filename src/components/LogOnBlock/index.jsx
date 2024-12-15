import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import styles from './LogOnBlock.module.scss';
import backIcon from './back.png';

import { AuthContext } from '../../App';

const LogOnBlock = ({ handleSubmitReg, handleSubmitLog }) => {
  const [activeTab, setActiveTab] = useState('login');

  const [login, setLogin] = useState(''); // cостояние для имени
  const [email, setEmail] = useState(''); // cостояние для email
  const [password, setPassword] = useState(''); // cостояние для пароля
  const [passAgain, setPassAgain] = useState('');

  const isPassesMatch = (event) => {
    event.preventDefault();
    let matched = false;

    if (password === passAgain) {
      matched = true;
    } else {
      matched = false;
    }

    if (matched) {
      handleSubmitReg({ login, email, password });
      console.log('Данные отправлены...');
    } else {
      alert('Пароли не совпадают!');
    }
  };

  const handleAuth = (event) => {
    event.preventDefault();

    handleSubmitLog({ email, password });
  };

  return (
    <div className={styles.background}>
      <Link to="/">
        <img src={backIcon} alt="back" className={styles.back_btn} />
      </Link>
      <div className={styles.authBox}>
        {/* вкладки */}
        <div className={styles.authTabs}>
          <span
            className={`${styles.tab} ${activeTab === 'login' ? styles.active : ''}`}
            onClick={() => setActiveTab('login')}>
            ВХОД
          </span>
          <span
            className={`${styles.tab} ${activeTab === 'register' ? styles.active : ''}`}
            onClick={() => setActiveTab('register')}>
            РЕГИСТРАЦИЯ
          </span>
        </div>
        <hr className={styles.divider} />

        {/* Форма входа */}
        {activeTab === 'login' && (
          <div className={styles.formContainer}>
            <form onSubmit={handleAuth}>
              <input
                type="text"
                placeholder="Логин"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitBtn}>
                Продолжить
              </button>
            </form>
          </div>
        )}

        {/* Форма регистрации */}
        {activeTab === 'register' && (
          <div className={styles.formContainer}>
            <form onSubmit={isPassesMatch}>
              <input
                type="text"
                placeholder="Логин"
                className={styles.inputField}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Пароль"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Ещё раз пароль"
                className={styles.inputField}
                value={passAgain}
                onChange={(e) => setPassAgain(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className={styles.submitBtn}>
                Продолжить
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogOnBlock;
