import { useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { MenuItem, Select, TableCell, TableRow, Typography } from '@mui/material'

import { Input } from '@components/shared/input'

import { priceCalculation } from '@utils/calculation'
import { toFixedWithDollarSign } from '@utils/text'

import { styles } from './modal-table-body-row.style'

const ModalTableBodyRowRaw = ({ product, managersList, ...restProps }) => {
  const styles = restProps.classes

  const [qty, setQty] = useState(product.qty)

  return (
    <TableRow>
      <TableCell className={styles.imgCell}>
        <img alt="" src={product.categoryImg} className={styles.img} />
      </TableCell>
      <TableCell className={styles.categoryCell}>
        <Typography>{product.category}</Typography>
      </TableCell>
      <TableCell className={styles.priceCell}>
        <Typography>{toFixedWithDollarSign(product.price + product.deliveryPrice)}</Typography>
      </TableCell>
      <TableCell>
        <Input
          value={qty}
          className={styles.countCell}
          onChange={e => !(isNaN(e.target.value) || Number(e.target.value) < 0) && setQty(parseFloat(e.target.value))}
        />
      </TableCell>
      <TableCell className={styles.avgPriceCell}>
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
        <Typography className={styles.costStart}>
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
          className={styles.select}
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
