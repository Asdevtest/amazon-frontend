import React, { FC } from 'react'

import { useDataGridCellStyles } from './superbox-qty-cell.style'

interface SuperboxQtyCellProps {
  qty: number
  superbox: number
}

export const SuperboxQtyCell: FC<SuperboxQtyCellProps> = React.memo(({ qty, superbox }) => {
  const { classes: styles } = useDataGridCellStyles()

  return (
    <div className={styles.superBoxQtyWrapper}>
      <p>{qty * superbox}</p>
    </div>
  )
})
