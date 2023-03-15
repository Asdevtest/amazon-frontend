/* eslint-disable no-unused-vars */
import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {BoxStatus} from '@constants/box-status'
import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
import {TaskOperationType} from '@constants/task-operation-type'
import {mapTaskStatusEmumToKey, TaskStatus} from '@constants/task-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {GeneralModel} from '@models/general-model'
import {ProductModel} from '@models/product-model'
import {SettingsModel} from '@models/settings-model'
import {ShopModel} from '@models/shop-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesViewColumns} from '@components/table-columns/client/client-boxes-columns'
import {clientTasksViewColumns} from '@components/table-columns/client/client-tasks-columns'

import {clientWarehouseDataConverter, warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {getTableByColumn, objectToUrlQs, translateLableToSome} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostFilesInData, onSubmitPostImages} from '@utils/upload-files'

const updateBoxWhiteList = [
  'amount',
  'weighGrossKg',
  'volumeWeightKg',
  'shippingLabel',
  'warehouse',
  'deliveryMethod',
  'lengthCmSupplier',
  'widthCmSupplier',
  'heightCmSupplier',
  'weighGrossKgSupplier',
  'lengthCmWarehouse',
  'widthCmWarehouse',
  'heightCmWarehouse',
  'weighGrossKgWarehouse',
  'isBarCodeAttachedByTheStorekeeper',
  'isShippingLabelAttachedByStorekeeper',
  'isBarCodeAlreadyAttachedByTheSupplier',
  'items',
  'images',
  'destinationId',
  'storekeeperId',
  'logicsTariffId',
  'fbaShipment',
  'referenceId',
  'trackNumberFile',
  'trackNumberText',
  'fbaNumber',
  'prepId',
]

const filtersFields = [
  'shopIds',
  'humanFriendlyId',
  'id',
  'item',
  'asin',
  'skusByClient',
  'amazonTitle',
  'destination',
  'logicsTariff',
  'createdAt',
  'updatedAt',
  'amount',
  'prepId',
]

