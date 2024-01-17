import { Dispatch, FC, SetStateAction, memo, useEffect, useRef } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import {
  DEFAULT_PREVIEWS_SLIDE_HEIGHT,
  NULL_DELAY,
} from '@components/shared/slideshow-gallery/slideshow-gallery.constants'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './slides.style'

import { GetSlideByType } from '../../get-slide-by-type'

import { getCustomHeightSubjectToQuantitySlides } from './slides.helper'

interface SlidesProps {
  mediaFiles: Array<string | IUploadFile>
  currentMediaFileIndex: number
  setCurrentMediaFileIndex: Dispatch<SetStateAction<number>>
  isSlidesFitOnScreenWithoutArrows: boolean
  slidesToShow: number
}

export const Slides: FC<SlidesProps> = memo(props => {
  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,
    isSlidesFitOnScreenWithoutArrows,
    slidesToShow,
  } = props

  const { classes: styles, cx } = useStyles()

  const customHeightSubjectToQuantitySlides = getCustomHeightSubjectToQuantitySlides(
    isSlidesFitOnScreenWithoutArrows,
    slidesToShow,
  )

  const activeSlideRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    setTimeout(() => {
      if (activeSlideRef.current) {
        activeSlideRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    }, NULL_DELAY)
  }, [currentMediaFileIndex])

  return (
    <div
      className={cx(styles.previewSlides, {
        [styles.previewSlidesFitOnScreenWithoutArrows]: isSlidesFitOnScreenWithoutArrows,
      })}
      style={{ height: customHeightSubjectToQuantitySlides }}
    >
      {mediaFiles.map((mediaFile, index) => (
        <div
          key={index}
          ref={index === currentMediaFileIndex ? activeSlideRef : null}
          className={cx(styles.previewSlide, { [styles.previewSlideActive]: index === currentMediaFileIndex })}
          onClick={() => setCurrentMediaFileIndex(index)}
        >
          <GetSlideByType
            isPreviews
            mediaFile={mediaFile}
            mediaFileIndex={index}
            ImageComponent={({ src, alt }) => <img src={src} alt={alt} className={styles.previewSlideImg} />}
            VideoComponent={({ videoSource }) => (
              <VideoPreloader videoSource={videoSource} height={DEFAULT_PREVIEWS_SLIDE_HEIGHT} />
            )}
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
