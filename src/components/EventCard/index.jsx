import { useLocation } from 'react-router-dom';
import styles from './EventCard.module.scss';

const EventCard = ({ title, fullness, image }) => {
  const location = useLocation();
  const pageClass = location.pathname === '/' ? 'home' : location.pathname.slice(1);

  return (
    <div className={`${styles.event_card} ${styles[pageClass]}`}>
      <img src={image} alt="img" className={`${styles.event_image} ${styles[pageClass]}`} />
      <h2 className={styles}>{title}</h2>
      <p>{fullness}</p>
    </div>
  );
};

export default EventCard;
