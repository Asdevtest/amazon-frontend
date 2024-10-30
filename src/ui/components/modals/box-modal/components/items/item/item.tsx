import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Checkbox } from '@components/shared/checkbox'
import { CustomButton } from '@components/shared/custom-button'
import { Field } from '@components/shared/field'
import { LabelWithCopy } from '@components/shared/label-with-copy'
import { FireIcon, ShareIcon, TruckIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { OrderPriority } from '@typings/enums/order/order-priority'
import { IBoxItem } from '@typings/models/boxes/box-item'

import { useStyles } from './item.style'

interface ItemProps {
  item: IBoxItem
  quantity: number
  isLastItem: boolean
  isClient?: boolean
  isOrderInfo?: boolean
  onClickHsCode?: (id: string) => void
}

export const Item: FC<ItemProps> = memo(props => {
  const { item, isClient, quantity, isLastItem, isOrderInfo, onClickHsCode } = props

  const { classes: styles, cx } = useStyles()

  const handleClickOpenNewTab = (orderId: string) => {
    const newTab = window.open(
      `/client/my-orders/orders/order?orderId=${orderId}&order-human-friendly-id=${orderId}`,
      '_blank',
    )
    if (newTab) {
      newTab.focus()
    }
  }

  const isRushOrder = Number(item.order.priority) === OrderPriority.URGENT_PRIORITY
  const barcodeChecked = item.isBarCodeAlreadyAttachedByTheSupplier || item.isBarCodeAttachedByTheStorekeeper
  const barcodeText = barcodeChecked
    ? item.isBarCodeAlreadyAttachedByTheSupplier
      ? t(TranslationKey['BarCode is glued by supplier'])
      : t(TranslationKey['BarCode is glued by storekeeper'])
    : item.barCode
    ? t(TranslationKey['Barсode is not glued'])
    : null
  const transparencyChecked =
    item.isTransparencyFileAttachedByTheStorekeeper || item.isTransparencyFileAlreadyAttachedByTheSupplier
  const transparencyText = transparencyChecked
    ? item.isTransparencyFileAttachedByTheStorekeeper
      ? t(TranslationKey['Transparency Codes are glued by storekeeper'])
      : t(TranslationKey['Transparency Codes glued by the supplier'])
    : item.transparencyFile
    ? t(TranslationKey['Transparency Codes is not glued'])
    : null

  return (
    <div
      className={cx(styles.wrapper, {
        [styles.extraPadding]: isOrderInfo,
        [styles.removeBorder]: isLastItem,
      })}
    >
      <div className={styles.header}>
        <div className={styles.flexContainer}>
          <p className={cx(styles.text, styles.blue)}>{`x ${item.amount}`}</p>

          <Tooltip title={item.product.amazonTitle}>
            <p className={cx(styles.title, { [styles.titleOrderInfo]: isOrderInfo })}>{item.product.amazonTitle}</p>
          </Tooltip>
        </div>

        {isOrderInfo ? (
          <div className={styles.flexContainer}>
            {item.order.expressChinaDelivery ? <TruckIcon className={styles.icon} /> : null}
            {isRushOrder ? <FireIcon className={styles.icon} /> : null}
            {isClient ? (
              <ShareIcon
                className={cx(styles.icon, styles.blue)}
                onClick={() => handleClickOpenNewTab(item.order._id)}
              />
            ) : null}
          </div>
        ) : null}
      </div>

      <div className={cx({ [styles.product]: isOrderInfo })}>
        <div className={styles.item}>
          <div className={styles.photoWrapper}>
            <img src={getAmazonImageUrl(item.product.images[0])} alt="product-preview" className={styles.photo} />
          </div>

          <div className={styles.info}>
            <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={item.product.asin} />
            <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={item.product.skuByClient} />
            <AsinOrSkuLink withCopyValue withAttributeTitle="fnsku" link={''} />
          </div>
        </div>

        {isOrderInfo ? (
          <>
            <div className={styles.orderDetail}>
              <Field
                disabled
                classes={{ input: styles.input }}
                inputClasses={styles.inputClasses}
                containerClasses={styles.field}
                labelClasses={cx(styles.text, styles.label)}
                label={t(TranslationKey.Quantity)}
                value={quantity}
                placeholder={t(TranslationKey['Not available'])}
              />

              <Field
                disabled
                classes={{ input: styles.input }}
                inputClasses={styles.inputClasses}
                containerClasses={styles.field}
                labelClasses={cx(styles.text, styles.label)}
                label={t(TranslationKey['Order number'])}
                value={item.order.xid}
                placeholder={t(TranslationKey['Not available'])}
              />
            </div>

            <CustomButton onClick={() => onClickHsCode?.(item.product._id)}>
              {t(TranslationKey['HS code'])}
            </CustomButton>

            <div className={styles.checkboxWrapper}>
              {barcodeText ? (
                <div className={styles.checkboxContainer}>
                  <Checkbox disabled className={styles.checkbox} checked={barcodeChecked}>
                    <p className={styles.text}>{barcodeText}</p>
                  </Checkbox>
                  {item.barCode && <LabelWithCopy labelValue={item.barCode} lableLinkTitle={t(TranslationKey.View)} />}
                </div>
              ) : null}

              {transparencyText ? (
                <div className={styles.checkboxContainer}>
                  <Checkbox disabled className={styles.checkbox} checked={transparencyChecked}>
                    <p className={styles.text}>{transparencyText}</p>
                  </Checkbox>
                  {item.transparencyFile && (
                    <LabelWithCopy labelValue={item.transparencyFile} lableLinkTitle={t(TranslationKey.View)} />
                  )}
                </div>
              ) : null}
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
})
