import React from 'react'

import {TableCell, TableRow} from '@material-ui/core'
import clsx from 'clsx'

import {ProductStatus, ProductStatusByKey, ProductStatusByCode} from '@constants/product-status'

import {formatDate} from '@utils/date-time'
import {toFixed} from '@utils/text'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, handlers}) => {
  const classNames = useClassNames()

  return (
    <TableRow
      hover
      className={clsx(classNames.tableRow, {
        [classNames.noClickable]: item.status > ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH],
      })}
      onClick={() => handlers.onClickTableRow(item)}
    >
      <TableCell>{item.id}</TableCell>
      <TableCell>{ProductStatusByCode[item.status]}</TableCell>
      <TableCell>{formatDate(item.createdAt)}</TableCell>
      <TableCell>{toFixed(item.amazon)}</TableCell>
      <TableCell>{item.bsr}</TableCell>
    </TableRow>
  )
}
