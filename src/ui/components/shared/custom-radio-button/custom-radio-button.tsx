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
}

export const CustomRadioButton: FC<CustomRadioButtonProps> = memo(props => {
  const { options, buttonStyle = 'solid', ...restProps } = props

  const { classes: styles } = useStyles()

  return (
    <Radio.Group buttonStyle={buttonStyle} {...restProps}>
      {options.map((option, index) => (
        <Radio.Button key={index} value={option.value}>
          {option.label}
          {option.badge ? <span className={styles.badge}>{option.badge}</span> : null}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
})
