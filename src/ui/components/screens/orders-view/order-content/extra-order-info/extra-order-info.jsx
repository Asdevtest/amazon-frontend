import React from 'react'

import {Typography} from '@material-ui/core'

import {TranslationKey} from '@constants/translations/translation-key'

import {PhotoCarousel} from '@components/custom-carousel/custom-carousel'
import {Field} from '@components/field'

import {t} from '@utils/translations'

import {useClassNames} from './extra-order-info.style'

export const ExtraOrderInfo = ({order}) => {
  const classNames = useClassNames()

  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.imagesWrapper}>
        <div className={classNames.photoWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Order photos:'])}</Typography>

          <PhotoCarousel files={order.images} />
        </div>

        <div className={classNames.photoWrapper}>
          <Typography className={classNames.subTitle}>{t(TranslationKey['Photos of current supplier'])}</Typography>

          <PhotoCarousel files={order.orderSupplier?.images} />
        </div>
      </div>

      <div className={classNames.commentsWrapper}>
        <Typography>{t(TranslationKey.Comments)}</Typography>

        <Field
          disabled
          multiline
          rows={6}
          rowsMax={6}
          value={order.buyerComment}
          inputClasses={classNames.input}
          label={t(TranslationKey.Buyer)}
        />

        <Field
          disabled
          multiline
          rows={6}
          rowsMax={6}
          value={order.clientComment}
          inputClasses={classNames.input}
          label={t(TranslationKey.Client)}
        />
      </div>
    </div>
  )
}
