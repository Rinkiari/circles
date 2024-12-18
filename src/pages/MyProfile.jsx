import React from 'react';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

const MyProfile = () => {
  const [myProfileInfo, setMyProfileInfo] = React.useState([]);
  console.log(`myProfileInfo logs: ${myProfileInfo}`);
  const TOKEN = localStorage.getItem('authToken');

  React.useEffect(() => {
    fetch('http://localhost:8080/api/users/get?userId=3d8d2f10-ab48-494e-ad25-c015873deea0', {
      headers: {
        Authorization: `Bearer ${TOKEN}`, // Убедитесь, что заголовок Content-Type установлен, если это необходимо
      },
    })
      .then((res) => res.json())
      .then((jsonRes) => {
        setMyProfileInfo(jsonRes);
      });
  }, []);

  return (
    <>
      <Header />
      <ProfileBlock value={myProfileInfo} />
    </>
  );
};

export default MyProfile;
