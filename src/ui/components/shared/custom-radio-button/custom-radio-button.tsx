import { CheckboxOptionType, Radio, RadioGroupProps } from 'antd'
import { RadioGroupButtonStyle } from 'antd/es/radio'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-radio-button.style'

export interface ICustomRadioButtonOption extends CheckboxOptionType {
  badge?: number | string
}

interface CustomRadioButtonProps extends RadioGroupProps, IDefaultPropsExtensionAntdComponent {
  options: ICustomRadioButtonOption[]
  buttonStyle?: RadioGroupButtonStyle
}

export const CustomRadioButton: FC<CustomRadioButtonProps> = memo(props => {
  const { options, buttonStyle = 'solid', label, required, labelClassName, wrapperClassName, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  const labelText = `${t(TranslationKey[label as TranslationKey])}${required ? ' *' : ''}`

  return (
    <div className={cx(styles.root, wrapperClassName)}>
      {label ? <p className={cx(styles.label, labelClassName)}>{labelText}</p> : null}
      <Radio.Group buttonStyle={buttonStyle} {...restProps}>
        {options.map((option, index) => (
          <Radio.Button key={index} value={option.value}>
            {option.label}
            {option.badge ? <span className={styles.text}>{option.badge}</span> : null}
          </Radio.Button>
        ))}
      </Radio.Group>
    </div>
  )
})
