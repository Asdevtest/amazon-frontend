import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ParentProductIcon, VariationProductIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

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
          <Tooltip
            arrow
            title={t(TranslationKey['Product variations'])}
            placement="top"
            classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
          >
            <div className={styles.iconWrapper} onClick={onClickVariationButton}>
              {isParentProduct ? (
                <ParentProductIcon className={styles.shareLinkIcon} />
              ) : (
                <VariationProductIcon className={styles.shareLinkIcon} />
              )}
            </div>
          </Tooltip>
        ) : null}
      </div>
    )
  },
)
