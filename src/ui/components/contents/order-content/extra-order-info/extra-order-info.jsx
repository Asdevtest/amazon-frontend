import { Typography } from '@mui/material'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useClassNames } from './extra-order-info.style'

export const ExtraOrderInfo = ({ order, isClient, onChangeField, formFields }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.orderContainer}>
      <div className={classNames.photosWrapper}>
        <div className={classNames.photoWrapper}>
          <Text
            tooltipInfoContent={t(TranslationKey['Photos added by the buyer from the supplier when placing the order'])}
            className={classNames.subTitle}
            containerClasses={classNames.subTitleWrapper}
          >
            {t(TranslationKey['Order photos:'])}
          </Text>
          <div className={classNames.photoCarousel}>
            <PhotoAndFilesSlider withoutFiles customSlideHeight={75} files={order?.images} />
          </div>
        </div>
        <div className={classNames.photoWrapper}>
          <Text containerClasses={classNames.subTitleWrapper} className={classNames.subTitle}>
            {t(TranslationKey['Photos of current supplier']) + ':'}
          </Text>
          <div className={classNames.photoCarousel}>
            <PhotoAndFilesSlider withoutFiles customSlideHeight={75} files={order.orderSupplier?.images} />
          </div>
        </div>
        <div className={classNames.photoWrapper}>
          <Text containerClasses={classNames.subTitleWrapper} className={classNames.subTitle}>
            {t(TranslationKey['Supplier payment']) + ':'}
          </Text>
          <div className={classNames.photoCarousel}>
            <PhotoAndFilesSlider withoutFiles customSlideHeight={75} files={order?.paymentDetails} />
          </div>
        </div>
      </div>

      <div className={classNames.commentsWrapper}>
        <Typography className={classNames.commentsTitle}>{t(TranslationKey.Comments)}</Typography>

        <Field
          disabled
          multiline
          minRows={6}
          maxRows={6}
          value={order.buyerComment}
          inputClasses={classNames.input}
          containerClasses={classNames.textField}
          label={t(TranslationKey.Buyer)}
        />

        <Field
          multiline
          disabled={!(isClient && order.status <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])}
          minRows={6}
          maxRows={6}
          value={formFields.clientComment}
          containerClasses={classNames.textField}
          inputClasses={classNames.input}
          label={t(TranslationKey.Client)}
          onChange={onChangeField('clientComment')}
        />
      </div>
    </div>
  )
}
