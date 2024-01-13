import { FC, memo } from 'react'

import { SlideshowGallery } from '@components/shared/slideshow-gallery'

import { useStyles } from './header.style'

import { IOrderWithAdditionalFields } from '../../my-order-modal.type'

import { Description } from './description'
import { Information } from './information'

interface HeaderProps {
  formFields: IOrderWithAdditionalFields
}

export const Header: FC<HeaderProps> = memo(({ formFields }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.header}>
      <SlideshowGallery files={formFields?.product?.images} />

      <Description
        amazonTitle={formFields?.product?.amazonTitle}
        asin={formFields?.product?.asin}
        sku={formFields?.product?.skuByClient}
      />

      <Information formFields={formFields} />
    </div>
  )
})
