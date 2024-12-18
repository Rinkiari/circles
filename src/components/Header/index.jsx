import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

import styles from './Header.module.scss';
import acc_icon from '../../assets/account_icon.png';
import logout_icon from '../../assets/logout.png';

import Search from '../Search';

const Header = () => {
  const { authData, logout } = useAuth();

  const location = useLocation();
  const pageClass =
    location.pathname === '/'
      ? 'home'
      : location.pathname.startsWith('/event')
      ? 'event'
      : location.pathname.startsWith('/profile')
      ? 'profile'
      : location.pathname.slice(1);

  console.log(pageClass);

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
          {authData.access_token ? (
            <>
              <Link to="/myprofile">
                <img src={acc_icon} className={styles.account_icon} alt="icon" />
              </Link>
              <img src={logout_icon} alt="logout" className={styles.logout_icon} onClick={logout} />
            </>
          ) : (
            <Link to="/login">
              <p className={styles.loginlink}>ВОЙТИ</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
