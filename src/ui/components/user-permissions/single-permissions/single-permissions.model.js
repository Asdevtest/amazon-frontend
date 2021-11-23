import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'

import {PermissionsModel} from '@models/permissions-model'
import {SettingsModel} from '@models/settings-model'

import {adminSinglePermissionsColumns} from '@components/table-columns/admin/single-permissions-columns'

import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class SinglePermissionsModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  singlePermissions = []

  showAddOrEditSinglePermissionModal = false
  showConfirmModal = false

  addOrEditSinglePermissionSettings = {
    permission: {},
    isEdit: false,
    onSubmit: data => this.onSubmitCreateSinglePermission(data),
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
  columnsModel = adminSinglePermissionsColumns(this.rowHandlers)

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_SINGLE_PERMISSIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_SINGLE_PERMISSIONS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = adminSinglePermissionsColumns(this.rowHandlers).map(el => ({
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
    return toJS(this.singlePermissions)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getSinglePermissions()

      this.getDataGridState()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = result.map(per => ({...per, id: per._id}))
      })
    } catch (error) {
      this.payments = []
      console.log(error)
    }
  }

  async onSubmitCreateSinglePermission(data) {
    try {
      await this.createSinglePermission(data)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createSinglePermission(data) {
    try {
      await PermissionsModel.createSinglePermission(data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async updateSinglePermission(data, permissionId) {
    try {
      await PermissionsModel.updateSinglePermission(permissionId, data)
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitUpdateSinglePermission(data, permissionId) {
    try {
      await this.updateSinglePermission(data, permissionId)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickEditBtn(row) {
    this.addOrEditSinglePermissionSettings = {
      permission: row,
      isEdit: true,
      onSubmit: (data, permissionId) => this.onSubmitUpdateSinglePermission(data, permissionId),
    }
    this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
  }

  onClickAddBtn() {
    this.addOrEditSinglePermissionSettings = {
      permission: {},
      isEdit: false,
      onSubmit: data => this.onSubmitCreateSinglePermission(data),
    }
    this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
  }

  onClickRemoveBtn(id) {
    this.permissionIdToRemove = id

    this.onTriggerOpenModal('showConfirmModal')
  }

  async removeSinglePermission() {
    try {
      await PermissionsModel.removeSinglePermission(this.permissionIdToRemove)

      this.onTriggerOpenModal('showConfirmModal')

      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
