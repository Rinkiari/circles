import { useLocation, useNavigate } from 'react-router-dom';
import styles from './EventCard.module.scss';

const EventCard = ({ id, title, image, fullness }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pageClass = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  const handleClick = () => {
    navigate(`/event/${id}`);
  };

  return (
    <div className={`${styles.event_card} ${styles[pageClass]}`} onClick={handleClick}>
      <img src={image} alt="img" className={`${styles.event_image} ${styles[pageClass]}`} />
      <h2>{title}</h2>
      <p>{fullness[0]}</p>
    </div>
  );
};

export default EventCard;
