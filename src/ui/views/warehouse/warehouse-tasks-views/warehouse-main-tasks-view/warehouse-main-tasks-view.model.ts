import { RadioChangeEvent } from 'antd'
import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TaskOperationType } from '@constants/task/task-operation-type'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OtherModel } from '@models/other-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { TaskStatus } from '@typings/enums/task-status'
import { ITask } from '@typings/models/tasks/task'
import { IPlatformSettings } from '@typings/shared/patform-settings'

import { WarehouseMainTasksViewColumns } from './warehouse-main-tasks-view.columns'
import { ColumnsProps, fieldsForSearch, warehouseCanceledTasksConfig } from './warehouse-main-tasks-view.config'

export class WarehouseMainTasksViewModel extends DataGridFilterTableModel {
  currentTask?: ITask
  taskType = null
  taskPriority = null
  showTaskInfoModal = false

  get platformSettings() {
    return UserModel.platformSettings as unknown as IPlatformSettings
  }
  get downloadTaskFileDisabled() {
    return (
      this.selectedRows.length > 1 ||
      this.currentData.filter(el => this.selectedRows.includes(el.id))[0]?.operationType !== TaskOperationType.RECEIVE
    )
  }

  constructor(status: TaskStatus) {
    const columnsProps: ColumnsProps = {
      onChangeTask: id => this.onChangeTask(id),
    }
    const columnsModel = WarehouseMainTasksViewColumns(columnsProps)
    const filtersFields = getFilterFields(columnsModel)

    const defaultGetCurrentDataOptions = () => ({
      status,
      operationType: this.taskType || undefined,
      priority: this.taskPriority || undefined,
    })

    super({
      getMainDataMethod: StorekeeperModel.getLightTasksWithPag,
      columnsModel,
      filtersFields,
      mainMethodURL: 'storekeepers/tasks_light/pag/my?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.WAREHOUSE_CANCELED_TASKS,
      defaultGetCurrentDataOptions,
      defaultSortModel: [{ field: 'updatedAt', sort: 'desc' }],
    })
    makeObservable(this, warehouseCanceledTasksConfig)

    this.getTableSettingsPreset()
  }

  onChangeTaskType(event: RadioChangeEvent) {
    this.taskType = event.target.value
    this.getCurrentData()
  }

  onChangeTaskPriority(event: RadioChangeEvent) {
    this.taskPriority = event.target.value
    this.getCurrentData()
  }

  onClickReport() {
    this.selectedRows.forEach(taskId => OtherModel.getReportTaskByTaskId(taskId))
  }

  async onChangeTask(id: string) {
    try {
      const response = (await StorekeeperModel.getTaskById(id)) as unknown as ITask

      runInAction(() => {
        this.currentTask = response
      })

      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.error(error)
    }
  }
}
