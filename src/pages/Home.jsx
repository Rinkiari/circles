import React from 'react';
import '../scss/app.scss';

import Header from '../components/Header';
import Categories from '../components/Categories';
import EventCard from '../components/EventCard';

const Home = () => {
  const [categoryId, setCategoryId] = React.useState(0); //состояние категорий
  const [events, setEvent] = React.useState([]);

  React.useEffect(() => {
    fetch('https://e895c70e3c56e1a7.mokky.dev/events')
      .then((res) => res.json())
      .then((jsonRes) => {
        setEvent(jsonRes);
      });
  }, []);

  return (
    <>
      <Header />
      <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />
      <div className="event_container">
        {events.map((obj) => (
          <EventCard key={obj.id} {...obj} />
        ))}
      </div>
    </>
  );
};

export default Home;
