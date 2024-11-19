import styles from './EventCard.module.scss';

const EventCard = ({ title, fullness, image }) => {
  return (
    <div className={styles.event_card}>
      <img src={image} alt="img" className={styles.event_image} />
      <h2 className={styles}>{title}</h2>
      <p>{fullness}</p>
    </div>
  );
};

export default EventCard;
