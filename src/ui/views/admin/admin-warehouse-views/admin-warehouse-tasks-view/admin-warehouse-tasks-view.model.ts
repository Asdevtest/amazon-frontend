import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'

import { AdministratorModel } from '@models/administrator-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITask } from '@typings/models/tasks/task'

import { adminWarehouseTasksColumns } from './admin-warehouse-tasks-columns'
import { observerConfig } from './observer-config'

export class AdminWarehouseTasksViewModel extends DataGridFilterTableModel {
  currentTask: ITask | null = null

  showTaskInfoModal = false

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const rowHandlers = {
      setCurrentOpenedTask: (item: ITask) => this.setCurrentOpenedTask(item),
    }
    const columnsModel = adminWarehouseTasksColumns(rowHandlers)

    super({
      getMainDataMethod: AdministratorModel.getTasksPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel),
      mainMethodURL: 'admins/tasks/pag?',
      tableKey: DataGridTablesKeys.ADMIN_TASKS,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  async setCurrentOpenedTask(item: ITask) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const task = await StorekeeperModel.getTaskById(item._id)

      runInAction(() => {
        this.currentTask = task as unknown as ITask
      })

      this.onTriggerOpenModal('showTaskInfoModal')

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }
}
