import React from 'react'

import {Button, Chip, Checkbox} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {formatDate, formatDateDistanceFromNow} from '@utils/date-time'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, trimBarcode} from '@utils/text'

import {useClassNames} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

export const TableBodyRow = ({item, itemIndex, handlers, rowsDatas}) => {
  const classNames = useClassNames()
  return (
    <TableRow key={item._id} hover role="checkbox">
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
              alt="placeholder"
              className={classNames.img}
              src={item.images && item.images[0] && getAmazonImageUrl(item.images[0])}
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
      <TableCell className={classNames.priceTableCell}>{toFixedWithDollarSign(item.amazon)}</TableCell>
      <TableCell>{formatDate(item.createdat)}</TableCell>
      <TableCell>{formatDate(item.checkedat)}</TableCell>
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
          className={clsx({[classNames.barcodeChipExists]: item.barCode})}
          size="small"
          label={item.barCode ? trimBarcode(item.barCode) : textConsts.setBarcodeChipLabel}
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
          {textConsts.exchangeBtn}
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
