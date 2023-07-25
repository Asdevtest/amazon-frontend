import { FC } from 'react'
import { useClassNames } from './source-product.styles'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

interface SourceProductProps {
  title: string
  img: string
  asin: string
  sku: string
}

export const SourceProduct: FC<SourceProductProps> = props => {
  const { classes: classNames } = useClassNames()

  const { title, img, asin, sku } = props

  return (
    <div className={classNames.root}>
      <p className={classNames.sourceProductTitle}>{`${title}:`}</p>

      <div className={classNames.sourceProductWrapper}>
        <img className={classNames.sourceProductImg} src={img} alt={img} />

        <div className={classNames.attributesProductWrapper}>
          <AsinOrSkuLink withCopyValue asin={asin} />
          <AsinOrSkuLink withCopyValue sku={sku} />
        </div>
      </div>
    </div>
  )
}
