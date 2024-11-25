import React from 'react';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

const MyProfile = () => {
  const [myProfileInfo, setMyProfileInfo] = React.useState([]);
  console.log(`myProfileInfo logs: ${myProfileInfo}`);

  React.useEffect(() => {
    fetch('https://e895c70e3c56e1a7.mokky.dev/user2')
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
