/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './four-monthes-stock-cell.style'

import { ChangeInputCell } from '../data-grid-cells'

interface FourMonthesStockCellProps {
  rowId: string
  disabled?: boolean
  fourMonthesStock: string
  onClickSaveFourMonthsStock: (rowId: string, value: string | undefined) => void
  value: string
  withoutPadding?: boolean
}

export const FourMonthesStockCell: FC<FourMonthesStockCellProps> = React.memo(props => {
  const { onClickSaveFourMonthsStock, rowId, fourMonthesStock, disabled = false, value, withoutPadding = false } = props

  const { classes: styles, cx } = useStyles()
  const mainStyle = cx(styles.fourMonthesStockWrapper, { [styles.withoutPadding]: withoutPadding })
  return (
    <div className={mainStyle}>
      <p className={styles.fourMonthesStockLabel}>{`${t(TranslationKey['To repurchase'])}: ${value}`}</p>

      <ChangeInputCell
        isInts
        disabled={disabled}
        rowId={rowId}
        text={fourMonthesStock}
        checkValue={(e: any) => e === 0 || e > 49}
        onClickSubmit={onClickSaveFourMonthsStock}
      />
    </div>
  )
})
