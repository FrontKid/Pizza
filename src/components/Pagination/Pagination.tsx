//react
import React from 'react'
import ReactPaginate from 'react-paginate'
import { useSelector } from 'react-redux'

//selectors
import { filterSliceSelector } from '../../redux/slices/filter/selectors'

//styles
import styles from './Pagination.module.scss'


const Pagination: React.FC<any> = ({ onChangePage }) => {
  const { pageCount } = useSelector(filterSliceSelector)

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
    />
  )
}

export default Pagination