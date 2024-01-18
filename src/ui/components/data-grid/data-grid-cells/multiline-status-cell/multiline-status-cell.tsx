import { FC, memo } from 'react'

import { useStyles } from './multiline-status-cell.style'

interface MultilineStatusCellProps {
  status: string
  leftAlign?: boolean
}

export const MultilineStatusCell: FC<MultilineStatusCellProps> = memo(({ status, leftAlign }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={cx(styles.statusMultilineText, { [styles.multilineLeftAlignText]: leftAlign })}>
        {status?.replace(/_/g, ' ')}
      </p>
    </div>
  )
})
