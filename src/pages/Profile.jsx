import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

const Profile = () => {
  const { authData } = useAuth();
  const { id } = useParams();
  console.log('id from params', id);

  const [profileInfo, setProfileInfo] = React.useState([]);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/get?userId=${id}`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
          },
        });

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
  }, [authData, id]);

  return (
    <>
      <Header />
      <ProfileBlock value={profileInfo} />
    </>
  );
};

export default Profile;
