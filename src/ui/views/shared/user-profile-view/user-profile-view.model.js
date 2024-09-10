import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { FeedbackModel } from '@models/feedback-model'
import { OtherModel } from '@models/other-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { vacByUserIdExchangeColumns } from '@components/table/table-columns/product/vac-by-user-id-exchange-columns'

import { checkIsFreelancer } from '@utils/checks'
import { clientProductsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'
import { dataURLtoFile } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

export class ProfileViewModel {
  requestStatus = undefined

  showAvatarEditModal = false
  showUserInfoModal = false
  showTabModal = false
  showConfirmWorkResultFormModal = false

  productsVacant = []
  tabHistory = 0
  selectedUser = undefined
  reviews = []
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
  activeSessions = []
  userInfoEditFormFlag = true

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = vacByUserIdExchangeColumns()
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    return this.productsVacant
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.PROFILE_VAC_PRODUCTS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.PROFILE_VAC_PRODUCTS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.setDataGridState()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.setDataGridState()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()
      await this.getReviews()

      if (!checkIsFreelancer(UserRoleCodeMap[UserModel.userInfo.role])) {
        await this.getProductsVacant()
      }

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getProductsVacant() {
    try {
      const result = await ProductModel.getVacProductByUserId(this.userInfo._id)

      runInAction(() => {
        this.productsVacant = clientProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.productsVacant = []
      })
    }
  }

  async onSubmitUserInfoEdit(data) {
    try {
      const { name, email, oldPassword, password } = data

      if (name || email) {
        await UserModel.changeUserInfo({ name: data.name?.trim() })
      }

      if (oldPassword && password) {
        await UserModel.changeUserPassword({
          oldPassword: data.oldPassword,
          newPassword: data.password,
        })
      }

      const userModelData = SettingsModel.loadValue('UserModel')
      const refreshToken = userModelData.refreshToken

      if (!refreshToken) {
        return
      }

      const response = await UserModel.getAccessToken(refreshToken)
      const accessToken = response?.accessToken

      await SettingsModel.saveValue('UserModel', { ...userModelData, accessToken })
      await UserModel.setAccessToken(accessToken)
      await UserModel.getUserInfo()

      this.onTriggerOpenModal('showUserInfoModal')

      toast.success(t(TranslationKey['Data was successfully saved']))
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitAvatarEdit(imageData) {
    const file = dataURLtoFile(imageData, this.userInfo._id)

    const formData = new FormData()
    formData.append('filename', file)

    try {
      await OtherModel.postAvatar(formData)

      this.onTriggerOpenModal('showAvatarEditModal')

      toast.success(t(TranslationKey['The avatar has been uploaded. The update will take place within a few minutes.']))
    } catch (error) {
      console.error(error)
    }
  }

  onChangeTabHistory(value) {
    this.tabHistory = value
  }

  onClickButtonPrivateLabel(item) {
    this.selectedUser = item
    this.onTriggerOpenModal('showTabModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async getReviews() {
    try {
      const result = await FeedbackModel.getMyFeedback()

      runInAction(() => {
        this.reviews = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onAcceptReview(review) {
    await FeedbackModel.sendFeedback(this.userInfo._id, {
      rating: review.rating,
      comment: review.review,
    })
    await this.getReviews()
    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }

  async getActiveSessions() {
    try {
      const responce = await UserModel.getActiveSessions()

      runInAction(() => {
        this.activeSessions = responce
      })
    } catch (error) {
      console.error(error)
    }
  }

  async logoutSession(sessionCreatedAt) {
    try {
      await UserModel.logoutSession(sessionCreatedAt)
    } catch (error) {
      console.error(error)
    }
  }

  onToggleUserInfoEditFormFlag() {
    this.onTriggerOpenModal('userInfoEditFormFlag')

    if (!this.userInfoEditFormFlag) {
      this.getActiveSessions()
    }
  }

  async onLogoutSession(sessionCreatedAt) {
    await this.logoutSession(sessionCreatedAt)

    await this.getActiveSessions()
  }

  onTriggerEnterInformation() {
    this.userInfoEditFormFlag = true
  }
}
