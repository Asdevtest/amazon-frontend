import { action, computed, observable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { SwitcherCondition } from './my-requests-view.type'

export const observerConfig = {
  showRequestForm: observable,
  showConfirmModal: observable,
  showRequestDetailModal: observable,
  showConfirmWithCommentModal: observable,
  isAcceptedProposals: observable,
  openModal: observable,
  showRequestDesignerResultClientModal: observable,
  showConfirmWorkResultFormModal: observable,
  showMainRequestResultModal: observable,
  showRequestResultModal: observable,
  selectedIndex: observable,
  selectedRequests: observable,
  researchIdToRemove: observable,
  currentRequestDetails: observable,
  curProposal: observable,
  searchRequests: observable,
  requestFormSettings: observable,
  isRequestsAtWork: observable,
  onlyWaitedProposals: observable,
  acceptProposalResultSetting: observable,
  statusGroup: observable,
  dataGridApi: observable,
  radioButtonOption: observable,

  userInfo: computed,

  onChangeradioButtonOption: action.bound,
  loadData: action.bound,
  onClickAddBtn: action.bound,
  onClickEditBtn: action.bound,
  onSubmitEditCustomSearchRequest: action.bound,
  onSubmitCreateCustomSearchRequest: action.bound,
  editCustomSearchRequest: action.bound,
  createCustomSearchRequest: action.bound,
  onClickRemoveBtn: action.bound,
  onToggleUploadedToListing: action.bound,
  onSelectRequest: action.bound,
  onClickTableRow: action.bound,
  handleListingFilters: action.bound,
  getRequestDetail: action.bound,
  handleOpenRequestDetailModal: action.bound,
  getRequestProposals: action.bound,
  handleClickResultBtn: action.bound,
  onClickOpenInNewTab: action.bound,
  onDeleteRequest: action.bound,
  onClickCancelBtn: action.bound,
  toPublishRequest: action.bound,
  onClickPublishBtn: action.bound,
  onRecoverRequest: action.bound,
  onClickAbortBtn: action.bound,
  onSubmitAbortRequest: action.bound,
  onMarkAsCompletedRequest: action.bound,
  onClickMarkAsCompletedBtn: action.bound,
  onSendInForRework: action.bound,
  onClickProposalResultAccept: action.bound,
  onClickProposalResultAcceptForm: action.bound,
  handleChangeRequestComment: action.bound,
}

export const filtersFields = [
  'humanFriendlyId',
  'updatedAt',
  'status',
  'title',
  'spec',
  'price',
  'timeoutAt',
  'asin',
  'skuByClient',
  'amazonTitle',
  'createdBy',
  'sub',
  'subUsers',
  'priority',
  'createdAt',
  'announcementCreatedBy',
  'taskComplexity',
  'shopId',
]

export const radioButtonOptions = [
  {
    label: t(TranslationKey['Requests in progress']),
    value: SwitcherCondition.IN_PROGRESS,
  },
  {
    label: t(TranslationKey['Ready to check']),
    value: SwitcherCondition.READY_TO_CHECK,
  },
  {
    label: t(TranslationKey['Completed requests']),
    value: SwitcherCondition.COMPLETED,
  },
]

export const fieldsForSearch = ['title', 'humanFriendlyId', 'asin']
