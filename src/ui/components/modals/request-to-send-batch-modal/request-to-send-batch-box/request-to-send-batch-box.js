import React from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'

import {DeliveryTypeByCode} from '@constants/delivery-options'
import {warehouses} from '@constants/warehouses'

import {ErrorButton} from '@components/buttons/error-button/error-button'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'

import {useClassNames} from './request-to-send-batch-box.styles'

export const RequestToSendBatchBox = ({index, box, price, onClickRemoveBoxFromBatch}) => {
  const classNames = useClassNames()
  const amazonTitleShort =
    box.items[0].product.amazonTitle.length > 30
      ? `${box.items[0].product.amazonTitle.slice(0, 30)}...`
      : box.items[0].product.amazonTitle
  const tableCellClsx = clsx(classNames.tableCell, {[classNames.boxNoPrice]: !price})
  return (
    <tr className={classNames.box}>
      <td className={tableCellClsx}>
        <Typography variant="subtitle2">{index + 1}</Typography>
      </td>
      <td className={tableCellClsx}>
        <div className={classNames.imgWrapper}>
          <img
            src={box.items[0].product.images[0] && getAmazonImageUrl(box.items[0].product.images[0])}
            className={classNames.img}
          />
        </div>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="h5">{amazonTitleShort}</Typography>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{`BoxId: ${box._id}`}</Typography>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{warehouses[box.warehouse]}</Typography>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{DeliveryTypeByCode[box.deliveryMethod]}</Typography>
      </td>
      <td className={tableCellClsx}>
        <Typography variant="subtitle1">{`${box.items[0].amount}шт.`}</Typography>
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
