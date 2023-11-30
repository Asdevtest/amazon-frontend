import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { NoDocumentIcon, NoPhotoIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from '../slider.style'

interface NoSlideProps {
  isImagesType: boolean
  isHideCounter?: boolean
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  customSlideHeight?: number
  customSlideWidth?: number
}

export const NoSlide: FC<NoSlideProps> = memo(props => {
  const { isImagesType, isHideCounter, smallSlider, mediumSlider, bigSlider, customSlideWidth, customSlideHeight } =
    props
  const { classes: styles, cx } = useStyles()

  return (
    <div
      className={cx(styles.mainWrapper, {
        [styles.mainSmall]: smallSlider,
      })}
    >
      <div
        className={cx({
          [styles.slideSmall]: smallSlider,
          [styles.slideMedium]: mediumSlider,
          [styles.slideBig]: bigSlider,
        })}
        style={{ width: customSlideWidth, height: customSlideHeight }}
      >
        {isImagesType ? (
          <NoPhotoIcon className={styles.slide} />
        ) : (
          <NoDocumentIcon className={cx(styles.slide, styles.slideNoDocuments)} />
        )}
      </div>

      {!isHideCounter && (
        <p
          className={cx(styles.text, {
            [styles.smallText]: smallSlider,
            [styles.mediumText]: mediumSlider,
            [styles.bigText]: bigSlider,
          })}
        >
          {isImagesType ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
        </p>
      )}
    </div>
  )
})
