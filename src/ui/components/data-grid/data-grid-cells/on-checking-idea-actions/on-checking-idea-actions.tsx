import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './on-checking-idea-actions.style'

interface OnCheckingIdeaActionsProps {
  isAcceptDisabled?: boolean
  onClickAccept: () => void
  onClickReject: () => void
}

export const OnCheckingIdeaActionsCell: FC<OnCheckingIdeaActionsProps> = memo(
  ({ onClickAccept, onClickReject, isAcceptDisabled }) => {
    const { classes: styles } = useStyles()

    return (
      <div className={styles.ideaActions}>
        <Button type={ButtonType.SUCCESS} disabled={isAcceptDisabled} onClick={onClickAccept}>
          {t(TranslationKey.Accept)}
        </Button>
        <Button type={ButtonType.DANGER} onClick={onClickReject}>
          {t(TranslationKey.Reject)}
        </Button>
      </div>
    )
  },
)
