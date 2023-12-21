import { Dispatch, FC, SetStateAction, memo, useEffect, useRef } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './previews.style'

import { GetSlideByType } from '../get-slide-by-type'

import { Arrow } from './arrow'
import { Arrows, ArrowsType } from './arrow/arrows.type'

interface PreviewsProps {
  mediaFiles: Array<string | IUploadFile>
  currentMediaFileIndex: number
  setCurrentMediaFileIndex: Dispatch<SetStateAction<number>>
  isTransitioning: boolean
  setIsTransitioning: Dispatch<SetStateAction<boolean>>
  slidesToShow: number
  showPreviews?: boolean
}

export const Previews: FC<PreviewsProps> = memo(props => {
  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,
    isTransitioning,
    setIsTransitioning,
    slidesToShow,
    showPreviews,
  } = props

  const { classes: styles, cx } = useStyles()

  const handleArrowClick = (direction: ArrowsType) => {
    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentMediaFileIndex((prevIndex: number) => {
        return direction === Arrows.UP
          ? prevIndex === 0
            ? mediaFiles?.length - 1
            : prevIndex - 1
          : (prevIndex + 1) % mediaFiles?.length
      })
      setIsTransitioning(false)
    }, 300)
  }

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
    }, 0)
  }, [currentMediaFileIndex])

  const isDisableArrowDown = mediaFiles.length <= 1 || currentMediaFileIndex === mediaFiles?.length - 1
  const isDisableArrowUp = mediaFiles.length <= 1 || currentMediaFileIndex === 0
  const isSlidesFitOnScreenWithoutArrows = mediaFiles.length === slidesToShow + 1

  return !showPreviews ? (
    <div className={styles.previews}>
      <Arrow
        direction={Arrows.UP}
        isDisableArrow={isDisableArrowUp || isTransitioning}
        isSlidesFitOnScreenWithoutArrows={isSlidesFitOnScreenWithoutArrows}
        onClick={handleArrowClick}
      />

      <div
        className={cx(styles.previewSlides, {
          [styles.previewSlidesFitOnScreenWithoutArrows]: isSlidesFitOnScreenWithoutArrows,
        })}
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
              VideoComponent={({ videoSource }) => <VideoPreloader videoSource={videoSource} height="46px" />}
              FileComponent={({ documentLink, fileExtension }) => (
                <a
                  href={documentLink}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.document}
                  onClick={e => e.preventDefault()}
                >
                  <FileIcon fileExtension={fileExtension} className={styles.fileIcon} />
                  <span className={styles.linkText}>{documentLink}</span>
                </a>
              )}
            />
          </div>
        ))}
      </div>

      <Arrow
        direction={Arrows.DOWN}
        isDisableArrow={isDisableArrowDown || isTransitioning}
        isSlidesFitOnScreenWithoutArrows={isSlidesFitOnScreenWithoutArrows}
        onClick={handleArrowClick}
      />
    </div>
  ) : null
})
