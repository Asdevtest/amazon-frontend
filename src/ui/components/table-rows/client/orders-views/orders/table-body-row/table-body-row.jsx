import React from 'react'

import {Box, Chip, TableCell, TableRow, Tooltip, Typography, Checkbox} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {texts} from '@constants/texts'
import {warehouses} from '@constants/warehouses'

import {Button} from '@components/buttons/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'

import {styles} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersTableRow

const TableBodyRowRaw = ({item, handlers, ...restProps}) => {
  const classNames = restProps.classes
  return (
    <TableRow onClick={() => handlers.onClickTableRow(item)}>
      <TableCell className={classNames.count}>
        <Typography>{item._id}</Typography>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>
        <div className={classNames.order}>
          <img alt="" src={item.product.images && item.product.images[0]} className={classNames.orderImg} />
          <div>
            <Typography className={classNames.orderTitle}>{item.product._id}</Typography>
            <Typography className={classNames.orderText}>
              <span className={classNames.orderTextSpan}>{textConsts.id}</span>
              {item.product.id}
            </Typography>
          </div>
        </div>
      </TableCell>
      <TableCell>
        <Chip
          className={clsx(
            {
              root: classNames.orderChip,
              clickable: classNames.orderChipHover,
              deletable: classNames.orderChipHover,
              deleteIcon: classNames.orderChipIcon,
            },
            {[classNames.select]: item.chip},
          )}
          size="small"
          color={item.barCode ? 'primary' : 'default'}
          label={item.barCode ? item.barCode : textConsts.setBarcodeLabel}
          onClick={e => {
            e.stopPropagation()
            if (item.barCode) {
              navigator.clipboard.writeText(item.barCode)
            } else {
              handlers.onClickEditBarcode(item)
            }
          }}
          onDelete={item.barCode ? () => handlers.onClickDeleteBarcode(item) : undefined}
        />
      </TableCell>

      <TableCell>
        <Typography>{item.amount}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{warehouses[item.warehouse]}</Typography>
      </TableCell>
      <TableCell>
        {!item.boxId ? (
          <Button size="small">{textConsts.distributeBtn}</Button>
        ) : (
          <Box display="flex" alignItems="center">
            <Box mr={1.5}>
              {item.boxId.map((box, index) => (
                <Typography key={index}>{'ID: ' + box + ','}</Typography>
              ))}
            </Box>
            <div>
              <Typography>{item.boxQty + ' шт.'}</Typography>
            </div>
          </Box>
        )}
      </TableCell>
      <TableCell>
        <Typography>{toFixedWithDollarSign(item.product.delivery + item.product.amazon * item.amount)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{toFixedWithKg(item.weight)}</Typography>
      </TableCell>
      <TableCell>
        {item.grossWeight ? (
          <Typography>{toFixedWithKg(item.grossWeight)}</Typography>
        ) : (
          <Tooltip interactive placement="top" title={textConsts.titleToolTip} className={classNames.tooltip}>
            <Typography>?</Typography>
          </Tooltip>
        )}
      </TableCell>
      <TableCell>
        <Typography>{item.trackId}</Typography>
      </TableCell>
    </TableRow>
  )
}

export const TableBodyRow = withStyles(styles)(TableBodyRowRaw)
