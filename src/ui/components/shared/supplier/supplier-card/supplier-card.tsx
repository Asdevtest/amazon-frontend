import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { ISupplierExchange } from '@typings/models/suppliers/supplier-exchange'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './supplier-card.style'

import { CustomButton } from '../../custom-button'
import { PaymentMethods } from '../../payment-methods'
import { SlideshowGallery } from '../../slideshow-gallery'
import { Text } from '../../text'
import { SupplierDitailsInfo } from '../supplier-details-info/supplier-details-info'
import { SupplierProductShortCard } from '../supplier-product-short-card/supplier-product-short-card'

interface SupplierCardProps {
  supplier?: ISupplierExchange
  showViewMore?: boolean
  hideTotalCountFeedback?: boolean
}

export const SupplierCard: FC<SupplierCardProps> = memo(props => {
  const { supplier, showViewMore = true, hideTotalCountFeedback } = props

  const { isPcMiddleResolution } = useCreateBreakpointResolutions()
  const { classes: styles, cx } = useStyles()
  const maxTopPropductCards = supplier?.supplierCards?.slice(0, isPcMiddleResolution ? 2 : 3) || []
  const commentRows = showViewMore ? 4 : 6

  const handleViewMore = () => {
    const url = `/client/product-exchange/wholesale/supplier?${supplier?._id}`
    window.open(url, '_blank')
  }

  return (
    <div className={cx(styles.root, { [styles.fixHeight]: showViewMore })}>
      <div className={cx(styles.flexColumn, styles.infoBlock)}>
        <SupplierDitailsInfo
          hideTotalCountFeedback={hideTotalCountFeedback}
          image={supplier?.originCountry?.image}
          xid={supplier?.xid}
          rate={supplier?.avgRating}
          userId={supplier?._id}
          totalCountFeedback={supplier?.totalCountFeedback}
        />

        <Text collapsible={!showViewMore} copyable={false} text={supplier?.comment || ''} rows={commentRows} />

        {showViewMore ? (
          <CustomButton ghost type="primary" className={styles.viewMore} onClick={handleViewMore}>
            {t(TranslationKey['View more'])}
          </CustomButton>
        ) : null}
      </div>

      <div className={styles.flexColumn}>
        <div className={styles.payments}>
          <Text type="secondary" copyable={false} text={t(TranslationKey['Payment methods'])} rows={1} />
          <PaymentMethods paymentMethods={supplier?.paymentMethods || []} />
        </div>
      </div>

      <div className={styles.flexColumn}>
        <Text type="secondary" copyable={false} text={t(TranslationKey['Top products'])} rows={1} />

        <div className={styles.flexRow}>
          {maxTopPropductCards?.map(supplierCard => (
            <SupplierProductShortCard key={supplierCard._id} supplierCard={supplierCard} />
          ))}
        </div>
      </div>

      <div className={styles.imagesBlock}>
        <SlideshowGallery slidesToShow={2} files={supplier?.images || []} />
      </div>
    </div>
  )
})
