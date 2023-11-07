/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './client-notifications-btns-cell.style'

interface ClientNotificationsBtnsCellProps {
  row: any
  handlers: {
    onTriggerOpenConfirmModal: (row: any) => void
    onTriggerOpenRejectModal: (row: any) => void
  }
  disabled: boolean
}

export const ClientNotificationsBtnsCell: FC<ClientNotificationsBtnsCellProps> = React.memo(
  ({ row, handlers, disabled }) => {
    const { classes: styles } = useDataGridCellStyles()

    return (
      <div className={styles.notificationBtnsWrapper}>
        <Button
          disabled={disabled}
          variant="contained"
          color="primary"
          className={styles.notificationBtn}
          onClick={() => handlers.onTriggerOpenConfirmModal(row)}
        >
          {t(TranslationKey.Confirm)}
        </Button>
        <Button
          danger
          disabled={disabled}
          className={styles.notificationBtn}
          onClick={() => {
            handlers.onTriggerOpenRejectModal(row)
          }}
        >
          {t(TranslationKey.Reject)}
        </Button>
      </div>
    )
  },
)
