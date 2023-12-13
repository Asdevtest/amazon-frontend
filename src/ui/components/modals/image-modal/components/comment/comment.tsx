import { FC, memo } from 'react'

import { getShortenStringIfLongerThanCount } from '@utils/text'

import { useStyles } from './comment.style'

interface CommentProps {
  mediaFileIndex: number
  isRequestResult?: boolean
  photosComments?: string[]
}

export const Comment: FC<CommentProps> = memo(({ mediaFileIndex, isRequestResult, photosComments }) => {
  const { classes: styles, cx } = useStyles()

  return photosComments?.[mediaFileIndex] ? (
    <p
      title={photosComments?.[mediaFileIndex].length > 200 ? photosComments?.[mediaFileIndex] : ''}
      className={cx(styles.title, { [styles.titleError]: isRequestResult })}
    >
      {getShortenStringIfLongerThanCount(photosComments?.[mediaFileIndex], 200)}
    </p>
  ) : null
})
