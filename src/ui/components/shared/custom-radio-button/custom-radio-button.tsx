import { CheckboxOptionType, Radio, RadioGroupProps } from 'antd'
import { RadioGroupButtonStyle } from 'antd/es/radio'
import { FC, memo } from 'react'

import { useStyles } from './custom-radio-button.style'

export interface ICustomRadioButtonOption extends CheckboxOptionType {
  badge?: number | string
}

interface CustomRadioButtonProps extends RadioGroupProps {
  options: ICustomRadioButtonOption[]
  buttonStyle?: RadioGroupButtonStyle
  disabled?: boolean
}

export const CustomRadioButton: FC<CustomRadioButtonProps> = memo(props => {
  const { options, disabled, buttonStyle = 'solid', ...restProps } = props

  const { classes: styles } = useStyles()

  return (
    <Radio.Group disabled={disabled} buttonStyle={buttonStyle} {...restProps}>
      {options.map((option, index) => (
        <Radio.Button key={index} value={option.value}>
          {option.label}
          {option.badge ? <span className={styles.text}>{option.badge}</span> : null}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
})
