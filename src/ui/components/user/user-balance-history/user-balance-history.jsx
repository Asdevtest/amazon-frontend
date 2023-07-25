import { cx } from '@emotion/css'
import React from 'react'

import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './user-balance-history.style'

export const UserBalanceHistory = ({ historyData, title }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Paper className={classNames.mainWrapper}>
      <Typography paragraph variant="h5" className={classNames.mainTitle}>
        {title}
      </Typography>
      <div>
        {historyData.length > 0 ? (
          <TableContainer>
            <Table className={classNames.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classNames.centerTextCell}>{t(TranslationKey.Date)}</TableCell>
                  <TableCell className={classNames.rightTextCell}>{t(TranslationKey.Quantity)}</TableCell>
                  <TableCell className={classNames.centerTextCell}>{t(TranslationKey.Type)}</TableCell>
                  <TableCell className={classNames.centerTextCell}>{t(TranslationKey.Comment)}</TableCell>
                  <TableCell className={classNames.centerTextCell}>{t(TranslationKey['User name'])}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((item, index) => (
                  <TableRow
                    key={index}
                    className={cx({
                      [classNames.replenishRow]: item.sum >= 0,
                      [classNames.withdrawRow]: item.sum < 0,
                    })}
                  >
                    <TableCell className={classNames.dateCell}>{formatNormDateTime(item.createdAt)}</TableCell>
                    <TableCell>{toFixedWithDollarSign(item.sum, 2)}</TableCell>
                    <TableCell className={classNames.typeCell}>{item.sum >= 0 ? 'replenish' : 'withdraw'}</TableCell>
                    <TableCell className={classNames.commentCell}>{item.comment}</TableCell>
                    {/* <TableCell className={classNames.usernameCell}>{item.recipient?.name}</TableCell> */}

                    <TableCell className={classNames.usernameCell}>
                      <UserLink
                        withAvatar
                        name={item.recipient?.name}
                        userId={item.recipient?._id}
                        // blackText={blackText}
                        // customStyles={customStyles}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Typography className={classNames.subTitle}>{t(TranslationKey['No transactions'])}</Typography>
        )}
      </div>
    </Paper>
  )
}
