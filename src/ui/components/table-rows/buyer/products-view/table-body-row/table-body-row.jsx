import React from 'react'

import {Button, Chip, Checkbox} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'
import clsx from 'clsx'

import calculateSrc from '../assets/calculate.svg'
import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex}) => {
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
      <TableCell className={classNames.priceTableCell}>{'$' + item.price.toFixed(2)}</TableCell>
      <TableCell className={classNames.feesTableCell}>
        <div>
          <Typography className={classNames.typoCell}>
            {'Fees '}
            <span className={classNames.typoSpan}>{'$' + item.fees}</span>
          </Typography>
          <Typography className={classNames.typoCell}>
            {'Net '}
            <span className={classNames.typoSpan}>{'$' + (item.fees + 1)}</span>
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
          <Typography className={classNames.ratingTypo}>{item.rating.toFixed(1)}</Typography>
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
      <TableCell className={classNames.revenueCell}>{'$' + item.revenue.toFixed(2)}</TableCell>
      <TableCell className={classNames.amazonCell}>{'$' + item.amazonPrice.toFixed(2)}</TableCell>
      <TableCell className={classNames.bsrCell}>{'$' + item.bsr.toFixed(2)}</TableCell>
      <TableCell className={classNames.bsrCell}>{'$' + item.fba.toFixed(2)}</TableCell>
      <TableCell className={classNames.deleteBtnCell}>
        <IconButton onClick={() => alert('Item deleting...')}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
