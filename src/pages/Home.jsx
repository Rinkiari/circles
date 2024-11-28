import React from 'react';
import '../scss/app.scss';

import Header from '../components/Header';
import Categories from '../components/Categories';
import EventCard from '../components/EventCard';

const Home = () => {
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

  const selectedCategoryNames = selectedCategories.map((index) => categoriesArr[index]);

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const url =
          selectedCategoryNames.length > 0
            ? `https://e895c70e3c56e1a7.mokky.dev/events?categories=*${encodeURIComponent(
                selectedCategoryNames.join(','),
              )}`
            : `https://e895c70e3c56e1a7.mokky.dev/events`;

        const response = await fetch(url);
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  // OLD FETCH
  // React.useEffect(() => {
  //   fetch('https://e895c70e3c56e1a7.mokky.dev/events')
  //     .then((res) => res.json())
  //     .then((jsonRes) => {
  //       setEvent(jsonRes);
  //     });
  // }, []);

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
          <EventCard key={obj.id} {...obj} />
        ))}
      </div>
    </>
  );
};

export default Home;
