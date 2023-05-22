import ClearIcon from '@mui/icons-material/Clear'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import React from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { checkIsAdmin } from '@utils/checks'
// import {CopyValue} from '@components/copy-value/copy-value'
import { t } from '@utils/translations'

import { useClassNames } from './table-asin-and-reason.style'

export const TableAsinAndReason = observer(({ userRole, data, onClickRemoveCell }) => {
  const { classes: classNames } = useClassNames()

  const renderHeader = () =>
    checkIsAdmin(userRole) ? (
      <TableHead className={classNames.tableHeader}>
        <TableRow>
          <TableCell className={[classNames.tableCellPadding, classNames.alignLeftHeader]}>{'№'}</TableCell>
          <TableCell className={[classNames.tableCellPadding, classNames.alignLeftHeader]}>
            {t(TranslationKey.Proxy)}
          </TableCell>
          <TableCell className={[classNames.tableCellPadding, classNames.alignLeftHeader]}>{''}</TableCell>
        </TableRow>
      </TableHead>
    ) : (
      <TableHead className={classNames.tableHeader}>
        <TableRow>
          <TableCell className={[classNames.tableCellPadding, classNames.alignLeftHeader]}>{''}</TableCell>
          <TableCell className={[classNames.tableCellPadding, classNames.alignLeftHeader]}>
            {t(TranslationKey.ASIN)}
          </TableCell>
          <TableCell className={[classNames.tableCellPadding, classNames.alignLeftHeader]}>
            {t(TranslationKey.Reason)}
          </TableCell>
          <TableCell className={[classNames.tableCellPadding, classNames.alignLeftHeader]}>{''}</TableCell>
        </TableRow>
      </TableHead>
    )

  return (
    <TableContainer classes={{ root: classNames.table }}>
      <Table>
        {SettingsModel.languageTag && renderHeader()}

        <TableBody className={{ root: classNames.tableBody }}>
          {data.length &&
            data.map((item, index) => (
              <TableRow key={`${item.asin}_${index}`} className={classNames.row}>
                <TableCell className={[classNames.alignLeft, classNames.indexCell]}>{index + 1}</TableCell>
                {checkIsAdmin(userRole) ? (
                  <TableCell className={[classNames.alignLeft, classNames.nameCell]}>{item}</TableCell>
                ) : (
                  <TableCell className={[classNames.alignLeft, classNames.nameCell]}>{item.asin}</TableCell>
                )}

                {!checkIsAdmin(userRole) && (
                  <TableCell className={[classNames.alignLeft, classNames.nameCell]}>{item.reason}</TableCell>
                )}
                <TableCell className={[classNames.clearCell]}>
                  {checkIsAdmin(userRole) ? (
                    <ClearIcon classes={{ root: classNames.icon }} onClick={() => onClickRemoveCell(item)} />
                  ) : (
                    <ClearIcon classes={{ root: classNames.icon }} onClick={() => onClickRemoveCell(item.asin)} />
                  )}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
