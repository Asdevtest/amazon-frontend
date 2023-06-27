import { Paper, Table as MuiTable, TableBody, TableContainer, TableHead, Toolbar, Typography } from '@mui/material'

import React from 'react'

import { Pagination } from '@material-ui/lab'
import { observer } from 'mobx-react'

import { TableToolbar } from './table-toolbar'
import { useClassNames } from './table.style'

export const Table = observer(
  ({
    noRowsTitle,
    rowsOnly,
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
    const { classes: classNames } = useClassNames()

    const dataWithPages = data.slice(rowsPerPage * (currentPage - 1), rowsPerPage * currentPage)

    return (
      <Paper>
        {!rowsOnly && <TableToolbar handlerRowsPerPage={handlerRowsPerPage} rowsPerPage={rowsPerPage} />}
        <TableContainer>
          <MuiTable className={classNames.table}>
            <TableHead className={classNames.tableHead}>{renderHeadRow}</TableHead>

            <TableBody className={classNames.tableBody}>
              {(rowsOnly ? data : dataWithPages).map((el, index) => (
                <BodyRow
                  key={`${el._id ? el._id : 'tableItem'}_${index}`}
                  item={el}
                  itemIndex={index}
                  handlers={rowsHandlers}
                  {...restProps}
                />
              ))}
            </TableBody>
          </MuiTable>
        </TableContainer>

        {!data.length && (
          <div className={classNames.noRowsTitleWrapper}>
            <Typography>{noRowsTitle}</Typography>
          </div>
        )}

        {!rowsOnly && (
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
        )}
      </Paper>
    )
  },
)
