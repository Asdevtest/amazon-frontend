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
  isTooltipVisible?: boolean
}

export const ProductVariationsCell: FC<ProductVariationsCellProps> = memo(
  ({ showVariationButton, isParentProduct, onClickVariationButton, isTooltipVisible = true }) => {
    const { classes: styles } = useStyles()

    const renderButton = () => (
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
    )

    return (
      <div className={styles.productVariationsCellWrapper}>
        {showVariationButton ? (
          isTooltipVisible ? (
            <Tooltip
              arrow
              title={t(TranslationKey['Product variations'])}
              placement="top"
              classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
            >
              {renderButton()}
            </Tooltip>
          ) : (
            renderButton()
          )
        ) : null}
      </div>
    )
  },
)
