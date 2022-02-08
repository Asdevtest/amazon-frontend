import React from 'react'

import {Checkbox, Typography} from '@material-ui/core'
import clsx from 'clsx'

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
  const noShippingLabelGlueClsx = clsx({[classNames.noShippingLabel]: !box.isShippingLabelAttachedByStorekeeper})

  return (
    <tr className={classNames.box}>
      <td className={clsx(tableCellClsx, classNames.indexCell)}>
        <Typography variant="subtitle2">{index + 1}</Typography>
      </td>

      <td className={clsx(tableCellClsx, classNames.productCell)}>
        <div className={classNames.boxWrapper}>
          {box.amount > 1 ? (
            <td className={classNames.boxItemWrapper}>
              <img src={getAmazonImageUrl(box.items[0].product.images[0])} className={classNames.img} />

              <Typography className={classNames.amazonTitle}>{`${getShortenStringIfLongerThanCount(
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
                <img src={getAmazonImageUrl(item.product.images[0])} className={classNames.img} />

                <Typography className={classNames.amazonTitle}>{`${idx + 1}: ${getShortenStringIfLongerThanCount(
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

      <td className={clsx(tableCellClsx, classNames.dementionsCell)}>
        <Typography variant="subtitle1">{`Реальный вес: ${toFixedWithKg(
          box.weighGrossKgWarehouse,
          2,
        )}; Объемный вес: ${toFixedWithKg(box.volumeWeightKgWarehouse, 2)}; Финальный вес: ${toFixedWithKg(
          calcFinalWeightForBox(box),
          2,
        )}`}</Typography>
      </td>
      <td className={clsx(tableCellClsx, classNames.shippingLabelCell)}>
        <div>
          <Typography className={noShippingLabelClsx} variant="subtitle1">
            {`Shipping Label: ${box.shippingLabel ? box.shippingLabel : 'None'}`}
          </Typography>

          <div className={classNames.checkboxWrapper}>
            <Typography className={noShippingLabelGlueClsx}>{'проклеен'}</Typography>

            <Checkbox disabled color="primary" checked={box.isShippingLabelAttachedByStorekeeper} />
          </div>
        </div>
      </td>
      <td className={clsx(tableCellClsx, classNames.amountCell)}>
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
