import { Image } from 'antd'
import { FC, memo } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './media-content-cell.style'

interface SmallRowImageCellProps {
  image: string
}

export const MediaContentCell: FC<SmallRowImageCellProps> = memo(({ image }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <Image
        preview={{ maskClassName: styles.mask }}
        width={48}
        height={48}
        src={getAmazonImageUrl(image, true)}
        wrapperClassName={styles.image}
        onClick={e => e.stopPropagation()}
      />
    </div>
  )
})
