/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles } from './product-info-extended.style'

interface ProductInfoExtendedProps {
  box: any
  boxesLength: number
}

export const ProductInfoExtended: FC<ProductInfoExtendedProps> = React.memo(({ box, boxesLength }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.batchProductsWrapper}>
      {boxesLength > 1 ? <p className={styles.batchProductsBoxesLength}>{`x${boxesLength}`}</p> : null}

      <div className={styles.batchProductsSubWrapper}>
        {box.items.map((item: any, itemIndex: number) => (
          <div key={itemIndex} className={styles.order}>
            <img alt="" src={getAmazonImageUrl(item.image)} className={styles.orderImg} />
            <div className={styles.batchProductInfoWrapper}>
              <p className={styles.batchProductTitle}>{item.amazonTitle}</p>

              <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={item.asin} />

              {box.deliveryTotalPriceChanged - box.deliveryTotalPrice > 0 && itemIndex === 0 && (
                <p className={styles.productInfoText}>
                  <span className={styles.needPay}>{`${t(
                    TranslationKey['Extra payment required!'],
                  )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
                </p>
              )}

              <div className={styles.amountBoxesWrapper}>
                <p className={styles.amountBoxesText}>{`x ${item.amount}`}</p>
                {box.amount > 1 && <p className={styles.amountBoxesText}>{`Superbox x ${box.amount}`}</p>}
              </div>
            </div>
          </div>
        ))}

        {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
          <span className={styles.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
        )}
      </div>
    </div>
  )
})
