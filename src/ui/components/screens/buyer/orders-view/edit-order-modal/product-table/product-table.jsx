import React from 'react'

import {Chip, Table, TableCell, TableContainer, TableRow, TableHead, TableBody} from '@material-ui/core'
import clsx from 'clsx'

import {getDeliveryOptionByCode} from '@constants/delivery-options'
import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {formatDate} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './product-table.style'

const textConsts = getLocalizedTexts(texts, 'en').ordersViewsModalProductTable

export const ProductTable = ({modalHeadCells, order, onTriggerBarcodeModal, orderFields, setOrderField}) => {
  const classNames = useClassNames()
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
            <TableCell>{getDeliveryOptionByCode(order.deliveryMethod).label}</TableCell>
            <TableCell className={classNames.tableCell}>{formatDate(order.product.createdat)}</TableCell>
            <TableCell className={classNames.tableCell}>{formatDate(order.product.checkedat)}</TableCell>
            <TableCell>{order.product.lsupplier}</TableCell>
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
                    [classNames.selected]: !!order.barcode === true,
                  },
                )}
                label={order.barcode ? order.barcode : 'Set barcode'}
                onClick={order.barcode ? () => navigator.clipboard.writeText(order.barcode) : onTriggerBarcodeModal}
                onDelete={order.barcode ? () => alert(textConsts.alert) : undefined}
              />
            </TableCell>

            <TableCell>{orderFields.material}</TableCell>
            <TableCell className={classNames.tableCell}>{textConsts.traclId}</TableCell>

            <TableCell className={classNames.tableCell}>
              <Input value={orderFields.trackId} className={classNames.input} onChange={setOrderField('trackId')} />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
