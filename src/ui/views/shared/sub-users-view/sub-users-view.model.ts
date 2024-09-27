/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { DataGridTableModel } from '@models/data-grid-table-model'
import { UserModel } from '@models/user-model'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { IFullUser } from '@typings/shared/full-user'

import { subUsersColumns } from './sub-users-view.columns'
import { IColumnProps, observerConfig } from './sub-users-view.config'

export class SubUsersViewModel extends DataGridTableModel {
  selectedSubUser?: IFullUser
  showAddSubUserModal = false
  showPermissionModal = false

  constructor() {
    const columnsProps: IColumnProps = {
      onClickRemove: (id: string) => this.unlinkSubUser(id),
      onClickEdit: (row: IFullUser) => this.onClickEditBtn(row),
      onClickSaveComment: (id: string, comment?: string) => this.onClickSaveComment(id, comment),
    }

    super({
      getMainDataMethod: UserModel.getMySubUsers,
      columnsModel: subUsersColumns(columnsProps),
      tableKey: DataGridTablesKeys.OVERALL_SUB_USERS,
      fieldsForSearch: ['name', 'email'],
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  async onClickSaveComment(id: string, comment?: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await UserModel.patchSubNote(id, comment)

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickEditBtn(row: IFullUser) {
    this.selectedSubUser = row

    this.onTriggerOpenModal('showPermissionModal')
  }

  async linkSubUser(data: { email: string }) {
    try {
      await UserModel.linkSubUser(data)
    } catch (error) {
      console.error(error)
    }
  }

  async unlinkSubUser(userId: string) {
    try {
      await UserModel.unlinkSubUser({ userId })

      toast.success(t(TranslationKey['Sub-user removed']))

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitlinkSubUser(email: string) {
    try {
      await this.linkSubUser({ email })
      this.getCurrentData()

      this.onTriggerOpenModal('showAddSubUserModal')
    } catch (error) {
      console.error(error)
    }
  }

  onToggleAddSubUserModal() {
    this.onTriggerOpenModal('showAddSubUserModal')
  }
}
