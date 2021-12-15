import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'
import {UserRoleCodeMap} from '@constants/user-roles'

import {PermissionsModel} from '@models/permissions-model'
import {SettingsModel} from '@models/settings-model'

import {adminGroupPermissionsColumns} from '@components/table-columns/admin/group-permissions-columns copy'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const textConsts = getLocalizedTexts(texts, 'ru').groupPermissions

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
    onClickRemoveBtn: id => this.onClickRemoveBtn(id),
    onClickEditBtn: row => this.onClickEditBtn(row),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = adminGroupPermissionsColumns(this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
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

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectionModel = model
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

      await this.getGroupPermissions()

      await this.getSinglePermissions()

      this.getDataGridState()

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
        this.groupPermissions = result.sort(sortObjectsArrayByFiledDate('updatedAt')).map(per => ({
          ...per,
          id: per._id,
          tmpRole: UserRoleCodeMap[per.role],
        }))
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
        this.singlePermissions = result.map(per => ({...per, id: per._id})).sort((a, b) => a.role - b.role)
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
        data = {...data, permissions: [...data.permissions, ...this.newPermissionIds]}
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
      const allowData = getObjectFilteredByKeyArrayWhiteList(data, ['title', 'description', 'permissions'])

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
        data = {...data, permissions: [...data.permissions, ...this.newPermissionIds]}
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
      message: textConsts.confirmCloseModalMessage,
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(id) {
    this.permissionIdToRemove = id

    this.confirmModalSettings = {
      isWarning: true,
      message: textConsts.confirmRemoveGroupMessage,
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
