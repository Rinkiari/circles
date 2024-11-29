import React from 'react';
import { useLocation } from 'react-router-dom';

import EventCard from '../EventCard';

import styles from './ProfileBlock.module.scss';
import settings from '../../assets/settings_icon.png';

const ProfileBlock = ({ value }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const location = useLocation().pathname;
  const pageClass = location === '/myprofile' ? 'myprofile' : location.slice(1);
  // console.log('logs in ProfileBlock:', value[0]);

  if (!value || value.length === 0) {
    return <p>Нет данных для отображения.</p>;
  }

  const profile = value[0];
  const { name, avatar, birth, about, events } = profile;

  return (
    <div className={styles.global_container}>
      <div className={styles.profile_container}>
        <div className={styles.top_innerContainer}>
          <h3>{name}</h3>
          {isExpanded === false && (
            <>
              <button className={`${styles.edit_button} ${styles[pageClass]}`}>
                Редактировать профиль
              </button>
              <img
                src={settings}
                alt="settings"
                className={`${styles.settings_icon} ${styles[pageClass]}`}
              />
            </>
          )}
          {isExpanded === true && (
            <>
              <h3>- ВСЕ ПРОЕКТЫ</h3>
              <p onClick={() => setIsExpanded(!isExpanded)} className={styles.hide_text}>
                Скрыть
              </p>
            </>
          )}
        </div>
        {isExpanded === false && (
          <div className={styles.bottom_innerContainer}>
            <div className={styles.left_side_container}>
              <img src={avatar} alt="ava" />
            </div>
            <div className={styles.right_side_container}>
              <button className={`${styles.btn} ${styles[pageClass]}`}>
                {location === '/profile' ? 'НАПИСАТЬ' : 'НОВЫЙ ПРОЕКТ'}
              </button>
              <article className={styles.bio_block}>
                <div className={styles.birth_container}>
                  <h4>День рождения</h4>
                  <p>{birth}</p>
                </div>
                <div className={styles.about_container}>
                  <h4>Обо мне</h4>
                  <p>{about}</p>
                </div>
              </article>
            </div>
          </div>
        )}
      </div>
      {isExpanded === false && <hr />}
      {isExpanded === false && (
        <div className={styles.projects_container}>
          <div className={styles.top_innerPrContainer}>
            <h3>ПРОЕКТЫ</h3>
            <p onClick={() => setIsExpanded(!isExpanded)}>См. все</p>
          </div>
          <div className={styles.bottom_innerPrContainer}>
            {events.slice(0, 3).map((obj) => (
              <EventCard key={obj.id} {...obj} />
            ))}
          </div>
        </div>
      )}
      {isExpanded === true && (
        <div className={styles.expanded_grid_container}>
          {events.map((obj) => (
            <EventCard key={obj.id} {...obj} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfileBlock;
