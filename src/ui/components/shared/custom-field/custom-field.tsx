import { Tooltip } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-field.style'

interface CustomFieldProps extends Omit<IDefaultPropsExtensionAntdComponent, 'label'> {
  label: string
}

export const CustomField: FC<CustomFieldProps> = memo(props => {
  const { children, isRow, label, required, labelClassName, wrapperClassName, tooltip } = props

  const { classes: styles, cx } = useStyles()

  const labelText = `${t(TranslationKey[label as TranslationKey])}${required ? ' *' : ''}`

  return (
    <div className={cx(styles.root, { [styles.row]: isRow }, wrapperClassName)}>
      <Tooltip title={tooltip ? t(TranslationKey[tooltip as TranslationKey]) : ''}>
        <p className={cx(styles.label, labelClassName)}>{labelText}</p>
      </Tooltip>
      {children}
    </div>
  )
})
