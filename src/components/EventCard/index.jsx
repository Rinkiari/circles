import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import styles from './EventCard.module.scss';
import crown from '../../assets/crown_icon_big.png';
import def_event_image from '../../assets/default_event.png';

const EventCard = ({ id, organizerId, name, imageUrl, membersCount, maxMembersCount }) => {
  const location = useLocation();

  const navigate = useNavigate();

  const { authData } = useAuth();
  const currentUserId = authData.user_id;
  const isAdmin = currentUserId === organizerId ? true : false;

  // const pageClass = location.pathname === '/' ? 'home' : location.pathname.slice(1);
  const pageClass =
    location.pathname === '/'
      ? 'home'
      : location.pathname === '/myprofile'
      ? 'myprofile'
      : location.pathname.startsWith('/profile')
      ? 'profile'
      : location.pathname.slice(1);

  const handleClick = () => {
    navigate(`/event/${id}`);
  };

  return (
    <div className={`${styles.event_card} ${styles[pageClass]}`} onClick={handleClick}>
      {imageUrl === '' ? (
        <img
          src={def_event_image}
          alt="default img"
          className={`${styles.default_event_image} ${styles[pageClass]}`}
        />
      ) : (
        <img
          src={imageUrl}
          alt="event img"
          className={`${styles.event_image} ${styles[pageClass]}`}
        />
      )}
      {isAdmin && <img src={crown} alt="admin" className={styles.crown_icon} />}
      <h2>{name}</h2>
      <p>{`${membersCount}/${maxMembersCount} ЧЕЛОВЕК`}</p>
    </div>
  );
};

export default EventCard;
