import { ChangeInputCommentCell } from '..'
import { FC, memo } from 'react'

import { useStyles } from './comment-users-cell.style'

interface CommentUsersCellProps {
  handler: (id: string, comment?: string) => void
  comment: string
  maxLength?: number
}

export const CommentUsersCell: FC<CommentUsersCellProps> = memo(({ handler, comment, maxLength }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.CommentUsersCellWrapper}>
      <ChangeInputCommentCell text={comment} maxLength={maxLength || 128} onClickSubmit={handler} />
    </div>
  )
})
