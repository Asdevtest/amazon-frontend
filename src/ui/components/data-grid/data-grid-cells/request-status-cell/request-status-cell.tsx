import React, { FC } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { colorByStatus } from '@constants/requests/request-status'

import { useDataGridCellStyles } from './request-status-cell.style'

interface RequestStatusCellProps {
  status: string
  isChat?: boolean
  styles?: React.CSSProperties
}

export const RequestStatusCell: FC<RequestStatusCellProps> = React.memo(({ status, isChat, styles }) => {
  const { classes: style, cx } = useDataGridCellStyles()

  return (
    <div className={style.statusWrapper}>
      <p
        className={cx(style.statusText, { [style.statusTextChat]: isChat })}
        style={{ ...styles, color: colorByStatus(status) }}
      >
        {MyRequestStatusTranslate(status)}
      </p>
    </div>
  )
})
