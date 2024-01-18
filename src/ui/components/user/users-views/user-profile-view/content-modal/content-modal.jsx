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

import { useStyles } from './content-modal.style'

export const ContentModal = props => {
  const { classes: styles } = useStyles()
  return (
    <Container disableGutters>
      <Typography className={styles.modalTitle}>{t(TranslationKey['Order of goods'])}</Typography>
      <Divider className={styles.divider} />
      <TableContainer className={styles.tableWrapper}>
        <Table className={styles.table}>
          <TableHead>
            <TableRow>
              <TableCell className={(styles.tableCell, styles.imgCell)}>{t(TranslationKey.Image)}</TableCell>
              <TableCell className={styles.tableCell}>{t(TranslationKey.Category)}</TableCell>
              <TableCell className={styles.tableCell}>{t(TranslationKey.Price)}</TableCell>
              <TableCell className={styles.tableCell}>{t(TranslationKey.Quantity)}</TableCell>
              <TableCell className={styles.tableCell}>{t(TranslationKey['Average Price'])}</TableCell>

              <TableCell className={styles.tableCell}>{t(TranslationKey['Recommended batch'])}</TableCell>

              <TableCell className={styles.tableCell}>{t(TranslationKey.Weight)}</TableCell>
              <TableCell className={styles.tableCell}>{t(TranslationKey['Average BSR'])}</TableCell>
              <TableCell className={styles.tableCell}>{t(TranslationKey['Average Review'])}</TableCell>
              <TableCell className={styles.tableCell}>{t(TranslationKey['Average revenue'])}</TableCell>
              <TableCell className={styles.tableCell}>{'Стоимость запуска'}</TableCell>

              <TableCell className={styles.tableCell}>{'Аккаунт менеджер'}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <ModalTableBodyRow product={props.selected} managersList={props.managersList} />
          </TableBody>
        </Table>
      </TableContainer>
      <div className={styles.buttonsWrapper}>
        <Button
          disableElevation
          variant="contained"
          className={(styles.modalButton, styles.buyNowBtn)}
          onClick={() => props.setOpenModal(false)}
        >
          {'Заказать сразу'}
        </Button>

        <Button
          disableElevation
          variant="contained"
          className={(styles.modalButton, styles.cancelBtn)}
          onClick={() => props.setOpenModal(false)}
        >
          {'Отменить'}
        </Button>
      </div>
    </Container>
  )
}
