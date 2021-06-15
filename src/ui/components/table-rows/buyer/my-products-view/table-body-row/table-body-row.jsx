import React from 'react'

import {Button, Chip, Checkbox} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {toFixed, toFixedWithDollarSign} from '@utils/text'
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
    <TableRow key={item.asin} hover role="checkbox" onClick={handleClick} onDoubleClick={handleDoubleClick}>
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
              <span className={classNames.typoSpan}>{item.id}</span>
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
            <span className={classNames.typoSpan}>{toFixedWithDollarSign(item.fees)}</span>
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
      <TableCell className={classNames.rankTableCell}>{item.rank ? '#' + item.rank : ''}</TableCell>
      <TableCell className={classNames.ratingTableCell}>
        <div className={classNames.ratingTableCellContainer}>
          <Typography className={classNames.ratingTypo}>{toFixed(item.rating, 1)}</Typography>
          <div className={classNames.rankCount}>
            {Array(5)
              .fill(true)
              .map((el, index) => (
                <StarIcon
                  key={`star_${index}`}
                  className={clsx(classNames.startIcon, {
                    [classNames.selectedStarIcon]: Math.floor(item.rating) >= index === true,
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
      <TableCell className={classNames.amazonCell}>{toFixedWithDollarSign(item.amazon)}</TableCell>
      <TableCell className={classNames.bsrCell}>{toFixedWithDollarSign(item.bsr)}</TableCell>
      <TableCell className={classNames.bsrCell}>{toFixedWithDollarSign(item.fba)}</TableCell>
      <TableCell className={classNames.deleteBtnCell}>
        <IconButton onClick={() => alert('Item deleting...')}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

export const TableBodyRow = withStyles(styles)(TableBodyRowRaw)
