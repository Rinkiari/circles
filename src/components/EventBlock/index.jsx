import React from 'react';
import styles from './EventBlock.module.scss';

import ParticipantsBlock from '../ParticipantsBlock';
import { svg_iconsArr } from '../Categories';

const EventBlock = ({ image, title, description, fullness, categories }) => {
  const [categoryId, setCategoryId] = React.useState(null); //состояние категорий

  return (
    <div className={styles.global_container}>
      <div className={styles.top_container}>
        <h2 className={styles.event_title}>{title}</h2>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.left_side}>
          <img src={image} alt={title} className={styles.card_img} />
          <ul>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${styles.knopochka} ${categoryId === index ? styles.active : ''}`}
                onClick={() => setCategoryId(index)}>
                <img src={svg_iconsArr[index]} alt="icon" className={styles.icon} />
                {category}
              </button>
            ))}
          </ul>
          <div className={styles.description_container}>
            <h3>Описание</h3>
            <p>{description}</p>
          </div>
        </div>
        <div className={styles.right_side}>
          <button className={styles.msg_btn}>НАПИСАТЬ</button>
          <ParticipantsBlock fullness={fullness} />
        </div>
      </div>
    </div>
  );
};

export default EventBlock;
