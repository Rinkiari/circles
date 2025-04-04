import React from 'react';

import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './FillMyProfBlock.module.scss';
import art from './assets/tvorchestvo.png';
import sport from './assets/sport.png';
import show from './assets/show.png';
import nature from './assets/priroda.png';
import games from './assets/igri.png';
import kino from './assets/kino.png';
import board_games from './assets/nastol_igri.png';
import communication from './assets/obshenie.png';

import ProgressLine from '../ProgressLine';

const FillMyProfileBlock = () => {
  const { authData } = useAuth();
  const categoriesArr = [
    'ТВОРЧЕСТВО',
    'СПОРТ',
    'ШОУ',
    'ПРИРОДА',
    'ИГРЫ',
    'КИНО',
    'НАСТОЛЬНЫЕ ИГРЫ',
    'ОБЩЕНИЕ',
  ];

  const [activeCategories, setActiveCategories] = React.useState(new Set());
  console.log('active categories', activeCategories);

  const iconsArr = [art, sport, show, nature, games, kino, board_games, communication];
  const stringIconsArr = [
    'art',
    'sport',
    'show',
    'nature',
    'games',
    'kino',
    'board_games',
    'communication',
  ];

  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [formValues, setFormValues] = React.useState({
    name: '',
    surname: '',
    city: '',
    imageUrl: '',
    dateOfBirth: '',
    role: 0,
    gender: '',
    interestsNames: [],
    bio: '',
  });

  // mассив для генерации placeholder'ов
  const infoArr = [
    { label: 'Имя', key: 'name', type: 'text' },
    { label: 'Фамилия', key: 'surname', type: 'text' },
    { label: 'Пол', key: 'gender', type: 'select', options: ['Мужской', 'Женский'] },
    { label: 'День рождения: год-месяц-день', key: 'dateOfBirth', type: 'text' },
    { label: 'Город', key: 'city', type: 'text' },
  ];

  const handleInputChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: key === 'gender' ? Number(value) : value, // Конвертируем gender в число
    }));
  };

  const handleCategoryClick = (category) => {
    setFormValues((prevValues) => {
      const updatedInterests = new Set(prevValues.interestsNames);
      updatedInterests.has(category)
        ? updatedInterests.delete(category)
        : updatedInterests.add(category);

      setActiveCategories(updatedInterests);

      return {
        ...prevValues,
        interestsNames: [...updatedInterests], // преобразование Set обратно в массив
      };
    });
  };

  const handleNextStep = async () => {
    // eslint-disable-next-line no-unused-vars
    let fieldsToCheck = [];

    // if (step === 1) {
    //   fieldsToCheck = ['name', 'surname', 'gender', 'date_of_birth', 'city'];
    // } else if (step === 2) {
    //   fieldsToCheck = ['about'];
    // }

    // const isFormValid = fieldsToCheck.every((field) => formValues[field].trim() !== '');

    // if (!isFormValid) {
    //   alert('Пожалуйста, заполните все поля перед продолжением!');
    //   return;
    // }

    if (step === 3) {
      try {
        // отправка данных на сервер
        const response = await fetch(
          `http://localhost:8080/api/users/update?userId=${authData.user_id}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${authData.access_token}`,
            },
            body: JSON.stringify(formValues),
          },
        );

        if (!response.ok) {
          throw new Error('Ошибка отправки данных.');
        }

        alert('Данные успешно отправлены!');
        navigate('/myprofile');
      } catch (error) {
        alert(`Ошибка: ${error.message}`);
      }
    } else {
      setStep((prev) => Math.min(3, prev + 1));
    }
  };

  React.useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/get?userId=${authData.user_id}`,
          {
            headers: {
              Authorization: `Bearer ${authData.access_token}`,
            },
          },
        );

        if (response.ok) {
          const data = await response.json();
          setFormValues({
            name: data.name || '',
            surname: data.surname || '',
            city: data.city || '',
            imageUrl: data.imageUrl || '',
            dateOfBirth: data.dateOfBirth || '',
            gender:
              data.gender === 'Neutral'
                ? ''
                : data.gender === 'Male'
                ? 0
                : data.gender === 'Female'
                ? 1
                : '',
            interestsNames: data.interestNames || [],
            bio: data.bio || '',
          });
          setActiveCategories(new Set(data.interestNames || []));
        } else {
          throw new Error('Заполните данные...');
        }
      } catch (error) {
        alert(`Заполняйте: ${error.message}`);
      }
    };

    fetchUserData();
  }, [authData]);

  return (
    <div className={styles.main_container}>
      <div className={styles.top_inner_cont}>
        <h2>
          {step === 1 && 'ОБЩАЯ ИНФОРМАЦИЯ'}
          {step === 2 && 'О СЕБЕ'}
          {step === 3 && 'ВАШИ ИНТЕРЕСЫ'}
        </h2>
        <p onClick={handleNextStep}>{step === 3 ? 'Завершить' : 'Далее'}</p>
      </div>
      <ProgressLine currentStep={step} />
      <div className={styles.bottom_inner_cont}>
        {(step === 1 || step === 2) && (
          <div className={styles.general_info_box}>
            <form>
              {step === 1 &&
                infoArr.map(({ label, key, type, options }) => {
                  if (type === 'select') {
                    // Рендер для выпадающего списка
                    return (
                      <select
                        key={key}
                        className={styles.inputek}
                        value={formValues[key] !== undefined ? formValues[key] : ''} // убеждаемся, что значение задано
                        onChange={(e) => handleInputChange(key, e.target.value)}>
                        <option value="" disabled>
                          {label} {/* show текст как "Пол" */}
                        </option>
                        <option value={0}>Мужской</option>
                        <option value={1}>Женский</option>
                      </select>
                    );
                  }
                  // Рендер для обычного input
                  return (
                    <input
                      required
                      className={styles.inputek}
                      key={key}
                      placeholder={label}
                      value={formValues[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  );
                })}
              {step === 2 && (
                <>
                  <h4>Черканите пару строк о своей многосторонней личности!</h4>
                  <textarea
                    required
                    className={styles.textarea}
                    placeholder="Расскажите о себе"
                    value={formValues.bio || ''}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                  />
                </>
              )}
            </form>
          </div>
        )}
        {step === 3 && (
          <div className={styles.main_cont}>
            {categoriesArr.map((el, i) => (
              <div key={i} className={styles.el_wrapper}>
                <button
                  className={`${styles.knopka} ${styles[stringIconsArr[i]]} ${
                    activeCategories.has(el) ? styles.active : ''
                  }`}
                  onClick={() => handleCategoryClick(el)}>
                  <img src={iconsArr[i]} alt="icon" />
                </button>
                <p>{el}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FillMyProfileBlock;
