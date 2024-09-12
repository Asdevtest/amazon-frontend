/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { findTariffInStorekeepersData } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'
import { IBoxItem } from '@typings/models/boxes/box-item'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'

import { useStyles } from './products-cell.style'

import { ProductCell } from '../product-cell/product-cell'

interface ProductsCellProps {
  box: IBox
  storekeepers?: IStorekeeper[]
}

export const ProductsCell: FC<ProductsCellProps> = memo(({ box, storekeepers }) => {
  const { classes: styles, cx } = useStyles()

  const errorMessage =
    !!storekeepers &&
    storekeepers?.length > 0 &&
    !findTariffInStorekeepersData(storekeepers, box?.storekeeper?._id, box?.logicsTariff?._id)
      ? t(TranslationKey['The tariff is invalid or has been removed!'])
      : ''

  const renderTooltip = () => (
    <div className={styles.tooltipWrapper}>
      {box.items?.map((item: any, itemIndex: number) => {
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
            image={item.product?.images?.[0]}
            title={item.product?.amazonTitle}
            asin={item.product?.asin}
            sku={item.product?.skuByClient}
            errorMessage={errorMessage}
            errorDescription={errorDescription}
          />
        )
      })}
    </div>
  )

  return box?.items?.length > 1 ? (
    <Tooltip title={renderTooltip()} classes={{ tooltip: styles.tooltip }}>
      <div className={styles.root}>
        {box.items?.slice(0, 4).map((item: IBoxItem, index: number) => (
          <div key={index} className={styles.item}>
            <img
              alt={`item-${index}`}
              className={styles.itemImage}
              src={getAmazonImageUrl(item.product?.images?.[0])}
            />
            <p className={styles.itemText}>{`x ${item?.amount}`}</p>
          </div>
        ))}
        {box.items?.length > 4 && <p className={cx(styles.itemText, styles.itemTextPoints)}>...</p>}
      </div>
    </Tooltip>
  ) : (
    <ProductCell
      asin={box?.items?.[0]?.product?.asin}
      image={box?.items?.[0]?.product?.images?.[0]}
      sku={box?.items?.[0]?.product?.skuByClient}
      title={box?.items?.[0]?.product?.amazonTitle}
      superbox={box?.amount}
      errorMessage={errorMessage}
    />
  )
})
