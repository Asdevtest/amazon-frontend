import { Dispatch, FC, SetStateAction, memo } from 'react'

import { checkIsImageLink, checkIsVideoLink } from '@utils/checks'

import { IUploadFile } from '@typings/upload-file'

import { useClassNames } from './slider.style'

import { Arrow, NoSlide, Slides } from './components'
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
  isPlaying?: boolean
  setIsPlaying?: (isPlaying: boolean) => void
  onPhotosModalToggle?: () => void
}

export const Slider: FC<Props> = memo(
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
    isPlaying,
    setIsPlaying,
  }) => {
    const { classes: classNames, cx } = useClassNames()

    const handleArrowClick = (direction: ArrowsType) => {
      const updateIndex = (prevIndex: number) => {
        const prevSlide = slides[prevIndex]
        if (checkIsVideoLink(typeof prevSlide === 'string' ? prevSlide : prevSlide.file.name) && setIsPlaying) {
          setIsPlaying(false) // fix a bug when changing focus from video to photo
        }

        return direction === Arrows.LEFT
          ? prevIndex === 0
            ? slides?.length - 1
            : prevIndex - 1
          : (prevIndex + 1) % slides?.length
      }

      setCurrentIndex(updateIndex)
    }

    const quantitySlides = `${currentIndex + 1}/${slides?.length}`
    const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR
    const isDisableArrowRight = slides?.length <= MIN_FILES_IN_ARRAY || currentIndex === slides?.length - 1
    const isDisableArrowLeft = slides?.length <= MIN_FILES_IN_ARRAY || currentIndex === 0
    const isNotElements = slides?.length === 0
    const isImagesType =
      !withoutFiles && slides?.every(slide => checkIsImageLink(typeof slide === 'string' ? slide : slide?.file?.name))

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

              <Slides
                slides={slides}
                currentIndex={currentIndex}
                smallSlider={smallSlider}
                mediumSlider={mediumSlider}
                bigSlider={bigSlider}
                controls={controls}
                customSlideHeight={customSlideHeight}
                customSlideWidth={customSlideWidth}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                onPhotosModalToggle={onPhotosModalToggle}
              />

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
                className={cx(classNames.quantitySlides, {
                  [classNames.smallText]: smallSlider,
                  [classNames.mediumText]: mediumSlider,
                  [classNames.bigText]: bigSlider,
                })}
              >
                {quantitySlides}
              </div>
            )}
          </div>
        ) : (
          <NoSlide
            isImagesType={isImagesType}
            isHideCounter={isHideCounter}
            smallSlider={smallSlider}
            mediumSlider={mediumSlider}
            bigSlider={bigSlider}
            customSlideHeight={customSlideHeight}
            customSlideWidth={customSlideWidth}
          />
        )}
      </div>
    )
  },
)
