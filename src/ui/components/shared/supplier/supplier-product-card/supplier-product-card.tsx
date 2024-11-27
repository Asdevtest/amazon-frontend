import { Divider, Rate } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'

import { ISupplierCard } from '@typings/models/suppliers/supplier-exchange'

import { CustomButton } from '../../custom-button'
import { SlideshowGallery } from '../../slideshow-gallery'
import { Text } from '../../text'

import { useStyles } from './supplier-product-card.style.'

interface SupplierProductCardProps {
  product: ISupplierCard
  onSubmit: (id: string) => void
  gorizontal?: boolean
}

export const SupplierProductCard: FC<SupplierProductCardProps> = memo(props => {
  const { product, gorizontal } = props

  const { classes: styles, cx } = useStyles()

  const price = toFixedWithDollarSign(product?.priceInUsd || 0)
  const minlot = `${product?.minlot || 0} pcs`
  const casePack = `${product?.boxProperties?.amountInBox || 0} item`

  return (
    <div className={cx(styles.root, { [styles.gorizontal]: gorizontal })}>
      <div className={cx(styles.imagesWrapper, { [styles.center]: !gorizontal })}>
        <SlideshowGallery slidesToShow={2} customGapBetweenSlideAndPreviews={0} files={product?.images} />
      </div>

      <div className={cx(styles.flexColumn, styles.fullWidth, { [styles.center]: !gorizontal })}>
        <Text copyable={false} text={product?.cardName} />

        <div className={cx(styles.flexRow, styles.fullWidth, { [styles.center]: !gorizontal })}>
          <div className={styles.flexColumn}>
            <Text type="secondary" copyable={false} text={t(TranslationKey.Rating)} />
            <div className={styles.flexRow}>
              <Rate count={1} value={5} />
              <Text strong copyable={false} text={'0.0'} />
            </div>
          </div>
          <Divider type="vertical" className={styles.divider} />
          <div className={styles.flexColumn}>
            <Text type="secondary" copyable={false} text={t(TranslationKey.Category)} />
            <Text copyable={false} text={product?.category?.title || t(TranslationKey.Missing)} />
          </div>
          <Divider type="vertical" className={styles.divider} />
          <div className={styles.flexColumn}>
            <Text type="secondary" copyable={false} text="ID" />
            <Text copyable={false} text={String(product?.xid)} />
          </div>
        </div>

        <div className={cx(styles.flexRow, styles.fullWidth, { [styles.center]: !gorizontal })}>
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

        <div className={styles.buttons}>
          <CustomButton ghost block={!gorizontal} type="primary" onClick={() => props.onSubmit(product?._id)}>
            {t(TranslationKey['Add to inventory'])}
          </CustomButton>
        </div>
      </div>
    </div>
  )
})
