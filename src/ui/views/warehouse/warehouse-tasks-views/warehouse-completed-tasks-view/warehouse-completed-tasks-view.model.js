import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'

import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {warehouseCompletedTasksViewColumns} from '@components/table-columns/warehouse/completed-tasks-columns'

import {warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  completedTasks = []
  curOpenedTask = {}

  volumeWeightCoefficient = undefined

  drawerOpen = false

  rowHandlers = {
    setCurrentOpenedTask: item => this.setCurrentOpenedTask(item),
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers)

  showTaskInfoModal = false

  // reactionLanguageTagDisposer = undefined

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})

    // this.reactionLanguageTagDisposer = reaction(
    //   () => SettingsModel.languageTag,
    //   () => this.loadData(),
    // )

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers)
    }
  }

  // disposeReactionLanguageTagDisposer(){
  //   if(this.reactionLanguageTagDisposer){
  //     this.reactionLanguageTagDisposer()
  //   }
  // }

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS)
  }

  // updateDataGridColumns(){
  //   console.log('this.columnsModel', this.columnsModel)

  //   this.columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers).map(el => ({
  //       ...el,
  //       hide: this.columnsModel?.lookup[el?.field]?.hide,
  //     }))

  //   console.log('this.columnsModel', this.columnsModel)
  // }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers).map(el => ({
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

  getCurrentData() {
    return toJS(this.completedTasks)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getTasksMy()
      this.getDataGridState()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getTasksMy() {
    try {
      const result = await StorekeeperModel.getLightTasksMy({
        status: mapTaskStatusEmumToKey[TaskStatus.SOLVED],
      })

      runInAction(() => {
        this.completedTasks = warehouseTasksDataConverter(
          result.sort(sortObjectsArrayByFiledDate('updatedAt')).map(el => ({...el, beforeBoxes: el.boxesBefore})),
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async setCurrentOpenedTask(item) {
    try {
      const result = await StorekeeperModel.getTaskById(item._id)

      const platformSettingsResult = await UserModel.getPlatformSettings()

      this.volumeWeightCoefficient = platformSettingsResult.volumeWeightCoefficient

      this.curOpenedTask = result
      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
