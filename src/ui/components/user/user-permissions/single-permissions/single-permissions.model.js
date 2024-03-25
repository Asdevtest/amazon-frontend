import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { PermissionsModel } from '@models/permissions-model'
import { SettingsModel } from '@models/settings-model'

import { adminSinglePermissionsColumns } from '@components/table/table-columns/admin/single-permissions-columns'

import { adminSinglePermissionsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

export class SinglePermissionsModel {
  history = undefined
  requestStatus = undefined

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

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

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

  get currentData() {
    return this.singlePermissions
  }

  loadData() {
    try {
      this.getDataGridState()
      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
    }
  }

  async getSinglePermissions() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const result = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = adminSinglePermissionsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      runInAction(() => {
        this.payments = []
      })
      console.log(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onSubmitCreateSinglePermission(data) {
    try {
      await this.createSinglePermission(data)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
    }
  }

  async createSinglePermission(data) {
    try {
      await PermissionsModel.createSinglePermission(data)
    } catch (error) {
      console.log(error)
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
    }
  }

  async onSubmitUpdateSinglePermission(data, permissionId) {
    try {
      await this.updateSinglePermission(data, permissionId)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.getSinglePermissions()
    } catch (error) {
      console.log(error)
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
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
