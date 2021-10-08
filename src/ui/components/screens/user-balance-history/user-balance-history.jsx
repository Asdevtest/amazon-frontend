import React from 'react'

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

// import {formatNormDateTimeWithParseISO} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign} from '@utils/text'

import {useClassNames} from './user-balance-history.style'

const textConsts = getLocalizedTexts(texts, 'ru').userBalanceHistory

export const UserBalanceHistory = ({historyData, title}) => {
  const classNames = useClassNames()

  return (
    <React.Fragment>
      <Typography paragraph variant="h5" className={classNames.mainTitle}>
        {title}
      </Typography>
      <Paper>
        {historyData.length > 0 ? (
          <TableContainer>
            <Table className={classNames.table}>
              <TableHead>
                <TableRow>
                  {/* <TableCell className={classNames.centerTextCell}>{textConsts.date}</TableCell> */}
                  <TableCell className={classNames.rightTextCell}>{textConsts.amount}</TableCell>
                  <TableCell className={classNames.centerTextCell}>{textConsts.type}</TableCell>
                  <TableCell className={classNames.centerTextCell}>{textConsts.comment}</TableCell>
                  <TableCell className={classNames.centerTextCell}>{textConsts.productId}</TableCell>
                  <TableCell className={classNames.centerTextCell}>{textConsts.username}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((item, index) => (
                  <TableRow
                    key={index}
                    className={clsx({
                      [classNames.replenishRow]: item.sum >= 0,
                      [classNames.withdrawRow]: item.sum < 0,
                    })}
                  >
                    {/* <TableCell className={classNames.dateCell}> //ДАТЫ ПРОПАЛИ ИЗ ЗАПРОСА
                      {formatNormDateTimeWithParseISO(item.createdDate)}
                    </TableCell> */}
                    <TableCell className={classNames.amountCell}>{toFixedWithDollarSign(item.sum)}</TableCell>
                    <TableCell className={classNames.typeCell}>{item.sum >= 0 ? 'replenish' : 'withdraw'}</TableCell>
                    <TableCell className={classNames.commentCell}>{item.comment}</TableCell>
                    <TableCell className={classNames.reasonCell}>{item.productId}</TableCell>
                    <TableCell className={classNames.usernameCell}>{item.recipient.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography>{textConsts.noPayments}</Typography>
        )}
      </Paper>
    </React.Fragment>
  )
}
