import { PropsWithChildren } from 'react'

export interface IDefaultPropsExtensionAntdComponent extends PropsWithChildren {
  isRow?: boolean
  isCell?: boolean
  label?: string
  required?: boolean
  tooltip?: string
  labelClassName?: string
  wrapperClassName?: string
  fullWidth?: boolean
}
