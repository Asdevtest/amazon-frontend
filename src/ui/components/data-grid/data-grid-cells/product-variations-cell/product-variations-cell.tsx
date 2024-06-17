import { FC, memo } from 'react'

import { ParentProductIcon, VariationProductIcon } from '@components/shared/svg-icons'

import { useStyles } from './product-variations-cell.style'

interface ProductVariationsCellProps {
  showVariationButton: boolean
  isParentProduct: boolean
  onClickVariationButton: () => void
}

export const ProductVariationsCell: FC<ProductVariationsCellProps> = memo(
  ({ showVariationButton, isParentProduct, onClickVariationButton }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.productVariationsCellWrapper}>
        {showVariationButton ? (
          <button
            className={styles.iconWrapper}
            onClick={e => {
              e.stopPropagation()
              onClickVariationButton()
            }}
          >
            {isParentProduct ? (
              <ParentProductIcon className={styles.shareLinkIcon} />
            ) : (
              <VariationProductIcon className={styles.shareLinkIcon} />
            )}
          </button>
        ) : null}
      </div>
    )
  },
)
