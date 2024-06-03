import { action, computed, observable } from 'mobx'

export const reportsViewConfig = {
  reportId: observable,
  showReportModal: observable,
  reportModalEditMode: observable,

  product: computed,
  activeLaunches: computed,

  onChangeRangeDate: action.bound,
  onToggleReportModal: action.bound,
  onToggleReportModalEditMode: action.bound,
  onToggleReportModalViewMode: action.bound,
  onGetCurrentData: action.bound,
}
