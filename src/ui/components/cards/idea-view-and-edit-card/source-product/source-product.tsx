import { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useClassNames } from './source-product.styles'

interface SourceProductProps {
  title?: string
  img: string
  asin: string
  sku: string
}

export const SourceProduct: FC<SourceProductProps> = props => {
  const { classes: classNames } = useClassNames()

  const { title, img, asin, sku } = props

  return (
    <div className={classNames.root}>
      {title && <p className={classNames.sourceProductTitle}>{`${title}:`}</p>}

      <div className={classNames.sourceProductWrapper}>
        <img
          className={classNames.sourceProductImg}
          src={getAmazonImageUrl(img)}
          alt={''}
          onError={e => ((e.target as HTMLImageElement).src = '/assets/img/no-photo.jpg')}
        />

        <div className={classNames.attributesProductWrapper}>
          <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} sku={sku} />
        </div>
      </div>
    </div>
  )
}
