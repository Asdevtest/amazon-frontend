import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Field } from '@components/shared/field'

import { calcVolumeWeightForBox } from '@utils/calculation'
import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { maxBoxSizeFromOption } from '@utils/get-max-box-size-from-option/get-max-box-size-from-option'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './dimensions.style'

import { TypeOfDimensions } from './dimensions.type'
import { getDimensionLabel } from './helpers/get-dimension-label'

interface DimensionsProps {
  box: IBox
  sizeSetting: string
  weightCoefficient: number
  setNewBoxField: (field: keyof IBox) => (e: ChangeEvent<HTMLInputElement>) => void
}

export const Dimensions: FC<DimensionsProps> = memo(props => {
  const { box, sizeSetting, weightCoefficient, setNewBoxField } = props

  const { classes: styles } = useStyles()

  const isNormalLength = !Number(box.lengthCmWarehouse) || maxBoxSizeFromOption(sizeSetting, box.lengthCmWarehouse)
  const isNormalWidth = !Number(box.widthCmWarehouse) || maxBoxSizeFromOption(sizeSetting, box.widthCmWarehouse)
  const isNormalHeight = !Number(box.heightCmWarehouse) || maxBoxSizeFromOption(sizeSetting, box.heightCmWarehouse)

  return (
    <div className={styles.dimensions}>
      <Field
        error={isNormalLength}
        inputProps={{ maxLength: 6 }}
        containerClasses={styles.dimensionContainer}
        labelClasses={styles.label}
        label={getDimensionLabel(t(TranslationKey.Length), TypeOfDimensions.DIMENSION, sizeSetting)}
        value={toFixed(box.lengthCmWarehouse, 2)}
        onChange={setNewBoxField('lengthCmWarehouse')}
      />

      <Field
        inputProps={{ maxLength: 6 }}
        error={isNormalHeight}
        containerClasses={styles.dimensionContainer}
        labelClasses={styles.label}
        label={getDimensionLabel(t(TranslationKey.Height), TypeOfDimensions.DIMENSION, sizeSetting)}
        value={toFixed(box.heightCmWarehouse, 2)}
        onChange={setNewBoxField('heightCmWarehouse')}
      />

      <Field
        disabled
        containerClasses={styles.dimensionContainer}
        labelClasses={styles.label}
        label={getDimensionLabel(t(TranslationKey['Volume weight']), TypeOfDimensions.WEIGHT, sizeSetting)}
        value={toFixed(calcVolumeWeightForBox(box, weightCoefficient), 2)}
      />

      <Field
        inputProps={{ maxLength: 6 }}
        error={isNormalWidth}
        containerClasses={styles.dimensionContainer}
        labelClasses={styles.label}
        label={getDimensionLabel(t(TranslationKey.Width), TypeOfDimensions.DIMENSION, sizeSetting)}
        value={toFixed(box.widthCmWarehouse, 2)}
        onChange={setNewBoxField('widthCmWarehouse')}
      />

      <Field
        inputProps={{ maxLength: 6 }}
        error={Number(box.weighGrossKgWarehouse) === 0}
        containerClasses={styles.dimensionContainer}
        labelClasses={styles.label}
        label={getDimensionLabel(t(TranslationKey.Weight), TypeOfDimensions.WEIGHT, sizeSetting)}
        value={toFixed(box.weighGrossKgWarehouse, 2)}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          if (e.target.value === '' || checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
            setNewBoxField('weighGrossKgWarehouse')(e)
          }
        }}
      />

      <Field
        disabled
        containerClasses={styles.dimensionContainer}
        labelClasses={styles.label}
        label={getDimensionLabel(t(TranslationKey['Final weight']), TypeOfDimensions.WEIGHT, sizeSetting)}
        value={toFixed(
          Math.max(
            (box.heightCmWarehouse * box.widthCmWarehouse * box.lengthCmWarehouse) / weightCoefficient,
            box.weighGrossKgWarehouse,
          ),
          2,
        )}
      />
    </div>
  )
})
