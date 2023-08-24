import { cx } from '@emotion/css'
import { FC, ReactNode, useEffect, useState } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { TranslationKey } from '@constants/translations/translation-key'

import { ImageModal, ImageObjectType } from '@components/modals/image-modal/image-modal'
import { NoDocumentIcon, NoPhotoIcon } from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './custom-slider-test.style'

import { FileIcon } from '../../files-carousel/file-icon'

import { MIN_FILES_IN_ARRAY, WIDTH_INCREASE_FACTOR } from './custom-slider-test.constants'
import { Arrows, ArrowsType } from './custom-slider-test.type'

interface Props {
  files: string[]
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  alignLeft?: boolean
  alignRight?: boolean
  isHideCounter?: boolean
  customSlideHeight?: number
  showPreviewsModal?: boolean
  controls?: (index: number, image: string | ImageObjectType) => ReactNode
}

export const CustomSliderTest: FC<Props> = ({
  files,
  smallSlider = false,
  mediumSlider = false,
  bigSlider = false,
  alignLeft = false,
  alignRight = false,
  isHideCounter = false,
  customSlideHeight,
  showPreviewsModal = false,
  controls,
}) => {
  const { classes: classNames } = useClassNames()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [slides, setSlides] = useState<string[]>([])
  const [slide, setSlide] = useState<string>('')

  const [isTransitioning, setIsTransitioning] = useState(false)

  const [arrowDirection, setArrowDirection] = useState<ArrowsType>()

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  useEffect(() => {
    if (files) {
      setSlides(files)
    }
  }, [files])

  useEffect(() => {
    if (slides.length > 0) {
      setSlide(slides[currentIndex])
    }
  }, [slides])

  const preloadImages = () => {
    const prevItemIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1
    const nextItemIndex = (currentIndex + 1) % slides.length

    new Image().src = slides[currentIndex]
    new Image().src = slides[prevItemIndex]
    new Image().src = slides[nextItemIndex]
  }

  useEffect(() => {
    if (slides.length) {
      preloadImages()
    }
  }, [currentIndex, slides])

  const handleArrowClick = (direction: ArrowsType) => {
    if (!isTransitioning) {
      setArrowDirection(direction)
      setCurrentIndex(prevIndex =>
        direction === Arrows.LEFT
          ? prevIndex === 0
            ? slides.length - 1
            : prevIndex - 1
          : (prevIndex + 1) % slides.length,
      )
      setIsTransitioning(true)
    }
  }

  useEffect(() => {
    const transitionDuration = 0
    let transitionTimeout: ReturnType<typeof setTimeout>

    if (isTransitioning) {
      transitionTimeout = setTimeout(() => {
        setSlide(slides[currentIndex])
        setIsTransitioning(false)
      }, transitionDuration)
    }

    return () => {
      clearTimeout(transitionTimeout)
    }
  }, [isTransitioning])

  const currentSlideTitle = `${currentIndex + 1}/${slides.length}`
  const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR
  const isDisableArrowRight = slides.length <= MIN_FILES_IN_ARRAY || currentIndex === slides.length - 1
  const isDisableArrowLeft = slides.length <= MIN_FILES_IN_ARRAY || currentIndex === 0
  const isRightArrow = arrowDirection === Arrows.RIGHT
  const isLeftArrow = arrowDirection === Arrows.LEFT
  const isNoElements = slides.length === 0
  const elementExtension = slide.split('.').slice(-1)[0]
  const isImageType = slides.every(el => checkIsImageLink(el))

  return (
    <>
      <div
        className={cx(classNames.wrapper, {
          [classNames.wrapperAlignLeft]: alignLeft,
          [classNames.wrapperAlignRight]: alignRight,
        })}
      >
        {!isNoElements ? (
          <div className={classNames.mainWrapper}>
            <div
              className={cx(classNames.sliderWrapper, {
                [classNames.bigGap]: bigSlider,
              })}
            >
              <button disabled={isDisableArrowLeft}>
                <ArrowLeftIcon
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowIconDisable]: isDisableArrowLeft,
                    [classNames.smallArrow]: smallSlider,
                    [classNames.mediumArrow]: mediumSlider,
                    [classNames.bigArrow]: bigSlider,
                  })}
                  onClick={() => handleArrowClick(Arrows.LEFT)}
                />
              </button>

              <div
                className={cx(classNames.slideWrapper, {
                  [classNames.slideLeftBefore]: isTransitioning && isLeftArrow,
                  [classNames.slideLeftAfter]: !isTransitioning && isLeftArrow,
                  [classNames.slideRightBefore]: isTransitioning && isRightArrow,
                  [classNames.slideRightAfter]: !isTransitioning && isRightArrow,
                  [classNames.slideSmall]: smallSlider,
                  [classNames.slideMedium]: mediumSlider,
                  [classNames.slideBig]: bigSlider,
                })}
                style={{ width: customSlideWidth, height: customSlideHeight }}
              >
                {isImageType ? (
                  <img
                    src={slide as string}
                    alt={`Slide ${currentIndex}`}
                    className={classNames.slide}
                    onClick={() => setShowPhotosModal(!showPhotosModal)}
                  />
                ) : (
                  <div className={classNames.documentWrapper}>
                    <a href={slide} target="_blank" rel="noreferrer">
                      <FileIcon fileExtension={elementExtension} className={classNames.slide} />
                    </a>

                    <a
                      href={slide}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(classNames.linkDocument, classNames.text, {
                        [classNames.smallText]: smallSlider,
                        [classNames.mediumText]: mediumSlider,
                        [classNames.bigText]: bigSlider,
                      })}
                    >
                      {slide}
                    </a>
                  </div>
                )}
              </div>

              <button disabled={isDisableArrowRight}>
                <ArrowRightIcon
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowIconDisable]: isDisableArrowRight,
                    [classNames.smallArrow]: smallSlider,
                    [classNames.mediumArrow]: mediumSlider,
                    [classNames.bigArrow]: bigSlider,
                  })}
                  onClick={() => handleArrowClick(Arrows.RIGHT)}
                />
              </button>
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
          <div className={classNames.mainWrapper}>
            <div
              className={cx(classNames.slideWrapper, {
                [classNames.slideSmall]: smallSlider,
                [classNames.slideMedium]: mediumSlider,
                [classNames.slideBig]: bigSlider,
              })}
              style={{ width: customSlideWidth, height: customSlideHeight }}
            >
              {isImageType ? (
                <NoPhotoIcon className={classNames.slide} />
              ) : (
                <NoDocumentIcon className={cx(classNames.slide, classNames.slideNoDocuments)} />
              )}
            </div>

            <p
              className={cx(classNames.text, {
                [classNames.smallText]: smallSlider,
                [classNames.mediumText]: mediumSlider,
                [classNames.bigText]: bigSlider,
              })}
            >
              {isImageType ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
            </p>
          </div>
        )}
      </div>

      {isImageType && (
        <ImageModal
          showPreviews={showPreviewsModal}
          isOpenModal={showPhotosModal}
          imageList={slides}
          currentImageIndex={currentIndex}
          handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          handleCurrentImageIndex={photoIndex => setCurrentIndex(photoIndex)}
          controls={controls}
        />
      )}
    </>
  )
}
