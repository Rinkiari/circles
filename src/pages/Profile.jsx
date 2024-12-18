import React from 'react';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

const Profile = () => {
  const [profileInfo, setProfileInfo] = React.useState([]);

  // https://e895c70e3c56e1a7.mokky.dev/user
  // http://localhost:8080/api/users/get?userId=7b976e64-0f0a-4bcb-83ea-11d8d5159b80

  React.useEffect(() => {
    const TOKEN = localStorage.getItem('authToken'); // Замените на ваш токен
    console.log(TOKEN);

    // fetch('http://localhost:8080/api/users/get?userId=7b976e64-0f0a-4bcb-83ea-11d8d5159b80', {
    //   method: 'GET',
    //   mode: 'no-cors',
    //   headers: {
    //     Authorization: `Bearer ${TOKEN}`, // Убедитесь, что заголовок Content-Type установлен, если это необходимо
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((jsonRes) => {
    //     console.log('Response', jsonRes);
    //     setProfileInfo(jsonRes);
    //   })
    //   .catch((error) => {
    //     console.error('Error:', error);
    //   });

    const fetchUserProfile = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/api/users/get?userId=73d8d2f10-ab48-494e-ad25-c015873deea0',
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${TOKEN}`, // Убедитесь, что заголовок Content-Type установлен, если это необходимо
            },
          },
        );

        // Проверка успешности запроса (если сервер возвращает статус 200-299)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonRes = await response.json();
        console.log('Response', jsonRes);
        setProfileInfo(jsonRes);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUserProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header />
      <ProfileBlock value={profileInfo} />
    </>
  );
};

export default Profile;
