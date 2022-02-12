import React from 'react'

import {Checkbox, TableCell, TableRow, Button, Chip, Typography} from '@material-ui/core'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {StarRating} from '@components/star-rating'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, trimBarcode} from '@utils/text'

import calculateSrc from '../assets/calculate.svg'
import {useClassNames} from './products-body-row.style'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

export const ProductsBodyRow = ({item, itemIndex, handlers}) => {
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
            <img alt="" className={classNames.img} src={item.img} />
          </div>
          <div>
            <Typography className={classNames.csCodeTypo}>{item.csCode}</Typography>
            <Typography className={classNames.typoCell}>
              {'ASIN '}
              <span className={classNames.typoSpan}>{item.asin}</span>
              {' | updated today'}
            </Typography>
            <Chip className={classNames.chip} label={item.category} />
          </div>
        </div>
      </TableCell>

      <TableCell className={classNames.priceTableCell}>{toFixedWithDollarSign(item.price)}</TableCell>

      <TableCell className={classNames.feesTableCell}>
        <div>
          <Typography className={classNames.typoCell}>
            {'Fees '}
            <span className={classNames.typoSpan}>{toFixedWithDollarSign(item.fbafee)}</span>
          </Typography>
          <Typography className={classNames.typoCell}>
            {'Net '}
            <span className={classNames.typoSpan}>{toFixedWithDollarSign(item.fbafee + 1)}</span>
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

      <TableCell className={classNames.supplierCell}>{item.supplier[0].name}</TableCell>

      <TableCell className={classNames.supervisorCell}>{item.supervisor.name}</TableCell>

      <TableCell className={classNames.researcherCell}>{item.researcher.name}</TableCell>

      <TableCell className={classNames.buyerCell}>{item.buyer.name}</TableCell>

      <TableCell className={classNames.rankTableCell}>{'#' + item.rank}</TableCell>

      <TableCell className={classNames.ratingTableCell}>
        <StarRating rating={item.rating} />
        <Typography className={classNames.rankTypoReviews}>23.45 reviews</Typography>
      </TableCell>

      <TableCell className={classNames.salesCell}>{item.sales}</TableCell>

      <TableCell className={classNames.salersTotal}>{item.salersTotal}</TableCell>

      <TableCell className={classNames.salersTotal}>{item.type}</TableCell>

      <TableCell className={classNames.revenueCell}>{toFixedWithDollarSign(item.revenue)}</TableCell>
      <TableCell className={classNames.amazonCell}>{toFixedWithDollarSign(item.amazonPrice)}</TableCell>
      <TableCell className={classNames.bsrCell}>{item.bsr}</TableCell>
      <TableCell className={classNames.fbaFeeCell}>{toFixedWithDollarSign(item.fbafee)}</TableCell>
      <TableCell>
        <Chip
          classes={{
            root: classNames.barcodeChip,
            clickable: classNames.barcodeChipHover,
            deletable: classNames.barcodeChipHover,
            deleteIcon: classNames.barcodeChipIcon,
          }}
          className={clsx({[classNames.barcodeChipExists]: item.barcode})}
          size="small"
          label={item.barcode ? trimBarcode(item.barcode) : textConsts.setBarcodeChipLabel}
          onClick={() => handlers.onClickBarcode(item, itemIndex)}
          onDoubleClick={() => handlers.onDoubleClickBarcode(item, itemIndex)}
          onDelete={!item.barcode ? undefined : () => handlers.onDeleteBarcode(item, itemIndex)}
        />
      </TableCell>
    </TableRow>
  )
}
