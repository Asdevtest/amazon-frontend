import { FC, memo } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { checkIsDocumentLink } from '@utils/checks'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './main-slide.style'

import { getCustomDimensionMainSlideSubjectToQuantitySlides } from '../../slideshow-gallery.helper'
import { GetSlideByType } from '../get-slide-by-type'

interface MainSlideProps {
  mediaFiles: Array<string | IUploadFile>
  currentMediaFileIndex: number
  isTransitioning: boolean
  slidesToShow: number
  onOpenImageModal: () => void
}

export const MainSlide: FC<MainSlideProps> = memo(props => {
  const { mediaFiles, currentMediaFileIndex, isTransitioning, slidesToShow, onOpenImageModal } = props

  const { classes: styles, cx } = useStyles()

  const customDimensionMainSlideSubjectToQuantitySlides =
    getCustomDimensionMainSlideSubjectToQuantitySlides(slidesToShow)
  const isDocument = checkIsDocumentLink(mediaFiles[currentMediaFileIndex]) // TODO: is it needed?

  return (
    <div
      className={cx(styles.mainSlide, { [styles.slideTransition]: isTransitioning })}
      style={{
        height: customDimensionMainSlideSubjectToQuantitySlides,
        width: customDimensionMainSlideSubjectToQuantitySlides,
      }}
      onClick={isDocument ? undefined : onOpenImageModal}
    >
      <GetSlideByType
        mediaFile={mediaFiles[currentMediaFileIndex]}
        mediaFileIndex={currentMediaFileIndex}
        ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.mainSlideImg} />}
        VideoComponent={({ videoSource }) => (
          <VideoPreloader
            videoSource={videoSource}
            height={customDimensionMainSlideSubjectToQuantitySlides}
            iconPlayClassName={styles.iconPreloader}
          />
        )}
        FileComponent={({ documentLink, fileExtension }) => (
          <a href={documentLink} target="_blank" rel="noreferrer" className={styles.document}>
            <FileIcon fileExtension={fileExtension} className={styles.fileIcon} />
            <span className={styles.linkText}>{documentLink}</span>
          </a>
        )}
      />
    </div>
  )
})
