import { action, computed, observable } from 'mobx'

export const reportsViewConfig = {
  reportId: observable,
  showReportModal: observable,
  dateRangeValue: observable,

  product: computed,
  activeLaunches: computed,

  onChangeRangeDate: action.bound,
  onToggleReportModal: action.bound,
  onToggleReportModalEditMode: action.bound,
  onRemoveReport: action.bound,
  onClickExtraResetFilters: action.bound,
}

export const additionalFilterFields = ['asin', 'amazonTitle', 'skuByClient', 'sub', 'launchDateFrom', 'launchDateTo']
export const additionalSearchFields = ['asin', 'amazonTitle', 'skuByClient', 'launchType']
