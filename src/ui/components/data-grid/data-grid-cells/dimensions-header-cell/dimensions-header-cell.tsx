import { RadioChangeEvent } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

import { Dimensions as DimensionsEnum } from '@typings/enums/dimensions'
import { IBox } from '@typings/models/boxes/box'

import { Entities, useShowDimensions } from '@hooks/dimensions/use-show-dimensions'

import { useStyles } from './dimensions-header-cell.style'

interface DimensionsHeaderCellProps {
  data: IBox // if need other data - replace "IBox" to "any" or use combine types
  onChangeUnitsOption: (option: RadioChangeEvent) => void
  transmittedSizeSetting?: DimensionsEnum
  calculationField?: Entities
}

export const DimensionsHeaderCell: FC<DimensionsHeaderCellProps> = memo(props => {
  const { data, onChangeUnitsOption, transmittedSizeSetting, calculationField = Entities.WAREHOUSE } = props

  const { classes: styles } = useStyles()
  const { unitsSize, dimensionsSize } = useShowDimensions({
    data,
    sizeSetting: transmittedSizeSetting || DimensionsEnum.EU,
    calculationField,
  })

  const title = `${t(TranslationKey.Dimensions)}, ${dimensionsSize}/${unitsSize}`
  const options = [
    { label: DimensionsEnum.EU, value: DimensionsEnum.EU },
    { label: DimensionsEnum.US, value: DimensionsEnum.US },
  ]

  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>

      <CustomRadioButton
        size="small"
        buttonStyle="solid"
        options={options}
        defaultValue={transmittedSizeSetting}
        onChange={onChangeUnitsOption}
      />
    </div>
  )
})
