import { Avatar as AntAvatar, AvatarProps } from 'antd'
import { FC, memo } from 'react'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

interface CustomAvatarProps extends AvatarProps, IDefaultPropsExtensionAntdComponent {}

export const CustomAvatar: FC<CustomAvatarProps> = memo(({ className, ...rest }) => {
  return <AntAvatar {...rest} className={className} />
})
