import React from 'react';
import { useAuth } from '../context/AuthContext';
import '../scss/app.scss';

import Header from '../components/Header';
import Categories from '../components/Categories';
import EventCard from '../components/EventCard';

const Home = () => {
  const { authData } = useAuth();

  const categoriesArr = [
    'ТВОРЧЕСТВО',
    'СПОРТ',
    'ШОУ',
    'ПРИРОДА',
    'ИГРЫ',
    'КИНО',
    '',
    'НАСТОЛЬНЫЕ ИГРЫ',
    'ОБЩЕНИЕ',
  ];

  const [selectedCategories, setSelectedCategories] = React.useState([]); //состояние категорий
  const [events, setEvents] = React.useState([]);

  const handleToggleCategory = (categoryIndex) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryIndex)
          ? prev.filter((id) => id !== categoryIndex) // убираем категорию, если она уже выбрана
          : [...prev, categoryIndex], // добавляем категорию, если она не выбрана
    );
  };
  console.log(selectedCategories);

  const selectedCategoryNames = selectedCategories.map((index) => categoriesArr[index]);
  console.log('names', selectedCategoryNames);

  // https://e895c70e3c56e1a7.mokky.dev/events?categories=
  // https://e895c70e3c56e1a7.mokky.dev/events

  // http://localhost:8080/api/events/all

  console.log('names: ', selectedCategoryNames);

  const smth = {
    typesNames: selectedCategoryNames,
  };

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response =
          selectedCategories.length === 0
            ? await fetch('http://localhost:8080/api/events/all', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
              })
            : await fetch('http://localhost:8080/api/events/all/types', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${authData.access_token}`,
                },
                body: JSON.stringify(smth),
              });
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  return (
    <>
      <Header />
      <Categories
        categoriesArr={categoriesArr}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />
      <div className="event_container">
        {events.map((obj) => (
          <EventCard
            key={obj.id}
            id={obj.id}
            name={obj.name}
            imageUrl={obj.imageUrl}
            membersCount={obj.membersCount}
            maxMembersCount={obj.maxMembersCount}
            organizerId={obj.organizerId}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
