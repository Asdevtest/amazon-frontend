import type { InputNumberProps } from 'antd'
import { InputNumber } from 'antd'
import { FC, memo } from 'react'

import { useStyles } from './custom-input-number.style'

interface CustomInputNumberProps extends InputNumberProps {
  className?: string
}

export const CustomInputNumber: FC<CustomInputNumberProps> = memo(props => {
  const { className, ...restProps } = props

  const { classes: styles, cx } = useStyles()

  return <InputNumber {...restProps} className={cx(styles.root, className)} />
})
