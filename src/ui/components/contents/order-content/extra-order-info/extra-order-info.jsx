import { Typography } from '@mui/material'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { useStyles } from './extra-order-info.style'

export const ExtraOrderInfo = ({ order, isClient, onChangeField, formFields }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.orderContainer}>
      <div className={styles.photosWrapper}>
        <div className={styles.photoWrapper}>
          <Text
            tooltipInfoContent={t(TranslationKey['Photos added by the buyer from the supplier when placing the order'])}
            className={styles.subTitle}
            containerClasses={styles.subTitleWrapper}
          >
            {t(TranslationKey['Order photos']) + ':'}
          </Text>

          <PhotoAndFilesSlider withoutFiles customSlideHeight={75} files={order?.images} />
        </div>
        <div className={styles.photoWrapper}>
          <Text containerClasses={styles.subTitleWrapper} className={styles.subTitle}>
            {t(TranslationKey['Photos of current supplier']) + ':'}
          </Text>

          <PhotoAndFilesSlider withoutFiles customSlideHeight={75} files={order.orderSupplier?.images} />
        </div>
        <div className={styles.photoWrapper}>
          <Text containerClasses={styles.subTitleWrapper} className={styles.subTitle}>
            {t(TranslationKey['Supplier payment']) + ':'}
          </Text>

          <PhotoAndFilesSlider withoutFiles customSlideHeight={75} files={order?.paymentDetails} />
        </div>
      </div>

      <div className={styles.commentsWrapper}>
        <Typography className={styles.commentsTitle}>{t(TranslationKey.Comments)}</Typography>

        <Field
          disabled
          multiline
          minRows={6}
          maxRows={6}
          value={order.buyerComment}
          inputClasses={styles.input}
          containerClasses={styles.textField}
          label={t(TranslationKey.Buyer)}
        />

        <Field
          multiline
          disabled={!(isClient && order.status <= OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT])}
          minRows={6}
          maxRows={6}
          value={formFields.clientComment}
          containerClasses={styles.textField}
          inputClasses={styles.input}
          label={t(TranslationKey.Client)}
          onChange={onChangeField('clientComment')}
        />
      </div>
    </div>
  )
}
