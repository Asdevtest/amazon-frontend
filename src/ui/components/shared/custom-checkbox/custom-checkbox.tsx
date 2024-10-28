import type { CheckboxProps } from 'antd'
import { Checkbox, Tooltip } from 'antd'
import { FC, memo } from 'react'
import { CiCircleQuestion } from 'react-icons/ci'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

import { useStyles } from './custom-checkbox.style'

interface CustomCheckboxProps extends CheckboxProps, IDefaultPropsExtensionAntdComponent {
  label?: string
  labelClassName?: string
  tooltipInfoContent?: string
  labelPlacement?: 'left' | 'right'
}

export const CustomCheckbox: FC<CustomCheckboxProps> = memo(props => {
  const {
    isCell,
    className,
    wrapperClassName,
    label,
    tooltipInfoContent,
    labelPlacement = 'right',
    labelClassName,
    ...restProps
  } = props

  const { classes: styles, cx } = useStyles()

  return (
    <div className={cx({ [styles.cell]: isCell }, wrapperClassName, styles.checkboxContainer)}>
      {labelPlacement === 'left' && label && (
        <span className={cx(styles.labelWrapper, labelClassName)}>
          {label}
          {tooltipInfoContent && (
            <Tooltip title={tooltipInfoContent} placement="top">
              <span className={styles.tooltipIcon}>
                <CiCircleQuestion size={20} />
              </span>
            </Tooltip>
          )}
        </span>
      )}

      <Checkbox {...restProps} className={cx(styles.checkbox, className)} />

      {labelPlacement === 'right' && label && (
        <span className={cx(styles.labelWrapper, labelClassName)}>
          {tooltipInfoContent && (
            <Tooltip title={tooltipInfoContent} placement="top">
              <span className={styles.tooltipIcon}>
                <CiCircleQuestion size={20} />
              </span>
            </Tooltip>
          )}
          {label}
        </span>
      )}
    </div>
  )
})
