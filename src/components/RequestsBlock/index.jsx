import React from 'react';
import { useAuth } from '../../context/AuthContext';
import styles from './RequestsBlock.module.scss';

import ProgressLine from '../ProgressLine';

const RequestsBlock = ({ id, eventName }) => {
  const { authData } = useAuth();
  const [isLoading, setIsLoading] = React.useState(false);

  const [response, setResponse] = React.useState(null);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/api/requests/get?eventId=${id}`, {
      Authorization: `Bearer ${authData.access_token}`,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка загрузки заявок ивента`);
        }
        return res.json();
      })
      .then((data) => {
        setResponse(data);
        console.log('response state: ', response);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
      });
  }, []);

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
        {response.map((req) => (
          <div className={styles.user_wrapper} key={req.id}>
            <img src={req.imageUrl} alt="ava" className={styles.user_avatar} />
            <p className={styles.user_name}>{req.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsBlock;
