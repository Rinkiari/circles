import React from 'react';
import styles from './RequestsBlock.module.scss';

import ProgressLine from '../ProgressLine';

const RequestsBlock = ({ eventName, reqUsers }) => {
  return (
    <div className={styles.global_cont}>
      <div className={styles.cont_h2}>
        <h2>{eventName} - заявки</h2>
      </div>
      <div className={styles.progressbar}>
        <p className={styles.text_end}>Завершить</p>
        <ProgressLine currentStep={3} />
      </div>
      <div className={styles.users_cont}>
        {reqUsers.map((us) => (
          <div className={styles.user_wrapper} key={us.id}>
            <img src={us.avatar} alt="ava" className={styles.user_avatar} />
            <p className={styles.user_name}>{us.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsBlock;
