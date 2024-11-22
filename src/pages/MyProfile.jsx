import React from 'react';

import Header from '../components/Header';
import EventCard from '../components/EventCard';

import styles from '../scss/components/MyProfile.module.scss';
import settings from '../assets/settings_icon.png';
import photo from '../assets/masha.png';

const MyProfile = () => {
  return (
    <>
      <Header />
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
        <div className={styles.projects_container}></div>
      </div>
    </>
  );
};

export default MyProfile;
