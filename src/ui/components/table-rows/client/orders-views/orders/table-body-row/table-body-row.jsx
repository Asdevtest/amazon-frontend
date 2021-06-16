import React from 'react'

import {Box, Chip, TableCell, TableRow, Tooltip, Typography, Checkbox} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'
import clsx from 'clsx'

import {texts} from '@constants/texts'

import {Button} from '@components/buttons/button'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'

import {styles} from './table-body-row.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrdersTableRow

const TableBodyRowRaw = ({item, handlers, ...restProps}) => {
  const classNames = restProps.classes
  return (
    <TableRow>
      <TableCell className={classNames.count}>
        <Typography>{item.orderId}</Typography>
      </TableCell>
      <TableCell padding="checkbox">
        <Checkbox />
      </TableCell>
      <TableCell>
        <div className={classNames.order}>
          <img alt="" src={item.img} className={classNames.orderImg} />
          <div>
            <Typography className={classNames.orderTitle}>{item.csCode}</Typography>
            <Typography className={classNames.orderText}>
              <span className={classNames.orderTextSpan}>{textConsts.asinTypo}</span>
              {item.product}
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
          label={item.chip ? item.chip : textConsts.setBarcodeLabel}
          onClick={item.chip ? () => navigator.clipboard.writeText(item.chip) : () => handlers.onClickBarcode()}
          onDelete={item.chip ? () => alert(textConsts.barcodeDeleteAlert) : undefined}
        />
      </TableCell>

      <TableCell>
        <Typography>{item.amount}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{item.warehouse}</Typography>
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
        <Typography>{toFixedWithDollarSign(item.deliveryCostToTheWarehouse)}</Typography>
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
