import React from 'react';
import { useAuth } from '../context/AuthContext';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

const MyProfile = ({ searchValue, setSearchValue }) => {
  const { authData } = useAuth();
  const [myProfileInfo, setMyProfileInfo] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/users/get?userId=${authData.user_id}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${authData.access_token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        const jsonRes = await response.json();
        console.log('jsonRES: ', jsonRes);

        setMyProfileInfo(jsonRes);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileInfo();
  }, [authData]);

  // if (isLoading) return <div>Загрузка...</div>;
  // if (error) return <div>Ошибка: {error}</div>;

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <ProfileBlock value={myProfileInfo} />
    </>
  );
};

export default MyProfile;
