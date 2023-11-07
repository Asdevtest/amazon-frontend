/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { Tooltip } from '@mui/material'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useDataGridCellStyles } from './order-many-items-cell.style'

import { OrderCell } from '../data-grid-cells'

interface OrderManyItemsCellProps {
  box: any
  error?: string
  withoutSku?: boolean
  imageSize?: 'small' | 'big'
}

export const OrderManyItemsCell: FC<OrderManyItemsCellProps> = React.memo(props => {
  const { classes: styles, cx } = useDataGridCellStyles()
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

            <AsinOrSkuLink withAttributeTitle={'asin'} asin={item.product.asin} />

            {!withoutSku && <AsinOrSkuLink withAttributeTitle={'sku'} sku={item.product.skusByClient?.[0]} />}

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
    <div className={styles.manyItemsMainWrapper}>
      <Tooltip title={renderProductInfo()} classes={{ popper: styles.manyItemsMainWrapperTooltip }}>
        <>
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
        </>
      </Tooltip>

      {isEqualsItems ? (
        <OrderCell box={box} product={box.items[0].product} superbox={box?.amount > 1 && box?.amount} />
      ) : null}
    </div>
  )
})
