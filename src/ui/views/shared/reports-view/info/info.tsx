import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AsinOrSkuLink } from '@components/shared/asin-or-sku-link'
import { Launches } from '@components/shared/launches'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { t } from '@utils/translations'

import { IProduct } from '@typings/models/products/product'
import { ILaunch } from '@typings/shared/launch'

import { useStyles } from './info.style'

interface InfoProps {
  product?: IProduct
  activeLaunches?: ILaunch[]
}

export const Info: FC<InfoProps> = memo(({ product, activeLaunches }) => {
  const { classes: styles, cx } = useStyles()

  const shopName = product?.shop?.name || t(TranslationKey.Missing)

  return (
    <div className={styles.wrapper}>
      <SlideshowGallery slidesToShow={2} files={product?.images || []} />

      <div className={styles.titleContainer}>
        <p className={styles.title}>{product?.amazonTitle}</p>
        <div>
          <div className={styles.shopContainer}>
            <p className={cx(styles.textSecond, styles.text)}> {t(TranslationKey.Shop)}:</p>
            <p className={styles.text}>{shopName}</p>
          </div>
          <AsinOrSkuLink withCopyValue withAttributeTitle="asin" link={product?.asin} />
          <AsinOrSkuLink withCopyValue withAttributeTitle="sku" link={product?.skuByClient} />
        </div>

        <Launches launches={activeLaunches || []} />
      </div>
    </div>
  )
})
