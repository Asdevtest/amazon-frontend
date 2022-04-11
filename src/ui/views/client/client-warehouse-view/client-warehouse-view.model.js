import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
import {TaskOperationType} from '@constants/task-operation-type'

import {BatchesModel} from '@models/batches-model'
import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientBoxesViewColumns} from '@components/table-columns/client/client-boxes-columns'
import {clientTasksViewColumns} from '@components/table-columns/client/client-tasks-columns'

import {clientWarehouseDataConverter, warehouseTasksDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate, sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {onSubmitPostImages} from '@utils/upload-files'

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
  'clientId',
  'items',
  'images',
  'destinationId',
  'storekeeperId',
  'logicsTariffId',
  'fbaShipment',
]

export class ClientWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxesMy = []
  tasksMy = []

  drawerOpen = false
  selectedBoxes = []
  curOpenedTask = {}
  toCancelData = {}
  currentStorekeeper = undefined
  storekeepersData = []
  destinations = []

  volumeWeightCoefficient = undefined

  showMergeBoxModal = false
  showTaskInfoModal = false
  showSendOwnProductModal = false
  showEditBoxModal = false
  showConfirmModal = false
  showRedistributeBoxModal = false
  showRedistributeBoxAddNewBoxModal = false
  showRedistributeBoxSuccessModal = false
  showRedistributeBoxFailModal = false
  showRequestToSendBatchModal = false
  showMergeBoxSuccessModal = false
  showEditBoxSuccessModal = false
  boxesDeliveryCosts = undefined
  showMergeBoxFailModal = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientBoxesViewColumns()

  rowTaskHandlers = {
    onClickTaskInfo: item => this.setCurrentOpenedTask(item),
    onClickCancelBtn: (id, taskId, type) => this.onClickCancelBtn(id, taskId, type),
  }

  taskColumnsModel = clientTasksViewColumns(this.rowTaskHandlers)

  get isMasterBoxSelected() {
    return this.selectedBoxes.some(boxId => {
      const findBox = this.boxesMy.find(box => box._id === boxId)
      return findBox.originalData?.amount && findBox.originalData?.amount > 1
    })
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_WAREHOUSE)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_WAREHOUSE]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientBoxesViewColumns().map(el => ({...el, hide: state.columns?.lookup[el?.field]?.hide}))
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

  onSelectionModel(model) {
    const boxes = this.boxesMy.filter(box => model.includes(box.id))
    const res = boxes.reduce((ac, el) => ac.concat(el._id), [])
    this.selectedBoxes = res
  }

  getCurrentData() {
    return toJS(this.boxesMy)
  }

  getCurrentTaskData() {
    return toJS(this.tasksMy)
  }

  onClickStorekeeperBtn(storekeeper) {
    this.selectedBoxes = []

    this.currentStorekeeper = storekeeper ? storekeeper : undefined

    this.getBoxesMy()

    this.getTasksMy()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      this.storekeepersData = result
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getStorekeepers()

      this.getBoxesMy()

      this.setRequestStatus(loadingStatuses.success)
      this.getTasksMy()
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

  onModalRedistributeBoxAddNewBox(value) {
    this.modalRedistributeBoxAddNewBox = value
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = e => {
    this.curPage = e
  }

  onTriggerCheckbox = boxId => {
    const boxById = this.boxesMy.find(box => box._id === boxId)
    if (
      (this.isMasterBoxSelected || (this.selectedBoxes.length && boxById.amount && boxById.amount > 1)) &&
      !this.selectedBoxes.includes(boxId)
    ) {
      return
    }
    const updatedselectedBoxes = this.selectedBoxes.includes(boxId)
      ? this.selectedBoxes.filter(_id => _id !== boxId)
      : this.selectedBoxes.concat(boxId)
    this.selectedBoxes = updatedselectedBoxes
  }

  async onRedistribute(id, updatedBoxes, type, isMasterBox, comment) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.selectedBoxes = []

      if (this.selectedBoxes.length === updatedBoxes.length && !isMasterBox) {
        this.onTriggerOpenModal('showRedistributeBoxFailModal')
      } else {
        const resBoxes = []

        for (let i = 0; i < updatedBoxes.length; i++) {
          this.uploadedFiles = []

          if (updatedBoxes[i].tmpShippingLabel.length) {
            await onSubmitPostImages.call(this, {images: updatedBoxes[i].tmpShippingLabel, type: 'uploadedFiles'})
          }

          const boxToPush = {
            boxBody: {
              shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : updatedBoxes[i].shippingLabel,
              destinationId: updatedBoxes[i].destinationId,
              logicsTariffId: updatedBoxes[i].logicsTariffId,
            },
            boxItems: [
              ...updatedBoxes[i].items.map(item => ({
                amount: item.amount,
                productId: item.product._id,
                orderId: item.order._id,
              })),
            ],
          }

          resBoxes.push(boxToPush)
        }

        const splitBoxesResult = await this.splitBoxes(id, resBoxes)

        await this.postTask({idsData: splitBoxesResult, idsBeforeData: [id], type, clientComment: comment})
        await this.getTasksMy()

        this.setRequestStatus(loadingStatuses.success)

        splitBoxesResult
          ? this.onTriggerOpenModal('showRedistributeBoxSuccessModal')
          : this.onTriggerOpenModal('showRedistributeBoxFailModal')
        this.onTriggerOpenModal('showRedistributeBoxModal')
        this.onModalRedistributeBoxAddNewBox(null)
      }
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async onClickEditBtn() {
    try {
      const result = await UserModel.getPlatformSettings()

      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showEditBoxModal')
    } catch (error) {
      console.log(error)
    }
  }

  onRemoveBoxFromSelected(boxId) {
    this.selectedBoxes = this.selectedBoxes.filter(id => id !== boxId)
  }

  async onEditBoxSubmit(id, boxData, sourceData) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.selectedBoxes = []

      this.uploadedFiles = []

      if (boxData.tmpShippingLabel.length) {
        await onSubmitPostImages.call(this, {images: boxData.tmpShippingLabel, type: 'uploadedFiles'})
      }

      const newItems = boxData.items.map(el => ({
        ...getObjectFilteredByKeyArrayBlackList(el, ['order', 'product']),
        amount: el.amount,
        orderId: el.order._id,
        productId: el.product._id,
      }))

      const requestBox = getObjectFilteredByKeyArrayWhiteList(
        {
          ...boxData,
          isShippingLabelAttachedByStorekeeper:
            sourceData.shippingLabel !== boxData.shippingLabel ? false : boxData.isShippingLabelAttachedByStorekeeper,
          items: newItems,
          shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : boxData.shippingLabel,
        },
        updateBoxWhiteList,
      )

      const editBoxesResult = await this.editBox({id, data: requestBox})

      await this.postTask({
        idsData: [editBoxesResult.guid],
        idsBeforeData: [id],
        type: TaskOperationType.EDIT,
        clientComment: boxData.clientComment,
      })

      // await this.getBoxesMy()
      this.loadData()
      this.onTriggerOpenModal('showEditBoxModal')

      this.setRequestStatus(loadingStatuses.success)

      // this.loadData()

      this.onTriggerOpenModal('showEditBoxSuccessModal')

      // await this.getTasksMy()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async onClickMerge(boxBody, comment) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const selectedIds = this.selectedBoxes
      this.selectedBoxes = []

      this.uploadedFiles = []

      if (boxBody.tmpShippingLabel.length) {
        await onSubmitPostImages.call(this, {images: boxBody.tmpShippingLabel, type: 'uploadedFiles'})
      }

      const newBoxBody = getObjectFilteredByKeyArrayBlackList(
        {...boxBody, shippingLabel: this.uploadedFiles.length ? this.uploadedFiles[0] : boxBody.shippingLabel},
        ['tmpShippingLabel', 'storekeeperId'],
      )

      const mergeBoxesResult = await this.mergeBoxes(selectedIds, newBoxBody)

      mergeBoxesResult
        ? this.onTriggerOpenModal('showMergeBoxSuccessModal')
        : this.onTriggerOpenModal('showMergeBoxFailModal')

      this.onTriggerOpenModal('showMergeBoxModal')

      await this.postTask({
        idsData: [mergeBoxesResult.guid],
        idsBeforeData: [...selectedIds],
        type: operationTypes.MERGE,
        clientComment: comment,
      })

      this.setRequestStatus(loadingStatuses.success)

      this.tmpClientComment = ''
      await this.getTasksMy()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async postTask({idsData, idsBeforeData, type, clientComment}) {
    try {
      await ClientModel.createTask({
        taskId: 0,
        boxes: [...idsData],
        boxesBefore: [...idsBeforeData],
        operationType: type,
        clientComment: clientComment || '',
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getTasksMy() {
    try {
      const result = await ClientModel.getTasks(this.currentStorekeeper && {storekeeperId: this.currentStorekeeper._id})

      runInAction(() => {
        this.tasksMy = warehouseTasksDataConverter(result).sort(sortObjectsArrayByFiledDate('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error

      this.tasksMy = []
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async editBox(box) {
    try {
      const result = await BoxesModel.editBox(box)

      return result
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async mergeBoxes(ids, boxBody) {
    try {
      const result = await BoxesModel.mergeBoxes(ids, boxBody)

      await this.getBoxesMy()
      return result
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async splitBoxes(id, data) {
    try {
      const result = await BoxesModel.splitBoxes(id, data)

      await this.getBoxesMy()
      return result
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async updateBox(id, data) {
    try {
      await BoxesModel.updateBox(id, data)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxesForCurClient(
        this.currentStorekeeper && {storekeeperId: this.currentStorekeeper._id},
      )

      runInAction(() => {
        this.boxesMy = clientWarehouseDataConverter(result).sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error

      if (error.body.message === 'Коробки не найдены.') {
        runInAction(() => {
          this.boxesMy = []
        })
      }
    }
  }

  async cancelTask(taskId) {
    try {
      await ClientModel.cancelTask(taskId)

      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.error = error
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

  onClickCancelBtn(id, taskId, type) {
    this.toCancelData = {id, taskId, type}

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onClickCancelAfterConfirm() {
    try {
      await this.onClickCancelBtnByAction(this.toCancelData.type, this.toCancelData.id)

      this.onTriggerOpenModal('showConfirmModal')

      await this.cancelTask(this.toCancelData.taskId)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelEditBoxes(id) {
    try {
      await BoxesModel.cancelEditBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelMergeBoxes(id) {
    try {
      await BoxesModel.cancelMergeBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelSplitBoxes(id) {
    try {
      await BoxesModel.cancelSplitBoxes(id)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  triggerRequestToSendBatchModal() {
    this.showRequestToSendBatchModal = !this.showRequestToSendBatchModal
  }

  async onClickRequestToSendBatch() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const boxesDeliveryCosts = await BatchesModel.calculateBoxDeliveryCostsInBatch(toJS(this.selectedBoxes))
      runInAction(() => {
        this.boxesDeliveryCosts = boxesDeliveryCosts
      })
      this.setRequestStatus(loadingStatuses.success)
      this.triggerRequestToSendBatchModal()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickSendBoxesToBatch() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const boxesSendToBatch = this.selectedBoxes.filter(
        selectedBoxId => this.boxesDeliveryCosts.find(priceObj => priceObj.guid === selectedBoxId)?.deliveryCost,
      )
      await BatchesModel.requestSendBoxToBatch(boxesSendToBatch)
      runInAction(() => {
        this.showRequestToSendBatchModal = false
        this.selectedBoxes = []
      })
      this.setRequestStatus(loadingStatuses.success)
      this.updateUserInfo()
      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickMergeBtn() {
    try {
      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showMergeBoxModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSplitBtn() {
    try {
      const destinations = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showRedistributeBoxModal')
    } catch (error) {
      console.log(error)
    }
  }
}
