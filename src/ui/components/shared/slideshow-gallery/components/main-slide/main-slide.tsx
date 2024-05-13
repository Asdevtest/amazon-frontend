import { FC, memo } from 'react'

import { SlideByType } from '@components/shared/slide-by-type'

import { UploadFileType } from '@typings/shared/upload-file'

import { useStyles } from './main-slide.style'

import { getCustomDimensionMainSlideSubjectToQuantitySlides } from '../../helpers/get-custom-dimension'

interface MainSlideProps {
  mediaFile: UploadFileType
  currentMediaFileIndex: number
  isTransitioning: boolean
  slidesToShow: number
  onOpenImageModal: () => void
  isModalSize?: boolean
}

export const MainSlide: FC<MainSlideProps> = memo(props => {
  const { isModalSize, mediaFile, currentMediaFileIndex, isTransitioning, slidesToShow, onOpenImageModal } = props

  const { classes: styles, cx } = useStyles()

  const customDimensionMainSlideSubjectToQuantitySlides = getCustomDimensionMainSlideSubjectToQuantitySlides(
    slidesToShow,
    isModalSize,
  )

  const handleClickMainSlide = () => {
    if (!isModalSize) {
      onOpenImageModal()
    }
  }

  return (
    <div
      className={cx(styles.mainSlide, { [styles.slideTransition]: isTransitioning })}
      style={{
        height: customDimensionMainSlideSubjectToQuantitySlides,
        width: customDimensionMainSlideSubjectToQuantitySlides,
      }}
      onClick={handleClickMainSlide}
    >
      <SlideByType
        objectFitContain
        isModal={isModalSize}
        withLink={isModalSize}
        mediaFile={mediaFile}
        mediaFileIndex={currentMediaFileIndex}
      />
    </div>
  )
})
