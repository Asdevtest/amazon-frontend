import { action, computed, observable } from 'mobx'

export const reportsViewConfig = {
  reportId: observable,
  showReportModal: observable,
  reportModalEditMode: observable,

  product: computed,
  activeLaunches: computed,

  onDateRangePickerClick: action.bound,
  onToggleReportModal: action.bound,
  onToggleReportModalEditMode: action.bound,
  onGetCurrentData: action.bound,
}
