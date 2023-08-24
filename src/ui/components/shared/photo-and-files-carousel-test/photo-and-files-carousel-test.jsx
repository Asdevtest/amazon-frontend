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
  customSlideHeight,
}) => {
  const { classes: classNames } = useClassNames()

  const documents = (files || []).filter(el => checkIsDocumentLink(el?.file?.name || el))
  const photos = (files || []).reduce((result, el) => {
    const file = el?.file?.name || el
    const isImage = checkIsImageLink(file)
    const isDocument = checkIsDocumentLink(file)

    if (isImage) {
      result.push(file)
    } else if (!isImage && !isDocument) {
      if (typeof el === 'string') {
        result.push(getAmazonImageUrl(el, true))
      } else {
        const isImageDataUrl = el?.file.type.includes('image')

        result.push(isImageDataUrl ? el.data_url : '/assets/icons/file.png')
      }
    }

    return result
  }, [])

  const customSlideWidth = customSlideHeight && customSlideHeight * WIDTH_INCREASE_FACTOR

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

      {!whithoutFiles ? (
        <CustomSliderTest
          files={documents}
          smallSlider={smallSlider}
          mediumSlider={mediumSlider}
          bigSlider={bigSlider}
          alignLeft={alignLeft}
          alignRight={alignRight}
          customSlideHeight={customSlideHeight}
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
        style={{ width: customSlideWidth, height: customSlideHeight }}
      >
        {whithoutFiles ? (
          <NoPhotoIcon className={classNames.slide} />
        ) : (
          <NoDocumentIcon className={cx(classNames.slide, classNames.slideNoDocuments)} />
        )}
      </div>

      <p
        className={cx(classNames.text, {
          [classNames.smallText]: smallSlider,
          [classNames.mediumText]: mediumSlider,
          [classNames.bigText]: bigSlider,
        })}
      >
        {whithoutFiles ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
      </p>
    </div>
  )
}