export class ClientWarehouseTasksViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  tasksMy = []

  nameSearchValue = ''

  drawerOpen = false
  // isFormed = null

  curDestination = undefined
  // curShops = []

  currentData = []

  boxesIdsToTask = []

  // productSearchGuid = null

  showEditHSCodeModal = false
  showMergeBoxModal = false
  showTaskInfoModal = false
  showSendOwnProductModal = false
  showEditBoxModal = false
  showConfirmModal = false
  showRedistributeBoxModal = false

  showRequestToSendBatchModal = false

  showEditMultipleBoxesModal = false

  showConfirmWithCommentModal = false

  showGroupingBoxesModal = false

  showProgress = false

  showSuccessInfoModal = false

  boxesDeliveryCosts = undefined

  showSetShippingLabelModal = false

  modalEditSuccessMessage = ''

  showSetChipValueModal = false

  showWarningInfoModal = false

  showSelectionStorekeeperAndTariffModal = false

  changeItem = null

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  onHover = null

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  rowCount = 0
  sortModel = []
  filterModel = {items: []}

  curPage = 0
  rowsPerPage = 15

  curPageForTask = 0
  rowsPerPageForTask = 15

  densityModel = 'compact'
  columnsModel = clientBoxesViewColumns(
    this.rowHandlers,
    this.storekeepersData,
    this.destinations,
    SettingsModel.destinationsFavourites,
    this.columnMenuSettings,
    this.onHover,
  )

  rowTaskHandlers = {
    onClickTaskInfo: item => this.setCurrentOpenedTask(item),
    onClickCancelBtn: (id, taskId, type) => this.onClickCancelBtn(id, taskId, type),
  }

  taskColumnsModel = clientTasksViewColumns(this.rowTaskHandlers)

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor({history}) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.history = history

      this.currentStorekeeper = {_id: url.searchParams.get('storekeeper-id')}
      this.nameSearchValue = url.searchParams.get('search-text')
    })

    runInAction(() => {
      this.history = history
    })
    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.boxesMy,
      () => {
        runInAction(() => {
          this.currentData = this.getCurrentData()
        })
      },
    )

    reaction(
      () => this.currentStorekeeper,
      () => this.getClientDestinations(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      runInAction(() => {
        this.boxesMy = clientWarehouseDataConverter(this.baseBoxesMy, this.volumeWeightCoefficient, this.shopsData)
      })

      this.getDataGridState()
    }
  }

  async getDestinations() {
    this.destinations = await ClientModel.getDestinations()
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = state.filter.filterModel.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = clientBoxesViewColumns(
          this.rowHandlers,
          this.storekeepersData,
          this.destinations,
          SettingsModel.destinationsFavourites,
          this.columnMenuSettings,
          this.onHover,
        ).map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
        this.taskColumnsModel = clientTasksViewColumns(this.rowTaskHandlers).map(el => ({
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

    this.getBoxesMy()
  }

  onChangeRowsPerPageForTask(e) {
    runInAction(() => {
      this.rowsPerPageForTask = e
      this.curPageForTask = 0
    })

    this.getBoxesMy()
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

    this.getBoxesMy()
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectedBoxes = model
    })
  }

  getCurrentTaskData() {
    return toJS(this.tasksMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()
      this.getTasksMy()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async setCurrentOpenedTask(item) {
    try {
      const task = await StorekeeperModel.getTaskById(item._id)

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient

        this.curOpenedTask = task
      })

      this.onTriggerOpenModal('showTaskInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawer() {
    runInAction(() => {
      this.drawerOpen = !this.drawerOpen
    })
  }

  onChangeCurPage = e => {
    runInAction(() => {
      this.curPage = e
    })

    this.getBoxesMy()
  }

  onChangeCurPageForTask = e => {
    runInAction(() => {
      this.curPageForTask = e
    })

    this.getBoxesMy()
  }

  async getTasksMy() {
    try {
      const result = await ClientModel.getTasks(this.currentStorekeeper && {storekeeperId: this.currentStorekeeper._id})

      runInAction(() => {
        this.tasksMy = warehouseTasksDataConverter(result).sort(sortObjectsArrayByFiledDate('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error

        this.tasksMy = []
      })
    }
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  async cancelTask(taskId, comment) {
    try {
      await ClientModel.cancelTask(taskId, comment)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickCancelBtnByAction(actionType, id) {
    switch (actionType) {
      case 'merge':
        return this.cancelMergeBoxes(id)

      case 'split':
        return this.cancelSplitBoxes(id)

      case 'edit':
        return this.cancelEditBoxes(id)
    }
  }

  async onClickCancelBtn(id, taskId, type) {
    try {
      const task = await StorekeeperModel.getTaskById(taskId)

      if (task.status !== mapTaskStatusEmumToKey[TaskStatus.NEW]) {
        this.getTasksMy()

        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: true,
            title: t(TranslationKey['The warehouse has already taken the task to work']),
          }
        })

        this.onTriggerOpenModal('showWarningInfoModal')
      } else {
        runInAction(() => {
          this.toCancelData = {id, taskId, type}
        })

        this.onTriggerOpenModal('showConfirmWithCommentModal')
      }
    } catch (e) {
      console.log(e)
    }
  }

  async onClickCancelAfterConfirm(comment) {
    try {
      await this.onClickCancelBtnByAction(this.toCancelData.type, this.toCancelData.id)

      this.onTriggerOpenModal('showConfirmWithCommentModal')

      await this.cancelTask(this.toCancelData.taskId, {clientComment: comment})

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async cancelEditBoxes(id) {
    try {
      await BoxesModel.cancelEditBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async cancelMergeBoxes(id) {
    try {
      await BoxesModel.cancelMergeBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async cancelSplitBoxes(id) {
    try {
      await BoxesModel.cancelSplitBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }
}
