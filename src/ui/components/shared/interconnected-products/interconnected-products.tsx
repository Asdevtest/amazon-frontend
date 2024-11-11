import { observer } from 'mobx-react'
import { FC } from 'react'
import { CiShare1 } from 'react-icons/ci'
import { FaMinus } from 'react-icons/fa6'

import { SourceProduct } from '@components/cards/idea-view-and-edit-card/source-product'
import { ParentProductIcon, VariationIcon } from '@components/shared/svg-icons'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './interconnected-products.style'

import { CustomButton } from '../custom-button'

interface InterconnectedProductsProps {
  isParent?: boolean
  showRemoveButton?: boolean
  productId?: string
  variationProduct: {
    _id: string
    asin: string
    skuByClient: string
    images: Array<string>
    shopId: string
    amazonTitle: string
  }
  navigateToProduct: (id: string) => void
  unbindProductHandler?: (childProductIds: string) => void
}

export const InterconnectedProducts: FC<InterconnectedProductsProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { variationProduct, isParent, showRemoveButton, productId, unbindProductHandler, navigateToProduct } = props
  const { asin, skuByClient, images, _id } = variationProduct

  return (
    <div className={styles.root}>
      {isParent ? (
        <ParentProductIcon className={styles.parentVariationIcon} />
      ) : (
        <VariationIcon className={styles.variationIcon} />
      )}

      <div className={styles.sourceProductWrapper}>
        <SourceProduct img={getAmazonImageUrl(images?.[0])} asin={asin || ''} sku={skuByClient} />
      </div>

      <div className={styles.buttonsWrapper}>
        <CustomButton icon={<CiShare1 size={16} />} size="small" onClick={() => navigateToProduct(_id)} />

        {showRemoveButton && (
          <CustomButton
            danger
            size="small"
            icon={<FaMinus size={16} />}
            type="primary"
            onClick={() => !!unbindProductHandler && productId && unbindProductHandler(isParent ? productId : _id)}
          />
        )}
      </div>
    </div>
  )
})
