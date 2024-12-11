import { useState } from 'react';

import LogOnBlock from '../components/LogOnBlock';
import { useNavigate } from 'react-router-dom';

const LogReg = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState(''); // message об ошибке или успехе
  const [success, setSuccess] = useState(false);

  const handleSubmitReg = async ({ login, email, password }) => {
    // event.preventDefault();
    try {
      const response = await fetch('https://e895c70e3c56e1a7.mokky.dev/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, email, password }),
      });

      if (response.ok) {
        const dataFromReg = await response.json();
        setMessage('Регистрация успешна!');
        alert('Регистрация успешна!');
        console.log(message);
        console.log('Ur data: ', dataFromReg);
        setSuccess(true);
      } else if (response.status === 400) {
        setMessage('Ошибка регистрации. Проверьте введённые данные.');
      } else {
        setMessage('Ошибка регистрации.');
      }
    } catch (error) {
      setMessage('Сетевая ошибка.');
      console.error('Ошибка:', error);
    }
  };

  const handleSubmitLog = async ({ login, password }) => {
    // event.preventDefault(); // off перезагрузку страницы

    try {
      const response = await fetch('https://e895c70e3c56e1a7.mokky.dev/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ login, password }),
      });

      if (response.ok) {
        const dataFromLog = await response.json();
        localStorage.setItem('authToken', dataFromLog.token); // save токен
        setMessage('Успешный вход!'); // cообщаем об успехе
        alert('Успешный вход в аккаунт!');
        setSuccess(true);
        navigate('/myprofile');
        console.log('User data:', dataFromLog.data); // for отладкa
      } else if (response.status === 404) {
        setMessage('Пользователь не найден.');
      } else if (response.status === 403) {
        setMessage('Доступ запрещён.');
      } else {
        setMessage('Ошибка авторизации.');
      }
    } catch (error) {
      setMessage('Сетевая ошибка.');
      console.error('Ошибка:', error);
    }

    alert(message);
  };

  return <LogOnBlock handleSubmitReg={handleSubmitReg} handleSubmitLog={handleSubmitLog} />;
};

export default LogReg;
