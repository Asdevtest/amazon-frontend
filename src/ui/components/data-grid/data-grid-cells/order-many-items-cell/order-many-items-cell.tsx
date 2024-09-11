/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './order-many-items-cell.style'

import { ProductCell } from '../product-cell/product-cell'

interface OrderManyItemsCellProps {
  box: any
  error?: string
}

export const OrderManyItemsCell: FC<OrderManyItemsCellProps> = memo(props => {
  const { box, error } = props

  const { classes: styles, cx } = useStyles()

  const isPriceIncreased = box.deliveryTotalPrice - box.deliveryTotalPriceChanged < 0
  const needsConfirmation = box.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE
  const extraPaymentAmount = toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)
  const extraPaymentText = `${t(TranslationKey['Extra payment required!'])} (${extraPaymentAmount})`

  const renderTooltip = () => (
    <div className={styles.tooltipWrapper}>
      {box.items.map((item: any, itemIndex: number) => {
        const isExtraPayment =
          (item.deliveryTotalPrice - item.deliveryTotalPriceChanged < 0 ||
            item?.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE) &&
          itemIndex === 0
        const extraPaymentValue = toFixedWithDollarSign(item.deliveryTotalPriceChanged - item.deliveryTotalPrice, 2)
        const errorDescription = isExtraPayment
          ? `${t(TranslationKey['Extra payment required!'])} (${extraPaymentValue})`
          : ''

        return (
          <ProductCell
            key={itemIndex}
            image={item.product.images?.[0]}
            title={item.product.amazonTitle}
            asin={item.product.asin}
            sku={item.product.skuByClient}
            errorMessage={error}
            errorDescription={errorDescription}
          />
        )
      })}
    </div>
  )

  return (
    <Tooltip title={renderTooltip()} classes={{ tooltip: styles.tooltip }}>
      <div className={styles.mainWrapper}>
        <div className={styles.items}>
          {box.items.slice(0, 4).map((product: any, productIndex: number) => (
            <div key={productIndex} className={styles.item}>
              <img
                alt={`product-${productIndex}`}
                className={styles.itemImage}
                src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
              />
              <p className={styles.itemText}>{`x${product.amount}`}</p>
            </div>
          ))}
          {box.items.length > 4 && <p className={cx(styles.itemText, styles.itemTextPoints)}>...</p>}
        </div>
        {error && <span className={styles.error}>{error}</span>}
        {needsConfirmation || isPriceIncreased ? <span className={styles.needPay}>{extraPaymentText}</span> : null}
      </div>
    </Tooltip>
  )
})
