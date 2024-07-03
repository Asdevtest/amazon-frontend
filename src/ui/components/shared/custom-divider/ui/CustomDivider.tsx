import type { DividerProps } from 'antd'
import { Divider } from 'antd'
import { FC, memo } from 'react'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

interface CustomDividerProps extends DividerProps, IDefaultPropsExtensionAntdComponent {}

export const CustomDivider: FC<CustomDividerProps> = memo(props => {
  const { className, ...restProps } = props

  return <Divider {...restProps} className={className} />
})
