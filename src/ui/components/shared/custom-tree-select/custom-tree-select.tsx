import type { TreeSelectProps } from 'antd'
import { TreeSelect } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-tree-select.style'

export interface CustomTreeSelectProps extends TreeSelectProps, IDefaultPropsExtensionAntdComponent {
  placeholder?: string
}

export const CustomTreeSelect: FC<CustomTreeSelectProps> = memo(props => {
  const { isRow, isCell, label, required, placeholder, className, labelClassName, wrapperClassName, ...restProps } =
    props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx(styles.root, { [styles.cell]: isCell, [styles.row]: isRow }, wrapperClassName)}>
      {label ? (
        <p className={cx(styles.label, labelClassName)}>
          {t(TranslationKey[label as TranslationKey])}
          {required ? <span>*</span> : null}
        </p>
      ) : null}
      <TreeSelect
        {...restProps}
        className={cx(styles.select, className)}
        placeholder={placeholder ? t(TranslationKey[placeholder as TranslationKey]) : undefined}
      />
    </div>
  )
})