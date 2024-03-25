import { FC, memo } from 'react'

import { CustomFileIcon } from '@components/shared/custom-file-icon'
import { VideoPlayer } from '@components/shared/video-player'
import { VideoPreloader } from '@components/shared/video-preloader'

import { checkIsDocumentLink, checkIsImageLink } from '@utils/checks'

import { isString } from '@typings/guards'
import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './main-slide.style'

import { SlideByType } from '../../../slide-by-type'
import { getCustomDimensionMainSlideSubjectToQuantitySlides } from '../../helpers/get-custom-dimension'

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

  const handleClickMainSlide = () => {
    const file = isString(mediaFile) ? mediaFile : mediaFile.file.name
    const isImage = checkIsImageLink(file)
    const isDocument = checkIsDocumentLink(file)

    if ((isModalSize && isImage) || (!isModalSize && !isDocument)) {
      onOpenImageModal()
    }
  }

  return (
    <div
      className={cx(styles.mainSlide, { [styles.slideTransition]: isTransitioning })}
      style={{
        height: customDimensionMainSlideSubjectToQuantitySlides,
        width: customDimensionMainSlideSubjectToQuantitySlides,
      }}
      onClick={handleClickMainSlide}
    >
      <SlideByType
        mediaFile={mediaFile}
        mediaFileIndex={currentMediaFileIndex}
        ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.mainSlideImg} />}
        VideoComponent={({ videoSource }) =>
          isModalSize ? (
            <VideoPlayer controls videoSource={videoSource} />
          ) : (
            <VideoPreloader
              videoSource={videoSource}
              height={customDimensionMainSlideSubjectToQuantitySlides}
              iconPlayClassName={styles.iconPreloader}
            />
          )
        }
        FileComponent={({ documentLink, fileExtension }) => (
          <a href={documentLink} target="_blank" rel="noreferrer noopener" className={styles.document}>
            <CustomFileIcon fileExtension={fileExtension} height="100%" />
            <span className={styles.linkText}>{documentLink}</span>
          </a>
        )}
      />
    </div>
  )
})
