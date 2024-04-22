import { FC, memo } from 'react'

import { Field } from '@components/shared/field'

import { useStyles } from './comment.style'

import { FilesProps } from '../../files'

interface CommentProps extends Pick<FilesProps, 'onChangeComment' | 'withComment'> {
  fileIndex: number
  placeholder: string
  comment?: string
}

export const Comment: FC<CommentProps> = memo(props => {
  const { comment, fileIndex, placeholder, withComment, onChangeComment } = props

  const { classes: styles } = useStyles()

  return withComment ? (
    <Field
      oneLine
      multiline
      minRows={2}
      maxRows={2}
      placeholder={placeholder}
      inputProps={{ maxLength: 64 }}
      containerClasses={styles.commentContainer}
      inputClasses={styles.commentClasses}
      classes={{ input: styles.comment }}
      value={comment}
      onChange={onChangeComment(fileIndex)}
    />
  ) : null
})
