import React, { FC } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { VideoPlayer } from '@components/shared/video-player'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useDataGridCellStyles } from './small-row-image-cell.style'

interface SmallRowImageCellProps {
  image: string
}

export const SmallRowImageCell: FC<SmallRowImageCellProps> = React.memo(({ image }) => {
  const { classes: styles } = useDataGridCellStyles()

  const checkIsVideo = checkIsVideoLink(image)
  return (
    <div className={styles.smallRowImgWrapper}>
      {checkIsVideo ? (
        <div className={styles.preloaderContainer}>
          <VideoPlayer videoSource={getAmazonImageUrl(image)} height="58px" />
          <div className={styles.preloader}>
            <PlayCircleFilledWhiteOutlinedIcon className={styles.preloaderIcon} />
          </div>
        </div>
      ) : (
        <img src={getAmazonImageUrl(image)} alt="image" className={styles.img} />
      )}
    </div>
  )
})
