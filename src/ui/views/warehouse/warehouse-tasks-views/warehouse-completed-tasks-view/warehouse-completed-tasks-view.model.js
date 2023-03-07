/* eslint-disable no-unused-vars */
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
import {objectToUrlQs} from '@utils/text'

export class WarehouseCompletedViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  completedTasks = []
  completedTasksBase = []
  curOpenedTask = {}

  currentData = []

  rowCount = 0

  volumeWeightCoefficient = undefined

  nameSearchValue = ''

  drawerOpen = false

  rowHandlers = {
    setCurrentOpenedTask: item => this.setCurrentOpenedTask(item),
  }

  firstRowId = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers, this.firstRowId)

  showTaskInfoModal = false

  constructor({history}) {
    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.completedTasks,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.getCompletedTasksPagMy()
  }

  setDataGridState(state) {
    runInAction(() => {
      this.firstRowId = state.sorting.sortedRows[0]
    })

    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.WAREHOUSE_COMPLETED_TASKS]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = warehouseCompletedTasksViewColumns(this.rowHandlers, this.firstRowId).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e

      this.curPage = 0
    })

    this.getCompletedTasksPagMy()
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeDrawerOpen(e, value) {
    runInAction(() => {
      this.drawerOpen = value
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.getCompletedTasksPagMy()
  }

  getCurrentData() {
    return toJS(this.completedTasks)
  }

  onChangeNameSearchValue(e) {
    runInAction(() => {
      this.nameSearchValue = e.target.value
    })
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getCompletedTasksPagMy()
    } catch (error) {
      console.log(error)
    }
  }

  async getCompletedTasksPagMy() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      // const filter =
      //   isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))
      //     ? `or[0][asin][$contains]=${this.nameSearchValue};or[1][item][$contains]=${this.nameSearchValue};or[2][trackNumberText][$contains]=${this.nameSearchValue};`
      //     : `or[0][asin][$contains]=${this.nameSearchValue};or[1][id][$eq]=${this.nameSearchValue};or[2][trackNumberText][$eq]=${this.nameSearchValue};or[3][item][$contains]=${this.nameSearchValue};`

      const filter = objectToUrlQs({
        or: [
          {asin: {$contains: this.nameSearchValue}},
          {
            trackNumberText: {
              [`${
                isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue)) ? '$contains' : '$eq'
              }`]: this.nameSearchValue,
            },
          },
          {id: {$eq: this.nameSearchValue}},
          {item: {$eq: this.nameSearchValue}},
        ].filter(
          el =>
            ((isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))) && !el.id) ||
            !(isNaN(this.nameSearchValue) || !Number.isInteger(Number(this.nameSearchValue))),
        ),
      })

      const result = await StorekeeperModel.getLightTasksWithPag({
        status: mapTaskStatusEmumToKey[TaskStatus.SOLVED],
        offset: this.curPage * this.rowsPerPage,
        limit: this.rowsPerPage,
        filters: this.nameSearchValue ? filter : null,
        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.rowCount = result.count

        this.completedTasksBase = result.rows

        this.completedTasks = warehouseTasksDataConverter(
          this.completedTasksBase
            .sort(sortObjectsArrayByFiledDate('updatedAt'))
            .map(el => ({...el, beforeBoxes: el.boxesBefore})),
        )
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      runInAction(() => {
        this.batches = []
      })
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })
    this.getCompletedTasksPagMy()
  }

  async setCurrentOpenedTask(item) {
    try {
      const result = await StorekeeperModel.getTaskById(item._id)

      const platformSettingsResult = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = platformSettingsResult.volumeWeightCoefficient

        this.curOpenedTask = result
      })
      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onChangeTriggerDrawerOpen() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })

    this.getCompletedTasksPagMy()
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
