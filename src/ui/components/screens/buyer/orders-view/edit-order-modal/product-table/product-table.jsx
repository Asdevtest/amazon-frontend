import React from 'react'

import {Chip, Table, TableCell, TableContainer, TableRow} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'

import {useClassNames} from './product-table.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalProductTable

export const ProductTable = ({
  modalHeadCells,
  order,
  qty,
  setQty,
  barcode,
  setModalBarcode,
  batchPrice,
  setBatchPrice,
  material,
  setMaterial,
  trackId,
  setTrackId,
}) => {
  const classNames = useClassNames()

  return (
    <TableContainer>
      <Table className={classNames.table}>
        <TableRow>
          {modalHeadCells.map((el, i) => (
            <TableCell key={i} className={classNames.tableCell}>
              {el}
            </TableCell>
          ))}
        </TableRow>

        <TableRow>
          <TableCell>
            <img className={classNames.imgBox} src={order.img} alt={order.csCode} />
          </TableCell>
          <TableCell>{order.asin}</TableCell>
          <TableCell>{'$ ' + order.price.toFixed(2)}</TableCell>
          <TableCell className={classNames.tableCell}>{'$ ' + order.avgDeliveryPrice.toFixed(2)}</TableCell>
          <TableCell>
            <Input type="number" value={qty} className={classNames.input} onChange={e => setQty(e.target.value)} />
          </TableCell>
          <TableCell>{'$ ' + priceCalculation(order.price, order.avgDeliveryPrice, qty)}</TableCell>
          <TableCell>
            <Chip
              size="small"
              className={clsx(
                {
                  root: classNames.orderChip,
                  clickable: classNames.orderChipHover,
                  deletable: classNames.orderChipHover,
                  deleteIcon: classNames.orderChipIcon,
                },
                {
                  [classNames.selected]: !!barcode === true,
                },
              )}
              label={barcode ? barcode : 'Set barcode'}
              onClick={barcode ? () => navigator.clipboard.writeText(barcode) : () => setModalBarcode(true)}
              onDelete={barcode ? () => alert(textConsts.alert) : undefined}
            />
          </TableCell>
          <TableCell>
            <Input
              type="number"
              value={batchPrice}
              className={classNames.input}
              onChange={e => setBatchPrice(e.target.value)}
            />
          </TableCell>

          <TableCell>
            <Input value={material} className={classNames.input} onChange={e => setMaterial(e.target.value)} />
          </TableCell>
          <TableCell className={classNames.tableCell}>{textConsts.formulaCell}</TableCell>

          <TableCell className={classNames.tableCell}>
            <Input value={trackId} className={classNames.input} onChange={e => setTrackId(e.target.value)} />
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  )
}
