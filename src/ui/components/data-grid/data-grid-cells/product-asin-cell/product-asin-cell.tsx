import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './product-asin-cell.style'

interface ProductAsinCellProps {
  asin?: string
  image?: string
  amazonTitle?: string
  skuByClient?: string
  withoutImage?: boolean
  withoutSku?: boolean
  withoutAsin?: boolean
  withoutTitle?: boolean
}

export const ProductAsinCell: FC<ProductAsinCellProps> = memo(props => {
  const { image, amazonTitle, asin, skuByClient, withoutImage, withoutTitle, withoutSku, withoutAsin } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {!withoutImage && (
        <img src={getAmazonImageUrl(image, false)} alt="preview-product-table" className={styles.img} />
      )}

      <div className={styles.fields}>
        {!withoutTitle && <p className={styles.amazonTitle}>{amazonTitle}</p>}
        {!withoutAsin && <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={asin} />}
        {!withoutSku && <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={skuByClient} />}
      </div>
    </div>
  )
})
