/* eslint-disable @typescript-eslint/ban-ts-comment */
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { SourceProduct } from '@components/cards/idea-view-and-edit-card/source-product'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useClassNames } from './interconnected-products.styles'

import { Button } from '../buttons/button'
import { MinusIcon, ParentProductIcon, ShareLinkIcon, VariationIcon } from '../svg-icons'

interface InterconnectedProductsProps {
  isParent?: boolean
  showRemoveButton?: boolean
  productId?: string
  variationProduct: {
    _id: string
    asin: string
    skusByClient: Array<string>
    images: Array<string>
    shopIds: Array<string>
    amazonTitle: string
  }
  navigateToProduct: (id: string) => void
  unbindProductHandler?: (childProductIds: string) => void
}

export const InterconnectedProducts: FC<InterconnectedProductsProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { variationProduct, isParent, showRemoveButton, productId, unbindProductHandler, navigateToProduct } = props
  const { asin, skusByClient, images, _id } = variationProduct

  return (
    <div className={classNames.root}>
      {isParent ? (
        // @ts-ignore
        <ParentProductIcon className={classNames.parentVariationIcon} />
      ) : (
        <VariationIcon className={classNames.variationIcon} />
      )}

      <div className={classNames.sourceProductWrapper}>
        <SourceProduct img={getAmazonImageUrl(images?.[0])} asin={asin || ''} sku={skusByClient?.[0] || ''} />
      </div>

      <div className={classNames.buttonsWrapper}>
        <Button variant="text" className={classNames.button} onClick={() => navigateToProduct(_id)}>
          <ShareLinkIcon className={cx(classNames.icon, classNames.shareLinkIcon)} />
        </Button>

        {showRemoveButton && (
          <Button
            danger
            className={cx(classNames.button, classNames.removeButton)}
            onClick={() => !!unbindProductHandler && productId && unbindProductHandler(isParent ? productId : _id)}
          >
            <MinusIcon className={cx(classNames.icon, classNames.removeIcon)} />
          </Button>
        )}
      </div>
    </div>
  )
})
