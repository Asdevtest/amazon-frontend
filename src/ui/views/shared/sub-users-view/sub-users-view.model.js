import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { ClientModel } from '@models/client-model'
import { PermissionsModel } from '@models/permissions-model'
import { ResearcherModel } from '@models/researcher-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { SupervisorModel } from '@models/supervisor-model'
import { UserModel } from '@models/user-model'

import { subUsersColumns } from '@components/table/table-columns/sub-users-columns'
import { subUsersFreelancerColumns } from '@components/table/table-columns/sub-users-freelancer-columns'

import { checkIsClient, checkIsFreelancer } from '@utils/checks'
import { addIdDataConverter, clientInventoryDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'

export class SubUsersViewModel {
  history = undefined
  requestStatus = undefined

  nameSearchValue = ''

  subUsersData = []
  singlePermissions = []
  groupPermissions = []
  shopsData = []
  specs = []

  curUserProductPermissions = []
  productPermissionsData = []

  modalPermission = false
  showAddSubUserModal = false
  showWarningModal = false
  showPermissionModal = false
  showConfirmModal = false

  rowSelectionModel = undefined

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
    onClickSaveComment: (id, comment) => this.onClickSaveComment(id, comment),
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = subUsersColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get currentData() {
    if (this.nameSearchValue) {
      return this.subUsersData.filter(
        el =>
          el.name.toLowerCase().includes(this.nameSearchValue.toLowerCase()) ||
          el.email.toLowerCase().includes(this.nameSearchValue.toLowerCase()),
      )
    } else {
      return this.subUsersData
    }
  }

  constructor({ history }) {
    this.history = history
    this.setColumnsModel()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setColumnsModel() {
    this.columnsModel =
      this.history.location.pathname === '/freelancer/users/sub-users'
        ? subUsersFreelancerColumns(this.rowHandlers)
        : subUsersColumns(this.rowHandlers)
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  async onClickSaveComment(id, comment) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      await UserModel.patchSubNote(id, comment)

      this.loadData()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.OVERALL_SUB_USERS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.OVERALL_SUB_USERS]

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeNameSearchValue(e) {
    this.nameSearchValue = e.target.value
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  async loadData() {
    try {
      this.getDataGridState()

      this.getUsers()
      this.getGroupPermissions()
      this.getSinglePermissions()

      checkIsClient(UserRoleCodeMap[this.userInfo.role]) && this.getShops()
    } catch (error) {
      console.log(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getUsers() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const response = await UserModel.getMySubUsers()

      runInAction(() => {
        this.subUsersData = addIdDataConverter(response).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions(this.userInfo.role)

      runInAction(() => {
        this.groupPermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions(this.userInfo.role)

      runInAction(() => {
        this.singlePermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickEditBtn(row) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      runInAction(() => {
        this.selectedSubUser = row
      })

      const result = await PermissionsModel.getProductsPermissionsForUserById(row._id)

      runInAction(() => {
        this.curUserProductPermissions = result
      })

      const methodByRole = () => {
        switch (UserRoleCodeMap[this.userInfo.role]) {
          case UserRole.CLIENT:
            return ClientModel.getProductPermissionsData({})

          case UserRole.BUYER:
            return BuyerModel.getProductsMyLight()

          case UserRole.SUPERVISOR:
            return SupervisorModel.getProductsMyLight()

          case UserRole.RESEARCHER:
            return ResearcherModel.getProductsVacant()

          case UserRole.FREELANCER:
            return []

          default:
            return ClientModel.getProductPermissionsData()
        }
      }

      const productPermissionsData = await methodByRole()

      runInAction(() => {
        this.productPermissionsData = clientInventoryDataConverter(
          productPermissionsData?.rows || productPermissionsData,
        )
          .filter(el => !el.originalData.archive)
          .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      checkIsFreelancer(UserRoleCodeMap[this.userInfo.role]) && this.getSpecs()

      this.onTriggerOpenModal('showPermissionModal')

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  onClickRemoveBtn(row) {
    this.selectedSubUser = row

    this.onTriggerOpenModal('showConfirmModal')
  }

  async setPermissionsForUser(id, data, allowedProductsIds, currentSpec) {
    try {
      await PermissionsModel.setPermissionsForUser(id, data)

      await PermissionsModel.setProductsPermissionsForUser({ userId: id, productIds: allowedProductsIds })

      if (currentSpec) {
        await UserModel.changeSubUserSpec(id, { allowedSpec: currentSpec })
      }

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['User permissions were changed']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: t(TranslationKey['User permissions are not changed']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')

      console.log(error)
    }
  }

  async onSubmitUserPermissionsForm(permissions, subUserId, allowedProductsIds, currentSpec) {
    try {
      await this.setPermissionsForUser(
        subUserId,
        { permissions, permissionGroups: [] },
        allowedProductsIds,
        currentSpec,
      )

      await this.getUsers()
    } catch (error) {
      console.log(error)
    }
  }

  async linkSubUser(data) {
    try {
      await UserModel.linkSubUser(data)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Sub-user added']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: error.body.message || t(TranslationKey['Sub-user not added!']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    }
  }

  async unlinkSubUser() {
    try {
      await UserModel.unlinkSubUser({ userId: this.selectedSubUser._id })

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Sub-user removed']),
        }
      })

      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitlinkSubUser(data) {
    try {
      await this.linkSubUser(data)
      await this.getUsers()
      this.onTriggerOpenModal('showAddSubUserModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitUnlinkSubUser() {
    try {
      await this.unlinkSubUser()
      await this.getUsers()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  onChangeModalEditSubUser() {
    this.modalEditSubUser = !this.modalEditSubUser
  }

  onChangeModalPermission() {
    this.modalPermission = !this.modalPermission
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async getSpecs() {
    try {
      const response = await UserModel.getSpecs(false)

      runInAction(() => {
        this.specs = response
      })
    } catch (error) {
      console.log(error)
    }
  }
}
