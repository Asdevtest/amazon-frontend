import { observer } from 'mobx-react'

import ClearIcon from '@mui/icons-material/Clear'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { checkIsAdmin } from '@utils/checks'
import { t } from '@utils/translations'

import { useStyles } from './table-asin-and-reason.style'

export const TableAsinAndReason = observer(({ userRole, data, onClickRemoveCell }) => {
  const { classes: styles, cx } = useStyles()

  const renderHeader = () =>
    checkIsAdmin(userRole) ? (
      <TableHead className={styles.tableHeader}>
        <TableRow>
          <TableCell className={cx(styles.tableCellPadding, styles.alignLeftHeader)}>{'№'}</TableCell>
          <TableCell className={cx(styles.tableCellPadding, styles.alignLeftHeader)}>
            {t(TranslationKey.Proxy)}
          </TableCell>
          <TableCell className={cx(styles.tableCellPadding, styles.alignLeftHeader)}>{''}</TableCell>
        </TableRow>
      </TableHead>
    ) : (
      <TableHead className={styles.tableHeader}>
        <TableRow>
          <TableCell className={cx(styles.tableCellPadding, styles.alignLeftHeader)}>{''}</TableCell>
          <TableCell className={cx(styles.tableCellPadding, styles.alignLeftHeader)}>
            {t(TranslationKey.ASIN)}
          </TableCell>
          <TableCell className={cx(styles.tableCellPadding, styles.alignLeftHeader)}>
            {t(TranslationKey.Reason)}
          </TableCell>
          <TableCell className={cx(styles.tableCellPadding, styles.alignLeftHeader)}>{''}</TableCell>
        </TableRow>
      </TableHead>
    )

  return (
    <TableContainer classes={{ root: styles.table }}>
      <Table>
        {SettingsModel.languageTag && renderHeader()}

        <TableBody>
          {data.length &&
            data.map((item, index) => (
              <TableRow key={`${item.asin}_${index}`} className={styles.row}>
                <TableCell className={cx(styles.alignLeft, styles.indexCell)}>{index + 1}</TableCell>
                {checkIsAdmin(userRole) ? (
                  <TableCell className={cx(styles.alignLeft, styles.nameCell)}>{item}</TableCell>
                ) : (
                  <TableCell className={cx(styles.alignLeft, styles.nameCell)}>{item.asin}</TableCell>
                )}

                {!checkIsAdmin(userRole) && (
                  <TableCell className={cx(styles.alignLeft, styles.nameCell)}>{item.reason}</TableCell>
                )}
                <TableCell className={cx(styles.clearCell)}>
                  {checkIsAdmin(userRole) ? (
                    <ClearIcon classes={{ root: styles.icon }} onClick={() => onClickRemoveCell(item)} />
                  ) : (
                    <ClearIcon classes={{ root: styles.icon }} onClick={() => onClickRemoveCell(item.asin)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
