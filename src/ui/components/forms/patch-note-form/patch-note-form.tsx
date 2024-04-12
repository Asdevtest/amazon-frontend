import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './patch-note-form.style'

interface PatchNoteFormProps {
  onToggleModal: () => void
}

export const PatchNoteForm: FC<PatchNoteFormProps> = memo(props => {
  const { onToggleModal } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <p>{t(TranslationKey['Add a patch note'])}</p>
    </div>
  )
})
