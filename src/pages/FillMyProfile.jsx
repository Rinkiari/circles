import Header from '../components/Header';
import FillMyProfileBlock from '../components/FillMyProfBlock';

const FillMyProfile = ({ searchValue, setSearchValue }) => {
  return (
    <>
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <FillMyProfileBlock />
    </>
  );
};
export default FillMyProfile;
