import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'
import clsx from 'clsx'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {warehouses} from '@constants/warehouses'

import {isNotUndefined} from '@utils/checks'
import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers, selectedBatchIndex}) => {
  const classNames = useClassNames()
  const boxQty = item.boxes.length
  const [handleClick, handleDoubleClick] = useClickPreventionOnDoubleClick(
    () => {
      if (handlers.onClickTableRow) {
        handlers.onClickTableRow(item, itemIndex)
      }
    },
    () => {
      if (handlers.onDoubleClickTableRow) {
        handlers.onDoubleClickTableRow(item, itemIndex)
      }
    },
  )
  return item.boxes.map((box, boxIndex) => (
    <TableRow
      key={boxIndex}
      className={clsx({[classNames.boxLastRow]: boxIndex === boxQty - 1})}
      selected={isNotUndefined(selectedBatchIndex) && selectedBatchIndex === itemIndex}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      {boxIndex === 0 && <TableCell rowSpan={boxQty}>{'clientId'}</TableCell>}
      <TableCell>{box.items[0].amount}</TableCell>
      <TableCell>{box.status}</TableCell>
      <TableCell>{box.createdBy}</TableCell>
      <TableCell>{box.lastModifiedBy}</TableCell>
      {boxIndex === 0 && (
        <>
          <TableCell rowSpan={boxQty}>{warehouses[item.batch.warehouse]}</TableCell>
          <TableCell rowSpan={boxQty}>{DeliveryTypeByCode[item.batch.deliveryMethod]}</TableCell>
          <TableCell rowSpan={boxQty}>{'trackId'}</TableCell>
        </>
      )}
    </TableRow>
  ))
}
