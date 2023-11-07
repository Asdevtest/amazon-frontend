import React, { FC } from 'react'

import { MyRequestStatusTranslate } from '@constants/requests/request-proposal-status'
import { RequestStatus } from '@constants/requests/request-status'
import { UiTheme } from '@constants/theme/mui-theme.type'

import { SettingsModel } from '@models/settings-model'

import { useDataGridCellStyles } from './multiline-request-status-cell.style'

interface MultilineRequestStatusCellProps {
  status: string
  fontSize?: string
}

export const MultilineRequestStatusCell: FC<MultilineRequestStatusCellProps> = React.memo(
  ({ status, fontSize = '14px' }) => {
    const { classes: styles } = useDataGridCellStyles()

    const colorByStatus = () => {
      if ([RequestStatus.DRAFT].includes(status)) {
        return SettingsModel.uiTheme === UiTheme.light ? '#007bff' : '#4CA1DE'
      } else if (
        [
          RequestStatus.CANCELED_BY_CREATOR,
          RequestStatus.FORBID_NEW_PROPOSALS,
          RequestStatus.CANCELED_BY_ADMIN,
        ].includes(status)
      ) {
        return '#FF1616'
      } else if ([RequestStatus.IN_PROCESS, RequestStatus.COMPLETE_PROPOSALS_AMOUNT_ACHIEVED].includes(status)) {
        return '#00B746'
      } else if ([RequestStatus.PUBLISHED, RequestStatus.TO_CORRECT_BY_ADMIN].includes(status)) {
        return '#F3AF00'
      } else if ([RequestStatus.EXPIRED].includes(status)) {
        return '#C4C4C4'
      } else {
        return 'black'
      }
    }

    const colorStatus = colorByStatus()

    return (
      <div className={styles.multilineTextWrapper}>
        <p className={styles.multilineStatusText} style={{ color: colorStatus, fontSize }}>
          {MyRequestStatusTranslate(status)}
        </p>
      </div>
    )
  },
)
