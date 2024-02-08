import { FC, memo } from 'react'

import { NoPhotoIcon } from '@components/shared/svg-icons'

import { useStyles } from './empty-file.styles'

import { getCustomDimensionMainSlideSubjectToQuantitySlides } from '../../slideshow-gallery.helper'

interface EmptyFileProps {
  slidesToShow: number
}

export const EmptyFile: FC<EmptyFileProps> = memo(({ slidesToShow }) => {
  const { classes: styles } = useStyles()

  const customDimensionMainSlideSubjectToQuantitySlides =
    getCustomDimensionMainSlideSubjectToQuantitySlides(slidesToShow)

  return (
    <div
      className={styles.noMediaFilesWrapper}
      style={{
        height: customDimensionMainSlideSubjectToQuantitySlides,
        width: customDimensionMainSlideSubjectToQuantitySlides,
      }}
    >
      <NoPhotoIcon className={styles.noPhotoIcon} />
    </div>
  )
})
