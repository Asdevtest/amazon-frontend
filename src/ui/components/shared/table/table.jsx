import { observer } from 'mobx-react'

import { Pagination } from '@material-ui/lab'
import { Table as MuiTable, Paper, TableBody, TableContainer, TableHead, Toolbar, Typography } from '@mui/material'

import { useStyles } from './table.style'

import { TableToolbar } from './table-toolbar'

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
    const { classes: styles } = useStyles()

    const dataWithPages = data.slice(rowsPerPage * (currentPage - 1), rowsPerPage * currentPage)

    return (
      <Paper>
        {!rowsOnly && <TableToolbar handlerRowsPerPage={handlerRowsPerPage} rowsPerPage={rowsPerPage} />}
        <TableContainer>
          <MuiTable className={styles.table}>
            <TableHead className={styles.tableHead}>{renderHeadRow}</TableHead>

            <TableBody className={styles.tableBody}>
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
          <div className={styles.noRowsTitleWrapper}>
            <Typography>{noRowsTitle}</Typography>
          </div>
        )}

        {!rowsOnly && (
          <Toolbar className={styles.footer}>
            <div className={styles.buttonsWrapper}>{renderButtons && renderButtons()}</div>
            <Pagination
              className={styles.pagination}
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
