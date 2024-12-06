import { Divider, Rate } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { FC, memo, useCallback, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomCheckbox } from '@components/shared/custom-checkbox'

import { containsId } from '@utils/find-by-id'
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
  checkedItems?: string[]
  onChange?: (id?: string) => void
}

export const SupplierProductCard: FC<SupplierProductCardProps> = memo(props => {
  const { product, onSubmit, gorizontal, checkedItems, onChange } = props

  const { classes: styles, cx } = useStyles()

  const price = toFixedWithDollarSign(product?.priceInUsd || 0)
  const minlot = `${product?.minlot || 0} pcs`
  const casePack = `${product?.boxProperties?.amountInBox || 0} item`

  const checked = useMemo(() => checkedItems && containsId(checkedItems, product?._id), [checkedItems, product?._id])

  const handleSubmit = useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation()
      onSubmit(product?._id)
    },
    [product?._id, onSubmit],
  )
  const handleCheckboxChange = useCallback(
    (event: CheckboxChangeEvent) => {
      event.stopPropagation()
      onChange?.(product?._id)
    },
    [onChange, product?._id],
  )

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
            <div className={cx(styles.flexRow, styles.extraGap)}>
              <Rate count={1} value={5} />
              <Text strong copyable={false} text={String(product?.supplier?.avgRating || 5)} />
            </div>
          </div>
          <Divider type="vertical" className={styles.divider} />
          <div className={styles.flexColumn}>
            <Text type="secondary" copyable={false} text={t(TranslationKey.Category)} />
            <Text copyable={false} rows={1} text={product?.category?.title || t(TranslationKey.Missing)} />
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
          <CustomButton ghost block={!gorizontal} type="primary" onClick={handleSubmit}>
            {t(TranslationKey['Add to inventory'])}
          </CustomButton>
        </div>
      </div>

      {onChange ? (
        <CustomCheckbox className={styles.checkbox} checked={checked} onChange={handleCheckboxChange} />
      ) : null}
    </div>
  )
})
