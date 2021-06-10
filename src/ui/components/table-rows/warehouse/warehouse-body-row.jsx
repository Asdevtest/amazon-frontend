import React from 'react'

import {Checkbox, TableCell, TableRow} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {warehouses} from '@constants/warehouses'

import {styles} from './warehouse-body-row.style'

const WarehouseBodyRowRaw = ({item: box, itemIndex: boxIndex, handlers, rowsDatas, ...restProps}) => {
  const classNames = restProps.classes
  const ordersQty = box.ordersId.length

  const ProductCell = ({imgSrc, title}) => (
    <TableCell className={classNames.productCell}>
      <img className={classNames.img} src={imgSrc} />
      {title}
    </TableCell>
  )

  return box.ordersId.map((order, orderIndex) => (
    <TableRow key={orderIndex} className={clsx({[classNames.boxLastRow]: orderIndex === ordersQty - 1})}>
      {orderIndex === 0 && (
        <>
          <TableCell rowSpan={ordersQty}>{boxIndex + 1}</TableCell>
          <TableCell rowSpan={ordersQty}>
            <Checkbox
              color="primary"
              checked={rowsDatas.selectedBoxes.includes(box.boxId)}
              onChange={() => handlers.checkbox(box.boxId)}
            />
          </TableCell>
        </>
      )}
      <ProductCell imgSrc={order.product.img} title={order.product.amazonTitle} />
      <TableCell>{'ID: ' + order.orderId}</TableCell>

      {/* TODO Extract Barcode chip to Component */}
      <TableCell onClick={handlers.onTriggerBarcode}>{order.barCode}</TableCell>

      <TableCell>{order.product.id}</TableCell>
      <TableCell className={classNames.cellValueNumber}>{order.amount}</TableCell>
      <TableCell>{order.product.material}</TableCell>
      {orderIndex === 0 && (
        <>
          <TableCell rowSpan={ordersQty}>{warehouses[box.warehouse]}</TableCell>
          <TableCell rowSpan={ordersQty}>{'ID: ' + box.boxId}</TableCell>
        </>
      )}
      <TableCell className={classNames.cellValueNumber}>{'$' + order.product.delivery.toFixed(2)}</TableCell>
      <TableCell className={classNames.cellValueNumber}>{order.product.weight + ' kg'}</TableCell>
      <TableCell className={classNames.cellValueNumber}>{box.weightGrossKg + ' kg'}</TableCell>
      <TableCell>{order.track}</TableCell>
    </TableRow>
  ))
}

export const WarehouseBodyRow = withStyles(styles)(WarehouseBodyRowRaw)
