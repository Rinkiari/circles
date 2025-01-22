import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import styles from './RequestsBlock.module.scss';
import cancel_icon from '../../assets/cancel.png';
import accept_icon from '../../assets/check-mark.png';

import ProgressLine from '../ProgressLine';

const RequestsBlock = ({ setIsVisibleReq, id, eventName }) => {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  const [response, setResponse] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8080/api/requests/get?eventId=${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authData.access_token}`,
      },
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

  const handleAccept = async (request_id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/requests/accept?requestId=${request_id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Ошибка отправки данных.');
      }

      alert('Заявка одобрена!');
      window.location.reload();
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  };

  const handleReject = async (request_id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/requests/reject?requestId=${request_id}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${authData.access_token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        throw new Error('Ошибка отправки данных.');
      }

      alert('Заявка отклонена!');
      window.location.reload();
    } catch (error) {
      alert(`Ошибка: ${error.message}`);
    }
  };

  return (
    <div className={styles.global_cont}>
      <div className={styles.cont_h2}>
        <h2>{eventName} - заявки</h2>
      </div>
      <div className={styles.progressbar}>
        <p onClick={() => setIsVisibleReq(false)} className={styles.text_end}>
          Завершить
        </p>
        <ProgressLine currentStep={3} />
      </div>
      <div className={styles.users_cont}>
        {response.map((req) => (
          <div className={styles.user_wrapper} key={req.id}>
            <div className={styles.avatar_container}>
              <img src={req.imageUrl} alt="ava" className={styles.user_avatar} />
              <div className={styles.overlay}>
                <img
                  onClick={() => handleAccept(req.id)}
                  className={styles.check}
                  src={accept_icon}
                  alt=""
                />
                <img
                  onClick={() => handleReject(req.id)}
                  className={styles.cross}
                  src={cancel_icon}
                  alt=""
                />
              </div>
            </div>
            <p onClick={() => navigate(`/profile/${req.userId}`)} className={styles.user_name}>
              {req.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RequestsBlock;
