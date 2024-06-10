import { action, computed, observable } from 'mobx'

export const reportsViewConfig = {
  reportId: observable,
  selectedReportId: observable,
  showReportModal: observable,
  showConfirmModal: observable,

  product: computed,
  activeLaunches: computed,

  onChangeRangeDate: action.bound,
  onToggleReportModal: action.bound,
  onToggleReportModalEditMode: action.bound,
  onGetCurrentData: action.bound,
  onRemoveReport: action.bound,
  onToggleConfirmModal: action.bound,
}

export const additionalFilterFields = ['asin', 'amazonTitle', 'skuByClient', 'sub']
export const additionalSearchFields = ['asin', 'amazonTitle', 'skuByClient', 'launchType']
