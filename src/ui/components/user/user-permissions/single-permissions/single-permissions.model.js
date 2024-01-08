import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { PermissionsModel } from '@models/permissions-model'
import { SettingsModel } from '@models/settings-model'

import { adminSinglePermissionsColumns } from '@components/table/table-columns/admin/single-permissions-columns'

import { adminSinglePermissionsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

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
  columnsModel = adminSinglePermissionsColumns(this.rowHandlers)

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

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.ADMIN_SINGLE_PERMISSIONS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.ADMIN_SINGLE_PERMISSIONS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
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
    return toJS(this.singlePermissions)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      this.getDataGridState()
      await this.getSinglePermissions()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      const result = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = adminSinglePermissionsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
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
      const allowData = getObjectFilteredByKeyArrayWhiteList(data, [
        'title',
        'description',
        'allowedUrls',
        'role',
        'hierarchy',
      ])

      await PermissionsModel.updateSinglePermission(permissionId, allowData)
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

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['Data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickAddBtn() {
    this.addOrEditSinglePermissionSettings = {
      permission: {},
      isEdit: false,
      onSubmit: data => this.onSubmitCreateSinglePermission(data),
    }
    this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
  }

  onClickRemoveBtn(row) {
    this.permissionIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message: t(TranslationKey['Are you sure you want to delete the permission?']),
      onClickSuccess: () => this.removeSinglePermission(),
    }

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
