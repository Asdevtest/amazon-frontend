import { cx } from '@emotion/css'

import { TranslationKey } from '@constants/translations/translation-key'

import { checkIsDocumentLink, checkIsImageLink } from '@utils/checks'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { t } from '@utils/translations'

import { useClassNames } from './photo-and-files-carousel.styles'

import { NoDocumentIcon, NoPhotoIcon } from '../svg-icons'

import { CustomSliderTest } from './custom-slider-test'
import { WIDTH_INCREASE_FACTOR } from './custom-slider-test/custom-slider-test.constants'

export const PhotoAndFilesCarouselTest = ({
  files,
  column = false,
  withoutPhotos = false,
  withoutFiles = false,
  smallSlider = false,
  mediumSlider = false,
  bigSlider = false,
  alignLeft = false,
  alignRight = false,
  isHideCounter = false,
  customGap,
  customSlideHeight,
}) => {
  const { classes: classNames } = useClassNames()

  const documents = (files || []).filter(el => checkIsDocumentLink(el))
  const photos = (files || []).reduce((result, el) => {
    const isImage = checkIsImageLink(el)
    const isDocument = checkIsDocumentLink(el)

    if (isImage) {
      result.push(el)
    }

    if (!isImage && !isDocument) {
      result.push(getAmazonImageUrl(el, true))
    }

    return result
  }, [])

  const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR

  return files?.length ? (
    <div
      className={cx(classNames.mainWrapper, {
        [classNames.column]: column,
        [classNames.wrapperAlignLeft]: alignLeft,
        [classNames.wrapperAlignRight]: alignRight,
      })}
      style={{ gap: customGap }}
    >
      {!withoutPhotos ? (
        <CustomSliderTest
          files={photos}
          smallSlider={smallSlider}
          mediumSlider={mediumSlider}
          bigSlider={bigSlider}
          alignLeft={alignLeft}
          alignRight={alignRight}
          customSlideHeight={customSlideHeight}
          isHideCounter={isHideCounter}
        />
      ) : null}

      {!withoutFiles ? (
        <CustomSliderTest
          files={documents}
          smallSlider={smallSlider}
          mediumSlider={mediumSlider}
          bigSlider={bigSlider}
          alignLeft={alignLeft}
          alignRight={alignRight}
          customSlideHeight={customSlideHeight}
          isHideCounter={isHideCounter}
          withoutFiles={withoutFiles}
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
        style={{ width: customSlideWidth, height: customSlideHeight }}
      >
        {withoutFiles ? (
          <NoPhotoIcon className={classNames.slide} />
        ) : (
          <NoDocumentIcon className={cx(classNames.slide, classNames.slideNoDocuments)} />
        )}
      </div>

      {!isHideCounter ? (
        <p
          className={cx(classNames.text, {
            [classNames.smallText]: smallSlider,
            [classNames.mediumText]: mediumSlider,
            [classNames.bigText]: bigSlider,
          })}
        >
          {withoutFiles ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
        </p>
      ) : null}
    </div>
  )
}
