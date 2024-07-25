import { action, computed, observable } from 'mobx'

export const observerConfig = {
  showProgress: observable,
  storekeepersData: observable,
  curOpenedTask: observable,

  selectedPriority: observable,
  selectedStatus: observable,
  selectedStorekeeper: observable,
  selectedType: observable,

  showConfirmWithCommentModal: observable,
  showTaskInfoModal: observable,
  showEditPriorityData: observable,

  editPriorityData: observable,
  toCancelData: observable,

  isDisabledDownload: computed,

  setFilters: action.bound,
  updateTaskPriority: action.bound,
  getStorekeepers: action.bound,
  updateTaskComment: action.bound,
  startEditTaskPriority: action.bound,
  onClickReportBtn: action.bound,
  setCurrentOpenedTask: action.bound,
  cancelTask: action.bound,
  onClickCancelBtnByAction: action.bound,
  onClickCancelBtn: action.bound,
  cancelEditBoxes: action.bound,
  cancelMergeBoxes: action.bound,
  cancelSplitBoxes: action.bound,
  onClickCancelAfterConfirm: action.bound,
}
