import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {warehouses} from '@constants/warehouses'

import {ErrorButton} from '@components/buttons/error-button/error-button'

import {calcFinalWeightForBox} from '@utils/calculation'
import {getShortenStringIfLongerThanCount} from '@utils/change-string-length'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithDollarSign, toFixedWithKg} from '@utils/text'

import {useClassNames} from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = ({index, box, price, onClickRemoveBoxFromBatch}) => {
  const classNames = useClassNames()
  const tableCellClsx = clsx(classNames.tableCell, {[classNames.boxNoPrice]: !price})
  const noShippingLabelClsx = clsx({[classNames.noShippingLabel]: !box.shippingLabel})
  console.log(box)
  return (
    <tr className={classNames.box}>
      <td className={tableCellClsx}>
        <Typography variant="subtitle2">{index + 1}</Typography>
      </td>

      <td className={tableCellClsx}>
        <div className={classNames.boxWrapper}>
          {box.amount > 1 ? (
            <td className={classNames.boxItemWrapper}>
              <img
                src={box.items[0].product.images && getAmazonImageUrl(box.items[0].product.images[0])}
                className={classNames.img}
              />

              <Typography variant="h5">{`${getShortenStringIfLongerThanCount(
                box.items[0].product.amazonTitle,
                30,
              )}`}</Typography>

              <Typography variant="subtitle1">{`${box.items[0].amount}шт.`}</Typography>

              <Typography className={classNames.superBoxTypo}>{`Superbox x ${box.amount}`}</Typography>

              <Typography variant="subtitle1">{toFixedWithKg(box.items[0].product.weight, 2)}</Typography>
            </td>
          ) : (
            box.items.map((item, idx) => (
              <td key={idx} className={classNames.boxItemWrapper}>
                <img
                  src={item.product.images && getAmazonImageUrl(item.product.images[0])}
                  className={classNames.img}
                />

                <Typography variant="h5">{`${idx + 1}: ${getShortenStringIfLongerThanCount(
                  item.product.amazonTitle,
                  30,
                )}`}</Typography>

                <Typography variant="subtitle1">{`${item.amount}шт.`}</Typography>

                <Typography variant="subtitle1">{toFixedWithKg(item.product.weight, 2)}</Typography>
              </td>
            ))
          )}
        </div>
      </td>

      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{`Реальный вес: ${box.weighGrossKgWarehouse}кг; Объемный вес: ${
          box.volumeWeightKgWarehouse
        }кг; Финальный вес: ${calcFinalWeightForBox(box)}кг`}</Typography>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{`Склад: ${warehouses[box.warehouse]}`}</Typography>
        <Typography variant="subtitle1">{`Способ доставки: ${DeliveryTypeByCode[box.deliveryMethod]}`}</Typography>
        <Typography className={noShippingLabelClsx} variant="subtitle1">{`Shipping Label: ${
          box.shippingLabel ? box.shippingLabel : 'None'
        }`}</Typography>
      </td>
      <td className={tableCellClsx}>
        {box.items.map((item, idx) => (
          <Typography key={idx} variant="subtitle1">{`${item.amount}шт.`}</Typography>
        ))}
      </td>
      <td className={clsx(tableCellClsx, classNames.priceCellRight)}>
        {price ? <Typography variant="h5">{toFixedWithDollarSign(price, 2)}</Typography> : null}
      </td>
      <td className={classNames.tableCellCrossBtn}>
        <ErrorButton className={classNames.crossBtn} onClick={onClickRemoveBoxFromBatch}>
          X
        </ErrorButton>
      </td>
    </tr>
  )
}
