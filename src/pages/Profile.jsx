import React from 'react';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

const Profile = () => {
  const [profileInfo, setProfileInfo] = React.useState([]);

  React.useEffect(() => {
    fetch('https://e895c70e3c56e1a7.mokky.dev/user')
      .then((res) => res.json())
      .then((jsonRes) => {
        setProfileInfo(jsonRes);
      });
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
