import { observer } from 'mobx-react'
import { Dispatch, FC, SetStateAction } from 'react'

import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined'

import { TranslationKey } from '@constants/translations/translation-key'

import { FileIcon } from '@components/shared//file-icon/file-icon'
import { NoDocumentIcon, NoPhotoIcon } from '@components/shared/svg-icons'
import { VideoPlayer } from '@components/shared/video-player'

import { checkIsImageLink, checkIsVideoLink } from '@utils/checks'
import { t } from '@utils/translations'

import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from './slider.style'

import { Arrow } from './components'
import { MIN_FILES_IN_ARRAY, WIDTH_INCREASE_FACTOR } from './slider.constants'
import { Arrows, ArrowsType } from './slider.type'

interface Props {
  slides: Array<string | IUploadFile>
  currentIndex: number
  setCurrentIndex: Dispatch<SetStateAction<number>>
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  alignLeft?: boolean
  alignRight?: boolean
  isHideCounter?: boolean
  withoutFiles?: boolean
  customSlideHeight?: number
  controls?: boolean
  onPhotosModalToggle?: VoidFunction
}

export const Slider: FC<Props> = observer(
  ({
    slides,
    currentIndex,
    setCurrentIndex,
    onPhotosModalToggle,
    smallSlider = false,
    mediumSlider = false,
    bigSlider = false,
    alignLeft = false,
    alignRight = false,
    isHideCounter = false,
    customSlideHeight,
    withoutFiles,
    controls = false,
  }) => {
    const { classes: classNames, cx } = useClassNames()

    const handleArrowClick = (direction: ArrowsType) => {
      const updateIndex = (prevIndex: number) =>
        direction === Arrows.LEFT
          ? prevIndex === 0
            ? slides?.length - 1
            : prevIndex - 1
          : (prevIndex + 1) % slides?.length

      setCurrentIndex(updateIndex)
    }

    const currentSlideTitle = `${currentIndex + 1}/${slides?.length}`
    const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR
    const isDisableArrowRight = slides?.length <= MIN_FILES_IN_ARRAY || currentIndex === slides?.length - 1
    const isDisableArrowLeft = slides?.length <= MIN_FILES_IN_ARRAY || currentIndex === 0
    const isNotElements = slides?.length === 0
    const isImagesType =
      !withoutFiles && slides?.every(slide => checkIsImageLink(typeof slide === 'string' ? slide : slide?.file?.name))
    const isImageType = (slide: string | IUploadFile): boolean =>
      checkIsImageLink(typeof slide === 'string' ? slide : slide?.file?.name)
    const isVideoType = (slide: string | IUploadFile): boolean =>
      checkIsVideoLink(typeof slide === 'string' ? slide : slide?.file?.name)

    return (
      <div
        className={cx(classNames.wrapper, {
          [classNames.wrapperAlignLeft]: alignLeft,
          [classNames.wrapperAlignRight]: alignRight,
        })}
      >
        {!isNotElements ? (
          <div className={classNames.mainWrapper}>
            <div
              className={cx(classNames.sliderWrapper, {
                [classNames.smallGap]: smallSlider,
                [classNames.bigGap]: bigSlider,
              })}
            >
              <Arrow
                direction={Arrows.LEFT}
                isDisableArrow={isDisableArrowLeft}
                smallSlider={smallSlider}
                mediumSlider={mediumSlider}
                bigSlider={bigSlider}
                onClick={handleArrowClick}
              />

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
                    const elementExtension = (typeof slide === 'string' ? slide : slide?.file?.name)
                      ?.split('.')
                      ?.slice(-1)?.[0]
                    const currentSlide = typeof slide === 'string' ? slide : slide?.data_url
                    const i = index === currentIndex

                    return (
                      <div key={index} className={classNames.slideWrapper}>
                        {isImageType(slide) ? (
                          isVideoType(slide) ? (
                            controls ? (
                              <VideoPlayer videoSource={currentSlide} controls={controls} i={i} />
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
                            <a href={typeof slide === 'string' ? slide : '/'} target="_blank" rel="noreferrer">
                              <FileIcon fileExtension={elementExtension} className={classNames.slide} />
                            </a>

                            <a
                              href={typeof slide === 'string' ? slide : '/'}
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

              <Arrow
                direction={Arrows.RIGHT}
                isDisableArrow={isDisableArrowRight}
                smallSlider={smallSlider}
                mediumSlider={mediumSlider}
                bigSlider={bigSlider}
                onClick={handleArrowClick}
              />
            </div>

            {!isHideCounter && (
              <div
                className={cx(classNames.currentSlideTitle, {
                  [classNames.smallText]: smallSlider,
                  [classNames.mediumText]: mediumSlider,
                  [classNames.bigText]: bigSlider,
                })}
              >
                {currentSlideTitle}
              </div>
            )}
          </div>
        ) : (
          <div
            className={cx(classNames.mainWrapper, {
              [classNames.mainSmall]: smallSlider,
            })}
          >
            <div
              className={cx({
                [classNames.slideSmall]: smallSlider,
                [classNames.slideMedium]: mediumSlider,
                [classNames.slideBig]: bigSlider,
              })}
              style={{ width: customSlideWidth, height: customSlideHeight }}
            >
              {isImagesType ? (
                <NoPhotoIcon className={classNames.slide} />
              ) : (
                <NoDocumentIcon className={cx(classNames.slide, classNames.slideNoDocuments)} />
              )}
            </div>

            {!isHideCounter && (
              <p
                className={cx(classNames.text, {
                  [classNames.smallText]: smallSlider,
                  [classNames.mediumText]: mediumSlider,
                  [classNames.bigText]: bigSlider,
                })}
              >
                {isImagesType ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
              </p>
            )}
          </div>
        )}
      </div>
    )
  },
)
