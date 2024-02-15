import { FC, memo } from 'react'

import { useStyles } from './comment.style'

interface CommentProps {
  text: string
}

export const Comment: FC<CommentProps> = memo(({ text }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.textContainer}>
      <p className={styles.text}>{text}</p>
    </div>
  )
})
