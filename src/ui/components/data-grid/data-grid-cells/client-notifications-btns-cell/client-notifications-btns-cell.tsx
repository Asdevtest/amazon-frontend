/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './client-notifications-btns-cell.style'

interface ClientNotificationsBtnsCellProps {
  row: any
  handlers: {
    onTriggerOpenConfirmModal: (row: any) => void
    onTriggerOpenRejectModal: (row: any) => void
  }
  disabled: boolean
}

export const ClientNotificationsBtnsCell: FC<ClientNotificationsBtnsCellProps> = memo(({ row, handlers, disabled }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.notificationBtnsWrapper}>
      <Button
        disabled={disabled}
        className={styles.notificationBtn}
        onClick={() => handlers.onTriggerOpenConfirmModal(row)}
      >
        {t(TranslationKey.Confirm)}
      </Button>
      <Button
        styleType={ButtonType.DANGER}
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
})
