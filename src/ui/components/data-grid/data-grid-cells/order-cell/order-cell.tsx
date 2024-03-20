/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './order-cell.style'

interface OrderCellProps {
  product: IProduct
  superbox: number
  box: any
  error?: string
  withoutSku?: boolean
  itemAmount?: number
  withQuantity?: boolean
  imageSize?: 'small' | 'big'
}

export const OrderCell: FC<OrderCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { product, superbox, box, error, withoutSku, itemAmount, withQuantity, imageSize } = props

  return (
    <div className={styles.order}>
      <img
        src={getAmazonImageUrl(product?.images?.[0])}
        alt="product"
        className={cx(styles.orderImg, {
          [styles.orderImageBig]: imageSize === 'big',
          [styles.orderImageSmall]: imageSize === 'small',
        })}
      />
      <div>
        <p className={styles.orderTitle}>{product?.amazonTitle}</p>

        <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={product.asin} />
        {!withoutSku && <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={product?.skuByClient} />}

        {withQuantity ? (
          <div className={styles.copyAsin}>
            <p className={styles.orderText}>
              <span className={styles.orderTextSpan}>{t(TranslationKey.Quantity) + ': '}</span>
              {itemAmount ? itemAmount : box?.items?.[0].amount}
            </p>
          </div>
        ) : null}

        {superbox && (
          <div className={styles.superboxWrapper}>
            <p className={styles.superboxTypo}>{`SB x ${superbox}`}</p>
          </div>
        )}

        {((box && box.deliveryTotalPrice - box.deliveryTotalPriceChanged < 0) ||
          box?.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE) && (
          <span className={styles.needPay}>{`${t(TranslationKey['Extra payment required!'])} (${toFixedWithDollarSign(
            box.deliveryTotalPriceChanged - box.deliveryTotalPrice,
            2,
          )})`}</span>
        )}

        {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
          <span className={styles.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
        )}

        {error && <span className={styles.OrderCellError}>{error}</span>}
      </div>
    </div>
  )
})
