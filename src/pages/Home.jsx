import React from 'react';
import '../scss/app.scss';

import Categories from '../components/Categories';

const Home = () => {
  const [categoryId, setCategoryId] = React.useState(0); //состояние категорий
  console.log(categoryId);

  return <Categories value={categoryId} onClickCategory={(i) => setCategoryId(i)} />;
};

export default Home;
