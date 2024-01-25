import { FC, memo } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'

import { useStyles } from './multiline-request-status-cell.style'

interface MultilineRequestStatusCellProps {
  status: string
  fontSize?: string
}

export const MultilineRequestStatusCell: FC<MultilineRequestStatusCellProps> = memo(({ status, fontSize = '14px' }) => {
  const { classes: styles } = useStyles()

  const colorStatus = colorByStatus(status)

  return (
    <div className={styles.multilineTextWrapper}>
      <p className={styles.multilineStatusText} style={{ color: colorStatus, fontSize }}>
        {MyRequestStatusTranslate(status)}
      </p>
    </div>
  )
})
