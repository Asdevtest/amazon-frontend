import React from 'react'

import {
  Container,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { ModalTableBodyRow } from '@components/table/table-rows/user-profile-view/modal-table-body-row'

import { t } from '@utils/translations'

import { useClassNames } from './content-modal.style'

export const ContentModal = props => {
  const { classes: classNames } = useClassNames()
  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{t(TranslationKey['Order of goods'])}</Typography>
      <Divider className={classNames.divider} />
      <TableContainer className={classNames.tableWrapper}>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow>
              <TableCell className={(classNames.tableCell, classNames.imgCell)}>{t(TranslationKey.Image)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Category)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Price)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey.Quantity)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey['Average Price'])}</TableCell>

              <TableCell className={classNames.tableCell}>{t(TranslationKey['Recommended batch'])}</TableCell>

              <TableCell className={classNames.tableCell}>{t(TranslationKey.Weight)}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey['Average BSR'])}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey['Average Review'])}</TableCell>
              <TableCell className={classNames.tableCell}>{t(TranslationKey['Average revenue'])}</TableCell>
              <TableCell className={classNames.tableCell}>{'Стоимость запуска'}</TableCell>

              <TableCell className={classNames.tableCell}>{'Аккаунт менеджер'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ModalTableBodyRow product={props.selected} managersList={props.managersList} />
          </TableBody>
        </Table>
      </TableContainer>
      <div className={classNames.buttonsWrapper}>
        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.buyNowBtn)}
          onClick={() => props.setOpenModal(false)}
        >
          {'Заказать сразу'}
        </Button>

        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.cancelBtn)}
          onClick={() => props.setOpenModal(false)}
        >
          {'Отменить'}
        </Button>
      </div>
    </Container>
  )
}
