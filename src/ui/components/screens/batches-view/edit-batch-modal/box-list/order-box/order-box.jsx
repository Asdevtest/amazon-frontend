import React from 'react'

import {Box, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './order-box.style'

const textConsts = getLocalizedTexts(texts, 'en').batchesModalEditBoxList

export const OrderBox = ({order}) => {
  const classNames = useClassNames()

  return (
    <Box className={classNames.listBox}>
      <Box className={classNames.subListBox}>
        <img
          className={classNames.imgBox}
          src={getAmazonImageUrl(order.product.images?.[0])}
          alt={order.product.amazonTitle}
        />
        <Typography className={classNames.modalText}>{order.product.id}</Typography>
      </Box>
      <Typography className={classNames.modalText}>{order.product.amazonTitle}</Typography>
      <Typography className={classNames.modalText}>{`${textConsts.count} ${order.amount}`}</Typography>
    </Box>
  )
}
