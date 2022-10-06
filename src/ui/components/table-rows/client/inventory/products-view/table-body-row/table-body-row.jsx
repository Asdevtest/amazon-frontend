import {cx} from '@emotion/css'
import {Button, Chip, Checkbox} from '@mui/material'
import IconButton from '@mui/material/IconButton'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'

import React from 'react'

import DeleteIcon from '@material-ui/icons/Delete'

import {TranslationKey} from '@constants/translations/translation-key'

import {formatDate, formatDateDistanceFromNow} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, trimBarcode} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers, rowsDatas}) => {
  const {classes: classNames} = useClassNames()
  return (
    <TableRow
      key={item._id}
      hover
      className={classNames.row}
      role="checkbox"
      onDoubleClick={() => handlers.onDoubleClickRow(item)}
    >
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={rowsDatas.selectedProducts.includes(item._id)}
          onChange={() => handlers.onCheckbox(item._id)}
        />
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
      <TableCell className={classNames.priceTableCell}>{toFixedWithDollarSign(item.amazon)}</TableCell>
      <TableCell>{formatDate(item.createdAt)}</TableCell>
      <TableCell>{formatDate(item.checkedAt)}</TableCell>
      <TableCell className={classNames.revenueCell}>{toFixedWithDollarSign(item.profit)}</TableCell>
      <TableCell className={classNames.revenueCell}>{toFixedWithDollarSign(item.margin)}</TableCell>
      <TableCell className={classNames.bsrCell}>{item.bsr}</TableCell>
      <TableCell className={classNames.bsrCell}>{item.fbaamount}</TableCell>
      <TableCell>
        <Chip
          classes={{
            root: classNames.barcodeChip,
            clickable: classNames.barcodeChipHover,
            deletable: classNames.barcodeChipHover,
            deleteIcon: classNames.barcodeChipIcon,
          }}
          className={cx({[classNames.barcodeChipExists]: item.barCode})}
          size="small"
          label={item.barCode ? trimBarcode(item.barCode) : t(TranslationKey['Set Barcode'])}
          onClick={() => handlers.onClickBarcode(item, itemIndex)}
          onDoubleClick={() => handlers.onDoubleClickBarcode(item, itemIndex)}
          onDelete={!item.barCode ? undefined : () => handlers.onDeleteBarcode(item, itemIndex)}
        />
      </TableCell>
      <TableCell>
        <Button
          disableElevation
          color="primary"
          variant="contained"
          onClick={() => handlers.onClickExchange(item, itemIndex)}
        >
          {t(TranslationKey.Listing)}
        </Button>
      </TableCell>
      <TableCell className={classNames.deleteBtnCell}>
        <IconButton onClick={() => alert('Item deleting...')}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
