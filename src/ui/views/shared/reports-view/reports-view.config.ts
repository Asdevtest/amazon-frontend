import { action, computed } from 'mobx'

export const reportsViewConfig = {
  product: computed,
  activeLaunches: computed,
  onDateRangePickerClick: action.bound,
}
