import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';

import Header from '../components/Header';
import ProfileBlock from '../components/ProfileBlock';

import backIcon from '../components/LogOnBlock/back.png';

const Profile = ({ searchValue, setSearchValue }) => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  console.log('id from params', id);

  const [profileInfo, setProfileInfo] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
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
      } catch (err) {
        console.error('Error:', error);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authData, id]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <ClipLoader color="#FA8072" size={53} />
      </div>
    );
  }
  if (error)
    return (
      <>
        <Link to="/">
          <img
            src={backIcon}
            alt="back"
            style={{
              position: 'absolute',
              top: '22px',
              left: '12px',
              width: '64px',
              cursor: 'pointer',
            }}
          />
        </Link>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}>
          <p>Ошибка: {error}</p>
        </div>
      </>
    );

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <ProfileBlock value={profileInfo} />
    </>
  );
};

export default Profile;
