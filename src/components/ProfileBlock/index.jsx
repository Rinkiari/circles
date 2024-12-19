import React from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import EventCard from '../EventCard';

import styles from './ProfileBlock.module.scss';
import settings from '../../assets/settings_icon.png';
import default_user_avatar from '../../assets/user.png';

const ProfileBlock = ({ value }) => {
  const fileInputRef = React.useRef(null);

  const handleOverlayClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Получаем выбранный файл

    if (!file) {
      alert('Файл не выбран.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение.');
      return;
    }

    // Формируем данные для отправки
    const formData = new FormData();
    formData.append('image', file); // Ключ 'image' должен совпадать с тем, что ожидает сервер

    try {
      const response = await fetch('https://your-backend.com/upload', {
        method: 'POST',
        body: formData, // Передаём FormData
      });

      if (response.ok) {
        const data = await response.json();
        alert('Изображение успешно загружено!');
        console.log('Ответ сервера:', data);
      } else {
        alert('Ошибка при загрузке изображения.');
        console.error('Ошибка загрузки. Код ответа:', response.status);
      }
    } catch (error) {
      console.error('Сетевая ошибка при загрузке:', error);
      alert('Ошибка сети при отправке изображения.');
    }
  };

  const handleFileChange64 = async (event) => {
    const file = event.target.files[0]; // Получаем выбранный файл

    if (!file) {
      alert('Файл не выбран.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert('Пожалуйста, выберите изображение.');
      return;
    }

    // Преобразуем файл в Base64
    const reader = new FileReader();
    reader.onload = async () => {
      const base64Image = reader.result; // Здесь содержится Base64 строка

      try {
        // Отправляем Base64 строку на сервер
        const response = await fetch('https://your-backend.com/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', // Указываем JSON формат
          },
          body: JSON.stringify({ image: base64Image }), // Передаём изображение в JSON
        });

        if (response.ok) {
          const data = await response.json();
          alert('Изображение успешно загружено!');
          console.log('Ответ сервера:', data);
        } else {
          alert('Ошибка при загрузке изображения.');
          console.error('Ошибка загрузки. Код ответа:', response.status);
        }
      } catch (error) {
        console.error('Сетевая ошибка при загрузке:', error);
        alert('Ошибка сети при отправке изображения.');
      }
    };

    reader.onerror = () => {
      alert('Ошибка при чтении файла.');
      console.error('Ошибка при преобразовании файла в Base64.');
    };

    reader.readAsDataURL(file); // Читаем файл как Data URL (Base64)
  };

  const [isExpanded, setIsExpanded] = React.useState(false);

  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/fillmyprofile');
  };

  const location = useLocation().pathname;

  const pageClass =
    location === '/myprofile'
      ? 'myprofile'
      : location.startsWith('/profile')
      ? 'profile'
      : location.slice(1);

  console.log('location: ', location);
  console.log('pageClass: ', pageClass);

  if (!value || value.length === 0) {
    return <p>Нет данных для отображения.</p>;
  }

  const { id, name, surname, imageUrl, dateOfBirth, city, bio, usersEvents } = value;

  return (
    <div className={styles.global_container}>
      <div className={styles.profile_container}>
        <div className={styles.top_innerContainer}>
          <h3>{`${name} ${surname}`}</h3>
          {isExpanded === false && (
            <>
              <button
                className={`${styles.edit_button} ${styles[pageClass]}`}
                onClick={handleButtonClick}>
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
              {imageUrl === '' ? (
                <img className={styles.avatar_default} src={default_user_avatar} alt="ava" />
              ) : (
                <img className={styles.avatar_frombknd} src={imageUrl} alt="ava" />
              )}
              {location === '/myprofile' ? (
                <div onClick={handleOverlayClick} className={styles.overlay}>
                  <div className={styles.overlay_text}>изменить фото</div>
                  <input
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                  />
                </div>
              ) : (
                ''
              )}
            </div>
            {location.startsWith('/profile') && (
              <div className={`${styles.right_side_container} ${styles[pageClass]}`}>
                <div className={styles.birth_container}>
                  <h4>День рождения</h4>
                  <p>{dateOfBirth}</p>
                </div>
                <div className={styles.birth_container}>
                  <h4>Город</h4>
                  <p>{city}</p>
                </div>
                <div className={styles.about_container}>
                  <h4>Обо мне</h4>
                  <p>{bio}</p>
                </div>
              </div>
            )}
            {location === '/myprofile' && (
              <div className={`${styles.right_side_container} ${styles[pageClass]}`}>
                <Link to="/createproject">
                  <button className={styles.btn}>НОВЫЙ ПРОЕКТ</button>
                </Link>
                <div>
                  <h4>День рождения и город</h4>
                  <p>
                    {dateOfBirth}, {city}
                  </p>
                </div>
                <div className={styles.about_container}>
                  <h4>Обо мне</h4>
                  <p>{bio}</p>
                </div>
              </div>
            )}
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
            {usersEvents &&
              usersEvents.slice(0, 3).map((obj) => <EventCard key={obj.id} {...obj} />)}
          </div>
        </div>
      )}
      {isExpanded === true && (
        <div className={styles.expanded_grid_container}>
          {usersEvents && usersEvents.map((obj) => <EventCard key={obj.id} {...obj} />)}
        </div>
      )}
    </div>
  );
};

export default ProfileBlock;
