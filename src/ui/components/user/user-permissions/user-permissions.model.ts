/* eslint-disable @typescript-eslint/no-explicit-any */
import { format } from 'date-fns'
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridTableModel } from '@models/data-grid-table-model'
import { OtherModel } from '@models/other-model'
import { PermissionsModel } from '@models/permissions-model'

import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'

import { IPermission } from '@typings/models/permissions/permission'
import { IPermissionGroup } from '@typings/models/permissions/permission-group'

import { getModelSettings } from './helpers/get-model-settings'
import { observerConfig } from './observer-config'
import { userPermissionsColumns } from './user-permissions-columns'
import { PermissionsTypes } from './user-permissions.types'

export class UserPermissionsModel extends DataGridTableModel {
  groupPermissions: IPermissionGroup[] = []
  singlePermissions: IPermission[] = []
  newPermissionIds: string[] = []

  tabIndex = PermissionsTypes.GROUP_PERMISSIONS

  permissionIdToRemove: string = ''
  exportPermissions = undefined

  showAddOrEditGroupPermissionModal = false
  showAddOrEditSinglePermissionModal = false
  showConfirmModal = false

  addOrEditPermissionSettings = {
    permission: {},
    isEdit: false,
    onSubmit: (data: any, permissionId: string, newSinglePermissions: any) =>
      this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
        ? this.onSubmitCreateGroupPermission(data, newSinglePermissions)
        : this.onSubmitCreateSinglePermission(data),
  }

  constructor() {
    const rowHandlers = {
      onClickRemoveBtn: (row: IPermission | IPermissionGroup) => this.onClickRemoveBtn(row),
      onClickEditBtn: (row: IPermission | IPermissionGroup) => this.onClickEditBtn(row),
    }

    const columnsModel = userPermissionsColumns(rowHandlers)

    const { getMainDataMethod, tableKey } = getModelSettings(PermissionsTypes.GROUP_PERMISSIONS)

    super({
      getMainDataMethod,
      columnsModel,
      tableKey,
      fieldsForSearch: ['title', 'key', 'url'],
      defaultSortModel: [{ field: 'key', sort: 'asc' }],
    })

    this.getTableSettingsPreset()
    this.getSinglePermissions()

    makeObservable(this, observerConfig)
  }

  getPermissions() {
    this.getSinglePermissions()
    this.getCurrentData()
  }

  onChangeTabIndex(tabIndex: PermissionsTypes) {
    this.tabIndex = tabIndex

    const { getMainDataMethod, tableKey } = getModelSettings(tabIndex)

    this.getMainDataMethod = getMainDataMethod
    this.tableKey = tableKey
    this.setDefaultPinnedColumns()

    this.getTableSettingsPreset()
    this.getSinglePermissions()
  }

  async createPermission(data: IPermission | IPermissionGroup) {
    try {
      const newPermissionId = await PermissionsModel.createSinglePermission(data)

      this.newPermissionIds = [...this.newPermissionIds, newPermissionId.guid] as string[]
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateGroupPermission(newSinglePermissions: any) {
    try {
      this.newPermissionIds = []

      for (let i = 0; i < newSinglePermissions.length; i++) {
        await this.createPermission(newSinglePermissions[i])
      }
    } catch (error) {
      console.error(error)
    }
  }

  async updateSinglePermission(data: any, permissionId: string) {
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

  async updateGroupPermission(data: any, permissionId: string) {
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
      this.getPermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async removeGroupPermission() {
    try {
      await PermissionsModel.removeGroupPermission(this.permissionIdToRemove)
      this.onTriggerOpenModal('showConfirmModal')
      this.getPermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateSinglePermission(data: any) {
    try {
      await PermissionsModel.createSinglePermission(data)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.getPermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateGroupPermission(data: any, newSinglePermissions: any) {
    try {
      if (newSinglePermissions.length > 0) {
        await this.onCreateGroupPermission(newSinglePermissions)
        data = { ...data, permissions: [...data.permissions, ...this.newPermissionIds] }
      }

      await PermissionsModel.createGroupPermission(data)

      this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      this.getPermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitUpdateSinglePermission(data: any, permissionId: string) {
    try {
      await this.updateSinglePermission(data, permissionId)

      this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
      this.getPermissions()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitUpdateGroupPermission(data: any, permissionId: string, newSinglePermissions: any) {
    try {
      if (newSinglePermissions.length > 0) {
        await this.onCreateGroupPermission(newSinglePermissions)
        data = { ...data, permissions: [...data.permissions, ...this.newPermissionIds] }
      }

      await this.updateGroupPermission(data, permissionId)

      this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      this.getPermissions()
    } catch (error) {
      console.error(error)
    }
  }

  onClickAddBtn() {
    this.addOrEditPermissionSettings = {
      permission: {},
      isEdit: false,
      onSubmit: (data: any, permissionId: string, newSinglePermissions: any) =>
        this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
          ? this.onSubmitCreateGroupPermission(data, newSinglePermissions)
          : this.onSubmitCreateSinglePermission(data),
    }
    this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
      ? this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      : this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
  }

  onClickEditBtn(row: IPermission | IPermissionGroup) {
    this.addOrEditPermissionSettings = {
      permission: row,
      isEdit: true,
      onSubmit: (data: any, permissionId: string, newSinglePermissions: any) =>
        this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
          ? this.onSubmitUpdateGroupPermission(data, permissionId, newSinglePermissions)
          : this.onSubmitUpdateSinglePermission(data, permissionId),
    }
    this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
      ? this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      : this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
  }

  onClickCancelBtn() {
    this.confirmModalSettings = {
      isWarning: false,
      title: '',
      message: t(TranslationKey['The data will not be saved!']),
      onSubmit: () => this.cancelTheOrder(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickRemoveBtn(row: IPermission | IPermissionGroup) {
    this.permissionIdToRemove = row._id

    this.confirmModalSettings = {
      isWarning: true,
      title: '',
      message:
        this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
          ? t(TranslationKey['Are you sure you want to delete the group?'])
          : t(TranslationKey['Are you sure you want to delete the permission?']),
      onSubmit: () =>
        this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
          ? this.removeGroupPermission()
          : this.removeSinglePermission(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  cancelTheOrder() {
    this.tabIndex === PermissionsTypes.GROUP_PERMISSIONS
      ? this.onTriggerOpenModal('showAddOrEditGroupPermissionModal')
      : this.onTriggerOpenModal('showAddOrEditSinglePermissionModal')
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onClickExportPermissions() {
    try {
      const response = (await AdministratorModel.exportPermissions()) as any

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
          toast.success(t(TranslationKey['Data exported successfully']))
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
        const file = input?.files?.[0]

        if (!file || file.type !== 'application/json') {
          toast.error(t(TranslationKey['Please select a JSON file']))

          return
        }

        await OtherModel.patchPermissionJson(file)

        toast.success(t(TranslationKey['Permissions imported successfully']))

        this.getPermissions()
      })

      input.click()
    } catch (error) {
      console.error(error)
      toast.error(t(TranslationKey['Permissions not imported']))
    }
  }

  async getGroupPermissions() {
    try {
      const response = await PermissionsModel.getGroupPermissions()

      runInAction(() => {
        this.groupPermissions = response as IPermissionGroup[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getSinglePermissions() {
    try {
      const response = await PermissionsModel.getSinglePermissions()

      runInAction(() => {
        this.singlePermissions = response as IPermission[]
      })
    } catch (error) {
      console.error(error)
    }
  }
}
