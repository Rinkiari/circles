import { useState } from 'react';

import styles from './Categories.module.scss';

import brush from './assets/brush_icon.svg';
import ball from './assets/ball_icon.svg';
import show from './assets/show_icon.svg';
import leafs from './assets/leafs_icon.svg';
import games from './assets/games_icon.svg';
import kino from './assets/kino_icon.svg';
import dots from './assets/dots_icon.svg';
import bgames from './assets/boardgames_icon.png';
import communication from './assets/communication_icon.png';

export const svg_iconsArr = [brush, ball, show, leafs, games, kino, dots, bgames, communication];

const Categories = ({ categoriesArr, selectedCategories, onToggleCategory }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  console.log(isPopupVisible);

  const handleDotsClick = () => {
    setIsPopupVisible((prev) => !prev);
  };

  return (
    <div className={styles.ctg_container}>
      {categoriesArr.slice(0, 6).map((el, i) => (
        <button
          className={`${styles.knopochka} ${selectedCategories.includes(i) ? styles.active : ''}`}
          key={i}
          onClick={() => onToggleCategory(i)}>
          <img src={svg_iconsArr[i]} alt="icon" className={styles.icon} />
          {el}
        </button>
      ))}
      <button
        className={`${styles.knopochka} ${isPopupVisible ? styles.active : ''}`}
        onClick={handleDotsClick}>
        <img src={svg_iconsArr[6]} alt="icon" className={styles.icon} />
        {categoriesArr[6]}
      </button>
      {isPopupVisible && (
        <div className={styles.popup}>
          {categoriesArr.slice(7).map((el, i) => (
            <button
              className={`${styles.knopochka} ${
                selectedCategories.includes(i + 7) ? styles.active : ''
              }`}
              key={i + 7}
              onClick={() => onToggleCategory(i + 7)}>
              <img src={svg_iconsArr[i + 7]} alt="icon" className={styles.icon} />
              {el}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
