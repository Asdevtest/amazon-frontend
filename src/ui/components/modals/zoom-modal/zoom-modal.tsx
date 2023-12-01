import { Dispatch, FC, SetStateAction, memo } from 'react'
import Lightbox from 'react-18-image-lightbox'
import 'react-18-image-lightbox/style.css'

import { MIN_FILES_IN_ARRAY } from '@components/shared/photo-and-files-slider/slider/slider.constants'
import { VideoPlayer } from '@components/shared/video-player'

import { checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './zoom-modal.style'

interface ZoomModalProps {
  mediaFiles: Array<string | IUploadFile>
  currentMediaFileIndex: number
  isOpenModal: boolean
  setIsOpenModal: Dispatch<SetStateAction<boolean>>
  setCurrentMediaFileIndex: (index: number) => void
}

export const ZoomModal: FC<ZoomModalProps> = memo(
  ({ mediaFiles, currentMediaFileIndex, isOpenModal, setIsOpenModal, setCurrentMediaFileIndex }) => {
    const { classes: styles } = useStyles()

    const currentImages = mediaFiles.map(mediaFile =>
      typeof mediaFile === 'string' ? getAmazonImageUrl(mediaFile, true) : mediaFile?.data_url,
    )

    const nextImageIndex = (currentMediaFileIndex + 1) % currentImages?.length
    const prevImageIndex = (currentMediaFileIndex + currentImages?.length - 1) % currentImages?.length

    const isDisableArrowRight =
      currentImages?.length <= MIN_FILES_IN_ARRAY || currentMediaFileIndex === currentImages?.length - 1
    const isDisableArrowLeft = currentImages?.length <= MIN_FILES_IN_ARRAY || currentMediaFileIndex === 0

    const checkIsVideo = checkIsVideoLink(currentImages?.[currentMediaFileIndex])

    return isOpenModal ? (
      <Lightbox
        enableZoom={!checkIsVideo}
        mainSrc={currentImages?.[currentMediaFileIndex]}
        nextSrc={!isDisableArrowRight ? currentImages?.[nextImageIndex] : undefined}
        prevSrc={!isDisableArrowLeft ? currentImages?.[prevImageIndex] : undefined}
        wrapperClassName={styles.wrapper}
        imageLoadErrorMessage={
          checkIsVideo ? (
            <VideoPlayer
              controls
              videoSource={currentImages?.[currentMediaFileIndex]}
              wrapperClass={styles.videoPlayerCustomWrapper}
              videoPlayerClass={styles.videoPlayerCustom}
            />
          ) : (
            'This image failed to load!'
          )
        }
        onCloseRequest={() => setIsOpenModal(!isOpenModal)}
        onMovePrevRequest={() => setCurrentMediaFileIndex(prevImageIndex)}
        onMoveNextRequest={() => setCurrentMediaFileIndex(nextImageIndex)}
      />
    ) : null
  },
)
