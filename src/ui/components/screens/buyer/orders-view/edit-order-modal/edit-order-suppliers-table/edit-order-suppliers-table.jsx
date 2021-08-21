import React from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'
import {toFixedWithDollarSign, withDollarSign} from '@utils/text'

import {useClassNames} from './edit-order-suppliers-table.style'

const textConsts = getLocalizedTexts(texts, 'ru').editOrderSuppliersTable

export const EditOrderSuppliersTable = observer(({suppliers, selectedSupplier}) => {
  const classNames = useClassNames()

  return (
    <TableContainer className={classNames.table}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={(classNames.tableCellPadding, classNames.alignCenter)}>
              {textConsts.tableName}
            </TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableLink}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tablePrice}</TableCell>
            <TableCell className={classNames.alignRight}>{textConsts.tableSheep}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableCount}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableMinBatch}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableBatchCost}</TableCell>
            <TableCell className={classNames.alignRight}>{textConsts.tableCost}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableComment}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers && suppliers.length ? (
            suppliers.map((supplier, index) => (
              <TableRow
                key={`supplier_${supplier.id}_${index}`}
                className={clsx({
                  [classNames.tableRowAcceptedSupplier]: selectedSupplier._id === supplier._id,
                })}
              >
                <TableCell className={(classNames.alignCenter, classNames.tableCellPadding)}>{supplier.name}</TableCell>
                <TableCell className={classNames.alignCenter}>
                  <Typography className={classNames.link}>{supplier.link}</Typography>
                </TableCell>
                <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(supplier.price)}</TableCell>
                <TableCell className={classNames.alignRight}>{toFixedWithDollarSign(supplier.delivery)}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.amount}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.minlot}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.lotcost}</TableCell>
                <TableCell className={classNames.alignCenter}>
                  {withDollarSign(priceCalculation(supplier.price, supplier.delivery, supplier.amount))}
                </TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.comment}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className={(classNames.alignCenter, classNames.tableCellPadding)} colSpan={8}>
                {textConsts.tableCellNoVendors}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
})
