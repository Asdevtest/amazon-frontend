import type { SwitchProps } from 'antd'
import { Switch } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-switch.style'

interface CustomSwitchProps extends SwitchProps, IDefaultPropsExtensionAntdComponent {
  medium?: boolean
}

export const CustomSwitch: FC<CustomSwitchProps> = memo(props => {
  const { isRow, isCell, label, required, className, labelClassName, wrapperClassName, medium, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  const labelText = `${t(TranslationKey[label as TranslationKey])}${required ? ' *' : ''}`

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? <p className={cx(styles.label, labelClassName)}>{labelText}</p> : null}
      <Switch {...restProps} className={cx(styles.switch, { [styles.medium]: medium }, className)} />
    </div>
  )
})
