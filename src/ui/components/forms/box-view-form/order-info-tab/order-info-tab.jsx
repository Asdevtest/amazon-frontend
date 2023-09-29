import { memo } from 'react'

import { orderPriority } from '@constants/orders/order-priority'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Button } from '@components/shared/buttons/button'
import { Checkbox } from '@components/shared/checkbox'
import { Field } from '@components/shared/field'
import { LinkWithCopy } from '@components/shared/link-with-copy'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'
import { FireIcon } from '@components/shared/svg-icons'

import { checkAndMakeAbsoluteUrl, getShortenStringIfLongerThanCount } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './order-info-tab.style'

export const OrderInfoTab = memo(({ box, items, onClickHsCode }) => {
  const { classes: styles, cx } = useClassNames()

  return (
    <div className={styles.wrapper}>
      {items.map((item, index) => {
        const quantity = (box.amount > 1 ? `${item.amount} * ${box.amount}` : item.amount) || 0
        const orderNumber = `${item.order?.id} / ${item.order?.item ? item.order?.item : '-'}`
        const barcodeChecked = item.isBarCodeAlreadyAttachedByTheSupplier
          ? item.isBarCodeAlreadyAttachedByTheSupplier
          : item.isBarCodeAttachedByTheStorekeeper
        const barcodeCheckedText = item.isBarCodeAlreadyAttachedByTheSupplier
          ? t(TranslationKey['BarCode is glued by supplier'])
          : t(TranslationKey['BarCode is glued by storekeeper'])
        const isRushOrder = Number(item.order.priority) === orderPriority.urgentPriority

        return (
          <div key={index} className={styles.product}>
            <div key={index} className={styles.photosWrapper}>
              <p className={cx(styles.bigText, styles.blueColor)}>{index + 1}</p>

              <PhotoAndFilesSlider withoutFiles customSlideHeight={80} files={item.product.images} />
            </div>

            <div className={styles.descriptionWrapper}>
              <p title={item.product.amazonTitle} className={styles.text}>
                {getShortenStringIfLongerThanCount(item.product.amazonTitle, 110)}
              </p>

              <AsinOrSkuLink withCopyValue withAttributeTitle="asin" asin={item.product.asin} />
              <AsinOrSkuLink withCopyValue withAttributeTitle="sku" asin={item?.skusByClient?.[0]} />
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
                  label={t(TranslationKey['Order number/Item'])}
                  value={orderNumber}
                />

                <Button className={styles.button} onClick={() => onClickHsCode(item.product._id, true)}>
                  {t(TranslationKey['HS code'])}
                </Button>

                {isRushOrder ? <FireIcon /> : null}
              </div>

              <div className={styles.barcodeWrapper}>
                <div className={styles.barcode}>
                  <p className={styles.text}>{t(TranslationKey.BarCode)}</p>
                  {item.barCode ? (
                    <LinkWithCopy
                      title={t(TranslationKey.View)}
                      url={checkAndMakeAbsoluteUrl(item.barCode)}
                      valueToCopy={item.barCode}
                    />
                  ) : (
                    <p className={styles.text}>{t(TranslationKey['Not available'])}</p>
                  )}
                </div>

                <div className={styles.barcode}>
                  <Checkbox disabled checked={barcodeChecked} className={styles.checkbox} />
                  <p className={styles.text}>{barcodeCheckedText}</p>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
})
