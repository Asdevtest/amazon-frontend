import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { IProduct } from '@typings/models/products/product'

import { useStyles } from './info.style'

interface InfoProps {
  product?: IProduct
}

export const Info: FC<InfoProps> = memo(({ product }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <SlideshowGallery slidesToShow={2} files={product?.images || []} />

      <div className={styles.infoContainer}>
        <AsinOrSkuLink />
      </div>

      <div className={styles.titleContainer}>title</div>
    </div>
  )
})
