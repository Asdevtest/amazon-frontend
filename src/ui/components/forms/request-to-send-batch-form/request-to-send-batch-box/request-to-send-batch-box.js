import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {warehouses} from '@constants/warehouses'

import {ErrorButton} from '@components/buttons/error-button/error-button'

import {getShortenStringIfLongerThanCount} from '@utils/change-string-length'
import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

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
        <div className={classNames.imgWrapper}>
          {box.items.map((item, idx) => (
            <img
              key={idx}
              src={item.product.images && getAmazonImageUrl(item.product.images[0])}
              className={classNames.img}
            />
          ))}
        </div>
      </td>
      <td className={tableCellClsx}>
        {box.items.map((item, idx) => (
          <Typography key={idx} variant="h5">{`${idx + 1}: ${getShortenStringIfLongerThanCount(
            item.product.amazonTitle,
            30,
          )}`}</Typography>
        ))}
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{`Реальный вес: ${box.tmpGrossWeight}кг; Объемный вес: ${box.volumeWeightKgWarehouse}кг; Финальный вес: ${box.tmpFinalWeight}кг`}</Typography>
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
        {price ? <Typography variant="h5">{`${price} $`}</Typography> : null}
      </td>
      <td className={classNames.tableCellCrossBtn}>
        <ErrorButton className={classNames.crossBtn} onClick={onClickRemoveBoxFromBatch}>
          X
        </ErrorButton>
      </td>
    </tr>
  )
}
