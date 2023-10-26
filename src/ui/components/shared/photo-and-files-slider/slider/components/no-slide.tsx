import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { NoDocumentIcon, NoPhotoIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useClassNames } from '../slider.style'

interface Props {
  isImagesType: boolean
  isHideCounter?: boolean
  smallSlider?: boolean
  mediumSlider?: boolean
  bigSlider?: boolean
  customSlideHeight?: number
  customSlideWidth?: number
}

export const NoSlide: FC<Props> = observer(
  ({ isImagesType, isHideCounter, smallSlider, mediumSlider, bigSlider, customSlideWidth, customSlideHeight }) => {
    const { classes: classNames, cx } = useClassNames()

    return (
      <div
        className={cx(classNames.mainWrapper, {
          [classNames.mainSmall]: smallSlider,
        })}
      >
        <div
          className={cx({
            [classNames.slideSmall]: smallSlider,
            [classNames.slideMedium]: mediumSlider,
            [classNames.slideBig]: bigSlider,
          })}
          style={{ width: customSlideWidth, height: customSlideHeight }}
        >
          {isImagesType ? (
            <NoPhotoIcon className={classNames.slide} />
          ) : (
            <NoDocumentIcon className={cx(classNames.slide, classNames.slideNoDocuments)} />
          )}
        </div>

        {!isHideCounter && (
          <p
            className={cx(classNames.text, {
              [classNames.smallText]: smallSlider,
              [classNames.mediumText]: mediumSlider,
              [classNames.bigText]: bigSlider,
            })}
          >
            {isImagesType ? t(TranslationKey['No photos']) : t(TranslationKey['No files'])}
          </p>
        )}
      </div>
    )
  },
)
