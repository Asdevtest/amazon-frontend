import { FC, memo } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { checkIsDocumentLink } from '@utils/checks'

import { isString } from '@typings/type-guards'
import { UploadFileType } from '@typings/upload-file'

import { useStyles } from './main-slide.style'

import { getCustomDimensionMainSlideSubjectToQuantitySlides } from '../../helpers/get-custom-dimension'
import { GetSlideByType } from '../get-slide-by-type'

interface MainSlideProps {
  mediaFile: UploadFileType
  currentMediaFileIndex: number
  isTransitioning: boolean
  slidesToShow: number
  onOpenImageModal: () => void
  isModalSize?: boolean
}

export const MainSlide: FC<MainSlideProps> = memo(props => {
  const { isModalSize, mediaFile, currentMediaFileIndex, isTransitioning, slidesToShow, onOpenImageModal } = props

  const { classes: styles, cx } = useStyles()

  const customDimensionMainSlideSubjectToQuantitySlides = getCustomDimensionMainSlideSubjectToQuantitySlides(
    slidesToShow,
    isModalSize,
  )
  const isDocument = checkIsDocumentLink(isString(mediaFile) ? mediaFile : mediaFile?.file.name)

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
        mediaFile={mediaFile}
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
          <a href={documentLink} target="_blank" rel="noreferrer noopener" className={styles.document}>
            <FileIcon fileExtension={fileExtension} className={styles.fileIcon} />
            <span className={styles.linkText}>{documentLink}</span>
          </a>
        )}
      />
    </div>
  )
})
