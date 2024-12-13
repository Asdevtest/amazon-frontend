import { RadioChangeEvent } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { t } from '@utils/translations'

import { Dimensions } from '@typings/enums/dimensions'

import { useShowDimensions } from '@hooks/dimensions/use-show-dimensions'

import { useStyles } from './dimentions-header.style'

interface DimentionsHeaderProps {
  data: {
    height: number
    width: number
    length: number
    weight: number
  }
  disabled?: boolean
  sizeSetting: Dimensions
  dimentionsHeaderTitle: keyof typeof TranslationKey
  onChangeUnitsOption: (option: RadioChangeEvent) => void
}

export const DimentionsHeader: FC<DimentionsHeaderProps> = memo(props => {
  const { data, sizeSetting, dimentionsHeaderTitle, disabled, onChangeUnitsOption } = props

  const { classes: styles } = useStyles()

  const { unitsSize, dimensionsSize } = useShowDimensions({
    data,
    sizeSetting,
  })

  const title = `${t(TranslationKey[dimentionsHeaderTitle])}{dimensionsSize}/${unitsSize}`

  const options = [
    { label: Dimensions.EU, value: Dimensions.EU },
    { label: Dimensions.US, value: Dimensions.US },
  ]

  return (
    <div className={styles.root}>
      <p className={styles.title}>{title}</p>

      <CustomRadioButton
        disabled={disabled}
        size="small"
        options={options}
        value={sizeSetting}
        onChange={onChangeUnitsOption}
      />
    </div>
  )
})
