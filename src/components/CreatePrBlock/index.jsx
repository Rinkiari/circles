import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './CreatePrBlock.module.scss';

import ProgressLine from '../ProgressLine';

import photo_camera from '../../assets/photo_camera_icon.png';
import art from '../FillMyProfBlock/assets/tvorchestvo.png';
import sport from '../FillMyProfBlock/assets/sport.png';
import show from '../FillMyProfBlock/assets/show.png';
import nature from '../FillMyProfBlock/assets/priroda.png';
import games from '../FillMyProfBlock/assets/igri.png';
import kino from '../FillMyProfBlock/assets/kino.png';
import board_games from '../FillMyProfBlock/assets/nastol_igri.png';
import communication from '../FillMyProfBlock/assets/obshenie.png';

const CreatePrBlock = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);

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

  const [formValues, setFormValues] = React.useState({
    title: '',
    number_of_people: null,
    chat_link: '',
    event_img: '',
    place_and_time: '',
    about: '',
    tags: [],
  });
  console.log('Data:', formValues);

  // mассив для генерации placeholder'ов
  const infoArr = [
    { label: 'Название', key: 'title' },
    { label: 'Количество человек', key: 'number_of_people' },
    { label: 'Ссылка на чат', key: 'chat_link' },
  ];

  const handleInputChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormValues((prev) => ({
          ...prev,
          event_img: e.target.result, // cохраняем изображение как Data URL
        }));
        console.log('Event img: ', formValues.event_img);
        console.log('E target result: ', e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryClick = (category) => {
    setFormValues((prevValues) => {
      const updatedTags = new Set(prevValues.tags);
      updatedTags.has(category) ? updatedTags.delete(category) : updatedTags.add(category);

      setActiveCategories(updatedTags);

      return {
        ...prevValues,
        tags: [...updatedTags], // преобразование Set обратно в массив
      };
    });
  };

  const handleNextStep = async () => {
    let fieldsToCheck = [];

    if (step === 1) {
      fieldsToCheck = ['title', 'number_of_people', 'chat_link'];
    } else if (step === 2) {
      // fieldsToCheck = ['place_and_time', 'about'];
    }

    const isFormValid = fieldsToCheck.every((field) => formValues[field].trim() !== '');

    if (!isFormValid) {
      alert('Пожалуйста, заполните все поля перед продолжением!');
      return;
    }

    if (step === 3) {
      try {
        // отправка данных на сервер
        const response = await fetch('https://e895c70e3c56e1a7.mokky.dev/pjformtest', {
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
          {step === 2 && 'ОПИСАНИЕ'}
          {step === 3 && 'ВЫБЕРИТЕ ТЕГИ'}
        </h2>
        <p onClick={handleNextStep}>{step === 3 ? 'Завершить' : 'Далее'}</p>
      </div>
      <ProgressLine currentStep={step} />
      <div className={styles.bottom_inner_cont}>
        {(step === 1 || step === 2) && (
          <div className={styles.general_info_box}>
            <form>
              {step === 1 && (
                <>
                  {infoArr.map(({ label, key }) => (
                    <input
                      required
                      className={styles.inputek}
                      key={key}
                      placeholder={label}
                      value={formValues[key] || ''}
                      onChange={(e) => handleInputChange(key, e.target.value)}
                    />
                  ))}
                  <div className={styles.file_upload_cont}>
                    <input
                      type="file"
                      id="fileInput"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="fileInput">
                      {formValues.event_img ? (
                        <img
                          src={formValues.event_img}
                          alt="Preview"
                          className={styles.uploaded_icon}
                        />
                      ) : (
                        <img src={photo_camera} alt="Upload Icon" className={styles.preview_icon} />
                      )}
                    </label>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <input
                    required
                    className={styles.inputek}
                    placeholder="Время и место"
                    value={formValues.place_and_time || ''}
                    onChange={(e) => handleInputChange('place_and_time', e.target.value)}
                  />
                  <div className={styles.about_textarea}>
                    <h4>Черканите пару строк о своём уникальном сёркле!</h4>
                    <textarea
                      required
                      className={styles.textarea}
                      value={formValues.about || ''}
                      onChange={(e) => handleInputChange('about', e.target.value)}
                    />
                  </div>
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

export default CreatePrBlock;
