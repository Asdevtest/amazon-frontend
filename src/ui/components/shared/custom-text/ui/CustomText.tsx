import Text, { TextProps } from 'antd/es/typography/Text'
import { FC, memo } from 'react'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

interface CustomTextProps extends TextProps, IDefaultPropsExtensionAntdComponent {}

export const CustomText: FC<CustomTextProps> = memo(({ className, ...rest }) => {
  return <Text {...rest} className={className} />
})
