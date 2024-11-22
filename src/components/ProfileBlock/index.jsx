import React from 'react';

import styles from './ProfileBlock.module.scss';

import EventCard from '../EventCard';

import settings from '../../assets/settings_icon.png';
import photo from '../../assets/masha.png';

const ProfileBlock = ({ value }) => {
  return (
    <div className={styles.global_container}>
      <div className={styles.profile_container}>
        <div className={styles.top_innerContainer}>
          <h3>Мария Железнова</h3>
          <button className={styles.edit_button}>Редактировать профиль</button>
          <img src={settings} alt="settings" className={styles.settings_icon} />
        </div>
        <div className={styles.bottom_innerContainer}>
          <div className={styles.left_side_container}>
            <img src={photo} alt="Mariya" />
          </div>
          <div className={styles.right_side_container}>
            <button>НОВЫЙ ПРОЕКТ</button>
            <article className={styles.bio_block}>
              <div className={styles.birth_container}>
                <h4>День рождения</h4>
                <p>22 мая 2002 г.</p>
              </div>
              <div className={styles.about_container}>
                <h4>Обо мне</h4>
                <p>Привет, я Маша, увлекаюсь хип-хопом и не очень люблю играть в компьютер.</p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <hr />
      <div className={styles.projects_container}>
        <div className={styles.top_innerPrContainer}>
          <h3>ПРОЕКТЫ</h3>
          <p>См. все</p>
        </div>
        <div className={styles.bottom_innerPrContainer}>
          {value.map((obj) => (
            <EventCard key={obj.id} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBlock;
