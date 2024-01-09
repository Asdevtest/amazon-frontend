import { Dispatch, FC, SetStateAction, memo } from 'react'

import { checkIsMediaFileLink, checkIsVideoLink } from '@utils/checks'

import { IUploadFile } from '@typings/upload-file'

import { useStyles } from './slider.style'

import { Arrow, NoSlide, Slides } from './components'
import { MIN_FILES_IN_ARRAY, WIDTH_INCREASE_FACTOR } from './slider.constants'
import { Arrows, ArrowsType } from './slider.type'

interface SliderProps {
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
  smallPhotos?: boolean
  setIsPlaying?: (isPlaying: boolean) => void
  onPhotosModalToggle?: () => void
}

export const Slider: FC<SliderProps> = memo(props => {
  const {
    slides,
    currentIndex,
    setCurrentIndex,
    onPhotosModalToggle,
    smallSlider,
    mediumSlider,
    bigSlider,
    alignLeft,
    alignRight,
    isHideCounter,
    smallPhotos,
    customSlideHeight,
    withoutFiles,
    controls = false,
    isPlaying,
    setIsPlaying,
  } = props

  const { classes: styles, cx } = useStyles()

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
    !withoutFiles && slides?.every(slide => checkIsMediaFileLink(typeof slide === 'string' ? slide : slide?.file?.name))

  return (
    <div
      className={cx(styles.wrapper, {
        [styles.wrapperAlignLeft]: alignLeft,
        [styles.wrapperAlignRight]: alignRight,
      })}
    >
      {!isNotElements ? (
        <div className={styles.mainWrapper}>
          <div
            className={cx(styles.sliderWrapper, {
              [styles.smallGap]: smallSlider,
              [styles.bigGap]: bigSlider,
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
              smallPhotos={smallPhotos}
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
              className={cx(styles.quantitySlides, {
                [styles.smallText]: smallSlider,
                [styles.mediumText]: mediumSlider,
                [styles.bigText]: bigSlider,
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
})
