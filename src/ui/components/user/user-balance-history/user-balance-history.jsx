import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { UserLink } from '@components/user/user-link'

import { formatNormDateTime } from '@utils/date-time'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './user-balance-history.style'

export const UserBalanceHistory = ({ historyData, title }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <Paper className={styles.mainWrapper}>
      <Typography paragraph variant="h5" className={styles.mainTitle}>
        {title}
      </Typography>
      <div>
        {historyData.length > 0 ? (
          <TableContainer>
            <Table className={styles.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={styles.centerTextCell}>{t(TranslationKey.Date)}</TableCell>
                  <TableCell className={styles.rightTextCell}>{t(TranslationKey.Quantity)}</TableCell>
                  <TableCell className={styles.centerTextCell}>{t(TranslationKey.Type)}</TableCell>
                  <TableCell className={styles.centerTextCell}>{t(TranslationKey.Comment)}</TableCell>
                  <TableCell className={styles.centerTextCell}>{t(TranslationKey['User name'])}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historyData.map((item, index) => (
                  <TableRow
                    key={index}
                    className={cx({
                      [styles.replenishRow]: item.sum >= 0,
                      [styles.withdrawRow]: item.sum < 0,
                    })}
                  >
                    <TableCell className={styles.dateCell}>{formatNormDateTime(item.createdAt)}</TableCell>
                    <TableCell>{toFixedWithDollarSign(item.sum, 2)}</TableCell>
                    <TableCell className={styles.typeCell}>{item.sum >= 0 ? 'replenish' : 'withdraw'}</TableCell>
                    <TableCell className={styles.commentCell}>{item.comment}</TableCell>
                    {/* <TableCell className={styles.usernameCell}>{item.recipient?.name}</TableCell> */}

                    <TableCell className={styles.usernameCell}>
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
          <Typography className={styles.subTitle}>{t(TranslationKey['No transactions'])}</Typography>
        )}
      </div>
    </Paper>
  )
}
