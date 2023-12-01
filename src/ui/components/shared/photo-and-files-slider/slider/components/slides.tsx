import { FC, memo } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { FileIcon } from '@components/shared//file-icon/file-icon'
import { VideoPlayer } from '@components/shared/video-player'

import { checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from '../slider.style'

interface SlidesProps {
  slides: Array<string | IUploadFile>
  currentIndex: number
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  customSlideHeight?: number
  customSlideWidth?: number
  controls?: boolean
  isPlaying?: boolean
  setIsPlaying?: (isPlaying: boolean) => void
  onPhotosModalToggle?: () => void
}

export const Slides: FC<SlidesProps> = memo(props => {
  const {
    slides,
    currentIndex,
    smallSlider,
    mediumSlider,
    bigSlider,
    controls,
    customSlideWidth,
    customSlideHeight,
    isPlaying,
    setIsPlaying,
    onPhotosModalToggle,
  } = props
  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.slidesWrapper)}>
      <div
        className={cx(styles.slides, {
          [styles.slideSmall]: smallSlider,
          [styles.slideMedium]: mediumSlider,
          [styles.slideBig]: bigSlider,
        })}
        style={{
          width: customSlideWidth,
          height: customSlideHeight,
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {slides?.map((slide, index) => {
          const elementExtension = (typeof slide === 'string' ? slide : slide?.file?.name)?.split('.')?.slice(-1)?.[0]
          const slideToCheck = typeof slide === 'string' ? getAmazonImageUrl(slide, true) : slide?.file.name
          const currentSlide = typeof slide === 'string' ? getAmazonImageUrl(slide, true) : slide?.data_url
          const isActiveSlide = currentIndex === index

          return (
            <div key={index} className={styles.slideWrapper}>
              {checkIsImageLink(slideToCheck) ? (
                checkIsVideoLink(slideToCheck) ? (
                  controls ? (
                    <VideoPlayer
                      videoSource={currentSlide}
                      controls={controls}
                      isPlaying={isPlaying && isActiveSlide}
                      setIsPlaying={setIsPlaying}
                    />
                  ) : (
                    <div className={styles.preloaderContainer} onClick={onPhotosModalToggle}>
                      <VideoPlayer videoSource={currentSlide} />
                      <div className={styles.preloader}>
                        <PlayCircleFilledWhiteOutlinedIcon className={styles.preloaderIcon} />
                      </div>
                    </div>
                  )
                ) : (
                  <img
                    src={currentSlide}
                    alt={`Slide ${currentIndex}`}
                    className={styles.slide}
                    onClick={onPhotosModalToggle}
                  />
                )
              ) : (
                <div className={styles.documentWrapper}>
                  <a href={typeof slide === 'string' ? getAmazonImageUrl(slide) : '/'} target="_blank" rel="noreferrer">
                    <FileIcon fileExtension={elementExtension} className={styles.slide} />
                  </a>

                  <a
                    href={typeof slide === 'string' ? getAmazonImageUrl(slide) : '/'}
                    target="_blank"
                    rel="noreferrer"
                    className={cx(styles.linkDocument, styles.text, {
                      [styles.smallText]: smallSlider,
                      [styles.mediumText]: mediumSlider,
                      [styles.bigText]: bigSlider,
                    })}
                  >
                    {typeof slide === 'string' ? slide : slide?.file?.name}
                  </a>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
})
