import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

import LogOnBlock from '../components/LogOnBlock';
import { useNavigate } from 'react-router-dom';

const LogReg = () => {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const { saveAuthData, authData } = useAuth();

  const role = 0;

  const handleSubmitReg = async ({ login, email, password }) => {
    // event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, email, password, role }),
      });

      if (response.ok) {
        const dataFromReg = await response.json();
        saveAuthData(dataFromReg);
        console.log('Data from registration in state authData: ', authData);
        alert('Регистрация успешна!');
        setSuccess(true);
        navigate('/fillmyprofile');
      } else if (response.status === 400) {
        alert('Ошибка регистрации. Проверьте введённые данные.');
      } else {
        alert('Ошибка регистрации.');
      }
    } catch (error) {
      console.error('Ошибка: ', error);
    }
  };

  const handleSubmitLog = async ({ email, password }) => {
    // event.preventDefault(); // off перезагрузку страницы

    try {
      const response = await fetch('http://localhost:8080/api/auth/authenticate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const dataFromLog = await response.json();
        saveAuthData(dataFromLog);
        console.log('Data from login in state authData: ', authData);
        alert('Успешный вход в аккаунт!');
        setSuccess(true);
        navigate('/myprofile');
      } else if (response.status === 404) {
        alert('Пользователь не найден.');
      } else if (response.status === 403) {
        alert('Доступ запрещён.');
      } else {
        alert('Ошибка авторизации.');
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  };

  return <LogOnBlock handleSubmitReg={handleSubmitReg} handleSubmitLog={handleSubmitLog} />;
};

export default LogReg;
