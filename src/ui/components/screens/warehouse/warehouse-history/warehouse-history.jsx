import React from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {HistoryTableRow} from '@components/table-rows/warehouse/warehouse-history/history-table-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './warehouse-history.style'

const textConsts = getLocalizedTexts(texts, 'ru').warehouseHistory

export const WarehouseHistory = observer(
  ({title, tasksData, onCancelMergeBoxes, onCancelSplitBoxes, onCancelEditBoxes, onClickTaskInfo}) => {
    const classNames = useClassNames()

    return (
      <React.Fragment>
        <Typography paragraph variant="h5" className={classNames.mainTitle}>
          {title}
        </Typography>
        <TableContainer>
          <Table className={classNames.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classNames.centerTextCell}>{textConsts.date}</TableCell>
                <TableCell className={classNames.centerTextCell}>{textConsts.updateDate}</TableCell>
                <TableCell>{textConsts.theme}</TableCell>
                <TableCell>{textConsts.description}</TableCell>
                <TableCell>{textConsts.action}</TableCell>
                <TableCell>{textConsts.statusTitle}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasksData.map((item, index) => (
                <HistoryTableRow
                  key={index}
                  item={item}
                  onCancelMergeBoxes={onCancelMergeBoxes}
                  onCancelSplitBoxes={onCancelSplitBoxes}
                  onCancelEditBoxes={onCancelEditBoxes}
                  onClickTaskInfo={onClickTaskInfo}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </React.Fragment>
    )
  },
)
