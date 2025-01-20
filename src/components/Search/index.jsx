import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Search.module.scss';

const Search = ({ searchValue, setSearchValue }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputChange = (event) => {
    const value = event.target.value;

    setSearchValue(value);
    // Перенаправление на главную страницу, если ввод происходит не на главной
    if (location.pathname !== '/' && value.trim()) {
      navigate('/');
    }
    // проверка стоит после записи значения, чтобы сначала значение попало в состояние, а потом уже при срабатывании условия перебросило со значением
  };

  return (
    <div className={styles.root}>
      <input
        value={searchValue}
        onChange={handleInputChange}
        className={styles.inputik}
        placeholder="ПОИСК"
      />
      {searchValue && (
        <svg
          onClick={() => setSearchValue('')}
          className={styles.icon_cross}
          height="6.82666in"
          viewBox="0 0 6.82666 6.82666"
          width="6.82666in"
          xmlns="http://www.w3.org/2000/svg">
          <path
            className="fil0"
            d="M5.91083 1.2175c0.0833031,-0.0833031 0.0833031,-0.218366 0,-0.301669 -0.0833031,-0.0833031 -0.218366,-0.0833031 -0.301669,0l-4.69334 4.69333c-0.0833031,0.0833031 -0.0833031,0.218366 0,0.301669 0.0833031,0.0833031 0.218366,0.0833031 0.301669,0l4.69334 -4.69333z"
          />
          <path
            className="fil0"
            d="M1.2175 0.915827c-0.0833031,-0.0833031 -0.218366,-0.0833031 -0.301669,0 -0.0833031,0.0833031 -0.0833031,0.218366 0,0.301669l4.69334 4.69333c0.0833031,0.0833031 0.218366,0.0833031 0.301669,0 0.0833031,-0.0833031 0.0833031,-0.218366 0,-0.301669l-4.69334 -4.69333z"
          />
        </svg>
      )}
    </div>
  );
};

export default Search;
