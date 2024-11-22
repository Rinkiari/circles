import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';
import acc_icon from './account_icon.png';

import Search from '../Search';

const Header = () => {
  const [isLogged, setIsLogged] = useState(true);
  const location = useLocation();
  console.log(`location: ${location.pathname}`);

  const pageClass = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  return (
    <div className={styles.root}>
      <div className={`${styles.panel_container} ${styles[pageClass]}`}>
        <div className={styles.left_side}>
          <Link to="/">
            <h1>C I R C L E S</h1>
          </Link>
        </div>

        <div className={styles.right_side}>
          <Search />
          {isLogged === false ? (
            <Link to="/login">
              <p className={styles.loginlink}>ВОЙТИ</p>
            </Link>
          ) : (
            <Link to="/myprofile">
              <img src={acc_icon} className={styles.account_icon} alt="icon" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
