import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {OtherModel} from '@models/other-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {vacByUserIdExchangeColumns} from '@components/table-columns/product/vac-by-user-id-exchange-columns'

import {clientProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {dataURLtoFile} from '@utils/upload-files'

export class ProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  get user() {
    return UserModel.userInfo
  }

  showAvatarEditModal = false
  showUserInfoModal = false

  checkValidationNameOrEmail = {}

  productsVacant = []

  drawerOpen = false
  productList = []
  tabExchange = 0
  tabHistory = 0
  tabReview = 0
  selectedUser = undefined
  showTabModal = false
  showInfoModal = false

  headerInfoData = {
    investorsCount: 255,
    goodsFound: 875,
    transactionsVolume: 7555,
    earnedAmount: 1255,
    addInSave: 12,
    inBlocked: 12,
    youBlocked: 14,
    accountCreateAt: 11,
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = vacByUserIdExchangeColumns()

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.PROFILE_VAC_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.PROFILE_VAC_PRODUCTS]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = vacByUserIdExchangeColumns().map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  getCurrentData() {
    return toJS(this.productsVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getProductsVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getProductsVacant() {
    try {
      const result = await ProductModel.getVacProductByUserId(this.user._id)

      runInAction(() => {
        this.productsVacant = clientProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.productsVacant = []
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      })
    }
  }

  onClickChangeAvatar() {
    this.onTriggerOpenModal('showAvatarEditModal')
  }

  onClickChangeUserInfo() {
    this.onTriggerOpenModal('showUserInfoModal')
  }

  async onSubmitUserInfoEdit(data) {
    try {
      this.checkValidationNameOrEmail = await UserModel.isCheckUniqueUser({
        name: data.name,
        email: data.email,
      })

      if (this.checkValidationNameOrEmail.nameIsUnique || this.checkValidationNameOrEmail.emailIsUnique) {
        return
      } else {
        await UserModel.changeUserInfo(data)

        await UserModel.getUserInfo()

        this.onTriggerOpenModal('showUserInfoModal')
      }
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onSubmitAvatarEdit(imageData) {
    const file = dataURLtoFile(imageData, this.user._id)

    const formData = new FormData()
    formData.append('filename', file)

    try {
      await OtherModel.postAvatar(formData)

      this.onTriggerOpenModal('showAvatarEditModal')

      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      runInAction(() => {
        this.error = error
      })
    }
  }

  onTriggerShowTabModal() {
    runInAction(() => {
      this.showTabModal = !this.showTabModal
    })
  }

  onChangeTabReview(e, value) {
    runInAction(() => {
      this.tabReview = value
    })
  }

  onChangeTabHistory(e, value) {
    runInAction(() => {
      this.tabHistory = value
    })
  }

  onChangeTabExchange(e, value) {
    runInAction(() => {
      this.tabExchange = value
    })
  }

  onClickButtonPrivateLabel(item) {
    runInAction(() => {
      this.selectedUser = item
    })
    this.onTriggerShowTabModal()
  }

  onTriggerDrawerOpen = () => {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
