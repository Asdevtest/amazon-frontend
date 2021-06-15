import React from 'react'

import {Paper, Table as MuiTable, TableBody, TableContainer, TableHead, Toolbar} from '@material-ui/core'
import {Pagination} from '@material-ui/lab'
import {observer} from 'mobx-react'

import {TableToolbar} from './table-toolbar'
import {useClassNames} from './table.style'

export const Table = observer(
  ({
    rowsPerPage,
    handlerRowsPerPage,
    renderHeadRow,
    BodyRow,
    data,
    currentPage,
    pageCount,
    handlerPageChange,
    renderButtons,
    rowsHandlers,
    ...restProps
  }) => {
    const classNames = useClassNames()
    return (
      <Paper className={classNames.root}>
        <TableToolbar handlerRowsPerPage={handlerRowsPerPage} rowsPerPage={rowsPerPage} />
        <TableContainer>
          <MuiTable className={classNames.table}>
            <TableHead className={classNames.tableHead}>{renderHeadRow}</TableHead>
            <TableBody className={classNames.tableBody}>
              {data.slice(rowsPerPage * (currentPage - 1), rowsPerPage * currentPage).map((el, index) => (
                <BodyRow key={index} item={el} itemIndex={index} handlers={rowsHandlers} {...restProps} />
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>

        <Toolbar className={classNames.footer}>
          <div className={classNames.buttonsWrapper}>{renderButtons && renderButtons()}</div>
          <Pagination
            className={classNames.pagination}
            count={pageCount}
            page={currentPage}
            shape="rounded"
            siblingCount={1}
            onChange={handlerPageChange}
          />
        </Toolbar>
      </Paper>
    )
  },
)
