/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import styles from './ParticipantsBlock.module.scss';

import crown from '../../assets/crown_icon.png';
import { Link } from 'react-router-dom';

const ParticipantsBlock = ({ fullness }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  // чек данных
  if (!fullness || !Array.isArray(fullness) || fullness.length === 0) {
    return <div className={styles.error}>Данные о участниках отсутствуют</div>;
  }

  const counter = fullness[0] || '0/0';
  const participants = fullness.slice(1);

  const visibleParticipants = isExpanded ? participants : participants.slice(0, 3);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.participants_cont}>
      <h2 className={styles.title}>
        Список участников ({counter.match(/\d+\/\d+/)?.[0] || '0/0'})
      </h2>
      <div className={`${styles.listContainer} ${isExpanded ? styles.expanded : ''}`}>
        <ul className={styles.list}>
          {visibleParticipants.map((name, index) => (
            <li key={index} className={styles.participant}>
              <img
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${name}`}
                alt={name}
                className={styles.avatar}
              />
              <Link to="/profile">
                <span className={styles.nick}>{name}</span>
              </Link>
              {index === 0 && (
                <span className={styles.admin}>
                  <img src={crown} className={styles.crown_ic} />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      {participants.length > 3 && (
        <button className={styles.showMore} onClick={toggleExpand}>
          {isExpanded ? 'Скрыть' : 'Показать больше'}
        </button>
      )}
    </div>
  );
};

export default ParticipantsBlock;