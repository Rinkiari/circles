import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FillMyProfBlock.module.scss';

import ProgressLine from '../ProgressLine';

const FillMyProfileBlock = () => {
  const navigate = useNavigate();
  const [step, setStep] = React.useState(1);
  const [formValues, setFormValues] = React.useState({
    name: '',
    surname: '',
    gender: '',
    date_of_birth: '',
    city: '',
    about: '',
  });

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
      </div>
    </div>
  );
};

export default FillMyProfileBlock;
