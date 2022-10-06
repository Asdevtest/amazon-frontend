import TablePagination from '@mui/material/TablePagination'
import {gridPageCountSelector, gridPageSelector, useGridApiContext, useGridSelector} from '@mui/x-data-grid'

import * as React from 'react'

import {useClassNames} from './table-pagination.style'

export const CustomPagination = () => {
  const classNames = useClassNames()

  const apiRef = useGridApiContext()
  const page = useGridSelector(apiRef, gridPageSelector)
  const pageCount = useGridSelector(apiRef, gridPageCountSelector)

  // const [page, setPage] = React.useState(2)
  // const [rowsPerPage, setRowsPerPage] = React.useState(10)

  // const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
  //   setPage(newPage)
  // }

  // const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setRowsPerPage(parseInt(event.target.value, 10))
  //   setPage(0)
  // }

  return (
    <TablePagination
      component="div"
      classes={{toolbar: classNames.root}}
      count={pageCount}
      page={page}
      // onPageChange={handleChangePage}
      // rowsPerPage={rowsPerPage}
      // onRowsPerPageChange={handleChangeRowsPerPage}
    />
  )
}
