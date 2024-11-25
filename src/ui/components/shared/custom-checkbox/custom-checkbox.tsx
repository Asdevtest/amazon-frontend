import type { CheckboxProps } from 'antd'
import { Checkbox, Tooltip } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-checkbox.style'

interface CustomCheckboxProps extends CheckboxProps, IDefaultPropsExtensionAntdComponent {}

export const CustomCheckbox: FC<CustomCheckboxProps> = memo(props => {
  const { isCell, className, wrapperClassName, tooltip, labelClassName, children, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return (
    <Tooltip
      title={tooltip ? t(TranslationKey[tooltip as TranslationKey]) : ''}
      className={cx({ [styles.cell]: isCell }, wrapperClassName)}
    >
      <Checkbox {...restProps} className={cx(styles.checkbox, className)}>
        {children ? <span className={labelClassName}>{t(TranslationKey[children as TranslationKey])} </span> : null}
      </Checkbox>
    </Tooltip>
  )
})
