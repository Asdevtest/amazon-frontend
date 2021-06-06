import React from 'react'

import {Table, TableBody, TableCell, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './parameters.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderParameters

export const Parameters = ({order, collapsed}) => {
  const classNames = useClassNames()

  const OrderParameter = ({label, value}) => (
    <TableRow>
      <TableCell className={(classNames.parameterTableCell, classNames.labelCell)}>
        <Typography className={classNames.containerTitle}>{label}</Typography>
      </TableCell>
      <TableCell className={classNames.parameterTableCell}>
        <Typography className={classNames.text}>{value}</Typography>
      </TableCell>
    </TableRow>
  )

  return (
    <Table>
      <TableBody>
        <OrderParameter label={textConsts.minPrice} value={order.product.minPrice.toFixed(2)} />
        <OrderParameter label={textConsts.qty} value={order.qty} />
        <OrderParameter label={textConsts.minBuyPrice} value={order.product.minPrice.toFixed(2)} />
        <OrderParameter label={textConsts.supplier} value={order.product.supplier} />
        <OrderParameter label={textConsts.maxDeliveryPrice} value={order.product.maxDeliveryPrice.toFixed(2)} />
        <OrderParameter
          label={textConsts.sizes}
          value={
            order.product.width.toFixed(2) +
            ' x ' +
            order.product.height.toFixed(2) +
            ' x ' +
            order.product.length.toFixed(2)
          }
        />
        <OrderParameter label={textConsts.weight} value={order.product.weight.toFixed(3)} />
        {collapsed && <OrderParameter label={textConsts.extraParam} value={textConsts.extraParamValue} />}
      </TableBody>
    </Table>
  )
}
