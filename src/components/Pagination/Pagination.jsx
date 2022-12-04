import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'
import styles from './Pagination.module.scss'


const Pagination = ({ onChangePage }) => {
  const pageCount = useSelector(state => state.filterReducer.pageCount)
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(e) => onChangePage(e.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={3}
      forcePage={pageCount - 1}
      previousLabel="<"
      renderOnZeroPageCount={null}
    />
  )
}

export default Pagination