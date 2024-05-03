import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './product-card.style'

interface ProductCardProps {
  product: IProduct
  orderId: number
  onClickChangeActive: () => void
  isActive?: boolean
}

export const ProductCard: FC<ProductCardProps> = memo(({ product, orderId, isActive, onClickChangeActive }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <button className={cx(styles.root, { [styles.activeProduct]: isActive })} onClick={onClickChangeActive}>
      <p className={styles.productTitle}>{product.amazonTitle}</p>
      <div className={styles.productBody}>
        <img src={getAmazonImageUrl(product?.images?.[0])} alt="product-preview" className={styles.productImg} />

        <div>
          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={product.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={product.skuByClient} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="fnsku" link={''} />
        </div>
      </div>

      <p>
        <span className={styles.orderText}>{`${t(TranslationKey.Order)} №`}</span> <span>{orderId}</span>
      </p>
    </button>
  )
})
