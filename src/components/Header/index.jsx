import styles from './Header.module.scss';

import Search from '../Search';

const Header = () => {
  return (
    <div className={styles.root}>
      <div className={styles.panel_container}>
        <div className={styles.left_side}>
          <h1>C I R C L E S</h1>
        </div>

        <div className={styles.right_side}>
          <Search />
          <p className={styles.loginlink}>ВОЙТИ</p>
        </div>
      </div>
    </div>
  );
};

export default Header;