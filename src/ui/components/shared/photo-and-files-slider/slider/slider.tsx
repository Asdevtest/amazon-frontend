import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { Dispatch, FC, SetStateAction } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import { TranslationKey } from '@constants/translations/translation-key'

import { FileIcon } from '@components/shared//file-icon/file-icon'
import { NoDocumentIcon, NoPhotoIcon } from '@components/shared/svg-icons'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from './slider.style'

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
  onPhotosModalToggle?: VoidFunction
  setPrevPhotoIndex?: Dispatch<SetStateAction<number>>
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
    setPrevPhotoIndex,
  }) => {
    const { classes: classNames } = useClassNames()

    const handleArrowClick = (direction: ArrowsType) => {
      const updateIndex = (prevIndex: number) =>
        direction === Arrows.LEFT
          ? prevIndex === 0
            ? slides.length - 1
            : prevIndex - 1
          : (prevIndex + 1) % slides.length

      setCurrentIndex(updateIndex)

      if (setPrevPhotoIndex) {
        setPrevPhotoIndex(updateIndex)
      }
    }

    const currentSlideTitle = `${currentIndex + 1}/${slides.length}`
    const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR
    const isDisableArrowRight = slides.length <= MIN_FILES_IN_ARRAY || currentIndex === slides.length - 1
    const isDisableArrowLeft = slides.length <= MIN_FILES_IN_ARRAY || currentIndex === 0
    const isNotElements = slides.length === 0
    const isImagesType =
      !withoutFiles && slides.every(slide => checkIsImageLink(typeof slide === 'string' ? slide : slide.file.name))
    const isImageType = (slide: string | IUploadFile): boolean =>
      checkIsImageLink(typeof slide === 'string' ? slide : slide.file.name)

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
              <button
                disabled={isDisableArrowLeft}
                className={cx(classNames.arrowIcon, {
                  [classNames.arrowIconDisable]: isDisableArrowLeft,
                  [classNames.smallArrow]: smallSlider,
                  [classNames.mediumArrow]: mediumSlider,
                  [classNames.bigArrow]: bigSlider,
                })}
                onClick={() => handleArrowClick(Arrows.LEFT)}
              >
                <ArrowLeftIcon
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowIconDisable]: isDisableArrowLeft,
                    [classNames.smallArrow]: smallSlider,
                    [classNames.mediumArrow]: mediumSlider,
                    [classNames.bigArrow]: bigSlider,
                  })}
                />
              </button>

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
                    const elementExtension = (typeof slide === 'string' ? slide : slide.file.name)
                      .split('.')
                      .slice(-1)[0]

                    return (
                      <div key={index} className={classNames.slideWrapper}>
                        {isImageType(slide) ? (
                          <img
                            src={typeof slide === 'string' ? slide : slide.data_url}
                            alt={`Slide ${currentIndex}`}
                            className={classNames.slide}
                            onClick={onPhotosModalToggle}
                          />
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
                              {typeof slide === 'string' ? slide : slide.file.name}
                            </a>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>

              <button
                disabled={isDisableArrowRight}
                className={cx(classNames.arrowIcon, {
                  [classNames.arrowIconDisable]: isDisableArrowRight,
                  [classNames.smallArrow]: smallSlider,
                  [classNames.mediumArrow]: mediumSlider,
                  [classNames.bigArrow]: bigSlider,
                })}
                onClick={() => handleArrowClick(Arrows.RIGHT)}
              >
                <ArrowRightIcon
                  className={cx(classNames.arrowIcon, {
                    [classNames.arrowIconDisable]: isDisableArrowRight,
                    [classNames.smallArrow]: smallSlider,
                    [classNames.mediumArrow]: mediumSlider,
                    [classNames.bigArrow]: bigSlider,
                  })}
                />
              </button>
            </div>

            {/* {filteredImagesTitles[index] && <p className={classNames.imageTitle}>{filteredImagesTitles[index]}</p>} */}

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
