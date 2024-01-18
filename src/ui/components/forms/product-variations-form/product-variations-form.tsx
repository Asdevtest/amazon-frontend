import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { InterconnectedProducts } from '@components/shared/interconnected-products'

import { t } from '@utils/translations'

import { IProductVariation } from '@typings/product'

import { useStyles } from './product-variations-form.style'

interface ProductVariationsFormProps {
  product: {
    childProducts: Array<IProductVariation>
    parentProduct: IProductVariation

    _id: string
    asin: string
    skuByClient: string
    images: string[]
    shopId: string
    amazonTitle: string
  }
  onClickShowProduct: () => void
}

export const ProductVariationsForm: FC<ProductVariationsFormProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { product, onClickShowProduct } = props

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
