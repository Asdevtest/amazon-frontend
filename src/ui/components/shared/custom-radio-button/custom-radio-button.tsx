import { CheckboxOptionType, Radio, RadioGroupProps } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './custom-radio-button.style'

export interface ICustomRadioButtonOption extends CheckboxOptionType {
  badge?: number | string
}

interface CustomRadioButtonProps extends RadioGroupProps {
  options: ICustomRadioButtonOption[]
}

export const CustomRadioButton: FC<CustomRadioButtonProps> = memo(props => {
  const { options, ...rest } = props

  const { classes: styles } = useStyles()

  return (
    <Radio.Group {...rest}>
      {options.map((option, index) => (
        <Radio.Button key={index} value={option.value}>
          {option.label}
          {option.badge ? <span className={styles.badge}>{option.badge}</span> : null}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
})
