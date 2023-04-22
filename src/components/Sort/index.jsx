import { useEffect } from 'react';
import styles from './styles.module.css';

const Sort = ({ sort, setSort, limit, setLimit, setPage }) => {
  const sorts = [
    { value: 'year,asc', title: 'Year(ascending)' },
    { value: 'year,desc', title: 'Year(descending)' },
    { value: 'rating,asc', title: 'Rating(ascending)' },
    { value: 'rating,desc', title: 'Rating(descending)' },
  ];
  const counts = [2, 3, 4, 5];

  useEffect(() => {
    setPage(1);
  }, [limit, setPage]);

  const onSelectSortChange = (e) => {
    let obj = e.target.value.split(',');

    setSort({ sort: obj[0], order: obj[1] });
  };

  const onSelectCountChange = (e) => {
    setLimit(e.target.value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.div1}>
        <p className={styles.sort_by}>Sort By :</p>
        <select onChange={onSelectSortChange} className={styles.select1} defaultValue={sort.sort}>
          {sorts.map((option) => (
            <option value={option.value} key={option.title}>
              {option.title}
            </option>
          ))}
        </select>
      </div>
      <div className={styles.div2}>
        <p className={styles.sort_by}>Count items :</p>
        <select className={styles.select2} onChange={onSelectCountChange} defaultValue={limit}>
          {counts.map((count) => (
            <option value={count} key={count}>
              {count}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Sort;
