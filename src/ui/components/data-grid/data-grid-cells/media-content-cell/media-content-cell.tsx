import { FC, memo } from 'react'

import { CustomImage } from '@components/shared/custom-image'

import { useStyles } from './media-content-cell.style'

interface SmallRowImageCellProps {
  image: string
}

export const MediaContentCell: FC<SmallRowImageCellProps> = memo(({ image }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <CustomImage width={48} height={48} src={image} maskClassName={styles.mask} />
    </div>
  )
})
