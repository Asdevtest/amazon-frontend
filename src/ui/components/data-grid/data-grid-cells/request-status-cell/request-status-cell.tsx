import { CSSProperties, FC, memo } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'

import { useStyles } from './request-status-cell.style'

interface RequestStatusCellProps {
  status: string
  isChat?: boolean
  textStyle?: CSSProperties
}

export const RequestStatusCell: FC<RequestStatusCellProps> = memo(({ status, isChat, textStyle }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.statusWrapper}>
      <p
        className={cx(styles.statusText, { [styles.statusTextChat]: isChat })}
        style={{ ...textStyle, color: colorByStatus(status) }}
      >
        {MyRequestStatusTranslate(status)}
      </p>
    </div>
  )
})
