import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ClipLoader } from 'react-spinners';
import { useParams } from 'react-router-dom';
import EventBlock from '../components/EventBlock';
import Header from '../components/Header';
import RequestsBlock from '../components/RequestsBlock';

const Event = ({ searchValue, setSearchValue }) => {
  const { id } = useParams(); // получаем id из URL
  const { authData } = useAuth();

  const [eventData, setEventData] = React.useState(null);
  const [isVisibleReq, setIsVisibleReq] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // url for test
  // https://e895c70e3c56e1a7.mokky.dev/events

  // orig url fetch

  React.useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:8080/api/events/getById?eventId=${id}`, {
      Authorization: `Bearer ${authData.access_token}`,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Ошибка загрузки мероприятия`);
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
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}>
        <ClipLoader color="#FA8072" size={53} />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const { reqUsers } = eventData;

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      {!isVisibleReq && (
        <EventBlock
          id={id}
          event_ownerID={eventData.organizerId}
          timeAndPlaceInfo={eventData.timeAndPlaceInfo}
          chatLink={eventData.chatLink}
          imageUrl={eventData.imageUrl}
          name={eventData.name}
          description={eventData.description}
          types={eventData.types}
          members={eventData.members}
          maxMembersCount={eventData.maxMembersCount}
          membersCount={eventData.membersCount}
          setIsVisibleReq={setIsVisibleReq}
        />
      )}
      {isVisibleReq && <RequestsBlock eventName={eventData.name} reqUsers={reqUsers} />}
    </>
  );
};

export default Event;
