import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { InterconnectedProducts } from '@components/shared/interconnected-products'

import { t } from '@utils/translations'

import { useStyles } from './product-variations-form.style'

interface IProduct {
  childProducts: IProduct[]
  parentProduct: IProduct
  _id: string
  asin: string
  skuByClient: string
  images: string[]
  shopId: string
  amazonTitle: string
}

interface ProductVariationsFormProps {
  product: IProduct
  onClickShowProduct: () => void
}

export const ProductVariationsForm: FC<ProductVariationsFormProps> = memo(({ product, onClickShowProduct }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.title}>{t(TranslationKey['Interconnected products'])}</p>

      <div className={styles.interconnectedProductsBodyWrapper}>
        {product?.parentProduct ? (
          <InterconnectedProducts
            isParent
            variationProduct={product?.parentProduct}
            navigateToProduct={onClickShowProduct}
          />
        ) : (
          <InterconnectedProducts
            isParent
            variationProduct={{
              _id: product?._id,
              asin: product?.asin,
              skuByClient: product?.skuByClient,
              images: product?.images,
              shopId: product?.shopId,
              amazonTitle: product?.amazonTitle,
            }}
            navigateToProduct={onClickShowProduct}
          />
        )}

        {product?.childProducts?.map((variationProduct, variationProductIndex) => (
          <InterconnectedProducts
            key={variationProductIndex}
            variationProduct={variationProduct}
            navigateToProduct={onClickShowProduct}
          />
        ))}
      </div>
    </div>
  )
})
