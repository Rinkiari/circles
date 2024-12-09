import React from 'react';
import { useNavigate } from 'react-router-dom';
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
    gender: '',
    date_of_birth: '',
    city: '',
    about: '',
    interests: [],
  });
  console.log('Data:', formValues);

  // mассив для генерации placeholder'ов
  const infoArr = [
    { label: 'Имя', key: 'name' },
    { label: 'Фамилия', key: 'surname' },
    { label: 'Пол', key: 'gender' },
    { label: 'День рождения', key: 'date_of_birth' },
    { label: 'Город', key: 'city' },
  ];

  const handleInputChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleCategoryClick = (category) => {
    setFormValues((prevValues) => {
      const updatedInterests = new Set(prevValues.interests);
      updatedInterests.has(category)
        ? updatedInterests.delete(category)
        : updatedInterests.add(category);

      setActiveCategories(updatedInterests);

      return {
        ...prevValues,
        interests: [...updatedInterests], // преобразование Set обратно в массив
      };
    });
  };

  const handleNextStep = async () => {
    let fieldsToCheck = [];

    if (step === 1) {
      fieldsToCheck = ['name', 'surname', 'gender', 'date_of_birth', 'city'];
    } else if (step === 2) {
      fieldsToCheck = ['about'];
    }

    const isFormValid = fieldsToCheck.every((field) => formValues[field].trim() !== '');

    if (!isFormValid) {
      alert('Пожалуйста, заполните все поля перед продолжением!');
      return;
    }

    if (step === 3) {
      try {
        // отправка данных на сервер
        const response = await fetch('https://e895c70e3c56e1a7.mokky.dev/formtest', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formValues),
        });

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
                infoArr.map(({ label, key }) => (
                  <input
                    required
                    className={styles.inputek}
                    key={key}
                    placeholder={label}
                    value={formValues[key] || ''}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                  />
                ))}
              {step === 2 && (
                <>
                  <h4>Черканите пару строк о своей многосторонней личности!</h4>
                  <textarea
                    required
                    className={styles.textarea}
                    placeholder="Расскажите о себе"
                    value={formValues.about || ''}
                    onChange={(e) => handleInputChange('about', e.target.value)}
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