import React from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {HistoryTableRow} from '@components/table-rows/warehouse/warehouse-history/history-table-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './warehouse-history.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistory

export const WarehouseHistory = ({historyData}) => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <Typography paragraph variant="h5" className={classNames.mainTitle}>
        {textConsts.mainTitle}
      </Typography>
      <TableContainer>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow>
              <TableCell className={classNames.centerTextCell}>{textConsts.date}</TableCell>
              <TableCell>{textConsts.theme}</TableCell>
              <TableCell>{textConsts.description}</TableCell>
              <TableCell>{textConsts.action}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {historyData.map((item, index) => (
              <HistoryTableRow key={index} item={item} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  )
}
