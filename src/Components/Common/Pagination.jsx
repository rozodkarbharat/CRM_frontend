import React from 'react'
import styles from "../../Css/Common/Pagination.module.css"
const Pagination = ({len,handlePrevPage,handleNextPage,currentPage}) => {
  return (
    <div className={styles.pagination}>
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className={styles.pagination_button}
    >
      Previous
    </button>
    <span>Page {currentPage}</span>
    <button
      onClick={handleNextPage}
      disabled={len < 1}
      className={styles.pagination_button}
    >
      Next
    </button>
  </div>
  )
}

export default Pagination
