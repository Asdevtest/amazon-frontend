import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { InterconnectedProducts } from '@components/shared/interconnected-products'

import { t } from '@utils/translations'

import { IProductVariation } from '@typings/product'

import { useClassNames } from './product-variations-form.styles'

interface ProductVariationsFormProps {
  product: {
    childProducts: Array<IProductVariation>
    parentProduct: IProductVariation

    _id: string
    asin: string
    skusByClient: string[]
    images: string[]
    shopIds: string[]
    amazonTitle: string
  }
  onClickShowProduct: () => void
}

export const ProductVariationsForm: FC<ProductVariationsFormProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { product, onClickShowProduct } = props

  return (
    <div className={classNames.root}>
      <p className={classNames.title}>{t(TranslationKey['Interconnected products'])}</p>

      <div className={classNames.interconnectedProductsBodyWrapper}>
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
              skusByClient: product?.skusByClient,
              images: product?.images,
              shopIds: product?.shopIds,
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
