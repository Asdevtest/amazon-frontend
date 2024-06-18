import { Launches } from '@typings/enums/launches'
import { LaunchType } from '@typings/types/launch'

export const getLaunchName = (type: LaunchType, short?: boolean): string => {
  switch (type) {
    case Launches.COUPON:
      return short ? '' : 'Coupon'
    case Launches.PROMO:
      return 'Promo'
    case Launches.PRIME_DISCOUNT:
      return short ? 'Prime D' : 'Prime discount'
    case Launches.LIGHTING_DEAL:
      return short ? 'L Deal' : 'Lighting deal'
    case Launches.BEST_DEAL:
      return short ? 'Best' : 'Best deal'
    case Launches.OUTLET_DEAL:
      return short ? 'Oullet' : 'Outlet Deal'
    case Launches.SALES_PRICE:
      return short ? 'Sale' : 'Sales price'
    case Launches.AB_TEST:
      return 'A/B'
    case Launches.CUSTOM:
      return 'Custom'
    case Launches.PRICE_CHANGE:
      return 'Price change'
    default:
      return ''
  }
}
