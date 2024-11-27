import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'

import { useStyles } from './media-content-cell.style'

interface MediaContentCellProps {
  file: string
}

export const MediaContentCell: FC<MediaContentCellProps> = memo(({ file }) => {
  const { classes: styles } = useStyles()

  if (!file) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <CustomImage preview={false} width={48} height={48} src={file} maskClassName={styles.mask} />
    </div>
  )
})
