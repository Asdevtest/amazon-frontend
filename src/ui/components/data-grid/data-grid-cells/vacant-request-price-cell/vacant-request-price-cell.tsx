import React, { FC } from 'react'

import { calcNumberMinusPercent } from '@utils/calculation'
import { toFixed } from '@utils/text'

import { useDataGridCellStyles } from './vacant-request-price-cell.style'

interface VacantRequestPriceCellProps {
  price: number
  cashBackInPercent: number
  AlignLeft?: boolean
}

export const VacantRequestPriceCell: FC<VacantRequestPriceCellProps> = React.memo(
  ({ price, cashBackInPercent, AlignLeft }) => {
    const { classes: styles, cx } = useDataGridCellStyles()
    const discountedPrice = calcNumberMinusPercent(price, cashBackInPercent)
    const includeStyles = Boolean(discountedPrice && cashBackInPercent)

    return (
      <div className={cx(styles.priceCellWrapper, { [styles.priceCellWrapperAlignLeft]: AlignLeft })}>
        {includeStyles && (
          <p
            className={cx(styles.priceText, {
              [styles.newPrice]: includeStyles,
            })}
          >
            {'$ ' + toFixed(discountedPrice, 2)}
          </p>
        )}

        <p
          className={cx(styles.priceText, {
            [styles.oldPrice]: includeStyles,
          })}
        >
          {'$ ' + toFixed(price, 2)}
        </p>
      </div>
    )
  },
)
