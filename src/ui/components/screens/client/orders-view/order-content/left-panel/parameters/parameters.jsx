import React from 'react'

import {Table, TableBody, TableCell, TableRow, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed} from '@utils/text'

import {useClassNames} from './parameters.style'

const textConsts = getLocalizedTexts(texts, 'ru').clientOrderParameters

export const Parameters = ({order, collapsed}) => {
  const classNames = useClassNames()

  const OrderParameter = ({label, value}) => (
    <TableRow>
      <TableCell className={classNames.parameterTableCell}>
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
        <OrderParameter label={textConsts.minPrice} value={order.product.minpurchase} />
        <OrderParameter label={textConsts.qty} value={order.amount} />
        <OrderParameter label={textConsts.minBuyPrice} value={toFixed(order.product.currentSupplier.price)} />
        <OrderParameter label={textConsts.supplier} value={order.product.currentSupplier.link} />
        <OrderParameter label={textConsts.maxDeliveryPrice} value={toFixed(order.product.currentSupplier.delivery)} />
        <OrderParameter
          label={textConsts.sizes}
          value={
            order.product.width && order.product.height && order.product.length
              ? toFixed(order.product.width, 2) +
                ' x ' +
                toFixed(order.product.height, 2) +
                ' x ' +
                toFixed(order.product.length, 2)
              : 'undefined'
          }
        />
        <OrderParameter label={textConsts.weight} value={toFixed(order.product.weight, 3)} />

        <TableRow>
          <TableCell className={classNames.parameterTableCell}>
            <Typography className={classNames.containerTitle}>{'Баркод'}</Typography>
          </TableCell>
          <TableCell className={classNames.parameterTableCell}>
            <Typography className={classNames.barCodeText}>{order.product.barCode}</Typography>
          </TableCell>
        </TableRow>

        {collapsed && <OrderParameter label={textConsts.extraParam} value={textConsts.extraParamValue} />}
      </TableBody>
    </Table>
  )
}
