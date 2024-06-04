import { IProduct } from '@typings/models/products/product'
import { ILaunch } from '@typings/shared/launch'

export enum LaunchNotificationType {
  ALMOST_RUNNING_OUT = 'ALMOST_RUNNING_OUT',
  EXPIRED = 'EXPIRED',
}

export interface ILaunchNotification {
  product: IProduct
  launches: ILaunch[]
  type: LaunchNotificationType
}
