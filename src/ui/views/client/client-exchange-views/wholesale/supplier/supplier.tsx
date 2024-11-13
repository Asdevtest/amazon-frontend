import { Rate } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomImage } from '@components/shared/custom-image'
import { PaymentMethods } from '@components/shared/payment-methods'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './supplier.style'

import { SupplierCard } from '../supplier-card'

interface SupplierCardProps {
  supplier: ISupplierExchange
}

export const Supplier: FC<SupplierCardProps> = memo(props => {
  const { supplier } = props

  const { classes: styles, cx } = useStyles()

  const xidText = `ID: ${supplier.xid || t(TranslationKey.Missing)}`
  const maxTopPropductCards = supplier.supplierCards.slice(0, 3)

  return (
    <div className={styles.root}>
      <div className={cx(styles.flexColumn, styles.infoBlock)}>
        <div className={styles.flexRow}>
          <CustomImage preview={false} src={supplier.originCountry?.image} height={20} width={30} />
          <Text copyable={false} text={xidText} rows={1} />
          <Rate disabled value={supplier.avgRating} />
        </div>

        <div className={styles.payments}>
          <Text type="secondary" copyable={false} text={t(TranslationKey['Payment methods'])} rows={1} />
          <PaymentMethods paymentMethods={supplier.paymentMethods} />
        </div>

        <CustomButton ghost type="primary">
          {t(TranslationKey['View more'])}
        </CustomButton>
      </div>

      <div className={styles.flexColumn}>
        <Text type="secondary" copyable={false} text={t(TranslationKey.Description)} rows={1} />
        <Text copyable={false} text={supplier.comment} rows={6} />
      </div>

      <div className={styles.flexColumn}>
        <Text type="secondary" copyable={false} text={t(TranslationKey['Top products'])} rows={1} />

        <div className={styles.flexRow}>
          {maxTopPropductCards.map(supplierCard => (
            <SupplierCard key={supplierCard._id} supplierCard={supplierCard} />
          ))}
        </div>
      </div>

      <div className={styles.imagesBlock}>
        <SlideshowGallery slidesToShow={2} files={supplier?.images} />
      </div>
    </div>
  )
})
