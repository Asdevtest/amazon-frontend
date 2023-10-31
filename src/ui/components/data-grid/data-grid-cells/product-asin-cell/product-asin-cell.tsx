import React, { FC } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useDataGridCellStyles } from './product-asin-cell.style'

interface ProductAsinCellProps {
  image: string
  amazonTitle: string
  asin: string
  skusByClient?: string
  withoutImage?: boolean
  withoutSku?: boolean
}

export const ProductAsinCell: FC<ProductAsinCellProps> = React.memo(props => {
  const { classes: styles } = useDataGridCellStyles()
  const { image, amazonTitle, asin, skusByClient, withoutImage = undefined, withoutSku } = props

  return (
    <div className={styles.asinCellContainer}>
      {!withoutImage && <img src={getAmazonImageUrl(image)} alt="image" className={styles.img} />}

      <div className={styles.csCodeTypoWrapper}>
        <p className={styles.csCodeTypo}>{amazonTitle}</p>
        <AsinOrSkuLink withCopyValue withAttributeTitle={'asin'} asin={asin} />
        {!withoutSku && <AsinOrSkuLink withCopyValue withAttributeTitle={'sku'} sku={skusByClient} />}
      </div>
    </div>
  )
})
