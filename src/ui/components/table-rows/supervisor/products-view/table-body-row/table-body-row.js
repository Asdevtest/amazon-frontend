import React from 'react'

import {Button, Chip} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'

import {ProductStatus, ProductStatusByCode} from '@constants/product-status'

import {formatDate, formatDateDistanceFromNow} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign} from '@utils/text'
import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
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
  return (
    <TableRow
      key={item.asin}
      hover
      className={classNames.tableRow}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >
      <TableCell className={classNames.indexCell}>
        <Typography
          color={ProductStatusByCode[item.status] === ProductStatus.BUYER_FOUND_SUPPLIER ? 'primary' : 'textPrimary'}
        >
          {itemIndex + 1}
        </Typography>
      </TableCell>

      <TableCell className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          <div>
            <img
              alt="placeholder"
              className={classNames.img}
              src={item.images && item.images.length && getAmazonImageUrl(item.images[0])}
            />
          </div>
          <div>
            <Typography className={classNames.csCodeTypo}>{item.amazonTitle}</Typography>
            <Typography className={classNames.typoCell}>
              {'ASIN '}
              <span className={classNames.typoSpan}>{item.id}</span>
              {` | ${formatDateDistanceFromNow(item.createdat)}`}
            </Typography>
            <Chip className={classNames.chip} label={item.category} />
          </div>
        </div>
      </TableCell>
      <TableCell className={classNames.priceTableCell}>{ProductStatusByCode[item.status]}</TableCell>
      <TableCell className={classNames.priceTableCell}>{formatDate(item.createdat)}</TableCell>
      <TableCell className={classNames.priceTableCell}>
        {(item.updatedat && formatDate(item.updatedat)) || ''}
      </TableCell>
      <TableCell className={classNames.priceTableCell}>{toFixedWithDollarSign(item.amazon)}</TableCell>
      <TableCell>
        <Button
          color="primary"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            handlers.onClickResearcherName(item)
          }}
        >
          {item.createdby.name}
        </Button>
      </TableCell>
      <TableCell>
        <Button color="primary">{item.buyer ? item.buyer.name : 'N/A'}</Button>
      </TableCell>
      <TableCell className={classNames.bsrCell}>{item.bsr}</TableCell>
      <TableCell className={classNames.salersTotal}>{item.type}</TableCell>
      <TableCell className={classNames.rankTableCell}>{toFixedWithDollarSign(item.fbafee)}</TableCell>
      <TableCell className={classNames.deleteBtnCell}>
        <IconButton onClick={() => alert('Item deleting...')}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
