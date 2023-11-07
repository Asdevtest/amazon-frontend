/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { BoxStatus } from '@constants/statuses/box-status'

import { useDataGridCellStyles } from './formed-cell.style'

import { CheckboxCell, MultilineTextCell } from '../data-grid-cells'

interface FormedCellProps {
  sub: any
  params: any
  onChangeIsFormedInBox: () => void
}

export const FormedCell: FC<FormedCellProps> = React.memo(({ sub, onChangeIsFormedInBox, params }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.formedCell}>
      <CheckboxCell
        disabled={params.row.originalData.isDraft || params.row.status !== BoxStatus.IN_STOCK}
        checked={params.value}
        onClick={onChangeIsFormedInBox}
      />
      {sub?.name && <MultilineTextCell text={sub.name} />}
    </div>
  )
})
