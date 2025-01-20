import React from 'react';
import Header from '../components/Header';
import CreatePrBlock from '../components/CreatePrBlock';

const CreateProject = ({ searchValue, setSearchValue }) => {
  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <CreatePrBlock />
    </>
  );
};

export default CreateProject;
