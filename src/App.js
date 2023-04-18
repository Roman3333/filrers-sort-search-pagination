import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import Table from './components/Table';
import Sort from './components/Sort';
import Genre from './components/Genre';
import Pagination from './components/Pagination';
import Search from './components/Search';
import './App.css';

const base_url = process.env.REACT_APP_API_URL;

function App() {
  const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: 'rating', order: 'desc' });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const { page, sort, limit, filterGenre } = params;
      setPage(page);
      setSort(sort);
      setLimit(limit);
      setFilterGenre(filterGenre);
      console.log(params);
    }
  }, []);

  useEffect(() => {
    const getAllMovies = async () => {
      try {
        const url = `${base_url}?page=${page}&sort=${sort.sort},${
          sort.order
        }&genre=${filterGenre.toString()}&search=${search}&limit=${limit}`;
        const { data } = await axios.get(url);
        setObj(data);
      } catch (err) {
        console.log(err);
      }
    };

    getAllMovies();
  }, [sort, filterGenre, page, search, limit]);

  useEffect(() => {
    const queryString = qs.stringify(
      {
        page,
        sort,
        filterGenre,
        limit,
      },
      { addQueryPrefix: true },
    );

    navigate(queryString);
  }, [page, sort, filterGenre, limit]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="head">
          <img src="./images/logo.png" alt="logo" className="logo" />
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="body">
          <div className="table_container">
            <Table movies={obj.movies ? obj.movies : []} />
            <Pagination
              limit={obj.limit ? obj.limit : 0}
              total={obj.total ? obj.total : 0}
              page={page}
              setPage={setPage}
            />
          </div>
          <div className="filter_container">
            <Sort sort={sort} setSort={setSort} limit={limit} setLimit={setLimit} />
            <Genre
              filterGenre={filterGenre}
              genres={obj.genres ? obj.genres : []}
              setFilterGenre={setFilterGenre}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
