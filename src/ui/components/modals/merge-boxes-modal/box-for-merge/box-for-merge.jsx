import React from 'react'

import {IconButton, InputLabel, Typography} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'

import {TranslationKey} from '@constants/translations/translation-key'

import {Input} from '@components/input'

import {getAmazonImageUrl} from '@utils/get-amazon-image-url'
import {getFullTariffTextForBoxOrOrder} from '@utils/text'
import {t} from '@utils/translations'

import {useClassNames} from './box-for-merge.style'

export const BoxForMerge = ({box, readOnly = false, index, onRemoveBox}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.box}>
      <Typography className={classNames.boxTitle}>{`${t(TranslationKey.Box)} № ${box.humanFriendlyId}`}</Typography>
      <div className={classNames.itemsWrapper}>
        <div>
          {box.items.map((order, orderIndex) => (
            <div key={`box_${box._id}_${readOnly ? 1 : 0}_${index}`}>
              <div key={orderIndex} className={classNames.order}>
                <img
                  className={classNames.img}
                  src={order.product.images && order.product.images[0] && getAmazonImageUrl(order.product.images[0])}
                />
                <Typography className={classNames.title}>{order.product.amazonTitle}</Typography>
                <Typography className={classNames.subTitle}>{t(TranslationKey.Quantity)}</Typography>
                <Input
                  disabled
                  classes={{root: classNames.inputWrapper, input: classNames.input}}
                  readOnly={readOnly}
                  value={order.amount}
                />
              </div>
            </div>
          ))}
        </div>

        <div>
          <InputLabel className={classNames.modalText}>{t(TranslationKey.Warehouse)}</InputLabel>

          <Typography variant="h6">{box.destination?.name}</Typography>
        </div>

        <div>
          <InputLabel className={classNames.modalText}>{t(TranslationKey['Int warehouse'])}</InputLabel>

          <Typography variant="h6">{box.storekeeper?.name}</Typography>
        </div>

        <div>
          <InputLabel className={classNames.modalText}>{t(TranslationKey.Tariff)}</InputLabel>

          <Typography variant="h6">{getFullTariffTextForBoxOrOrder(box)}</Typography>
        </div>

        <IconButton onClick={() => onRemoveBox(box._id)}>
          <DeleteIcon className={classNames.deleteBtn} />
        </IconButton>
      </div>
    </div>
  )
}
