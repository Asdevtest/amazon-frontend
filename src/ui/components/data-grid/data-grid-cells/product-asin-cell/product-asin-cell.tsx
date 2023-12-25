import React, { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './product-asin-cell.style'

interface ProductAsinCellProps {
  asin: string
  image?: string
  amazonTitle?: string
  skuByClient?: string
  withoutImage?: boolean
  withoutSku?: boolean
  withoutTitle?: boolean
}

export const ProductAsinCell: FC<ProductAsinCellProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { image, amazonTitle, asin, skuByClient, withoutImage = undefined, withoutSku, withoutTitle } = props

  return (
    <div className={styles.asinCellContainer}>
      {!withoutImage && <img src={getAmazonImageUrl(image)} alt="image" className={styles.img} />}

      <div className={styles.csCodeTypoWrapper}>
        {!withoutTitle && <p className={styles.csCodeTypo}>{amazonTitle}</p>}
        <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={asin} />
        {!withoutSku && <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} sku={skuByClient} />}
      </div>
    </div>
  )
})
