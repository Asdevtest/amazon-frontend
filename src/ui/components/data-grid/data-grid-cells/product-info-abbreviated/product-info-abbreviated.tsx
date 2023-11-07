/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { useDataGridCellStyles } from './product-info-abbreviated.style'

interface ProductInfoAbbreviatedProps {
  box: any
  boxesLength: number
}

export const ProductInfoAbbreviated: FC<ProductInfoAbbreviatedProps> = React.memo(({ box, boxesLength }) => {
  const { classes: styles, cx } = useDataGridCellStyles()

  return (
    <div
      className={cx(styles.abbreviatedBatchProductsWrapper, {
        [styles.abbreviatedWrapperDivider]: boxesLength > 1 && box.items.length > 1,
      })}
    >
      <div className={cx(styles.abbreviatedBatchProductsSubWrapper)}>
        {boxesLength > 1 && <p className={styles.amountBoxesText}>{`x${boxesLength}`}</p>}

        <div className={styles.abbreviatedBatchProductInfoMainWrapper}>
          {box.items.map((item: any, itemIndex: number) => (
            <>
              <div key={itemIndex} className={styles.abbreviatedBatchProductInfoWrapper}>
                <img alt="" src={getAmazonImageUrl(item.image)} className={styles.abbreviatedImg} />

                <div className={styles.div}>
                  <p className={styles.abbreviatedTitle}>{item.amazonTitle}</p>

                  {box.amount > 1 && <p className={styles.amountBoxesText}>{`SBX${box.amount}`}</p>}
                </div>

                <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={item.asin} />

                <p className={styles.amountBoxesText}>{`X${item.amount}`}</p>
              </div>
              {box.deliveryTotalPriceChanged - box.deliveryTotalPrice > 0 && itemIndex === 0 && (
                <p className={styles.productInfoText}>
                  <span className={styles.needPay}>{`${t(
                    TranslationKey['Extra payment required!'],
                  )} (${toFixedWithDollarSign(box.deliveryTotalPriceChanged - box.deliveryTotalPrice, 2)})`}</span>
                </p>
              )}
            </>
          ))}
        </div>
      </div>

      {box?.status === BoxStatus.NEED_TO_UPDATE_THE_TARIFF && (
        <span className={styles.needPay}>{t(TranslationKey['The tariff is invalid or has been removed!'])}</span>
      )}
    </div>
  )
})
