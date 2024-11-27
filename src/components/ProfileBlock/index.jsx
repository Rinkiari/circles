import React from 'react';
import { useLocation } from 'react-router-dom';

import styles from './ProfileBlock.module.scss';

import EventCard from '../EventCard';

import settings from '../../assets/settings_icon.png';

const ProfileBlock = ({ value }) => {
  const location = useLocation().pathname;
  console.log(location);
  const pageClass = location === '/myprofile' ? 'myprofile' : location.slice(1);
  console.log('logs in ProfileBlock:', value[0]);

  if (!value || value.length === 0) {
    return <p>Нет данных для отображения.</p>;
  }

  const profile = value[0];

  return (
    <div className={styles.global_container}>
      <div className={styles.profile_container}>
        <div className={styles.top_innerContainer}>
          <h3>{profile.name}</h3>
          <button className={`${styles.edit_button} ${styles[pageClass]}`}>
            Редактировать профиль
          </button>
          <img
            src={settings}
            alt="settings"
            className={`${styles.settings_icon} ${styles[pageClass]}`}
          />
        </div>
        <div className={styles.bottom_innerContainer}>
          <div className={styles.left_side_container}>
            <img src={profile.avatar} alt="ava" />
          </div>
          <div className={styles.right_side_container}>
            <button className={`${styles.btn} ${styles[pageClass]}`}>
              {location === '/profile' ? 'НАПИСАТЬ' : 'НОВЫЙ ПРОЕКТ'}
            </button>
            <article className={styles.bio_block}>
              <div className={styles.birth_container}>
                <h4>День рождения</h4>
                <p>{profile.birth}</p>
              </div>
              <div className={styles.about_container}>
                <h4>Обо мне</h4>
                <p>{profile.about}</p>
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
          {profile.events.map((obj) => (
            <EventCard key={obj.id} {...obj} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileBlock;
