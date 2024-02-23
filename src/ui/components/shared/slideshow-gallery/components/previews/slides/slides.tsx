import { Dispatch, FC, SetStateAction, memo, useEffect, useRef } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { getCustomHeightSubjectToQuantitySlides } from '@components/shared/slideshow-gallery/helpers/get-custom-height'
import {
  DEFAULT_PREVIEWS_SLIDE_HEIGHT,
  PREVIEWS_SLIDE_HEIGHT_IN_MODAL,
} from '@components/shared/slideshow-gallery/slideshow-gallery.constants'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './slides.style'

import { GetSlideByType } from '../../get-slide-by-type'

interface SlidesProps {
  mediaFiles: UploadFileType[]
  currentMediaFileIndex: number
  setCurrentMediaFileIndex: Dispatch<SetStateAction<number>>
  isSlidesFitOnScreenWithoutArrows: boolean
  slidesToShow: number
  isModalSize?: boolean
}

export const Slides: FC<SlidesProps> = memo(props => {
  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,
    isSlidesFitOnScreenWithoutArrows,
    slidesToShow,
    isModalSize,
  } = props

  const { classes: styles, cx } = useStyles()

  const customHeightSubjectToQuantitySlides = getCustomHeightSubjectToQuantitySlides(
    isSlidesFitOnScreenWithoutArrows,
    slidesToShow,
    isModalSize,
  )
  const finalVideoHeight = isModalSize ? PREVIEWS_SLIDE_HEIGHT_IN_MODAL : DEFAULT_PREVIEWS_SLIDE_HEIGHT
  const activeSlideRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const childElement = activeSlideRef.current

    if (!childElement) return

    const parentElement = childElement?.parentElement

    if (!parentElement) {
      return
    }

    const parentRect = parentElement.getBoundingClientRect()
    const childRect = childElement.getBoundingClientRect()

    const offset = (parentRect.height - childRect.height) / 2

    const top = childRect.top - parentRect.top + parentElement.scrollTop - offset

    parentElement?.scrollTo({ top })
  }, [currentMediaFileIndex])

  return (
    <div
      className={cx(styles.previewSlides, {
        [styles.previewSlidesInModal]: isModalSize,
        [styles.previewSlidesFitOnScreenWithoutArrows]: isSlidesFitOnScreenWithoutArrows,
      })}
      style={{ height: customHeightSubjectToQuantitySlides }}
    >
      {mediaFiles.map((mediaFile, index) => (
        <div
          key={`${index}_${mediaFile}`}
          ref={index === currentMediaFileIndex ? activeSlideRef : null}
          className={cx(styles.previewSlide, {
            [styles.previewSlideActive]: index === currentMediaFileIndex,
            [styles.previewSlideInModal]: isModalSize,
          })}
          onClick={() => setCurrentMediaFileIndex(index)}
        >
          <GetSlideByType
            isPreviews
            mediaFile={mediaFile}
            mediaFileIndex={index}
            ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.previewSlideImg} />}
            VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} height={finalVideoHeight} />}
            FileComponent={({ documentLink, fileExtension }) => (
              <a
                href={documentLink}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.document}
                onClick={e => e.preventDefault()} // fix follow the link to the previews
              >
                <FileIcon fileExtension={fileExtension} className={styles.fileIcon} />
                <span className={styles.linkText}>{documentLink}</span>
              </a>
            )}
          />
        </div>
      ))}
    </div>
  )
})
