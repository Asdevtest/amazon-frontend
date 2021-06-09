import React from 'react'

import {Button, Chip, Checkbox} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import StarIcon from '@material-ui/icons/Star'
import clsx from 'clsx'

import {useClickPreventionOnDoubleClick} from '@utils/use-click-prevent-on-double-click'

import calculateSrc from './calculate.svg'
import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers, selectedProducts}) => {
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
    <TableRow key={item.asin} hover role="checkbox" onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <TableCell className={classNames.indexCell}>
        <Typography>{itemIndex + 1}</Typography>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={selectedProducts.includes(itemIndex)}
          onClick={e => e.stopPropagation()}
          onChange={() => handlers.onSelectProduct(item, itemIndex)}
        />
      </TableCell>
      <TableCell className={classNames.asinCell}>
        <div className={classNames.asinCellContainer}>
          <div>
            <img
              alt="placeholder"
              className={classNames.img}
              src={item.images && item.images.length && item.images[0]}
            />
          </div>
          <div>
            <Typography className={classNames.csCodeTypo}>{item.amazonTitle}</Typography>
            <Typography className={classNames.typoCell}>
              {'ASIN '}
              <span className={classNames.typoSpan}>{item.id}</span>
              {' | updated today'}
            </Typography>
            <Chip className={classNames.chip} label={'Beauty & Personal Care'} />
          </div>
        </div>
      </TableCell>
      <TableCell className={classNames.priceTableCell}>{item.price ? '$' + item.price.toFixed(2) : ''}</TableCell>
      <TableCell className={classNames.feesTableCell}>
        <div>
          <Typography className={classNames.typoCell}>
            {'Fees '}
            <span className={classNames.typoSpan}>{item.fbafee ? '$' + item.fbafee : ''}</span>
          </Typography>
          <Typography className={classNames.typoCell}>
            {'Net '}
            <span className={classNames.typoSpan}>{item.fees ? '$' + (item.fees + 1) : ''}</span>
          </Typography>
          <Button
            disableElevation
            className={classNames.cellBtn}
            startIcon={<img alt="calculate icon" src={calculateSrc} />}
            onClick={e => {
              e.stopPropagation()
              handlers.onClickCalculateFees(item, itemIndex)
            }}
          >
            Calculate fees
          </Button>
        </div>
      </TableCell>
      <TableCell className={classNames.rankTableCell}>{item.rank ? '#' + item.rank : ''}</TableCell>
      <TableCell className={classNames.ratingTableCell}>
        <div className={classNames.ratingTableCellContainer}>
          <Typography className={classNames.ratingTypo}>{item.rating ? item.rating.toFixed(1) : ''}</Typography>
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
      <TableCell className={classNames.revenueCell}>{item.revenue ? '$' + item.revenue.toFixed(2) : ''}</TableCell>
      <TableCell className={classNames.amazonCell}>
        {item.amazonPrice ? '$' + item.amazonPrice.toFixed(2) : ''}
      </TableCell>
      <TableCell className={classNames.bsrCell}>{item.bsr ? '$' + item.bsr.toFixed(2) : ''}</TableCell>
      <TableCell className={classNames.bsrCell}>{item.fba ? '$' + item.fba.toFixed(2) : ''}</TableCell>
      <TableCell className={classNames.deleteBtnCell}>
        <IconButton onClick={() => alert('Item deleting...')}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}
