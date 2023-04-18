import { useRef, useCallback } from 'react';
import debounce from 'lodash.debounce';
import styles from './styles.module.css';

const Search = ({ search, setSearch }) => {
  const inputRef = useRef();

  const searchDebounce = useCallback(
    debounce((e) => {
      setSearch(e.target.value);
    }, 250),
    [],
  );

  const clearSearch = () => {
    setSearch('');
    inputRef.current?.focus();
  };

  return (
    <div className={styles.searchDiv}>
      <input
        ref={inputRef}
        type="text"
        className={styles.searchInput}
        placeholder="Search"
        onChange={searchDebounce}
      />
      {search && (
        <svg
          onClick={clearSearch}
          className={styles.searchClose}
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
