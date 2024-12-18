import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EventCard.module.scss';
import crown from '../../assets/crown_icon_big.png';
import def_event_image from '../../assets/default_event.png';

const EventCard = ({ eventId, organizerId, name, imageUrl, membersCount, maxMembersCount }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const currentUserId = '3d8d2f10-ab48-494e-ad25-c015873deea0'; // ВШИТО
  const isAdmin = currentUserId === organizerId ? true : false;

  const pageClass = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  const handleClick = () => {
    navigate(`/event/${eventId}`);
  };

  return (
    <div className={`${styles.event_card} ${styles[pageClass]}`} onClick={handleClick}>
      {imageUrl === '' ? (
        <img
          src={def_event_image}
          alt="defaul img"
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
