import React, { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useDataGridCellStyles } from './on-checking-idea-actions.style'

interface OnCheckingIdeaActionsProps {
  isAcceptDisabled?: boolean
  onClickAccept: () => void
  onClickReject: () => void
}

export const OnCheckingIdeaActionsCell: FC<OnCheckingIdeaActionsProps> = React.memo(
  ({ onClickAccept, onClickReject, isAcceptDisabled }) => {
    const { classes: styles } = useDataGridCellStyles()

    return (
      <div className={styles.ideaActions}>
        <Button success disabled={isAcceptDisabled} onClick={onClickAccept}>
          {t(TranslationKey.Accept)}
        </Button>
        <Button danger onClick={onClickReject}>
          {t(TranslationKey.Reject)}
        </Button>
      </div>
    )
  },
)
