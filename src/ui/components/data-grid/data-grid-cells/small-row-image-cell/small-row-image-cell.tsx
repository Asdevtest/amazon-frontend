import { FC, memo } from 'react'

import { VideoPreloader } from '@components/shared/video-preloader'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './small-row-image-cell.style'

interface SmallRowImageCellProps {
  image: string
}

export const SmallRowImageCell: FC<SmallRowImageCellProps> = memo(({ image }) => {
  const { classes: styles } = useStyles()

  const checkIsVideo = checkIsVideoLink(image)

  return (
    <div className={styles.wrapper}>
      {checkIsVideo ? (
        <VideoPreloader videoSource={getAmazonImageUrl(image)} />
      ) : (
        <img src={getAmazonImageUrl(image)} alt="image" className={styles.img} />
      )}
    </div>
  )
})
