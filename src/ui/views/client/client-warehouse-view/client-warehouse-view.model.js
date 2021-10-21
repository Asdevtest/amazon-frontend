import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {operationTypes} from '@constants/operation-types'
import {TaskOperationType} from '@constants/task-operation-type'
import {warehouses} from '@constants/warehouses'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {SettingsModel} from '@models/settings-model'

import {clientBoxesViewColumns} from '@components/table-columns/client/client-boxes-columns'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'

const updateBoxBlackList = [
  '_id',
  'id',
  'status',
  'createdBy',
  'lastModifiedBy',
  'clientComment',
  'createdAt',
  'tmpBarCode',
  'tmpAsin',
  'tmpQty',
  'tmpMaterial',
  'tmpAmazonPrice',
  'tmpTrackingNumberChina',
  'tmpFinalWeight',
  'tmpGrossWeight',
  'tmpWarehouses',
  'weightFinalAccountingKgWarehouse',
  'buyerComment',
  'shipmentPlanId',
  'isDraft',
  'scheduledDispatchDate',
  'factDispatchDate',
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

  showMergeBoxModal = false
  showTaskInfoModal = false
  showSendOwnProductModal = false
  showEditBoxModal = false
  showRedistributeBoxModal = false
  showRedistributeBoxAddNewBoxModal = false
  showRedistributeBoxSuccessModal = false
  showRedistributeBoxFailModal = false
  showRequestToSendBatchModal = false
  boxesDeliveryCosts = undefined

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'standart'
  columnsModel = clientBoxesViewColumns()

  get isMasterBoxSelected() {
    return this.selectedBoxes.some(boxId => {
      const findBox = this.boxesMy.find(box => box._id === boxId)
      return findBox?.amount && findBox?.amount > 1
    })
  }

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientBoxesViewColumns().map(el => ({...el, hide: state.columns?.lookup[el?.field]?.hide}))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
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

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBoxesMy()

      this.setRequestStatus(loadingStatuses.success)
      await this.getTasksMy()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setCurrentOpenedTask(item) {
    this.curOpenedTask = item
    this.onTriggerOpenModal('showTaskInfoModal')
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

      if (this.selectedBoxes.length === updatedBoxes.length && !isMasterBox) {
        this.onTriggerOpenModal('showRedistributeBoxFailModal')
      } else {
        const boxes = updatedBoxes.map(el =>
          el.items.map(item => ({amount: item.amount, productId: item.product._id, orderId: item.order._id})),
        )
        const splitBoxesResult = await this.splitBoxes(id, boxes)

        await this.postTask({idsData: splitBoxesResult, idsBeforeData: [id], type, clientComment: comment})
        await this.getTasksMy()

        this.setRequestStatus(loadingStatuses.success)

        this.onTriggerOpenModal('showRedistributeBoxSuccessModal')
        this.onTriggerOpenModal('showRedistributeBoxModal')
        this.onModalRedistributeBoxAddNewBox(null)
      }
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async onEditBoxSubmit(id, boxData) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const requestBox = getObjectFilteredByKeyArrayBlackList(
        {
          ...boxData,
          items: [
            {
              ...getObjectFilteredByKeyArrayBlackList(boxData.items[0], ['order', 'product']),
              amount: boxData.items[0].amount,
              orderId: boxData.items[0].order._id,
              productId: boxData.items[0].product._id,
            },
          ],
        },
        updateBoxBlackList,
      )

      const editBoxesResult = await this.editBox({id, data: requestBox})

      await this.postTask({
        idsData: [editBoxesResult.guid],
        idsBeforeData: [id],
        type: TaskOperationType.EDIT,
        clientComment: boxData.clientComment,
      })

      this.setRequestStatus(loadingStatuses.success)
      await this.getTasksMy()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async onClickMerge(comment) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const mergeBoxesResult = await this.mergeBoxes(this.selectedBoxes)

      await this.postTask({
        idsData: [mergeBoxesResult.guid],
        idsBeforeData: [...this.selectedBoxes],
        type: operationTypes.MERGE,
        clientComment: comment,
      })
      await this.getTasksMy()
      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerOpenModal('showMergeBoxModal')
      this.tmpClientComment = ''
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
      const result = await ClientModel.getTasks()

      runInAction(() => {
        this.tasksMy = result.sort(sortObjectsArrayByFiledDate('createdAt'))
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async editBox(box) {
    try {
      const result = await BoxesModel.editBox(box)

      await this.getBoxesMy()
      this.onTriggerOpenModal('showEditBoxModal')
      return result
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async mergeBoxes(boxes) {
    try {
      const result = await BoxesModel.mergeBoxes(boxes)

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
      const result = await BoxesModel.getBoxesForCurClient()

      runInAction(() => {
        this.boxesMy = result.sort(sortObjectsArrayByFiledDate('createdAt')).map(item => ({
          ...item,
          id: item._id,
          tmpBarCode: item.items[0].product.barCode,
          tmpAsin: item.items[0].product.id,
          tmpQty: item.items[0].amount,
          tmpMaterial: item.items[0].product.material,
          tmpAmazonPrice: item.items[0].product.amazon,
          tmpTrackingNumberChina: item.items[0].order.trackingNumberChina,
          tmpFinalWeight: Math.max(
            parseFloat(item.volumeWeightKgWarehouse ? item.volumeWeightKgWarehouse : item.volumeWeightKgSupplier) || 0,
            parseFloat(
              item.weightFinalAccountingKgWarehouse
                ? item.weightFinalAccountingKgWarehouse
                : item.weightFinalAccountingKgSupplier,
            ) || 0,
          ),
          tmpGrossWeight: item.weighGrossKgWarehouse ? item.weighGrossKgWarehouse : item.weighGrossKgSupplier,
          tmpWarehouses: warehouses[item.warehouse],
        }))
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

  async cancelEditBoxes(id, taskId) {
    try {
      await BoxesModel.cancelEditBoxes(id)

      await this.cancelTask(taskId)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelMergeBoxes(id, taskId) {
    try {
      await BoxesModel.cancelMergeBoxes(id)

      await this.cancelTask(taskId)

      await this.getBoxesMy()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async cancelSplitBoxes(id, taskId) {
    try {
      await BoxesModel.cancelSplitBoxes(id)

      await this.cancelTask(taskId)

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
      const boxesDeliveryCosts = await BoxesModel.calculateBoxDeliveryCostsInBatch(toJS(this.selectedBoxes))
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
      await BoxesModel.requestSendBoxToBatch(boxesSendToBatch)
      runInAction(() => {
        this.showRequestToSendBatchModal = false
        this.selectedBoxes = []
      })
      this.setRequestStatus(loadingStatuses.success)
      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }
}
