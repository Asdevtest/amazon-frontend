import { FC, memo } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { FileIcon } from '@components/shared//file-icon/file-icon'
import { VideoPlayer } from '@components/shared/video-player'

import { checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from '../slider.style'

interface Props {
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

export const Slides: FC<Props> = memo(
  ({
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
  }) => {
    const { classes: classNames, cx } = useClassNames()

    const isImageType = (slide: string | IUploadFile): boolean =>
      checkIsImageLink(typeof slide === 'string' ? slide : slide?.file?.name)
    const isVideoType = (slide: string | IUploadFile): boolean =>
      checkIsVideoLink(typeof slide === 'string' ? slide : slide?.file?.name)

    return (
      <div className={cx(classNames.slidesWrapper)}>
        <div
          className={cx(classNames.slides, {
            [classNames.slideSmall]: smallSlider,
            [classNames.slideMedium]: mediumSlider,
            [classNames.slideBig]: bigSlider,
          })}
          style={{
            width: customSlideWidth,
            height: customSlideHeight,
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((slide, index) => {
            const elementExtension = (typeof slide === 'string' ? slide : slide?.file?.name)?.split('.')?.slice(-1)?.[0]
            const currentSlide = typeof slide === 'string' ? getAmazonImageUrl(slide, true) : slide?.data_url
            const isActiveSlide = currentIndex === index

            return (
              <div key={index} className={classNames.slideWrapper}>
                {isImageType(slide) ? (
                  isVideoType(slide) ? (
                    controls ? (
                      <VideoPlayer
                        videoSource={currentSlide}
                        controls={controls}
                        isPlaying={isPlaying && isActiveSlide}
                        setIsPlaying={setIsPlaying}
                      />
                    ) : (
                      <div className={classNames.preloaderContainer} onClick={onPhotosModalToggle}>
                        <VideoPlayer videoSource={currentSlide} />
                        <div className={classNames.preloader}>
                          <PlayCircleFilledWhiteOutlinedIcon className={classNames.preloaderIcon} />
                        </div>
                      </div>
                    )
                  ) : (
                    <img
                      src={currentSlide}
                      alt={`Slide ${currentIndex}`}
                      className={classNames.slide}
                      onClick={onPhotosModalToggle}
                    />
                  )
                ) : (
                  <div className={classNames.documentWrapper}>
                    <a
                      href={typeof slide === 'string' ? getAmazonImageUrl(slide) : '/'}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FileIcon fileExtension={elementExtension} className={classNames.slide} />
                    </a>

                    <a
                      href={typeof slide === 'string' ? getAmazonImageUrl(slide) : '/'}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(classNames.linkDocument, classNames.text, {
                        [classNames.smallText]: smallSlider,
                        [classNames.mediumText]: mediumSlider,
                        [classNames.bigText]: bigSlider,
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
  },
)
