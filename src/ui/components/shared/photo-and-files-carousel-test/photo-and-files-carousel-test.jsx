import { cx } from '@emotion/css'

import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsImageLink } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './photo-and-files-carousel.styles'

import { NoDocumentIcon } from '../svg-icons'

import { CustomSliderTest } from './custom-slider-test'
import { WIDTH_INCREASE_FACTOR } from './custom-slider-test/custom-slider-test.constants'

export const PhotoAndFilesCarouselTest = ({
  files,
  directionColumn = false,
  withoutPhotos = false,
  whithoutFiles = false,
  smallSlider = false,
  mediumSlider = false,
  bigSlider = false,
  alignLeft = false,
  alignRight = false,
  isHideCounter = false,
  customGap,
  customImageHeight,
}) => {
  const { classes: classNames } = useClassNames()

  const notEmptyFiles = files?.length ? files.filter(el => !checkIsImageLink(el?.file?.name || el)) : []
  const notEmptyPhotos = files?.length ? files.filter(el => checkIsImageLink(el?.file?.name || el)) : []

  const customSlideWidth = customImageHeight && customImageHeight * WIDTH_INCREASE_FACTOR

  return files?.length ? (
    <div
      className={cx(classNames.mainWrapper, {
        [classNames.directionColumn]: directionColumn,
        [classNames.wrapperAlignLeft]: alignLeft,
        [classNames.wrapperAlignRight]: alignRight,
      })}
      style={{ gap: customGap }}
    >
      {!withoutPhotos ? (
        <CustomSliderTest
          files={notEmptyPhotos}
          smallSlider={smallSlider}
          mediumSlider={mediumSlider}
          bigSlider={bigSlider}
          alignLeft={alignLeft}
          alignRight={alignRight}
          customImageHeight={customImageHeight}
          isHideCounter={isHideCounter}
        />
      ) : null}

      {!whithoutFiles ? (
        <CustomSliderTest
          files={notEmptyFiles}
          smallSlider={smallSlider}
          mediumSlider={mediumSlider}
          bigSlider={bigSlider}
          alignLeft={alignLeft}
          alignRight={alignRight}
          customImageHeight={customImageHeight}
          isHideCounter={isHideCounter}
        />
      ) : null}
    </div>
  ) : (
    <div className={classNames.noFileWrapper}>
      <div
        className={cx(classNames.slideWrapper, {
          [classNames.slideSmall]: smallSlider,
          [classNames.slideMedium]: mediumSlider,
          [classNames.slideBig]: bigSlider,
        })}
        style={{ width: customSlideWidth, height: customImageHeight }}
      >
        <NoDocumentIcon className={classNames.slide} />
      </div>

      <p
        className={cx(classNames.text, {
          [classNames.smallText]: smallSlider,
          [classNames.mediumText]: mediumSlider,
          [classNames.bigText]: bigSlider,
        })}
      >
        {t(TranslationKey['No files'])}
      </p>
    </div>
  )
}
