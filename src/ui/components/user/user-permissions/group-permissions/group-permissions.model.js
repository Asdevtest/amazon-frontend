import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

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
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = adminGroupPermissionsColumns(this.rowHandlers)

  constructor({ history }) {
    this.history = history
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = this.columnsModel.map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    if (this.requestStatus && this.requestStatus !== loadingStatuses.isLoading) {
      const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
        'sorting',
        'filter',
        'pagination',
        'density',
        'columns',
      ])

      SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS)
    }
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = adminGroupPermissionsColumns(this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  getCurrentData() {
    return toJS(this.groupPermissions)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      await this.getGroupPermissions()

      // this.getDataGridState()

      await this.getSinglePermissions()

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
    this.addOrEditGroupPermissionSettings = {
      permission: row,
      isEdit: true,
      onSubmit: (data, newSinglePermissions, permissionId) =>
        this.onSubmitUpdateGroupPermission(data, newSinglePermissions, permissionId),
    }
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
