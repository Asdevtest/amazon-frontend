import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { PaymentMethods } from '@components/shared/payment-methods'
import { SlideshowGallery } from '@components/shared/slideshow-gallery'
import { Text } from '@components/shared/text'

import { t } from '@utils/translations'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './supplier-card.style'

import { SupplierDitails } from '../supplier-details'
import { SupplierProductCard } from '../supplier-product-card'

interface SupplierCardProps {
  supplier: ISupplierExchange
}

export const SupplierCard: FC<SupplierCardProps> = memo(props => {
  const { supplier } = props

  const { classes: styles, cx } = useStyles()

  const maxTopPropductCards = supplier.supplierCards.slice(0, 3)

  return (
    <div className={styles.root}>
      <div className={cx(styles.flexColumn, styles.infoBlock)}>
        <SupplierDitails image={supplier.originCountry?.image} xid={supplier.xid} rate={supplier.avgRating} />

        {supplier.paymentMethods.length ? (
          <div className={styles.payments}>
            <Text type="secondary" copyable={false} text={t(TranslationKey['Payment methods'])} rows={1} />
            <PaymentMethods paymentMethods={supplier.paymentMethods} />
          </div>
        ) : null}

        <CustomButton disabled ghost type="primary">
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
            <SupplierProductCard key={supplierCard._id} supplierCard={supplierCard} />
          ))}
        </div>
      </div>

      <div className={styles.imagesBlock}>
        <SlideshowGallery slidesToShow={2} files={supplier?.images} />
      </div>
    </div>
  )
})
