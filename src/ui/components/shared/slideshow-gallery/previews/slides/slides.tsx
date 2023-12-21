import { Dispatch, FC, SetStateAction, memo, useEffect, useRef } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { GetSlideByType } from '@components/shared/slideshow-gallery/get-slide-by-type'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './slides.style'

interface SlidesProps {
  mediaFiles: Array<string | IUploadFile>
  currentMediaFileIndex: number
  setCurrentMediaFileIndex: Dispatch<SetStateAction<number>>
  isSlidesFitOnScreenWithoutArrows: boolean
}

export const Slides: FC<SlidesProps> = memo(props => {
  const { mediaFiles, currentMediaFileIndex, setCurrentMediaFileIndex, isSlidesFitOnScreenWithoutArrows } = props

  const { classes: styles, cx } = useStyles()

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

  return (
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
  )
})
