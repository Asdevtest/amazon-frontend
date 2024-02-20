/* eslint-disable @typescript-eslint/ban-ts-comment */
import { observer } from 'mobx-react'
import { FC } from 'react'

import { SourceProduct } from '@components/cards/idea-view-and-edit-card/source-product'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { ButtonType, ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './interconnected-products.style'

import { Button } from '../buttons/button'
import { MinusIcon, ParentProductIcon, ShareLinkIcon, VariationIcon } from '../svg-icons'

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
  const { classes: styles, cx } = useStyles()

  const { variationProduct, isParent, showRemoveButton, productId, unbindProductHandler, navigateToProduct } = props
  const { asin, skuByClient, images, _id } = variationProduct

  return (
    <div className={styles.root}>
      {isParent ? (
        // @ts-ignore
        <ParentProductIcon className={styles.parentVariationIcon} />
      ) : (
        <VariationIcon className={styles.variationIcon} />
      )}

      <div className={styles.sourceProductWrapper}>
        <SourceProduct img={getAmazonImageUrl(images?.[0])} asin={asin || ''} sku={skuByClient} />
      </div>

      <div className={styles.buttonsWrapper}>
        <Button variant={ButtonVariant.OUTLINED} className={styles.button} onClick={() => navigateToProduct(_id)}>
          <ShareLinkIcon className={cx(styles.icon, styles.shareLinkIcon)} />
        </Button>

        {showRemoveButton && (
          <Button
            styleType={ButtonType.DANGER}
            className={cx(styles.button, styles.removeButton)}
            onClick={() => !!unbindProductHandler && productId && unbindProductHandler(isParent ? productId : _id)}
          >
            <MinusIcon className={cx(styles.icon, styles.removeIcon)} />
          </Button>
        )}
      </div>
    </div>
  )
})
