import { FC, memo } from 'react'

import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { useStyles } from './header.style'

import { IOrderWithAdditionalFields } from '../../my-order-modal.type'

import { Description } from './description'
import { Information } from './information'

interface HeaderProps {
  order: IOrderWithAdditionalFields
}

export const Header: FC<HeaderProps> = memo(({ order }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.header}>
      <SlideshowGallery files={order?.product?.images} />

      <Description
        amazonTitle={order?.product?.amazonTitle}
        asin={order?.product?.asin}
        sku={order?.product?.skuByClient}
      />

      <Information order={order} />
    </div>
  )
})
