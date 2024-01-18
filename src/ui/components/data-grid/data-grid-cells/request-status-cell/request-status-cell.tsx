import { FC, memo } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'

import { useStyles } from './request-status-cell.style'

interface RequestStatusCellProps {
  status: string
  isChat?: boolean
  styles?: React.CSSProperties
}

export const RequestStatusCell: FC<RequestStatusCellProps> = memo(({ status, isChat, styles }) => {
  const { classes: style, cx } = useStyles()

  return (
    <div className={style.statusWrapper}>
      <p
        className={cx(style.statusText, { [style.statusTextChat]: isChat })}
        style={{ ...style, color: colorByStatus(status) }}
      >
        {MyRequestStatusTranslate(status)}
      </p>
    </div>
  )
})
