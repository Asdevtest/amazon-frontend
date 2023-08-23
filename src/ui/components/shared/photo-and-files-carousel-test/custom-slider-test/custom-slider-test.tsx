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

import { DEFAULT_DELAY, MIN_FILES_IN_ARRAY, WIDTH_INCREASE_FACTOR } from './custom-slider-test.constants'
import { Arrows, ArrowsType } from './custom-slider-test.type'

interface Props {
  files: string[]
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  alignLeft?: boolean
  alignRight?: boolean
  isHideCounter?: boolean
  customImageHeight?: number
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
  customImageHeight,
  controls,
}) => {
  const { classes: classNames } = useClassNames()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedElements, setSelectedElements] = useState<string[]>([])
  const [selectedElement, setSelectedElement] = useState<string>('')

  const [isTransitioning, setIsTransitioning] = useState(false)
  const [isOpacity, setIsOpacity] = useState(false)

  const [arrowDirection, setArrowDirection] = useState<ArrowsType>()

  const [showPhotosModal, setShowPhotosModal] = useState(false)

  useEffect(() => {
    if (files) {
      setSelectedElements(files)
    }
  }, [files])

  useEffect(() => {
    if (selectedElements.length > 0) {
      setSelectedElement(selectedElements[currentIndex])
    }
  }, [selectedElements])

  const handleArrowClick = (direction: ArrowsType) => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setIsOpacity(true)
      setArrowDirection(direction)
      setCurrentIndex(prevIndex =>
        direction === Arrows.LEFT
          ? prevIndex === 0
            ? selectedElements.length - 1
            : prevIndex - 1
          : (prevIndex + 1) % selectedElements.length,
      )
    }
  }

  useEffect(() => {
    const transitionDuration = DEFAULT_DELAY
    let transitionTimeout: ReturnType<typeof setTimeout>

    if (isTransitioning) {
      transitionTimeout = setTimeout(() => {
        setIsOpacity(false)
        setIsTransitioning(false)
        setSelectedElement(selectedElements[currentIndex])
      }, transitionDuration)
    }

    return () => {
      clearTimeout(transitionTimeout)
    }
  }, [isTransitioning, isOpacity])

  const currentSlideTitle = `${currentIndex + 1}/${selectedElements.length}`
  const customSlideWidth = customImageHeight && customImageHeight * WIDTH_INCREASE_FACTOR
  const isDisableArrow = selectedElements.length <= MIN_FILES_IN_ARRAY
  const isRightArrow = arrowDirection === Arrows.RIGHT
  const isLeftArrow = arrowDirection === Arrows.LEFT
  const isNoElements = selectedElements.length === 0
  const elementExtension = selectedElement.split('.').slice(-1)[0]
  const isImageType = selectedElements.every(el => checkIsImageLink(el))

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
            <div className={classNames.sliderWrapper}>
              <button disabled={isDisableArrow}>
                <ArrowLeftIcon
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowIconDisable]: isDisableArrow,
                    [classNames.smallArrow]: smallSlider,
                    [classNames.mediumArrow]: mediumSlider,
                    [classNames.bigArrow]: bigSlider,
                  })}
                  onClick={() => handleArrowClick(Arrows.LEFT)}
                />
              </button>

              <div
                className={cx(classNames.slideWrapper, {
                  [classNames.opacity]: isOpacity,
                  [classNames.slideLeftBefore]: isTransitioning && isLeftArrow,
                  [classNames.slideLeftAfter]: !isTransitioning && isLeftArrow,
                  [classNames.slideRightBefore]: isTransitioning && isRightArrow,
                  [classNames.slideRightAfter]: !isTransitioning && isRightArrow,
                  [classNames.slideSmall]: smallSlider,
                  [classNames.slideMedium]: mediumSlider,
                  [classNames.slideBig]: bigSlider,
                })}
                style={{ width: customSlideWidth, height: customImageHeight }}
              >
                {isImageType ? (
                  <img
                    src={selectedElement as string}
                    alt={`Slide ${currentIndex}`}
                    className={classNames.slide}
                    onClick={() => setShowPhotosModal(!showPhotosModal)}
                  />
                ) : (
                  <div className={classNames.documentWrapper}>
                    <a href={selectedElement} target="_blank" rel="noreferrer">
                      <FileIcon fileExtension={elementExtension} className={classNames.slide} />
                    </a>

                    <a
                      href={selectedElement}
                      target="_blank"
                      rel="noreferrer"
                      className={cx(classNames.linkDocument, classNames.text, {
                        [classNames.smallText]: smallSlider,
                        [classNames.mediumText]: mediumSlider,
                        [classNames.bigText]: bigSlider,
                      })}
                    >
                      {selectedElement}
                    </a>
                  </div>
                )}
              </div>

              <button disabled={isDisableArrow}>
                <ArrowRightIcon
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowIconDisable]: isDisableArrow,
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
              style={{ width: customSlideWidth, height: customImageHeight }}
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
          showPreviews
          isOpenModal={showPhotosModal}
          imageList={selectedElements}
          currentImageIndex={currentIndex}
          handleOpenModal={() => setShowPhotosModal(!showPhotosModal)}
          handleCurrentImageIndex={photoIndex => setCurrentIndex(photoIndex)}
          controls={controls}
        />
      )}
    </>
  )
}
