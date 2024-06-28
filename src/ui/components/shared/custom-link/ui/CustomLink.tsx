import Link, { LinkProps } from 'antd/es/typography/Link'
import { FC, memo } from 'react'

import { IDefaultPropsExtensionAntdComponent } from '@typings/shared/default-props-extension-component-antd'

interface CustomLinkProps extends LinkProps, IDefaultPropsExtensionAntdComponent {}

export const CustomLink: FC<CustomLinkProps> = memo(({ className, ...rest }) => {
  return <Link {...rest} className={className} />
})
