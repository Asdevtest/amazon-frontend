import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {warehouses} from '@constants/warehouses'

import {ErrorButton} from '@components/buttons/error-button/error-button'

import {calcFinalWeightForBox} from '@utils/calculation'
import {getShortenStringIfLongerThanCount} from '@utils/change-string-length'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {toFixedWithKg} from '@utils/text'

import {useClassNames} from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = ({index, box, price, onClickRemoveBoxFromBatch}) => {
  const classNames = useClassNames()
  const tableCellClsx = clsx(classNames.tableCell, {[classNames.boxNoPrice]: !price})

  return (
    <tr className={classNames.box}>
      <td className={tableCellClsx}>
        <Typography variant="subtitle2">{index + 1}</Typography>
      </td>

      <td className={tableCellClsx}>
        <div className={classNames.boxWrapper}>
          {box.items.map((item, idx) => (
            <td key={idx} className={classNames.boxItemWrapper}>
              <img src={item.product.images && getAmazonImageUrl(item.product.images[0])} className={classNames.img} />

              <Typography key={idx} variant="h5">{`${idx + 1}: ${getShortenStringIfLongerThanCount(
                item.product.amazonTitle,
                30,
              )}`}</Typography>

              <Typography variant="subtitle1">{`${item.amount}шт.`}</Typography>

              <Typography variant="subtitle1">{toFixedWithKg(item.product.weight, 2)}</Typography>
            </td>
          ))}
        </div>
      </td>

      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{`Реальный вес: ${box.weighGrossKgWarehouse}кг; Объемный вес: ${
          box.volumeWeightKgWarehouse
        }кг; Финальный вес: ${calcFinalWeightForBox(box)}кг`}</Typography>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{warehouses[box.warehouse]}</Typography>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{DeliveryTypeByCode[box.deliveryMethod]}</Typography>
      </td>    
      <td className={tableCellClsx}>
        {box.items.map((item, idx) => (
          <Typography key={idx} variant="subtitle1">{`${item.amount}шт.`}</Typography>
        ))}
      </td>
      <td className={clsx(tableCellClsx, classNames.tableCellRight)}>
        {price ? <Typography variant="h5">{`${price.toFixed(2)} $`}</Typography> : null}

      </td>
      <td className={classNames.tableCellCrossBtn}>
        <ErrorButton className={classNames.crossBtn} onClick={onClickRemoveBoxFromBatch}>
          X
        </ErrorButton>
      </td>
    </tr>
  )
}
