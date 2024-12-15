import React from 'react';
import styles from './RequestsBlock.module.scss';

const RequestsBlock = ({ reqUsers }) => {
  return (
    <div className={styles.global_cont}>
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
