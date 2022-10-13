import {Button, Chip} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import React from 'react'

import DeleteIcon from '@material-ui/icons/Delete'
import {withStyles} from 'tss-react/mui'

import {ProductStatusByCode} from '@constants/product-status'

import {formatDateDistanceFromNow} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign} from '@utils/text'
import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

import calculateSrc from './assets/calculate.svg'
import {styles} from './table-body-row.style'

const TableBodyRowRaw = ({item, itemIndex, handlers, ...restProps}) => {
  const classNames = restProps.classes
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
    <TableRow key={item.asin} hover className={classNames.row} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          <div>
            <img
              alt=""
              className={classNames.img}
              src={item.images && item.images[0] && getAmazonImageUrl(item.images[0])}
            />
          </div>
          <div>
            <Typography className={classNames.csCodeTypo}>{item.amazonTitle}</Typography>
            <Typography className={classNames.typoCell}>
              {'ASIN '}
              <span className={classNames.typoSpan}>{item.id}</span>
              {` | ${formatDateDistanceFromNow(item.createdAt)}`}
            </Typography>
            <Chip className={classNames.chip} label={item.category} />
          </div>
        </div>
      </TableCell>
      <TableCell className={classNames.priceTableCell}>{ProductStatusByCode[item.status]}</TableCell>
      <TableCell className={classNames.priceTableCell}>{toFixedWithDollarSign(item.amazon)}</TableCell>
      <TableCell className={classNames.feesTableCell}>
        <div>
          <Typography className={classNames.typoCell}>
            {'Fees '}
            <span className={classNames.typoSpan}>{toFixedWithDollarSign(item.fbafee)}</span>
          </Typography>
          <Typography className={classNames.typoCell}>
            {'Net '}
            {/* что за поле */}
            <span className={classNames.typoSpan}>{toFixedWithDollarSign(item.reffee)}</span>
          </Typography>
          <Button
            disableElevation
            className={classNames.cellBtn}
            startIcon={<img alt="calculate icon" src={calculateSrc} />}
          >
            Calculate fees
          </Button>
        </div>
      </TableCell>
      <TableCell className={classNames.revenueCell}>{toFixedWithDollarSign(item.profit)}</TableCell>
      <TableCell className={classNames.amazonCell}>{toFixedWithDollarSign(item.amazon)}</TableCell>
      <TableCell className={classNames.bsrCell}>{item.bsr}</TableCell>
      <TableCell className={classNames.bsrCell}>{toFixedWithDollarSign(item.fbaamount)}</TableCell>
      <TableCell className={classNames.deleteBtnCell}>
        <IconButton onClick={() => alert('Item deleting...')}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export const TableBodyRow = withStyles(TableBodyRowRaw, styles)
