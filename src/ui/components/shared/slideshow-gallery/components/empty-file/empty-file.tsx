import { FC, memo } from 'react'

import { NoPhotoIcon } from '@components/shared/svg-icons'

import { useStyles } from './empty-file.styles'

import { getCustomDimensionMainSlideSubjectToQuantitySlides } from '../../helpers/get-custom-dimension'

interface EmptyFileProps {
  slidesToShow?: number
  isModalSize?: boolean
}

export const EmptyFile: FC<EmptyFileProps> = memo(({ slidesToShow, isModalSize }) => {
  const { classes: styles } = useStyles()

  const customDimensionMainSlideSubjectToQuantitySlides = getCustomDimensionMainSlideSubjectToQuantitySlides(
    slidesToShow,
    isModalSize,
  )

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
