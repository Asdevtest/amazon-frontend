import type { CheckboxProps } from 'antd'
import { Checkbox, Tooltip } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-checkbox.style'

interface CustomCheckboxProps extends CheckboxProps, IDefaultPropsExtensionAntdComponent {
  rowRight?: boolean
}

export const CustomCheckbox: FC<CustomCheckboxProps> = memo(props => {
  const { isRow, isCell, rowRight, className, wrapperClassName, label, tooltipLabel, labelClassName, ...restProps } =
    props

  const { classes: styles, cx } = useStyles()

  return (
    <div
      className={cx(
        styles.root,
        { [styles.cell]: isCell, [styles.row]: isRow, [styles.rowRight]: rowRight },
        wrapperClassName,
      )}
    >
      {label && (
        <Tooltip title={tooltipLabel ? t(TranslationKey[tooltipLabel as TranslationKey]) : ''} placement="top">
          <p className={labelClassName}>{t(TranslationKey[label as TranslationKey])}</p>
        </Tooltip>
      )}
      <Checkbox {...restProps} className={cx(styles.checkbox, className)} />
    </div>
  )
})
