import React, {useState} from 'react'

import {Checkbox, TableCell, TableRow, Typography, Table, TableBody} from '@material-ui/core'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {warehouses} from '@constants/warehouses'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, withKg} from '@utils/text'

import {styles} from './warehouse-body-row.style'

const WarehouseBodyRowRaw = ({item: box, itemIndex: boxIndex, handlers, rowsDatas, areSubBoxes, ...restProps}) => {
  const classNames = restProps.classes
  const ordersQty = box.items.length
  const [isMaximizedMasterBox, setIsMaximizedMasterBox] = useState(false)

  const onTriggerIsMaximizedMasterBox = () => {
    setIsMaximizedMasterBox(!isMaximizedMasterBox)
  }

  const ProductCell = ({imgSrc, title}) => (
    <TableCell className={classNames.productCell}>
      <img className={classNames.img} src={imgSrc} />
      {title}
    </TableCell>
  )

  const isMasterBox = !(!box.amount || box.amount === 1) && !areSubBoxes

  const getBoxSecondTableCellContent = () => {
    if (areSubBoxes) {
      return
    }
    if (!isMasterBox) {
      if (box.isDraft) {
        return <Typography>{'isDraft'}</Typography>
      } else {
        return (
          <div className={classNames.checkboxRow}>
            <Checkbox
              color="primary"
              checked={rowsDatas.selectedBoxes.includes(box._id)}
              onChange={() => handlers.checkbox(box._id)}
            />
          </div>
        )
      }
    } else {
      if (isMaximizedMasterBox) {
        return (
          <div className={classNames.checkboxRow}>
            <Checkbox
              color="primary"
              checked={rowsDatas.selectedBoxes.includes(box._id)}
              onChange={() => handlers.checkbox(box._id)}
            />
            <ArrowDropUpIcon onClick={onTriggerIsMaximizedMasterBox} />
          </div>
        )
      } else {
        return (
          <div className={classNames.checkboxRow}>
            <Checkbox
              color="primary"
              checked={rowsDatas.selectedBoxes.includes(box._id)}
              onChange={() => handlers.checkbox(box._id)}
            />
            <ArrowDropDownIcon onClick={onTriggerIsMaximizedMasterBox} />
          </div>
        )
      }
    }
  }

  return box.items.map((order, orderIndex) => (
    <React.Fragment key={`orderBox_${order.order._id}_${orderIndex}`}>
      <TableRow className={clsx({[classNames.boxLastRow]: orderIndex === ordersQty - 1})}>
        {orderIndex === 0 && (
          <React.Fragment>
            <TableCell rowSpan={ordersQty}>{boxIndex + 1}</TableCell>
            <TableCell rowSpan={ordersQty} className={classNames.centerCell}>
              {getBoxSecondTableCellContent()}
            </TableCell>
          </React.Fragment>
        )}
        <ProductCell
          imgSrc={order.product.images && order.product.images[0] && getAmazonImageUrl(order.product.images[0])}
          title={order.product.amazonTitle}
        />
        <TableCell>{'ID: ' + order.order}</TableCell>

        {/* TODO Extract Barcode chip to Component */}
        <TableCell>{order.barCode ? order.barCode : 'N/A'}</TableCell>

        <TableCell>{order.product.id}</TableCell>
        <TableCell className={classNames.cellValueNumber}>
          {isMasterBox ? `boxes ${box.amount} x units ${order.amount}` : order.amount}
        </TableCell>
        <TableCell>{order.product.material}</TableCell>
        {orderIndex === 0 && (
          <React.Fragment>
            <TableCell rowSpan={ordersQty}>{warehouses[box.warehouse]}</TableCell>
            <TableCell rowSpan={ordersQty}>{'ID: ' + box._id}</TableCell>
          </React.Fragment>
        )}
        {/* <TableCell className={classNames.cellValueNumber}>
        {'$' + order.product.delivery.toFixed(2)}
      </TableCell> */}

        <TableCell className={classNames.cellValueNumber}>
          {toFixedWithDollarSign((parseFloat(order.product.amazon) || 0) * (parseInt(order.amount) || 0))}
        </TableCell>
        <TableCell className={classNames.cellValueNumber}>{order.product.weight + ' kg'}</TableCell>
        <TableCell className={classNames.cellValueNumber}>
          {withKg(
            Math.max(parseFloat(box.volumeWeightKgSupplier) || 0, parseFloat(box.weightFinalAccountingKgSupplier) || 0),
          )}
        </TableCell>
        <TableCell className={classNames.cellValueNumber}>{withKg(box.weighGrossKgSupplier)}</TableCell>
        <TableCell>{order.track ? order.track : 'N/A'}</TableCell>
      </TableRow>
      {isMaximizedMasterBox ? (
        <TableRow className={classNames.subBoxesTableWrapper}>
          <TableCell colSpan="2" />
          <TableCell colSpan="40">
            <Table className={classNames.subBoxesTable}>
              <TableBody>
                {Array(box.amount)
                  .fill(true)
                  .map((_, index) => (
                    <WarehouseBodyRow key={`subBox_${index}`} areSubBoxes item={box} itemIndex={index} />
                  ))}
              </TableBody>
            </Table>
          </TableCell>
        </TableRow>
      ) : undefined}
    </React.Fragment>
  ))
}

export const WarehouseBodyRow = withStyles(styles)(WarehouseBodyRowRaw)
