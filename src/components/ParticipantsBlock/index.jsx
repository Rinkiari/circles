/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './ParticipantsBlock.module.scss';

import crown from '../../assets/crown_icon.png';

const ParticipantsBlock = ({ event_ownerID, members, maxMembersCount, membersCount }) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  console.log('maxmc', maxMembersCount);
  console.log('mc', membersCount);

  const navigate = useNavigate();

  const { authData } = useAuth();
  const myID = authData.user_id;

  const handleProfileClick = (id) => {
    event_ownerID === myID ? navigate('/myprofile/') : navigate(`/profile/${id}`);
  };

  // чек кол-ва участников
  if (!membersCount || membersCount === 0) {
    return <div className={styles.error}>Данные о кол-ве участниках отсутствуют</div>;
  }

  // чек макс кол-ва участников
  if (!maxMembersCount || maxMembersCount === 0) {
    return <div className={styles.error}>Данные о макс. кол-ве участниках отсутствуют</div>;
  }

  const visibleMembers = isExpanded ? members : members.slice(0, 3);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={styles.participants_cont}>
      <h2 className={styles.title}>Список участников ({`${membersCount}/${maxMembersCount}`})</h2>
      <div className={`${styles.listContainer} ${isExpanded ? styles.expanded : ''}`}>
        <ul className={styles.list}>
          {visibleMembers.map((user, index) => (
            <li key={index} className={styles.participant} onClick={handleProfileClick(user.id)}>
              {/* CHANGE TO IMAGE FROM ARRAY */}
              {/* ADD CHECK IF !IMG ? */}
              <img
                src={`https://api.dicebear.com/5.x/avataaars/svg?seed=${user.name}`}
                alt="ava"
                className={styles.avatar}
              />
              {/* INSERT USER_ID */}
              <span className={styles.nick}>{user.name}</span>
              {/* ADMIN SHOULD BE FIRST EL IN ARRAY */}
              {index === 0 && (
                <span className={styles.admin}>
                  <img src={crown} className={styles.crown_ic} />
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
      {membersCount > 3 && (
        <button className={styles.showMore} onClick={toggleExpand}>
          {isExpanded ? 'Скрыть' : 'Показать больше'}
        </button>
      )}
    </div>
  );
};

export default ParticipantsBlock;
