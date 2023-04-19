import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useGetProductsQuery } from './redux/api/movies';
import Table from './components/Table';
import Sort from './components/Sort';
import Genre from './components/Genre';
import Pagination from './components/Pagination';
import Search from './components/Search';
import './App.css';

function App() {
  // const [obj, setObj] = useState({});
  const [sort, setSort] = useState({ sort: 'rating', order: 'desc' });
  const [filterGenre, setFilterGenre] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(2);
  const [search, setSearch] = useState('');
  const firstLoading = useRef(false);
  const { data, isLoading } = useGetProductsQuery({
    page,
    sort: sort.sort,
    order: sort.order,
    filterGenre,
    search,
    limit,
  });
  const navigate = useNavigate();

  console.log(data, isLoading);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const { page, sort, limit, filterGenre } = params;

      setPage(page);
      setSort(sort);
      setLimit(limit);
      if (filterGenre) setFilterGenre(filterGenre);
    }
  }, []);

  useEffect(() => {
    if (firstLoading.current) {
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
    }

    firstLoading.current = true;
  }, [page, sort, limit, filterGenre, navigate]);

  return (
    <div className="wrapper">
      <div className="container">
        <div className="head">
          <img src="./images/logo.png" alt="logo" className="logo" />
          <Search search={search} setSearch={setSearch} />
        </div>
        <div className="body">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <>
              <div className="table_container">
                <Table movies={data.movies ? data.movies : []} />

                <Pagination
                  limit={data.limit ? data.limit : 0}
                  total={data.total ? data.total : 0}
                  page={page}
                  setPage={setPage}
                />
              </div>

              <div className="filter_container">
                <Sort sort={sort} setSort={setSort} limit={limit} setLimit={setLimit} />
                <Genre
                  filterGenre={filterGenre}
                  genres={data.genres ? data.genres : []}
                  setFilterGenre={setFilterGenre}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
