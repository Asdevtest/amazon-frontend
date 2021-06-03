import React from 'react'

import {Box, Chip, TableCell, TableRow, Typography} from '@material-ui/core'

import {useClassNames} from './table-body-row.style'

export const TableBodyRow = ({item, itemIndex, handlers}) => {
  const classNames = useClassNames()
  return (
    <TableRow
      onClick={() => handlers.onSelector(itemIndex)}
      onDoubleClick={() => {
        handlers.onOrder()
      }}
    >
      <TableCell className={classNames.statusCell}>{item.status}</TableCell>
      <TableCell className={classNames.orderCell}>
        <div className={classNames.order}>
          <img alt="" src={item.img} className={classNames.orderImg} />
          <Box className={classNames.qtyBox}>
            <Typography className={classNames.text}>{item.asin + ','}</Typography>
            <Typography className={(classNames.text, classNames.qtyTypo)}>{item.qty}</Typography>
          </Box>
        </div>
      </TableCell>
      <TableCell className={classNames.chipCell}>
        <Chip
          classes={{
            root: classNames.orderChip,
            clickable: classNames.orderChipHover,
            deletable: classNames.orderChipHover,
            deleteIcon: classNames.orderChipIcon,
          }}
          style={{backgroundColor: item.barcode && 'rgb(61, 81, 112)'}}
          size="small"
          label={item.barcode ? item.barcode : 'Set barcode'}
          onClick={item.barcode ? () => navigator.clipboard.writeText(item.barcode) : () => handlers.onBarcode()}
          onDelete={item.barcode ? () => alert('Barcode deleting') : undefined}
        />
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.created}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.updated}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.destination}</Typography>
      </TableCell>
      <TableCell className={(classNames.cellPadding, classNames.centerCell)}>
        <Typography className={classNames.text}>{item.deliveryMethod}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.clientComment}</Typography>
      </TableCell>
      <TableCell className={classNames.cellPadding}>
        <Typography className={classNames.text}>{item.buyerComment}</Typography>
      </TableCell>
    </TableRow>
  )
}
