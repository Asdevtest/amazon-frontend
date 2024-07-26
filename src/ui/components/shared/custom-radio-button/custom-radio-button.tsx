import { CheckboxOptionType, Radio, RadioGroupProps } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './custom-radio-button.style'

export interface ICustomRadioButtonOption extends CheckboxOptionType {
  startIcon?: JSX.Element | boolean
  endIcon?: JSX.Element | boolean
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
          {option.startIcon ? <span className={styles.startIcon}>{option.startIcon}</span> : null}
          {option.label}
          {option.endIcon ? <span className={styles.endIcon}>{option.endIcon}</span> : null}
        </Radio.Button>
      ))}
    </Radio.Group>
  )
})
