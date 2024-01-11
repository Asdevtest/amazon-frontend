import React from 'react'

import { orderPriority } from '@constants/orders/order-priority'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { FireIcon } from '@components/shared/svg-icons'

import { getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './order-info-tab.style'

export const OrderInfoTab = React.memo(({ formFields, onClickHsCode }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.wrapper}>
      {formFields?.items.map((item, index) => {
        const quantity = (formFields?.amount > 1 ? `${item.amount} * ${formFields?.amount}` : item.amount) || 0
        const barcodeChecked = item.isBarCodeAlreadyAttachedByTheSupplier || item.isBarCodeAttachedByTheStorekeeper
        const isTransparencyFileAlreadyAttachedByTheSupplier = item.isTransparencyFileAlreadyAttachedByTheSupplier
        const isTransparencyFileAttachedByTheStorekeeper = item.isTransparencyFileAttachedByTheStorekeeper

        const barcodeCheckedText = item.isBarCodeAlreadyAttachedByTheSupplier
          ? t(TranslationKey['BarCode is glued by supplier'])
          : t(TranslationKey['BarCode is glued by storekeeper'])

        const isRushOrder = Number(item.order.priority) === orderPriority.urgentPriority

        return (
          <div key={index} className={styles.product}>
            <div key={index} className={styles.photosWrapper}>
              <p className={cx(styles.bigText, styles.blueColor)}>{index + 1}</p>

              <PhotoAndFilesSlider withoutFiles showPreviews customSlideHeight={80} files={item.product.images} />
            </div>

            <div className={styles.descriptionWrapper}>
              <p title={item.product.amazonTitle} className={styles.text}>
                {getShortenStringIfLongerThanCount(item.product.amazonTitle, 110)}
              </p>

              <AsinOrSkuLink withCopyValue withAttributeTitle="asin" asin={item?.product?.asin} />
              <AsinOrSkuLink withCopyValue withAttributeTitle="sku" asin={item?.product?.skuByClient} />
            </div>

            <div className={styles.parametersWrapper}>
              <div className={styles.parameters}>
                <Field
                  disabled
                  inputClasses={styles.input}
                  containerClasses={styles.field}
                  labelClasses={cx(styles.text, styles.label)}
                  label={t(TranslationKey.Quantity)}
                  value={quantity}
                  placeholder={t(TranslationKey['Not available'])}
                />

                <Field
                  disabled
                  inputClasses={styles.input}
                  containerClasses={styles.field}
                  labelClasses={cx(styles.text, styles.label)}
                  label={t(TranslationKey['Order number'])}
                  value={item.order?.id}
                />

                <Button className={styles.button} onClick={() => onClickHsCode(item.product._id, true)}>
                  {t(TranslationKey['HS code'])}
                </Button>

                {isRushOrder ? (
                  <div className={styles.iconContainer}>
                    <FireIcon />
                  </div>
                ) : null}
              </div>

              <div className={styles.boxLabelsWrapper}>
                <div className={styles.boxLabelWrapper}>
                  <LabelWithCopy
                    labelTitle={t(TranslationKey.BarCode)}
                    labelValue={item.barCode}
                    lableLinkTitle={t(TranslationKey.View)}
                  />

                  {barcodeChecked && (
                    <Checkbox disabled checked={barcodeChecked} className={styles.checkbox}>
                      <p className={styles.text}>{barcodeCheckedText}</p>
                    </Checkbox>
                  )}
                </div>

                <div className={styles.boxLabelWrapper}>
                  <LabelWithCopy
                    labelTitle={t(TranslationKey['Transparency codes'])}
                    labelValue={item.transparencyFile}
                    lableLinkTitle={t(TranslationKey.View)}
                  />

                  {isTransparencyFileAlreadyAttachedByTheSupplier && (
                    <Checkbox
                      disabled
                      checked={isTransparencyFileAlreadyAttachedByTheSupplier}
                      className={styles.checkbox}
                    >
                      <p className={styles.text}>{t(TranslationKey['Transparency codes glued by the supplier'])}</p>
                    </Checkbox>
                  )}

                  {isTransparencyFileAttachedByTheStorekeeper && (
                    <Checkbox disabled checked={isTransparencyFileAttachedByTheStorekeeper} className={styles.checkbox}>
                      <p className={styles.text}>{t(TranslationKey['Transparency codes are glued by storekeeper'])}</p>
                    </Checkbox>
                  )}
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
})
