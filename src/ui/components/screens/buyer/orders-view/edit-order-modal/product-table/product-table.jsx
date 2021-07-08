import React, {useState} from 'react'

import {
  Chip,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Checkbox,
  Typography,
} from '@material-ui/core'
import clsx from 'clsx'

// не убирать, нужно будет позже
// import {texts} from '@constants/texts'
import {Input} from '@components/input'

import {calcExchangePrice, calcPriceForItem, calcProductsPriceWithDelivery} from '@utils/calculation'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign} from '@utils/text'

// import {getLocalizedTexts} from '@utils/get-localized-texts'
import {useClassNames} from './product-table.style'

// const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalProductTable

export const ProductTable = ({modalHeadCells, order, onTriggerBarcodeModal, orderFields, setOrderField}) => {
  const [priceYuansForBatch, setPriceYuansForBatch] = useState('')
  const [usePriceInDollars, setUsePriceInDollars] = useState(false)
  const [yuansToDollarRate, setYuansToDollarRate] = useState('')
  const classNames = useClassNames()
  console.log(orderFields.isBarCodeAlreadyAttachedByTheSupplier)
  return (
    <TableContainer>
      <Table className={classNames.table}>
        <TableHead>
          <TableRow>
            {modalHeadCells.map((el, i) => (
              <TableCell key={i} className={classNames.tableCell}>
                {el}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <img
                className={classNames.imgBox}
                src={order.product.images && order.product.images[0] && getAmazonImageUrl(order.product.images[0])}
                alt={order.csCode}
              />
            </TableCell>
            <TableCell>{order.product.id}</TableCell>
            <TableCell>{order.product.currentSupplier.price}</TableCell>
            <TableCell className={classNames.tableCell}>{order.product.currentSupplier.delivery}</TableCell>
            <TableCell className={classNames.tableCell}>{orderFields.amount}</TableCell>
            <TableCell>{toFixedWithDollarSign(calcProductsPriceWithDelivery(order.product, orderFields))}</TableCell>
            <TableCell>{order.product.currentSupplier.link}</TableCell>
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
                    [classNames.selected]: !!orderFields.barCode === true,
                  },
                )}
                label={orderFields.barCode ? orderFields.barCode : 'Set barcode'}
                onClick={
                  !orderFields.barCode || (orderFields.barCode && orderFields.isBarCodeAlreadyAttachedByTheSupplier)
                    ? onTriggerBarcodeModal
                    : () => navigator.clipboard.writeText(order.barCode)
                }
                onDelete={
                  (orderFields.barCode &&
                    orderFields.isBarCodeAlreadyAttachedByTheSupplier &&
                    (() => {
                      setOrderField('barCode')({target: {value: ''}})
                      onTriggerBarcodeModal()
                    })) ||
                  undefined
                }
              />
              <div className={classNames.checkboxWithLabelWrapper}>
                <Checkbox
                  checked={orderFields.isBarCodeAlreadyAttachedByTheSupplier}
                  onChange={() => {
                    setOrderField('isBarCodeAlreadyAttachedByTheSupplier')({
                      target: {value: !orderFields.isBarCodeAlreadyAttachedByTheSupplier},
                    })
                  }}
                />
                <Typography>Поставщик поклеил баркод при отправке</Typography>
              </div>
            </TableCell>
            <TableCell className={classNames.tableCell}>
              <Input
                disabled={usePriceInDollars}
                value={priceYuansForBatch}
                className={classNames.input}
                onChange={e => {
                  setPriceYuansForBatch(e.target.value)
                  setOrderField('amountPaymentPerConsignmentAtDollars')({
                    target: {value: calcExchangePrice(e.target.value, yuansToDollarRate)},
                  })
                }}
              />
              <div className={classNames.checkboxWithLabelWrapper}>
                <Checkbox
                  value={usePriceInDollars}
                  onChange={() => {
                    if (!usePriceInDollars) {
                      setPriceYuansForBatch('')
                      setYuansToDollarRate('')
                    }
                    setUsePriceInDollars(!usePriceInDollars)
                  }}
                />
                <Typography>Использовать цену в долларах</Typography>
              </div>
            </TableCell>
            <TableCell className={classNames.tableCell}>
              <Input
                disabled={usePriceInDollars}
                value={yuansToDollarRate}
                className={classNames.input}
                onChange={e => {
                  setYuansToDollarRate(e.target.value)
                  setOrderField('amountPaymentPerConsignmentAtDollars')({
                    target: {value: calcExchangePrice(priceYuansForBatch, e.target.value)},
                  })
                }}
              />
            </TableCell>
            <TableCell className={classNames.tableCell}>
              <Input
                disabled={!usePriceInDollars}
                value={orderFields.amountPaymentPerConsignmentAtDollars}
                className={classNames.input}
                onChange={setOrderField('amountPaymentPerConsignmentAtDollars')}
              />
            </TableCell>

            <TableCell>{orderFields.material}</TableCell>
            <TableCell className={classNames.tableCell}>
              {calcPriceForItem(orderFields.amountPaymentPerConsignmentAtDollars, orderFields.amount)}
            </TableCell>

            <TableCell className={classNames.tableCell}>
              <Input
                value={orderFields.trackingNumberChina}
                className={classNames.input}
                onChange={setOrderField('trackingNumberChina')}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
