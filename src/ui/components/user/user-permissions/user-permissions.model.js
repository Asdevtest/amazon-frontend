import { format } from 'date-fns'
import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { OtherModel } from '@models/other-model'
import { PermissionsModel } from '@models/permissions-model'
import { SettingsModel } from '@models/settings-model'

import { userPermissionsColumns } from '@components/table/table-columns/admin/user-permissions-columns'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { ITabsIndex } from './user-permissions.config'

export class UserPermissionsModel {
  requestStatus = undefined
  groupPermissions = []
  singlePermissions = []
  newPermissionIds = []
  tabIndex = ITabsIndex.GROUP_PERMISSIONS
  permissionIdToRemove = undefined
  exportPermissions = undefined

  showAddOrEditGroupPermissionModal = false
  showAddOrEditSinglePermissionModal = false
  showConfirmModal = false

  addOrEditPermissionSettings = {
    permission: {},
    isEdit: false,
    onSubmit: (data, newSinglePermissions) =>
      this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
        ? this.onSubmitCreateGroupPermission(data, newSinglePermissions)
        : this.onSubmitCreateSinglePermission(data),
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
  columnsModel = userPermissionsColumns(this.rowHandlers)
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get currentData() {
    return this.tabIndex === ITabsIndex.GROUP_PERMISSIONS ? this.groupPermissions : this.singlePermissions
  }

  get tableKey() {
    return this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
      ? DataGridTablesKeys.ADMIN_GROUP_PERMISSIONS
      : DataGridTablesKeys.ADMIN_SINGLE_PERMISSIONS
  }

  constructor() {
    this.getDataGridState()
    this.getGroupPermissions()
    this.getSinglePermissions()

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, this.tableKey)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.tableKey]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.setDataGridState()
  }

  loadData() {
    this.getDataGridState()

    this.tabIndex === ITabsIndex.GROUP_PERMISSIONS ? this.getGroupPermissions() : this.getSinglePermissions()
  }

  async getGroupPermissions() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const response = await PermissionsModel.getGroupPermissions()

      runInAction(() => {
        this.groupPermissions = response.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)

      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getSinglePermissions() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const response = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = response.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async createPermission(data) {
    try {
      const newPermissionId = await PermissionsModel.createSinglePermission(data)

      this.newPermissionIds = [...this.newPermissionIds, newPermissionId.guid]
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateGroupPermission(newSinglePermissions) {
    try {
      this.newPermissionIds = []

      for (let i = 0; i < newSinglePermissions.length; i++) {
        await this.createPermission(newSinglePermissions[i])
      }
    } catch (error) {
      console.error(error)
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
      console.error(error)
    }
  }

  async updateGroupPermission(data, permissionId) {
    try {
      const allowData = getObjectFilteredByKeyArrayWhiteList(data, ['title', 'description', 'permissions', 'hierarchy'])

      await PermissionsModel.updateGroupPermission(permissionId, allowData)
    } catch (error) {
      console.error(error)
    }
  }

  async removeSinglePermission() {
    try {
      await PermissionsModel.removeSinglePermission(this.permissionIdToRemove)
      this.onTriggerOpenModal('showConfirmModal')
      this.getSinglePermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async removeGroupPermission() {
    try {
      await PermissionsModel.removeGroupPermission(this.permissionIdToRemove)
      this.onTriggerOpenModal('showConfirmModal')
      this.getGroupPermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateSinglePermission(data) {
    try {
      await PermissionsModel.createSinglePermission(data)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateGroupPermission(data, newSinglePermissions) {
    try {
      if (newSinglePermissions.length > 0) {
        await this.onCreateGroupPermission(newSinglePermissions)
        data = { ...data, permissions: [...data.permissions, ...this.newPermissionIds] }
      }

      await PermissionsModel.createGroupPermission(data)

      this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitUpdateSinglePermission(data, permissionId) {
    try {
      await this.updateSinglePermission(data, permissionId)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitUpdateGroupPermission(data, permissionId, newSinglePermissions) {
    try {
      if (newSinglePermissions.length > 0) {
        await this.onCreateGroupPermission(newSinglePermissions)
        data = { ...data, permissions: [...data.permissions, ...this.newPermissionIds] }
      }

      await this.updateGroupPermission(data, permissionId)

      this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      this.loadData()
    } catch (error) {
      console.error(error)
    }
  }

  onClickAddBtn() {
    this.addOrEditPermissionSettings = {
      permission: {},
      isEdit: false,
      onSubmit: (data, _, newSinglePermissions) =>
        this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
          ? this.onSubmitCreateGroupPermission(data, newSinglePermissions)
          : this.onSubmitCreateSinglePermission(data),
    }
    this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
      ? this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      : this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
  }

  onClickEditBtn(row) {
    this.addOrEditPermissionSettings = {
      permission: row,
      isEdit: true,
      onSubmit: (data, permissionId, newSinglePermissions) =>
        this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
          ? this.onSubmitUpdateGroupPermission(data, permissionId, newSinglePermissions)
          : this.onSubmitUpdateSinglePermission(data, permissionId),
    }
    this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
      ? this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      : this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      message: t(TranslationKey['The data will not be saved!']),
      onClickSuccess: () => this.cancelTheOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(row) {
    this.permissionIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      message:
        this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
          ? t(TranslationKey['Are you sure you want to delete the group?'])
          : t(TranslationKey['Are you sure you want to delete the permission?']),
      onClickSuccess: () =>
        this.tabIndex === ITabsIndex.GROUP_PERMISSIONS ? this.removeGroupPermission() : this.removeSinglePermission(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.tabIndex === ITabsIndex.GROUP_PERMISSIONS
      ? this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      : this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  onChangeTabIndex(tabIndex) {
    this.tabIndex = tabIndex

    this.loadData()
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async onClickExportPermissions() {
    try {
      const response = await AdministratorModel.exportPermissions()

      if (response) {
        const jsonData = JSON.stringify(response)
        const blob = new Blob([jsonData], { type: 'application/json' })
        const href = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = href
        const formattedDate = format(new Date(), 'yyyy-MM-dd_HH-mm-ss')
        link.download = `permissions-${formattedDate}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        setTimeout(() => {
          toast.success(t(TranslationKey['Permissions exported successfully']))
        }, 3000)
      }
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['Permissions not exported']))
    }
  }

  async onClickImportPermissions() {
    try {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'application/json'

      input.addEventListener('change', async () => {
        const file = input.files[0]

        if (!file || file.type !== 'application/json') {
          toast.error(t(TranslationKey['Please select a JSON file']))

          return
        }

        await OtherModel.patchPermissionJson(file)

        toast.success(t(TranslationKey['Permissions imported successfully']))
      })

      input.click()
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['Permissions not imported']))
    }
  }
}
