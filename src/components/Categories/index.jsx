import styles from './Categories.module.scss';
import brush from './assets/brush_icon.svg';
import ball from './assets/ball_icon.svg';
import show from './assets/show_icon.svg';
import leafs from './assets/leafs_icon.svg';
import games from './assets/games_icon.svg';
import kino from './assets/kino_icon.svg';
import dots from './assets/dots_icon.svg';

const Categories = ({ value, onClickCategory }) => {
  const categoriesArr = ['ТВОРЧЕСТВО', 'СПОРТ', 'ШОУ', 'ПРИРОДА', 'ИГРЫ', 'КИНО', ''];
  const svg_iconsArr = [brush, ball, show, leafs, games, kino, dots];

  return (
    <div className={styles.ctg_container}>
      {categoriesArr.map((el, i) => (
        <button
          className={`${styles.knopochka} ${value === i ? styles.active : ''}`}
          key={i}
          onClick={() => onClickCategory(i)}>
          <img src={svg_iconsArr[i]} alt="icon" className={styles.icon} />
          {el}
        </button>
      ))}
    </div>
  );
};

export default Categories;
