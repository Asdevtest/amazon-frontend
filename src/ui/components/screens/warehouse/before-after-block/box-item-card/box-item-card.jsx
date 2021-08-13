import React from 'react'

import {Paper, Typography} from '@material-ui/core'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './box-item-card.style'

const textConsts = getLocalizedTexts(texts, 'ru').boxItemCard

export const BoxItemCard = ({item, superCount}) => {
  const classNames = useClassNames()

  return (
    <Paper className={classNames.root}>
      <div className={classNames.mainWrapper}>
        <img className={classNames.img} src={item.product?.images[0] && getAmazonImageUrl(item.product.images[0])} />

        <div className={classNames.attributeWrapper}>
          <div className={classNames.countWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.count}</Typography>
            <Input readOnly classes={{root: classNames.inputWrapper, input: classNames.input}} value={item.amount} />
            {superCount > 1 && <Typography className={classNames.superCount}>{`x ${superCount}`}</Typography>}
          </div>

          <div className={classNames.chipWrapper}>
            <Typography className={classNames.subTitle}>{textConsts.barCode}</Typography>
            <Typography className={classNames.barCodeField}>{item.product.barCode || 'N/A'}</Typography>
          </div>
        </div>
      </div>

      <Typography className={classNames.title}>{item.product?.amazonTitle}</Typography>
    </Paper>
  )
}
