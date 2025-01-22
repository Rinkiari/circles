import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './EventBlock.module.scss';

import ParticipantsBlock from '../ParticipantsBlock';
import { svg_iconsArr } from '../Categories';
import def_event_image from '../../assets/default_event.png';

const EventBlock = ({
  id,
  event_ownerID,
  chatLink,
  imageUrl,
  name,
  description,
  timeAndPlaceInfo,
  maxMembersCount,
  membersCount,
  types,
  members,
  setIsVisibleReq,
}) => {
  const { authData } = useAuth();
  const userId = authData.user_id;
  const eventId = id;
  const navigate = useNavigate();

  const [categoryId, setCategoryId] = React.useState(null); //состояние категорий

  const [requestStatus, setRequestStatus] = React.useState('NO_REQUEST'); // Состояние для статуса заявки
  React.useEffect(() => {
    console.log('requestStatus обновлен:', requestStatus); // Лог для отслеживания изменений состояния
  }, [requestStatus]); // Будет срабатывать каждый раз, когда изменяется requestStatus

  const [isLoading, setIsLoading] = React.useState(false); // Состояние загрузки

  // Проверка статуса заявки
  // Функция для проверки заявок и установки статуса
  const fetchRequestStatus = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/requests/get?eventId=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.access_token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Ошибка получения заявок');
      }

      const data = await response.json(); // Ожидаем массив объектов
      console.log('Ответ сервера:', data);

      // Ищем объект, где userId совпадает с нашим userId
      const userRequest = data.find((request) => request.userId === userId);

      if (userRequest) {
        // Если нашли, устанавливаем статус из объекта
        setRequestStatus(userRequest.status || 'NO_REQUEST');
      } else {
        // Если не нашли, статус по умолчанию
        console.log('Не нашли статус(');

        setRequestStatus('NO_REQUEST');
      }
      console.log('Members:', members);
      const isMember = members.find((obj) => obj.memberId === userId);
      if (isMember) {
        setRequestStatus('ACCEPTED');
      }
    } catch (error) {
      console.error('Ошибка запроса статуса заявок:', error.message);
      setRequestStatus('NO_REQUEST'); // В случае ошибки ставим статус по умолчанию
    }
  };

  // Отправка заявки
  const handleJoin = async () => {
    if (!userId) {
      alert('Для начала авторизируйтесь.');
      navigate('/login');
      return;
    }

    if (membersCount >= maxMembersCount) {
      alert('На данный момент мероприятие заполнено!');
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:8080/api/requests/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.access_token}`,
        },
        body: JSON.stringify({ eventId, userId }),
      });

      if (!response.ok) {
        throw new Error(`Ошибка отправки заявки: ${response.status} ${response.statusText}`);
      }

      await fetchRequestStatus(); // Обновляем статус сразу после отправки
      alert('Заявка подана');
    } catch (error) {
      console.error('Ошибка отправки заявки:', error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Логика нажатия на кнопку в зависимости от статуса
  const handleButtonClick = () => {
    console.log('requestStatus на момент нажатия кнопки:', requestStatus); // Лог перед проверкой
    console.log('Тип данных requestStatus:', typeof requestStatus);

    if (requestStatus === 'NO_REQUEST') {
      console.log('Статус заявки: NO_REQUEST. Отправляем заявку.');
      handleJoin(); // Отправляем заявку
    } else if (requestStatus === 'ACCEPTED') {
      console.log('Статус заявки: ACCEPTED. Перехожу в чат.');
      alert(`Вы приняты! Перейдите в чат: ${chatLink}`);
    } else if (requestStatus === 'REVIEWING') {
      console.log('Статус заявки: REVIEWING. Заявка на рассмотрении.');
      // Ничего не делаем
    } else if (requestStatus === 'REJECTED') {
      console.log('Статус заявки: REJECTED. Заявка отклонена.');
      // Ничего не делаем
    } else {
      console.log('Неизвестный статус заявки:', requestStatus);
    }
  };

  // Текст кнопки в зависимости от статуса заявки
  const getButtonText = () => {
    switch (requestStatus) {
      case 'REVIEWING':
        return 'РАССМОТРЕНИЕ';
      case 'ACCEPTED':
        return 'НАПИСАТЬ';
      case 'REJECTED':
        return 'Заявка отклонена';
      case 'NO_REQUEST':
      default:
        return 'ВЛИТЬСЯ';
    }
  };

  React.useEffect(() => {
    fetchRequestStatus(); // Проверяем статус при загрузке страницы
  }, []);

  return (
    <div className={styles.global_container}>
      <div className={styles.top_container}>
        <h2 className={styles.event_title}>{name}</h2>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.left_side}>
          {imageUrl ? (
            <img src={imageUrl} alt="Event" className={styles.card_img} />
          ) : (
            <img src={def_event_image} alt="Default Event" className={styles.def_card_img} />
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
          {event_ownerID === userId ? (
            <button onClick={() => setIsVisibleReq(true)} className={styles.msg_btn}>
              ЗАЯВКИ
            </button>
          ) : (
            <button onClick={handleButtonClick} className={styles.msg_btn}>
              {getButtonText()}
            </button>
          )}
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
