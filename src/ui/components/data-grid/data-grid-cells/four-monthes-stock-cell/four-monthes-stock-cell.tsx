/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './four-monthes-stock-cell.style'

import { ChangeInputCell } from '../data-grid-cells'

interface FourMonthesStockCellProps {
  rowId: string
  fourMonthesStock: string
  onClickSaveFourMonthsStock: (rowId: string, value: string | undefined) => void
  value: string
}

export const FourMonthesStockCell: FC<FourMonthesStockCellProps> = React.memo(
  ({ onClickSaveFourMonthsStock, rowId, fourMonthesStock, value }) => {
    const { classes: styles } = useDataGridCellStyles()

    return (
      <div className={styles.fourMonthesStockWrapper}>
        <p className={styles.fourMonthesStockLabel}>{`${t(TranslationKey['To repurchase'])}: ${value}`}</p>

        <ChangeInputCell
          isInts
          rowId={rowId}
          text={fourMonthesStock}
          checkValue={(e: any) => e === 0 || e > 49}
          onClickSubmit={onClickSaveFourMonthsStock}
        />
      </div>
    )
  },
)
