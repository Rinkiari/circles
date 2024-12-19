import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './EventBlock.module.scss';

import ParticipantsBlock from '../ParticipantsBlock';
import { svg_iconsArr } from '../Categories';
import def_event_image from '../../assets/default_event.png';

const EventBlock = ({
  id,
  event_ownerID,
  imageUrl,
  name,
  description,
  timeAndPlaceInfo,
  maxMembersCount,
  membersCount,
  types,
  members,
}) => {
  const { authData } = useAuth();
  const [isVlilsya, setIsVlilsya] = React.useState(false);

  React.useEffect(() => {
    const newIsVlilsya = members.some((obj) => obj.memberId === authData.user_id);

    // Обновляем состояние только если оно изменилось
    if (isVlilsya !== newIsVlilsya) {
      setIsVlilsya(newIsVlilsya);
    }
  }, [members, authData.user_id, isVlilsya]);

  const userId = authData.user_id;
  const eventId = id;

  const dataXd = {
    userId,
    eventId,
  };
  const [categoryId, setCategoryId] = React.useState(null); //состояние категорий
  const handleJoin = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/usersevents/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.access_token}`,
        },
        body: JSON.stringify(dataXd), // Преобразуем объект в JSON
      });

      if (!response.ok) {
        // Если статус ответа не в диапазоне 2xx
        throw new Error(`Ошибка загрузки мероприятия: ${response.status} ${response.statusText}`);
      }

      const data = await response.json(); // Разбираем тело ответа
      console.log('Успешный ответ:', data);
    } catch (error) {
      console.error('Ошибка запроса:', error.message);
    }
  };

  console.log('isVlilsya do', isVlilsya);

  console.log('isVlilsya posle', isVlilsya);

  return (
    <div className={styles.global_container}>
      <div className={styles.top_container}>
        <h2 className={styles.event_title}>{name}</h2>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.left_side}>
          {imageUrl === '' ? (
            <img src={def_event_image} alt="default Event" className={styles.def_card_img} />
          ) : (
            <img src={imageUrl} alt="Event" className={styles.card_img} />
          )}

          <ul>
            {types.map((type) => (
              <button
                key={type.id}
                className={`${styles.knopochka} ${categoryId === type.id ? styles.active : ''}`}
                onClick={() => setCategoryId(type.id)}>
                <img src={svg_iconsArr[type.id]} alt="icon" className={styles.icon} />
                {type.name}
              </button>
            ))}
          </ul>
          <div className={styles.description_container}>
            <h3>Описание</h3>
            <p>{description}</p>
          </div>
          <div className={styles.timeandplace_container}>
            <h3>Мы собираемся</h3>
            <p>{timeAndPlaceInfo}</p>
          </div>
        </div>
        <div className={styles.right_side}>
          <button onClick={() => handleJoin()} className={styles.msg_btn}>
            {isVlilsya && 'НАПИСАТЬ'}
            {!isVlilsya && 'ВЛИТЬСЯ'}
          </button>
          <ParticipantsBlock
            event_ownerID={event_ownerID}
            members={members}
            maxMembersCount={maxMembersCount}
            membersCount={membersCount}
          />
        </div>
      </div>
    </div>
  );
};

export default EventBlock;
