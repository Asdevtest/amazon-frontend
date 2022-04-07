import React from 'react'

import {Table, TableBody, TableCell, TableRow, Typography, Link} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getLocalizedTexts} from '@utils/get-localized-texts'
import {toFixed, checkAndMakeAbsoluteUrl} from '@utils/text'

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
        <OrderParameter label={textConsts.minPrice} value={toFixed(order.product.minpurchase, 2)} />
        <OrderParameter label={textConsts.qty} value={order.amount} />
        <OrderParameter label={textConsts.minBuyPrice} value={toFixed(order.product.currentSupplier.price, 2)} />

        <TableRow>
          <TableCell className={classNames.parameterTableCell}>
            <Typography className={classNames.containerTitle}>{textConsts.supplier}</Typography>
          </TableCell>
          <TableCell className={classNames.parameterTableCell}>
            {order.product.currentSupplier.link === 'access denied' ? (
              <Typography className={classNames.scrollingText}>{order.product.currentSupplier.link}</Typography>
            ) : (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.product.currentSupplier.link)}>
                <Typography className={classNames.scrollingText}>{order.product.currentSupplier.link}</Typography>
              </Link>
            )}
          </TableCell>
        </TableRow>

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
        <OrderParameter label={textConsts.weight} value={toFixed(order.product.weight, 2)} />

        <TableRow>
          <TableCell className={classNames.parameterTableCell}>
            <Typography className={classNames.containerTitle}>{'Баркод'}</Typography>
          </TableCell>
          <TableCell className={classNames.parameterTableCell}>
            {order.product.barCode ? (
              <Link target="_blank" rel="noopener" href={checkAndMakeAbsoluteUrl(order.product.barCode)}>
                <Typography className={classNames.scrollingText}>{order.product.barCode}</Typography>
              </Link>
            ) : (
              <Typography className={classNames.scrollingText}>{'N/A'}</Typography>
            )}
          </TableCell>
        </TableRow>

        {collapsed && <OrderParameter label={textConsts.extraParam} value={textConsts.extraParamValue} />}
      </TableBody>
    </Table>
  )
}
