import { FC, memo } from 'react'

import { useStyles } from './superbox-qty-cell.style'

interface SuperboxQtyCellProps {
  qty: number
  superbox: number
}

export const SuperboxQtyCell: FC<SuperboxQtyCellProps> = memo(({ qty, superbox }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.superBoxQtyWrapper}>
      <p>{qty * superbox}</p>
    </div>
  )
})
