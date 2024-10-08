import { Dispatch, FC, SetStateAction, memo } from 'react'

import { Arrows } from '@typings/enums/arrows'
import { UploadFileType } from '@typings/shared/upload-file'
import { ArrowsType } from '@typings/types/arrows'

import { useStyles } from './previews.style'

import {
  DEFAULT_ANIMATION_DELAY,
  FIRST_SLIDE,
  MIN_FILES_IN_ARRAY,
  QUANTITY_SLIDES_INSTEAD_OF_ARROWS,
} from '../../slideshow-gallery.constants'

import { Arrow } from './arrow'
import { Slides } from './slides'

interface PreviewsProps {
  mediaFiles: UploadFileType[]
  currentMediaFileIndex: number
  setCurrentMediaFileIndex: Dispatch<SetStateAction<number>>
  isTransitioning: boolean
  setIsTransitioning: Dispatch<SetStateAction<boolean>>
  isModalSize?: boolean
  slidesToShow: number
  hiddenPreviews?: boolean
}

export const Previews: FC<PreviewsProps> = memo(props => {
  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,
    isTransitioning,
    setIsTransitioning,
    isModalSize,
    slidesToShow,
    hiddenPreviews,
  } = props

  const { classes: styles, cx } = useStyles()

  const handleArrowClick = (direction: ArrowsType) => {
    setIsTransitioning(true)

    setTimeout(() => {
      setCurrentMediaFileIndex((prevIndex: number) =>
        direction === Arrows.UP
          ? prevIndex === FIRST_SLIDE
            ? mediaFiles?.length - 1
            : prevIndex - 1
          : (prevIndex + 1) % mediaFiles?.length,
      )

      setIsTransitioning(false)
    }, DEFAULT_ANIMATION_DELAY)
  }

  const isDisableArrowDown = mediaFiles.length <= MIN_FILES_IN_ARRAY || currentMediaFileIndex === mediaFiles.length - 1
  const isDisableArrowUp = mediaFiles.length <= MIN_FILES_IN_ARRAY || currentMediaFileIndex === FIRST_SLIDE
  const isSlidesFitOnScreenWithoutArrows = mediaFiles.length <= slidesToShow + QUANTITY_SLIDES_INSTEAD_OF_ARROWS

  return !hiddenPreviews ? (
    <div className={cx(styles.previews, { [styles.previewsModalSize]: isModalSize })}>
      <Arrow
        direction={Arrows.UP}
        isModalSize={isModalSize}
        isDisableArrow={isDisableArrowUp || isTransitioning}
        isSlidesFitOnScreenWithoutArrows={isSlidesFitOnScreenWithoutArrows}
        onClick={handleArrowClick}
      />

      <Slides
        isModalSize={isModalSize}
        slidesToShow={slidesToShow}
        mediaFiles={mediaFiles}
        currentMediaFileIndex={currentMediaFileIndex}
        setCurrentMediaFileIndex={setCurrentMediaFileIndex}
        isSlidesFitOnScreenWithoutArrows={isSlidesFitOnScreenWithoutArrows}
      />

      <Arrow
        direction={Arrows.DOWN}
        isModalSize={isModalSize}
        isDisableArrow={isDisableArrowDown || isTransitioning}
        isSlidesFitOnScreenWithoutArrows={isSlidesFitOnScreenWithoutArrows}
        onClick={handleArrowClick}
      />
    </div>
  ) : null
})
