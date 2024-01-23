/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './order-many-items-cell.style'

import { OrderCell } from '../data-grid-cells'

interface OrderManyItemsCellProps {
  box: any
  error?: string
  withoutSku?: boolean
  imageSize?: 'small' | 'big'
}

export const OrderManyItemsCell: FC<OrderManyItemsCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { box, error, withoutSku, imageSize } = props

  const isEqualsItems = box.items.every((el: any) => el?.product?._id === box?.items?.[0]?.product?._id)

  const renderProductInfo = () => (
    <div className={styles.manyItemsOrderWrapper}>
      {box.items.map((item: any, itemIndex: number) => (
        <div key={itemIndex} className={styles.order}>
          <img
            alt=""
            src={getAmazonImageUrl(item.product.images?.[0])}
            className={cx(styles.orderImg, {
              [styles.orderImageBig]: imageSize === 'big',
            })}
          />
          <div>
            <p className={styles.manyItemsOrderTitle}>{item.product.amazonTitle}</p>

            <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={item.product.asin} />

            {!withoutSku && (
              <AsinOrSkuLink notLink withCopyValue withAttributeTitle="sku" link={item.product.skuByClient} />
            )}

            {(item.deliveryTotalPrice - item.deliveryTotalPriceChanged < 0 ||
              item?.status === BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE) &&
              itemIndex === 0 && (
                <span className={styles.needPay}>{`${t(
                  TranslationKey['Extra payment required!'],
                )} (${toFixedWithDollarSign(item.deliveryTotalPriceChanged - item.deliveryTotalPrice, 2)})`}</span>
              )}

            {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
              <span className={styles.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
            )}
          </div>
        </div>
      ))}

      {error && <span className={styles.orderCellError}>{error}</span>}
    </div>
  )

  return (
    <Tooltip
      title={renderProductInfo()}
      classes={{ popper: styles.manyItemsMainWrapperTooltip, tooltip: styles.tooltip }}
    >
      <div className={styles.manyItemsMainWrapper}>
        <div className={styles.manyItemsImagesWrapper}>
          {box.items.map((product: any, productIndex: number) => (
            <div key={productIndex} className={styles.manyItemsImgWrapper}>
              <img
                alt=""
                className={styles.ordersImg}
                src={product.product?.images[0] && getAmazonImageUrl(product.product.images[0])}
              />
              <p className={styles.imgNum}>{`x ${product.amount}`}</p>
            </div>
          ))}
        </div>
        {error && <span className={styles.orderCellError}>{error}</span>}

        {isEqualsItems ? (
          <OrderCell box={box} product={box.items[0].product} superbox={box?.amount > 1 && box?.amount} />
        ) : null}
      </div>
    </Tooltip>
  )
})
