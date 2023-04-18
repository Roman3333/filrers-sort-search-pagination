import ReactPaginate from 'react-paginate';
import styles from './styles.module.scss';

const Pagination = ({ total, limit, page, setPage }) => {
  const totalPages = Math.ceil(total / limit);

  return (
    <div className={styles.root}>
      <ReactPaginate
        breakLabel="..."
        previousLabel="<"
        nextLabel=">"
        onPageChange={(event) => setPage(event.selected + 1)}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        pageCount={totalPages}
        forcePage={page - 1}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};

export default Pagination;
