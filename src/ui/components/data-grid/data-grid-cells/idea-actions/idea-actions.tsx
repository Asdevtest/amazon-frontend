import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './idea-actions.style'

interface IdeaActionsProps {
  onClickReject: () => void
  onClickToCheck: () => void
}

export const IdeaActionsCell: FC<IdeaActionsProps> = memo(({ onClickReject, onClickToCheck }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.ideaActions}>
      <Button onClick={onClickToCheck}>{t(TranslationKey['To check'])}</Button>
      <Button danger onClick={onClickReject}>
        {t(TranslationKey.Reject)}
      </Button>
    </div>
  )
})
