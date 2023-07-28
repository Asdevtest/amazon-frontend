import { observer } from 'mobx-react'
import { FC } from 'react'

import Radio from '@mui/material/Radio'

import { useClassNames } from './radio-buttons.styles'

interface IRadioBottonsSetting {
  label: string
  value: string | number
}

interface RadioButtonsProps {
  radioBottonsSettings: Array<IRadioBottonsSetting>
  currentValue?: string
  disabled?: boolean
  onClickRadioButton: (value: string | number) => void
}

export const RadioButtons: FC<RadioButtonsProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { currentValue, radioBottonsSettings, disabled, onClickRadioButton } = props

  return (
    <div className={classNames.root}>
      {!!radioBottonsSettings.length &&
        radioBottonsSettings.map((setting, settingIndex: number) => (
          <div key={settingIndex} className={classNames.buttonWrapper}>
            <Radio
              disabled={disabled}
              classes={{ root: classNames.radioRoot }}
              checked={setting.value === currentValue}
              onChange={() => onClickRadioButton(setting.value)}
            />
            <p>{setting.label}</p>
          </div>
        ))}
    </div>
  )
})
