import React, {useState} from 'react'

import {Typography, TableRow, TableCell, NativeSelect} from '@material-ui/core'
import {withStyles} from '@material-ui/styles'

import {Input} from '@components/input'

import {priceCalculation} from '@utils/price-calculation'

import {styles} from './modal-table-body-row.style'

const ModalTableBodyRowRaw = ({product, managersList, ...restProps}) => {
  const classNames = restProps.classes
  const [qty, setQty] = useState(product.qty)
  const handleInput = e => setQty(e.target.value)
  return (
    <TableRow>
      <TableCell className={classNames.imgCell}>
        <img alt="" src={product.categoryImg} className={classNames.img} />
      </TableCell>
      <TableCell className={classNames.categoryCell}>
        <Typography>{product.category}</Typography>
      </TableCell>
      <TableCell className={classNames.priceCell}>
        <Typography>{(product.price + product.deliveryPrice).toFixed(2)}</Typography>
      </TableCell>
      <TableCell>
        <Input
          type="number"
          value={qty}
          inputProps={{min: 0}}
          className={classNames.countCell}
          onChange={e => handleInput(e)}
        />
      </TableCell>
      <TableCell className={classNames.avgPriceCell}>
        <Typography>{product.avgPrice.toFixed(2)}</Typography>
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
        <NativeSelect
          variant="filled"
          inputProps={{
            name: 'warehouse',
            id: 'warehouse',
          }}
          className={classNames.select}
          input={<Input />}
        >
          {managersList.map((managersItem, managersIndex) => (
            <option key={managersIndex} value={managersItem.value}>
              {managersItem.text}
            </option>
          ))}
        </NativeSelect>
      </TableCell>
    </TableRow>
  )
}

export const ModalTableBodyRow = withStyles(styles)(ModalTableBodyRowRaw)
