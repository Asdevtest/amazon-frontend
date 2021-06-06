import React from 'react'

import {
  Container,
  Divider,
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  TableContainer,
  Button,
} from '@material-ui/core'

import {texts} from '@constants/texts'

import {ModalTableBodyRow} from '@components/table-rows/user-profile-view/modal-table-body-row'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './content-modal.style'

const textConsts = getLocalizedTexts(texts, 'ru').buyerUserModalContent

export const ContentModal = props => {
  const classNames = useClassNames()
  return (
    <Container disableGutters>
      <Typography className={classNames.modalTitle}>{textConsts.mainTitle}</Typography>
      <Divider className={classNames.divider} />
      <TableContainer className={classNames.tableWrapper}>
        <Table className={classNames.table}>
          <TableHead>
            <TableRow>
              <TableCell className={(classNames.tableCell, classNames.imgCell)}>{textConsts.imgCell}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.categoryCell}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.price}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.count}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.avgPrice}</TableCell>

              <TableCell className={classNames.tableCell}>{textConsts.recBatch}</TableCell>

              <TableCell className={classNames.tableCell}>{textConsts.weight}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.avgBsr}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.avgReviews}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.avgRevenue}</TableCell>
              <TableCell className={classNames.tableCell}>{textConsts.costStart}</TableCell>

              <TableCell className={classNames.tableCell}>{textConsts.acManager}</TableCell>
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
          {textConsts.buyNowBtn}
        </Button>
        <Button
          disableElevation
          variant="contained"
          className={(classNames.modalButton, classNames.cancelBtn)}
          onClick={() => props.setOpenModal(false)}
        >
          {textConsts.cancelBtn}
        </Button>
      </div>
    </Container>
  )
}
