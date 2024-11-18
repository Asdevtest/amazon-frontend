import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'

import { useStyles } from './media-content-cell.style'

interface SmallRowImageCellProps {
  image: string
  isEmpty?: boolean
}

export const MediaContentCell: FC<SmallRowImageCellProps> = memo(({ image, isEmpty }) => {
  const { classes: styles } = useStyles()

  if (isEmpty) {
    return null
  }

  return (
    <div className={styles.wrapper}>
      <CustomImage width={48} height={48} src={image} maskClassName={styles.mask} />
    </div>
  )
})
