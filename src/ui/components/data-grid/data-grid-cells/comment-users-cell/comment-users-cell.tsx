import React, { FC } from 'react'

import { useStyles } from './comment-users-cell.style'

import { ChangeInputCommentCell } from '../data-grid-cells'

interface CommentUsersCellProps {
  handler: (id: string, comment?: string) => void
  comment: string
  maxLength?: number
}

export const CommentUsersCell: FC<CommentUsersCellProps> = React.memo(({ handler, comment, maxLength }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.CommentUsersCellWrapper}>
      <ChangeInputCommentCell text={comment} maxLength={maxLength || 128} onClickSubmit={handler} />
    </div>
  )
})
