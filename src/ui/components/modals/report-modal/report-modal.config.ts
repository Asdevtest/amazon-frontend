import { action, computed, observable } from 'mobx'

import { getLaunchName } from '@components/shared/launches/helpers/get-launch-name'

import { Launches } from '@typings/enums/launches'

export const reportModalConfig = {
  requestTableStatus: observable,
  product: observable,
  reportId: observable,
  newProductPrice: observable,
  description: observable,
  listingLaunches: observable,
  launchOptions: observable,
  selectLaunchValue: observable,
  columnsProps: observable,
  columnsModel: observable,

  launches: computed,
  disabledSaveButton: computed,
  requests: computed,

  getListingReportById: action.bound,
  createListingReport: action.bound,
  updateListingReport: action.bound,
  onChangeNewProductPrice: action.bound,
  onChangeDescription: action.bound,
  onSelectLaunch: action.bound,
  onSelectProduct: action.bound,
  findLaunchIndex: action.bound,
  onChangeNumberCellValue: action.bound,
  onChangeCommentCellValue: action.bound,
  onChangeDateCellValue: action.bound,
  onAddRequest: action.bound,
  onRemoveRequest: action.bound,
  onRemoveLaunch: action.bound,
  setRequestTableStatus: action.bound,
  updateProductAndColumns: action.bound,
  onGetProducts: action.bound,
  // onGetListingReportByProductId: action.bound,
}

export const launchOptions = Object.values(Launches).map(value => ({
  value,
  label: getLaunchName(value),
}))

export const excludedLaunches = [Launches.CUSTOM, Launches.AB_TEST, Launches.PRICE_CHANGE]
