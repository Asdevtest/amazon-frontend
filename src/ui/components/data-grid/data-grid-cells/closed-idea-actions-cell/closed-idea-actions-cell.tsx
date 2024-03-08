/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './closed-idea-actions-cell.style'

interface ClosedIdeaActionsCellProps {
  row: any
  rowHandlers: {
    onClickRestore: (id: string) => void
    onClickClose: (id: string) => void
  }
}

export const ClosedIdeaActionsCell: FC<ClosedIdeaActionsCellProps> = memo(({ rowHandlers, row }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.buttonsWrapper}>
      <Button
        isTableButton
        fullWidth
        styleType={ButtonStyle.SUCCESS}
        disabled={ideaStatusByKey[ideaStatus.CLOSED] === row.status}
        onClick={() => rowHandlers.onClickRestore(row._id)}
      >
        {t(TranslationKey.Restore)}
      </Button>
      <Button
        isTableButton
        fullWidth
        styleType={ButtonStyle.DANGER}
        disabled={ideaStatusByKey[ideaStatus.CLOSED] === row.status}
        onClick={() => rowHandlers.onClickClose(row._id)}
      >
        {t(TranslationKey.Close)}
      </Button>
    </div>
  )
})
