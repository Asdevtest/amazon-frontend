import { makeAutoObservable } from 'mobx'

import { HistoryType } from '@typings/types/history'

export class WarehouseTasksViewModel {
  history?: HistoryType

  constructor(history: HistoryType) {
    this.history = history

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickVacantTask() {
    this.history?.push('/warehouse/tasks/vacant-tasks')
  }

  onClickMyTasks() {
    this.history?.push('/warehouse/tasks/my-tasks')
  }

  onClickCompletedTasks() {
    this.history?.push('/warehouse/tasks/completed-tasks')
  }

  onClickCanceledTasks() {
    this.history?.push('/warehouse/tasks/canceled-tasks')
  }
}
