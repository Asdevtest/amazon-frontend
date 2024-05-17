/* eslint-disable @typescript-eslint/no-explicit-any */
import { Launches } from '@typings/enums/launches'
import { LaunchType } from '@typings/types/launch'

export const getLaunchStyle = (type: LaunchType, theme: any) => {
  switch (type) {
    case Launches.COUPON:
      return theme.palette.launch.coupon
    case Launches.PROMO:
      return theme.palette.launch.promo
    case Launches.PRIME_DISCOUNT:
      return theme.palette.launch.prime_discount
    case Launches.LIGHTING_DEAL:
      return theme.palette.launch.lighting_deal
    case Launches.BEST_DEAL:
      return theme.palette.launch.best_deal
    case Launches.OUTLET_DEAL:
      return theme.palette.launch.outlet_deal
    case Launches.SALES_PRICE:
      return theme.palette.launch.sales_price
    case Launches.AB_TEST:
      return theme.palette.launch.ab_test
    case Launches.CUSTOM:
      return theme.palette.launch.custom
    default:
      return undefined
  }
}
