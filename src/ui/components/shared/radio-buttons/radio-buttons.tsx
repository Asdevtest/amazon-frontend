import { observer } from 'mobx-react'
import { FC } from 'react'

import Radio from '@mui/material/Radio'

import { useStyles } from './radio-buttons.style'

export interface IRadioBottonsSetting {
  label: () => string
  value: string | number | boolean
  disabled?: boolean
}

interface RadioButtonsProps {
  radioBottonsSettings: Array<IRadioBottonsSetting>
  currentValue?: string | number | boolean
  verticalDirection?: boolean
  disabled?: boolean
  withoutLable?: boolean
  onClickRadioButton: (value: string | number | boolean) => void
}

export const RadioButtons: FC<RadioButtonsProps> = observer(props => {
  const { classes: styles, cx } = useStyles()

  const { currentValue, radioBottonsSettings, disabled, verticalDirection, withoutLable, onClickRadioButton } = props

  return (
    <div className={cx(styles.root, { [styles.verticalRoot]: verticalDirection })}>
      {!!radioBottonsSettings.length &&
        radioBottonsSettings.map((setting, settingIndex: number) => (
          <div key={settingIndex} className={styles.buttonWrapper}>
            <Radio
              disabled={disabled || setting?.disabled}
              classes={{ root: cx(styles.radioRoot, { [styles.radioActive]: setting.value === currentValue }) }}
              checked={setting.value === currentValue}
              onClick={e => {
                if (setting.value !== currentValue) {
                  e.stopPropagation()
                  onClickRadioButton(setting.value)
                }
              }}
            />
            {!withoutLable && <p>{setting?.label()}</p>}
          </div>
        ))}
    </div>
  )
})
