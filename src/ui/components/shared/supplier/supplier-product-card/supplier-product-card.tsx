import { Divider } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'

import { CustomButton } from '../../custom-button'
import { SlideshowGallery } from '../../slideshow-gallery'
import { Text } from '../../text'
import { SupplierDitailsInfo } from '../supplier-details-info/supplier-details-info'

import { useStyles } from './supplier-product-card.style.'

interface SupplierProductCardProps {
  product: ISupplierCard
  onSubmit: (id: string) => void
}

export const SupplierProductCard: FC<SupplierProductCardProps> = memo(props => {
  const { product } = props

  const { classes: styles } = useStyles()

  const price = toFixedWithDollarSign(product?.priceInUsd || 0)
  const minlot = `${product?.minlot || 0} pcs`
  const casePack = `${product?.boxProperties?.amountInBox || 0} item`

  return (
    <div className={styles.root}>
      <SlideshowGallery slidesToShow={2} customGapBetweenSlideAndPreviews={0} files={product?.images} />
      <Text copyable={false} text={product?.cardName} />
      <SupplierDitailsInfo rate={3.5} />
      <div className={styles.flexRow}>
        <div className={styles.flexColumn}>
          <Text type="secondary" copyable={false} text={t(TranslationKey.Price)} />
          <Text strong copyable={false} text={price} />
        </div>
        <Divider type="vertical" className={styles.divider} />
        <div className={styles.flexColumn}>
          <Text type="secondary" copyable={false} text="Case pack" />
          <Text copyable={false} text={casePack} />
        </div>
        <Divider type="vertical" className={styles.divider} />
        <div className={styles.flexColumn}>
          <Text type="secondary" copyable={false} text="MOQ" />
          <Text copyable={false} text={minlot} />
        </div>
      </div>
      <CustomButton block ghost type="primary" onClick={() => props.onSubmit(product?._id)}>
        {t(TranslationKey['Add to inventory'])}
      </CustomButton>
    </div>
  )
})
