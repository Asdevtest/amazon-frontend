import { FC, memo } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { VideoPlayer } from '@components/shared/video-player'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from '../image-modal.styles'

interface ShowPreviewsProps {
  photos: Array<string | IUploadFile>
  photoIndex: number
  setPhotoIndex: (index: number) => void
  setIsPlaying: (flag: boolean) => void
  showPreviews?: boolean
  photosTitles?: string[]
}

export const ShowPreviews: FC<ShowPreviewsProps> = memo(
  ({ showPreviews, photos, photoIndex, photosTitles, setPhotoIndex, setIsPlaying }) => {
    const { classes: styles, cx } = useStyles()

    return showPreviews ? (
      <div className={styles.imagesList}>
        {photos?.map((photo, index) => {
          const currentPhoto = typeof photo === 'string' ? getAmazonImageUrl(photo, false) : photo?.data_url
          const isVideoType = checkIsVideoLink(typeof photo === 'string' ? photo : photo?.file?.name)

          return (
            <div
              key={index}
              className={cx(styles.imagesListItem, {
                [styles.imagesListItemActive]: index === photoIndex,
              })}
              onClick={() => {
                setPhotoIndex(index)
                setIsPlaying(false)
              }}
            >
              {isVideoType ? (
                <div className={styles.preloaderContainer}>
                  <VideoPlayer videoSource={currentPhoto} height="74px" />
                  <div className={styles.preloader}>
                    <PlayCircleFilledWhiteOutlinedIcon className={styles.preloaderIcon} />
                  </div>
                </div>
              ) : (
                <img src={currentPhoto} alt={`Photo ${photoIndex}`} />
              )}

              {photosTitles?.[index] && (
                <p className={cx(styles.imagesListItemTitle, styles.shortText)}>{photosTitles?.[index]}</p>
              )}
            </div>
          )
        })}
      </div>
    ) : null
  },
)
