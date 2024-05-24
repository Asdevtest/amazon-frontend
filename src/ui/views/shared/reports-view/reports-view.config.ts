import { action, computed, observable } from 'mobx'

export const reportsViewConfig = {
  showReportModal: observable,
  rows: computed,
  product: computed,
  activeLaunches: computed,

  onToggleReportModal: action.bound,
}
