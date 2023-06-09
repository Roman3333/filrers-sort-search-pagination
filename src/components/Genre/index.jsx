import { useEffect } from 'react';
import styles from './styles.module.css';

const Genre = ({ genres, filterGenre, setFilterGenre, setPage }) => {
  const onChange = ({ currentTarget: input }) => {
    if (input.checked) {
      const state = [...filterGenre, input.value];
      setFilterGenre(state);
    } else {
      const state = filterGenre.filter((val) => val !== input.value);
      setFilterGenre(state);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [filterGenre, setPage]);

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Filter By Genre</h1>
      <div className={styles.genre_container}>
        {genres.map((genre) => (
          <label className={styles.genre} key={genre}>
            <input
              className={styles.genre_input}
              type="checkbox"
              value={genre}
              onChange={onChange}
              checked={filterGenre.includes(genre)}
            />
            <p className={styles.genre_label}>{genre}</p>
          </label>
        ))}
      </div>
    </div>
  );
};

export default Genre;
