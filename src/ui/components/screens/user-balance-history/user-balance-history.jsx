import React from 'react'

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './user-balance-history.style'

const textConsts = getLocalizedTexts(texts, 'ru').userBalanceHistory

export const UserBalanceHistory = ({historyData}) => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <Typography paragraph variant="h5" className={classNames.mainTitle}>
        {textConsts.mainTitle}
      </Typography>
      <Paper>
        <TableContainer>
          <Table className={classNames.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classNames.centerTextCell}>{textConsts.date}</TableCell>
                <TableCell className={classNames.rightTextCell}>{textConsts.amount}</TableCell>
                <TableCell className={classNames.centerTextCell}>{textConsts.type}</TableCell>
                <TableCell className={classNames.centerTextCell}>{textConsts.comment}</TableCell>
                <TableCell className={classNames.centerTextCell}>{textConsts.reason}</TableCell>
                <TableCell className={classNames.centerTextCell}>{textConsts.username}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {historyData.map((item, index) => (
                <TableRow
                  key={index}
                  className={clsx({
                    [classNames.replenishRow]: item.type === 'replenish',
                    [classNames.withdrawRow]: item.type === 'withdraw',
                  })}
                >
                  <TableCell className={classNames.dateCell}>{item.date}</TableCell>
                  <TableCell className={classNames.amountCell}>{toFixedWithDollarSign(item.amount)}</TableCell>
                  <TableCell className={classNames.typeCell}>{item.type}</TableCell>
                  <TableCell className={classNames.commentCell}>{item.comment}</TableCell>
                  <TableCell className={classNames.reasonCell}>{item.reason}</TableCell>
                  <TableCell className={classNames.usernameCell}>{item.username}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </React.Fragment>
  )
}
