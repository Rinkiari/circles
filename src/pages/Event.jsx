import React from 'react';
import { useParams } from 'react-router-dom';
import EventBlock from '../components/EventBlock';
import Header from '../components/Header';
import RequestsBlock from '../components/RequestsBlock';

const Event = () => {
  const { id } = useParams(); // получаем id из URL
  const [eventData, setEventData] = React.useState(null);
  const [isVisibleReq, setIsVisibleReq] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    fetch(`https://e895c70e3c56e1a7.mokky.dev/events/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка загрузки мероприятия с id ${id}`);
        }
        return res.json();
      })
      .then((data) => {
        setEventData(data);
        console.log(eventData);

        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { reqUsers } = eventData;

  return (
    <>
      <Header />
      {!isVisibleReq && (
        <EventBlock
          image={eventData.image}
          title={eventData.title}
          description={eventData.description}
          fullness={eventData.fullness}
          categories={eventData.categories}
        />
      )}
      {isVisibleReq && <RequestsBlock reqUsers={reqUsers} />}
    </>
  );
};

export default Event;
