import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { t } from '@utils/translations'

import { useStyles } from './extra-order-info.style'

export const ExtraOrderInfo = ({ order, isClient, onChangeField, formFields }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.orderContainer}>
      <div className={styles.photosWrapper}>
        <div className={styles.photoWrapper}>
          <p
            title={t(TranslationKey['Photos added by the buyer from the supplier when placing the order'])}
            className={styles.subTitle}
          >
            {t(TranslationKey['Order photos']) + ':'}
          </p>

          <SlideshowGallery hiddenPreviews slidesToShow={1} files={order?.images} />
        </div>
        <div className={styles.photoWrapper}>
          <p className={styles.subTitle}>{t(TranslationKey['Photos of current supplier']) + ':'}</p>

          <SlideshowGallery hiddenPreviews slidesToShow={1} files={order.orderSupplierCard?.images} />
        </div>
        <div className={styles.photoWrapper}>
          <p className={styles.subTitle}>{t(TranslationKey['Supplier payment']) + ':'}</p>

          <SlideshowGallery hiddenPreviews slidesToShow={1} files={order?.paymentDetails} />
        </div>
      </div>

      <div className={styles.commentsWrapper}>
        <p className={styles.commentsTitle}>{t(TranslationKey.Comments)}</p>

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
