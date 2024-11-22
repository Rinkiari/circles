import React from 'react';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

const MyProfile = () => {
  const [usEvents, setUsEvents] = React.useState([]);

  React.useEffect(() => {
    fetch('https://e895c70e3c56e1a7.mokky.dev/userevents')
      .then((res) => res.json())
      .then((jsonRes) => {
        setUsEvents(jsonRes);
      });
  }, []);

  return (
    <>
      <Header />
      <ProfileBlock value={usEvents} />
    </>
  );
};

export default MyProfile;
