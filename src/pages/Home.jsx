import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useAuth } from '../context/AuthContext';
import { setEvents } from '../redux/slices/eventsSlice';
import '../scss/app.scss';

import Header from '../components/Header';
import Categories from '../components/Categories';
import EventCard from '../components/EventCard';

const Home = ({ searchValue, setSearchValue }) => {
  const dispatch = useDispatch();
  const { authData } = useAuth();

  const events = useSelector((state) => state.eventsReducer.events);

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

  const handleToggleCategory = (categoryIndex) => {
    setSelectedCategories(
      (prev) =>
        prev.includes(categoryIndex)
          ? prev.filter((id) => id !== categoryIndex) // убираем категорию, если она уже выбрана
          : [...prev, categoryIndex], // добавляем категорию, если она не выбрана
    );
  };
  console.log(selectedCategories, 'arr of SELECTED CATEGORIES');

  const selectedCategoryNames = selectedCategories.map((index) => categoriesArr[index]);

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
        dispatch(setEvents(data)); // here
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategories]);

  const searchedEvents = events
    .filter((obj) => {
      if (obj.name.toLowerCase().includes(searchValue.toLowerCase())) {
        return true;
      }
      return false;
    })
    .map((obj) => (
      <EventCard
        key={obj.id}
        id={obj.id}
        name={obj.name}
        imageUrl={obj.imageUrl}
        membersCount={obj.membersCount}
        maxMembersCount={obj.maxMembersCount}
        organizerId={obj.organizerId}
      />
    ));

  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <Categories
        categoriesArr={categoriesArr}
        selectedCategories={selectedCategories}
        onToggleCategory={handleToggleCategory}
      />
      <div className="event_container">{searchedEvents}</div>
    </>
  );
};

export default Home;
