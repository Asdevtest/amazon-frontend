import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { BuyerModel } from '@models/buyer-model'
import { ClientModel } from '@models/client-model'
import { PermissionsModel } from '@models/permissions-model'
import { ResearcherModel } from '@models/researcher-model'
import { ShopModel } from '@models/shop-model'
import { SupervisorModel } from '@models/supervisor-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { subUsersColumns } from '@components/table/table-columns/sub-users-columns'
import { subUsersFreelancerColumns } from '@components/table/table-columns/sub-users-freelancer-columns'

import { checkIsClient, checkIsFreelancer } from '@utils/checks'
import { addIdDataConverter, clientInventoryDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

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
  curUserShopsPermissions = []
  productPermissionsData = []

  showAddSubUserModal = false
  showPermissionModal = false
  showConfirmModal = false

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
    onClickSaveComment: (id, comment) => this.onClickSaveComment(id, comment),
  }
  rowSelectionModel = undefined
  sortModel = []
  filterModel = { items: [] }
  columnsModel = subUsersColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = undefined

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

  async onClickSaveComment(id, comment) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await UserModel.patchSubNote(id, comment)

      this.loadData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.OVERALL_SUB_USERS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.OVERALL_SUB_USERS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  loadData() {
    try {
      this.getDataGridState()

      this.getUsers()
      this.getGroupPermissions()
      this.getSinglePermissions()

      if (checkIsClient(UserRoleCodeMap[this.userInfo.role])) {
        this.getShops()
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getUsers() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const response = await UserModel.getMySubUsers()

      runInAction(() => {
        this.subUsersData = addIdDataConverter(response).sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions(this.userInfo.role)

      runInAction(() => {
        this.groupPermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions(this.userInfo.role)

      runInAction(() => {
        this.singlePermissions = result.sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickEditBtn(row) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      runInAction(() => {
        this.selectedSubUser = row
      })

      if (!checkIsFreelancer(UserRoleCodeMap[this.userInfo.role])) {
        const result = await PermissionsModel.getProductsPermissionsForUserById(row._id)

        runInAction(() => {
          this.curUserProductPermissions = result
        })
      }

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

      if (checkIsClient(UserRoleCodeMap[this.userInfo.role])) {
        const result = await PermissionsModel.getPermissionsShopsByGuid(row._id)
        runInAction(() => {
          this.curUserShopsPermissions = result
        })
      }

      const productPermissionsData = await methodByRole()

      runInAction(() => {
        this.productPermissionsData = clientInventoryDataConverter(
          productPermissionsData?.rows || productPermissionsData,
        )
          .filter(el => !el.originalData.archive)
          .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      if (checkIsFreelancer(UserRoleCodeMap[this.userInfo.role])) {
        this.getSpecs()
      }

      this.onTriggerOpenModal('showPermissionModal')

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  onClickRemoveBtn(row) {
    this.selectedSubUser = row

    this.onTriggerOpenModal('showConfirmModal')
  }

  async setPermissionsForUser(id, data, allowedItems, currentSpec) {
    try {
      await PermissionsModel.setPermissionsForUser(id, data)

      if (!checkIsFreelancer(UserRoleCodeMap[this.userInfo.role])) {
        await PermissionsModel.setProductsPermissionsForUser({ userId: id, productIds: allowedItems?.selectedProducts })
      }

      if (checkIsClient(UserRoleCodeMap[this.userInfo.role])) {
        await PermissionsModel.patchPermissionsShops({ userId: id, shopIds: allowedItems?.selectedShops })
      }

      if (currentSpec) {
        await UserModel.changeSubUserSpec(id, { allowedSpec: currentSpec })
      }

      toast.success(t(TranslationKey['User permissions were changed']))
    } catch (error) {
      toast.error(t(TranslationKey['User permissions are not changed']))

      console.error(error)
    }
  }

  async onSubmitUserPermissionsForm(permissions, subUserId, allowedItems, currentSpec) {
    try {
      await this.setPermissionsForUser(subUserId, { permissions, permissionGroups: [] }, allowedItems, currentSpec)
      this.getUsers()
    } catch (error) {
      console.error(error)
    }
  }

  async linkSubUser(data) {
    try {
      await UserModel.linkSubUser(data)
    } catch (error) {
      if (error?.response?.data?.message) {
        toast.warning(t(TranslationKey[error.response.data.message]))
      }
    }
  }

  async unlinkSubUser() {
    try {
      await UserModel.unlinkSubUser({ userId: this.selectedSubUser._id })

      toast.success(t(TranslationKey['Sub-user removed']))
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitlinkSubUser(email) {
    try {
      await this.linkSubUser({ email })
      this.getUsers()

      this.onTriggerOpenModal('showAddSubUserModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitUnlinkSubUser() {
    try {
      await this.unlinkSubUser()
      this.getUsers()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
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
      console.error(error)
    }
  }
}
