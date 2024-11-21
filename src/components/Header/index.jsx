import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import acc_icon from './account_icon.png';

import Search from '../Search';

const Header = () => {
  const [isLogged, setIsLogged] = useState(true);

  return (
    <div className={styles.root}>
      <div className={styles.panel_container}>
        <div className={styles.left_side}>
          <h1>C I R C L E S</h1>
        </div>

        <div className={styles.right_side}>
          <Search />
          {isLogged === false ? (
            <Link to="/login">
              <p className={styles.loginlink}>ВОЙТИ</p>
            </Link>
          ) : (
            <img src={acc_icon} className={styles.account_icon} alt="icon" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
