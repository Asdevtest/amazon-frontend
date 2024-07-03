/* eslint-disable @typescript-eslint/no-explicit-any */
import { Radio } from 'antd'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './radio-buttons.style'

export interface IRadioBottonsSetting {
  label?: string
  value: string | number | boolean
  disabled?: boolean
}

interface RadioButtonsProps {
  radioBottonsSettings: Array<IRadioBottonsSetting>
  currentValue?: string | number | boolean
  verticalDirection?: boolean
  disabled?: boolean
  onClickRadioButton: (value: any) => void
}

export const RadioButtons: FC<RadioButtonsProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { currentValue, radioBottonsSettings, disabled, onClickRadioButton } = props

  return (
    <Radio.Group value={currentValue} onChange={event => onClickRadioButton(event.target.value)}>
      {radioBottonsSettings.length
        ? radioBottonsSettings.map((setting, settingIndex: number) => (
            <Radio
              key={settingIndex}
              disabled={disabled || setting?.disabled}
              value={setting.value}
              className={styles.radioLable}
            >
              {setting?.label ? t(TranslationKey[setting?.label as keyof typeof TranslationKey]) : null}
            </Radio>
          ))
        : null}
    </Radio.Group>
  )
})
