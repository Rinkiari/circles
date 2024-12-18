import React from 'react';
import styles from './EventBlock.module.scss';

import ParticipantsBlock from '../ParticipantsBlock';
import { svg_iconsArr } from '../Categories';
import def_event_image from '../../assets/default_event.png';

const EventBlock = ({
  imageUrl,
  name,
  description,
  timeAndPlaceInfo,
  maxMembersCount,
  membersCount,
  types,
  members,
}) => {
  const [categoryId, setCategoryId] = React.useState(null); //состояние категорий

  return (
    <div className={styles.global_container}>
      <div className={styles.top_container}>
        <h2 className={styles.event_title}>{name}</h2>
      </div>
      <div className={styles.bottom_container}>
        <div className={styles.left_side}>
          {imageUrl === '' ? (
            <img src={def_event_image} alt="default Event" className={styles.def_card_img} />
          ) : (
            <img src={imageUrl} alt="Event" className={styles.card_img} />
          )}

          <ul>
            {types.map((type) => (
              <button
                key={type.id}
                className={`${styles.knopochka} ${categoryId === type.id ? styles.active : ''}`}
                onClick={() => setCategoryId(type.id)}>
                <img src={svg_iconsArr[type.id]} alt="icon" className={styles.icon} />
                {type.name}
              </button>
            ))}
          </ul>
          <div className={styles.description_container}>
            <h3>Описание</h3>
            <p>{description}</p>
          </div>
          <div className={styles.timeandplace_container}>
            <h3>Мы собираемся</h3>
            <p>{timeAndPlaceInfo}</p>
          </div>
        </div>
        <div className={styles.right_side}>
          <button className={styles.msg_btn}>НАПИСАТЬ</button>
          <ParticipantsBlock
            members={members}
            maxMembersCount={maxMembersCount}
            membersCount={membersCount}
          />
        </div>
      </div>
    </div>
  );
};

export default EventBlock;
