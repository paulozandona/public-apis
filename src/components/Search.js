import { useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Search.module.css';
import SearchLoader from './SearchLoader';
import SearchResult from './SearchResult';
import useDebounce from '../hooks/useDebounce';
import { PUBLIC_APIS_ENTRIES } from '../constants/api';

const Search = ({ id, disabled, label, hideLabel, onObjectSelected, theme }) => {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const debouncedValue = useDebounce(inputValue, 1000);
  
  const handleOnChange = useCallback((e) => {
    e.preventDefault();
    const currentValue = e.target.value.trim();
    if (currentValue.length >= 3) {
      setInputValue(currentValue.toLowerCase());
    }
    if (!currentValue) {
      setData([]);
      setInputValue('');
      setError('');
    }
  }, []);

  const handleResetSelected = () => {
    setData([]);
    setInputValue('');
    setError('');
    inputRef.current.value = ''
  };

  useEffect(() => {
    if(debouncedValue) {
      setIsLoading(true);
      fetch(`${PUBLIC_APIS_ENTRIES}?title=${debouncedValue}`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((retrievedData) => {
          setData(retrievedData);
          setError(null);
          setIsLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setData(null);
          setIsLoading(false);
        });
    }
  }, [debouncedValue])

  useEffect(() => {
    if (debouncedValue !== '' && data?.count === 0 && !error) {
      setError('Nessun risultato trovato.');
    }
  }, [data?.count, error, debouncedValue])

  const fieldLabel = !hideLabel && label ? <label htmlFor={id}>{label}</label> : null;

  const searchResults =
    data?.count > 0 ? (
      <ul
        className={styles.results__holder}
        style={{ top: hideLabel ? "2.95rem" : "4.05rem" }}
      >
        {data.entries.map((item) => (
          <SearchResult
            key={window.crypto.randomUUID()}
            item={item}
            onObjectSelected={onObjectSelected}
            resetSelected={handleResetSelected}
          />
        ))}
      </ul>
    ) : null;

  const errorMessage = debouncedValue !== '' && error && <p className={styles.error}>{error}</p>;

  const loadingOrError = isLoading ? <SearchLoader /> : errorMessage

  return (
    <div className={`${styles.holder} ${styles[`theme_${theme}`]}`}>
      {fieldLabel}
      <input
        id={id}
        className={styles.search_field}
        placeholder={disabled ? 'Ricerca disattivata' : label}
        disabled={disabled}
        onChange={handleOnChange}
        ref={inputRef}
      />
      {searchResults}
      {loadingOrError}
    </div>
  );
}

Search.propTypes = {
  id: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  label: PropTypes.string,
  hideLabel: PropTypes.bool,
  onObjectSelected: PropTypes.func,
  theme: PropTypes.string,
};

Search.defaultProps = {
  disabled: false,
  label: '',
  hideLabel: false,
  onObjectSelected: (item) => item,
  theme: 'dark',
}

export default Search;
