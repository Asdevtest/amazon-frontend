import { FC, memo } from 'react'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Launches } from '@components/shared/launches'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { IProduct } from '@typings/models/products/product'
import { ILaunch } from '@typings/shared/launch'

import { useStyles } from './info.style'

interface InfoProps {
  product?: IProduct
  activeLaunches?: ILaunch[]
}

export const Info: FC<InfoProps> = memo(({ product, activeLaunches }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <SlideshowGallery slidesToShow={2} files={product?.images || []} />

      <div className={styles.titleContainer}>
        <p className={styles.title}>{product?.amazonTitle}</p>
        <div className={styles.infoContainer}>
          <AsinOrSkuLink withAttributeTitle="asin" link={product?.asin} />
          <AsinOrSkuLink withAttributeTitle="sku" link={product?.skuByClient} />
        </div>

        <Launches launches={activeLaunches || []} />
      </div>
    </div>
  )
})
