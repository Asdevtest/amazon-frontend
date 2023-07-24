import React, { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { MenuItem, Select, TableCell, TableRow, Typography } from '@mui/material'

import { Input } from '@components/shared/input'

import { priceCalculation } from '@utils/calculation'
import { toFixedWithDollarSign } from '@utils/text'

import { styles } from './modal-table-body-row.style'

const ModalTableBodyRowRaw = ({ product, managersList, ...restProps }) => {
  const classNames = restProps.classes

  const [qty, setQty] = useState(product.qty)

  return (
    <TableRow>
      <TableCell className={classNames.imgCell}>
        <img alt="" src={product.categoryImg} className={classNames.img} />
      </TableCell>
      <TableCell className={classNames.categoryCell}>
        <Typography>{product.category}</Typography>
      </TableCell>
      <TableCell className={classNames.priceCell}>
        <Typography>{toFixedWithDollarSign(product.price + product.deliveryPrice)}</Typography>
      </TableCell>
      <TableCell>
        <Input
          value={qty}
          className={classNames.countCell}
          onChange={e => !(isNaN(e.target.value) || Number(e.target.value) < 0) && setQty(parseFloat(e.target.value))}
        />
      </TableCell>
      <TableCell className={classNames.avgPriceCell}>
        <Typography>{toFixedWithDollarSign(product.avgPrice)}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.recConsignmentQty}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.recConsignmentWeight}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.avgBSR}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.avgReviews}</Typography>
      </TableCell>
      <TableCell>
        <Typography>{product.avgRevenue}</Typography>
      </TableCell>
      <TableCell>
        <Typography className={classNames.costStart}>
          {priceCalculation(product.price, product.deliveryPrice, qty)}
        </Typography>
      </TableCell>
      <TableCell>
        <Select
          variant="filled"
          inputProps={{
            name: 'warehouse',
            id: 'warehouse',
          }}
          className={classNames.select}
          input={<Input />}
        >
          {managersList.map((managersItem, managersIndex) => (
            <MenuItem key={managersIndex} value={managersItem.value}>
              {managersItem.text}
            </MenuItem>
          ))}
        </Select>
      </TableCell>
    </TableRow>
  )
}

export const ModalTableBodyRow = withStyles(ModalTableBodyRowRaw, styles)
