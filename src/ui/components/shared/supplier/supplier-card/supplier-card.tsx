import { FC, memo } from 'react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { useStyles } from './supplier-card.style'

import { CustomButton } from '../../custom-button'
import { PaymentMethods } from '../../payment-methods'
import { SlideshowGallery } from '../../slideshow-gallery'
import { Text } from '../../text'
import { SupplierDitailsInfo } from '../supplier-details-info/supplier-details-info'
import { SupplierProductShortCard } from '../supplier-product-short-card/supplier-product-short-card'

interface SupplierCardProps {
  supplier: ISupplierExchange
}

export const SupplierCard: FC<SupplierCardProps> = memo(props => {
  const { supplier } = props

  const { classes: styles, cx } = useStyles()
  const history = useHistory()
  const maxTopPropductCards = supplier.supplierCards.slice(0, 3)

  const handleSupplier = () => history.push(`/client/product-exchange/wholesale/supplier?${supplier._id}`)

  return (
    <div className={styles.root}>
      <div className={cx(styles.flexColumn, styles.infoBlock)}>
        <SupplierDitailsInfo image={supplier.originCountry?.image} xid={supplier.xid} rate={supplier.avgRating} />

        <Text copyable={false} text={supplier.comment} rows={4} />

        <CustomButton ghost type="primary" onClick={handleSupplier}>
          {t(TranslationKey['View more'])}
        </CustomButton>
      </div>

      <div className={styles.flexColumn}>
        {supplier.paymentMethods.length ? (
          <div className={styles.payments}>
            <Text type="secondary" copyable={false} text={t(TranslationKey['Payment methods'])} rows={1} />
            <PaymentMethods paymentMethods={supplier.paymentMethods} />
          </div>
        ) : null}
      </div>

      <div className={styles.flexColumn}>
        <Text type="secondary" copyable={false} text={t(TranslationKey['Top products'])} rows={1} />

        <div className={styles.flexRow}>
          {maxTopPropductCards.map(supplierCard => (
            <SupplierProductShortCard key={supplierCard._id} supplierCard={supplierCard} />
          ))}
        </div>
      </div>

      <div className={styles.imagesBlock}>
        <SlideshowGallery slidesToShow={2} files={supplier?.images} />
      </div>
    </div>
  )
})
