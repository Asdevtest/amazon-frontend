import { FC, memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SizeSwitcher } from '@components/shared/size-switcher'

import { t } from '@utils/translations'

import { Dimensions as DimensionsEnum } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'

import { useDimensions } from '@hooks/use-dimensions'

import { useStyles } from './dimensions.style'

interface DimensionsProps {
  formFields: IBox
}

export const Dimensions: FC<DimensionsProps> = memo(({ formFields }) => {
  const { classes: styles, cx } = useStyles()
  const [sizeSetting, setSizeSetting] = useState(DimensionsEnum.EU)
  const { length, width, height, weight, volumeWeight, finalWeight, dimensionsSize, unitsSize } = useDimensions(
    formFields,
    sizeSetting,
  )

  return (
    <div className={styles.wrapper}>
      <div className={styles.switcherWrapper}>
        <p className={cx(styles.text, styles.textSecond)}>{t(TranslationKey['Sizes from storekeeper'])}</p>

        <SizeSwitcher<DimensionsEnum> sizeSetting={sizeSetting} onChangeCondition={setSizeSetting} />
      </div>

      <p className={styles.text}>{`${t(TranslationKey.Length)}: ${length} ${dimensionsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey.Width)}: ${width} ${dimensionsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey.Height)}: ${height} ${dimensionsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey.Weight)}: ${weight} ${unitsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey['Volume weight'])}: ${volumeWeight} ${unitsSize}`}</p>
      <p className={styles.text}>{`${t(TranslationKey['Final weight'])}: ${finalWeight} ${unitsSize}`}</p>
    </div>
  )
})
