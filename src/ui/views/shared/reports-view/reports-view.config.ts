import { action, computed, observable } from 'mobx'

export const reportsViewConfig = {
  reportId: observable,
  showReportModal: observable,

  product: computed,
  activeLaunches: computed,

  onChangeRangeDate: action.bound,
  onToggleReportModal: action.bound,
  onToggleReportModalEditMode: action.bound,
  onGetCurrentData: action.bound,
  onRemoveReport: action.bound,
}

export const additionalFilterFields = ['asin', 'amazonTitle', 'skuByClient', 'sub', 'launchDateFrom', 'launchDateTo']
export const additionalSearchFields = ['asin', 'amazonTitle', 'skuByClient', 'launchType']
