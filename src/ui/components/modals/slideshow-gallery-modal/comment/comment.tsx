import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './comment.style'

interface CommentProps {
  text: string
}

export const Comment: FC<CommentProps> = memo(({ text }) => {
  const { classes: styles } = useStyles()

  const commentText = `${t(TranslationKey['Client comment'])}: ${text}`

  return (
    <div className={styles.textContainer}>
      <p className={styles.text}>{commentText}</p>
    </div>
  )
})
