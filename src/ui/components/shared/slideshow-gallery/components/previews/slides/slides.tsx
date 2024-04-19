import { Dispatch, FC, SetStateAction, memo } from 'react'

import { getCustomHeightSubjectToQuantitySlides } from '@components/shared/slideshow-gallery/helpers/get-custom-height'

import { UploadFileType } from '@typings/shared/upload-file'

import { useScrollToFile } from '@hooks/use-scroll-to-file'

import { useStyles } from './slides.style'

import { SlideByType } from '../../../../slide-by-type'

interface SlidesProps {
  mediaFiles: UploadFileType[]
  currentMediaFileIndex: number
  setCurrentMediaFileIndex: Dispatch<SetStateAction<number>>
  isSlidesFitOnScreenWithoutArrows: boolean
  slidesToShow: number
  isModalSize?: boolean
}

export const Slides: FC<SlidesProps> = memo(props => {
  const {
    mediaFiles,
    currentMediaFileIndex,
    setCurrentMediaFileIndex,
    isSlidesFitOnScreenWithoutArrows,
    slidesToShow,
    isModalSize,
  } = props

  const { classes: styles, cx } = useStyles()

  const customHeightSubjectToQuantitySlides = getCustomHeightSubjectToQuantitySlides(
    isSlidesFitOnScreenWithoutArrows,
    slidesToShow,
    isModalSize,
  )

  const activeSlideRef = useScrollToFile(currentMediaFileIndex)

  return (
    <div
      className={cx(styles.previewSlides, {
        [styles.previewSlidesInModal]: isModalSize,
        [styles.previewSlidesFitOnScreenWithoutArrows]: isSlidesFitOnScreenWithoutArrows,
      })}
      style={{ height: customHeightSubjectToQuantitySlides }}
    >
      {mediaFiles.map((mediaFile, index) => (
        <div
          key={index}
          ref={index === currentMediaFileIndex ? activeSlideRef : null}
          className={cx(styles.previewSlide, {
            [styles.previewSlideActive]: index === currentMediaFileIndex,
            [styles.previewSlideInModal]: isModalSize,
          })}
          onClick={() => setCurrentMediaFileIndex(index)}
        >
          <SlideByType isPreviews objectFitContain mediaFile={mediaFile} mediaFileIndex={index} />
        </div>
      ))}
    </div>
  )
})
