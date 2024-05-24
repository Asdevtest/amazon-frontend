import { action, computed, observable } from 'mobx'

export const reportsViewConfig = {
  showReportModal: observable,

  rows: computed,
  product: computed,
  activeLaunches: computed,

  onDateRangePickerClick: action.bound,
  onToggleReportModal: action.bound,
}
