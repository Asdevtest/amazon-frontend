import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { PermissionsModel } from '@models/permissions-model'
import { SettingsModel } from '@models/settings-model'

import { adminGroupPermissionsColumns } from '@components/table/table-columns/admin/group-permissions-columns copy'

import { adminGroupPermissionsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

export class GroupPermissionsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  groupPermissions = []
  singlePermissions = []
  newPermissionIds = []

  showAddOrEditGroupPermissionModal = false
  showConfirmModal = false

  addOrEditGroupPermissionSettings = {
    permission: {},
    isEdit: false,
    onSubmit: (data, newSinglePermissions) => this.onSubmitCreateGroupPermission(data, newSinglePermissions),
  }

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickSuccess: () => {},
  }

  rowHandlers = {
    onClickRemoveBtn: row => this.onClickRemoveBtn(row),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = adminGroupPermissionsColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  getCurrentData() {
    return toJS(this.groupPermissions)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await Promise.all([this.getGroupPermissions(), this.getSinglePermissions()])
      // this.getDataGridState()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getGroupPermissions() {
    try {
      const result = await PermissionsModel.getGroupPermissions()

      runInAction(() => {
        this.groupPermissions = adminGroupPermissionsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      this.payments = []
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions()
      runInAction(() => {
        this.singlePermissions = result.map(per => ({ ...per, id: per._id })).sort((a, b) => a.role - b.role)
      })
    } catch (error) {
      this.payments = []
      console.log(error)
    }
  }

  async createSinglePermission(data) {
    try {
      const newPermissionId = await PermissionsModel.createSinglePermission(data)

      this.newPermissionIds = [...this.newPermissionIds, newPermissionId.guid]
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createAllSinglePermissions(newSinglePermissions) {
    try {
      this.newPermissionIds = []
      for (let i = 0; i < newSinglePermissions.length; i++) {
        const perm = newSinglePermissions[i]
        await this.createSinglePermission(perm)
      }
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitCreateGroupPermission(data, newSinglePermissions) {
    try {
      if (newSinglePermissions.length > 0) {
        await this.createAllSinglePermissions(newSinglePermissions)
        data = { ...data, permissions: [...data.permissions, ...this.newPermissionIds] }
      }

      await this.createGroupPermission(data)

      this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      this.getGroupPermissions()
      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createGroupPermission(data) {
    try {
      await PermissionsModel.createGroupPermission(data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async updateGroupPermission(data, permissionId) {
    try {
      const allowData = getObjectFilteredByKeyArrayWhiteList(data, ['title', 'description', 'permissions', 'hierarchy'])

      await PermissionsModel.updateGroupPermission(permissionId, allowData)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitUpdateGroupPermission(data, newSinglePermissions, permissionId) {
    try {
      if (newSinglePermissions.length > 0) {
        await this.createAllSinglePermissions(newSinglePermissions)
        data = { ...data, permissions: [...data.permissions, ...this.newPermissionIds] }
      }

      await this.updateGroupPermission(data, permissionId)

      this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      this.getGroupPermissions()
      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickEditBtn(row) {
    runInAction(() => {
      this.addOrEditGroupPermissionSettings = {
        permission: row,
        isEdit: true,
        onSubmit: (data, newSinglePermissions, permissionId) =>
          this.onSubmitUpdateGroupPermission(data, newSinglePermissions, permissionId),
      }
    })

    this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
  }

  onClickAddBtn() {
    this.addOrEditGroupPermissionSettings = {
      permission: {},
      isEdit: false,
      onSubmit: (data, newSinglePermissions) => this.onSubmitCreateGroupPermission(data, newSinglePermissions),
    }
    this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['The data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(row) {
    this.permissionIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the group?']),
      onClickSuccess: () => this.removeGroupPermission(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeGroupPermission() {
    try {
      await PermissionsModel.removeGroupPermission(this.permissionIdToRemove)
      this.onTriggerOpenModal('showConfirmModal')
      this.getGroupPermissions()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
