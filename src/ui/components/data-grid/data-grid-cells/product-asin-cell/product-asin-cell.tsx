import { FC, memo } from 'react'

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

export const ProductAsinCell: FC<ProductAsinCellProps> = memo(props => {
  const { image, amazonTitle, asin, skuByClient, withoutImage = undefined, withoutSku } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.asinCellContainer}>
      {!withoutImage && (
        <img src={getAmazonImageUrl(image, false)} alt="preview-product-table" className={styles.img} />
      )}

      <div className={styles.csCodeTypoWrapper}>
        <p className={styles.csCodeTypo}>{amazonTitle}</p>
        <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} />
        {!withoutSku && <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={skuByClient} />}
      </div>
    </div>
  )
})
