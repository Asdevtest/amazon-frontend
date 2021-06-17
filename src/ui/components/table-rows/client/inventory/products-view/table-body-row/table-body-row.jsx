import React from 'react'

import {Button, Chip, Checkbox} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed, toFixedWithDollarSign, trimBarcode} from '@utils/text'

import calculateSrc from '../assets/calculate.svg'
import {useClassNames} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
  return (
    <TableRow key={item.asin} hover role="checkbox">
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          <div>
            <img alt="placeholder" className={classNames.img} src={item.img} />
          </div>
          <div>
            <Typography className={classNames.csCodeTypo}>{item.csCode}</Typography>
            <Typography className={classNames.typoCell}>
              {'ASIN '}
              <span className={classNames.typoSpan}>{item.asin}</span>
              {' | updated today'}
            </Typography>
            <Chip className={classNames.chip} label={'Beauty & Personal Care'} />
          </div>
        </div>
      </TableCell>
      <TableCell className={classNames.priceTableCell}>{toFixedWithDollarSign(item.price)}</TableCell>
      <TableCell className={classNames.feesTableCell}>
        <div>
          <Typography className={classNames.typoCell}>
            {'Fees '}
            <span className={classNames.typoSpan}>{toFixedWithDollarSign(item.fees)}</span>
          </Typography>
          <Typography className={classNames.typoCell}>
            {'Net '}
            <span className={classNames.typoSpan}>{toFixedWithDollarSign(item.fees + 1)}</span>
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
      <TableCell className={classNames.rankTableCell}>{'#' + item.rank}</TableCell>
      <TableCell className={classNames.ratingTableCell}>
        <div className={classNames.ratingTableCellContainer}>
          <Typography className={classNames.ratingTypo}>{toFixed(item.rating)}</Typography>
          <div className={classNames.rankCount}>
            {[1, 2, 3, 4, 5].map(el => (
              <StarIcon
                key={el}
                className={clsx(classNames.startIcon, {
                  [classNames.selectedStarIcon]: Math.floor(item.rating) >= el === true,
                })}
              />
            ))}
          </div>
        </div>
        <Typography className={classNames.rankTypoReviews}>23.45 reviews</Typography>
      </TableCell>
      <TableCell className={classNames.salesCell}>{item.sales}</TableCell>
      <TableCell className={classNames.salersTotal}>{item.salersTotal}</TableCell>
      <TableCell className={classNames.salersTotal}>{item.type}</TableCell>
      <TableCell className={classNames.revenueCell}>{toFixedWithDollarSign(item.revenue)}</TableCell>
      <TableCell className={classNames.amazonCell}>{toFixedWithDollarSign(item.amazonPrice)}</TableCell>
      <TableCell className={classNames.bsrCell}>{toFixedWithDollarSign(item.bsr)}</TableCell>
      <TableCell className={classNames.bsrCell}>{toFixedWithDollarSign(item.fba)}</TableCell>
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
