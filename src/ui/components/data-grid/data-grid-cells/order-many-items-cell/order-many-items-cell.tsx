/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, Fragment, memo } from 'react'

import { Tooltip } from '@mui/material'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './order-many-items-cell.style'

import { ProductAsinCell } from '../product-asin-cell/product-asin-cell'

interface OrderManyItemsCellProps {
  box: any
  error?: string
  withoutSku?: boolean
}

export const OrderManyItemsCell: FC<OrderManyItemsCellProps> = memo(props => {
  const { box, error, withoutSku } = props

  const { classes: styles, cx } = useStyles()

  const renderTooltip = () => (
    <div className={styles.tooltipWrapper}>
      {box.items.map((item: any, itemIndex: number) => {
        const isExtraPayment =
          (item.deliveryTotalPrice - item.deliveryTotalPriceChanged < 0 ||
            item?.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE) &&
          itemIndex === 0
        const extraPaymentValue = toFixedWithDollarSign(item.deliveryTotalPriceChanged - item.deliveryTotalPrice, 2)
        const isNeedToUpdate = box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF

        return (
          <Fragment key={itemIndex}>
            <ProductAsinCell
              withoutSku={withoutSku}
              image={item.product.images?.[0]}
              amazonTitle={item.product.amazonTitle}
              asin={item.product.asin}
              skuByClient={item.product.skuByClient}
            />

            {isExtraPayment ? (
              <span className={styles.error}>{`${t(
                TranslationKey['Extra payment required!'],
              )} (${extraPaymentValue})`}</span>
            ) : null}

            {isNeedToUpdate ? (
              <span className={styles.error}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
            ) : null}

            {error ? <span className={styles.error}>{error}</span> : null}
          </Fragment>
        )
      })}
    </div>
  )

  return (
    <Tooltip title={renderTooltip()} classes={{ tooltip: styles.tooltip }}>
      <div className={styles.mainWrapper}>
        <div className={styles.items}>
          {box.items.slice(0, 6).map((product: any, productIndex: number) => (
            <div key={productIndex} className={styles.item}>
              <img
                alt={`product-${productIndex}`}
                className={styles.itemImage}
                src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
              />
              <p className={styles.itemText}>{`x${product.amount}`}</p>
            </div>
          ))}
          {box.items.length > 6 && <p className={cx(styles.itemText, styles.itemTextPoints)}>...</p>}
        </div>
        {error && <span className={styles.error}>{error}</span>}

        {((box && box.deliveryTotalPrice - box.deliveryTotalPriceChanged < 0) ||
          box?.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE) && (
          <span className={styles.needPay}>{`${t(TranslationKey['Extra payment required!'])} (${toFixedWithDollarSign(
            box.deliveryTotalPriceChanged - box.deliveryTotalPrice,
            2,
          )})`}</span>
        )}
      </div>
    </Tooltip>
  )
})
