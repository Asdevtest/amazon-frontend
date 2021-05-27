import React from 'react'

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {priceCalculation} from '@utils/price-calculation'

import {useClassNames} from './table-supplier.style'

const textConsts = getLocalizedTexts(texts, 'ru').productWrapperComponent

export const TableSupplier = ({suppliers, selected, onClickSupplier}) => {
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
            <TableCell className={classNames.alignRight}>{textConsts.tableCost}</TableCell>
            <TableCell className={classNames.alignCenter}>{textConsts.tableComment}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {suppliers.length !== 0 ? (
            suppliers.map((supplier, index) => (
              <TableRow key={index} selected={index === selected} onClick={() => onClickSupplier(index)}>
                <TableCell className={(classNames.alignCenter, classNames.tableCellPadding)}>{supplier.name}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.link}</TableCell>
                <TableCell className={classNames.alignRight}>{'$' + supplier.price.toFixed(2)}</TableCell>
                <TableCell className={classNames.alignRight}>{'$' + supplier.deliveryPrice.toFixed(2)}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.qty}</TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.minQty}</TableCell>
                <TableCell className={classNames.alignCenter}>
                  {'$' + priceCalculation(supplier.price, supplier.deliveryPrice, supplier.qty)}
                </TableCell>
                <TableCell className={classNames.alignCenter}>{supplier.comment}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableCell className={(classNames.alignCenter, classNames.tableCellPadding)} colSpan={8}>
              {textConsts.tableCellNoVendors}
            </TableCell>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
