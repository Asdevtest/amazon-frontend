import { FC, memo, useEffect, useRef } from 'react'

import { FileIcon } from '@components/shared/file-icon'
import { VideoPreloader } from '@components/shared/video-player/video-preloader'

import { checkIsMediaFileLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './show-previews.style'

interface ShowPreviewsProps {
  slides: Array<string | IUploadFile>
  currentIndex: number
  setCurrentIndex: (index: number) => void
  setIsPlaying: (flag: boolean) => void
  showPreviews?: boolean
  photosTitles?: string[]
}

export const ShowPreviews: FC<ShowPreviewsProps> = memo(props => {
  const { slides, currentIndex, setCurrentIndex, setIsPlaying, photosTitles, showPreviews } = props

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
  }, [currentIndex])

  return showPreviews ? (
    <div className={styles.slides}>
      {slides?.map((slide, index) => {
        const elementExtension = (typeof slide === 'string' ? slide : slide?.file?.name)?.split('.')?.slice(-1)?.[0]
        const slideToCheck = typeof slide === 'string' ? getAmazonImageUrl(slide, true) : slide?.file.name
        const currentSlide = typeof slide === 'string' ? getAmazonImageUrl(slide, false) : slide?.data_url
        const isActiveSlide = index === currentIndex

        return (
          <div
            ref={isActiveSlide ? activeSlideRef : null}
            key={index}
            className={cx(styles.slide, {
              [styles.activeSlide]: isActiveSlide,
            })}
            onClick={() => {
              setCurrentIndex(index)
              setIsPlaying(false)
            }}
          >
            {checkIsMediaFileLink(slideToCheck) ? (
              checkIsVideoLink(slideToCheck) ? (
                <VideoPreloader videoSource={currentSlide} height={74} />
              ) : (
                <img src={currentSlide} alt={`Photo-${index}`} />
              )
            ) : (
              <FileIcon fileExtension={elementExtension} className={styles.fileIcon} />
            )}

            {photosTitles?.[index] && <p className={cx(styles.text, styles.shortText)}>{photosTitles?.[index]}</p>}
          </div>
        )
      })}
    </div>
  ) : null
})
