import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {TaskOperationType} from '@constants/task-operation-type'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'

import {sortObjectsArrayByFiledDate, sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'

export class ClientWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxesMy = []
  tasksMy = []

  drawerOpen = false
  curPage = 1
  rowsPerPage = 15
  selectedBoxes = []
  curOpenedTask = {}

  tmpClientComment = ''

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

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBoxesMy()
      await this.getTasksMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  setTmpClientComment(e) {
    this.tmpClientComment = e.target.value
  }

  onResetselectedBoxes() {
    this.selectedBoxes = []
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

  onChangeCurPage = (e, value) => {
    this.curPage = value
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPage = 1
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
    if (this.selectedBoxes.length === updatedBoxes.length && !isMasterBox) {
      this.onTriggerOpenModal('showRedistributeBoxFailModal')
    } else {
      const boxes = updatedBoxes.map(el =>
        el.items.map(item => ({...item, product: item.product._id, order: item.order._id})),
      )
      const splitBoxesResult = await this.splitBoxes(id, boxes)

      await this.postTask({idsData: splitBoxesResult, idsBeforeData: [id], type, clientComment: comment})
      await this.getTasksMy()

      this.onTriggerOpenModal('showRedistributeBoxSuccessModal')
      this.onTriggerOpenModal('showRedistributeBoxModal')
      this.onModalRedistributeBoxAddNewBox(null)
      this.onResetselectedBoxes()
    }
  }

  async onEditBoxSubmit(id, boxData) {
    try {
      const requestBox = getObjectFilteredByKeyArrayBlackList(
        {
          ...boxData,
          items: [
            {
              ...boxData.items[0],
              amount: boxData.items[0].amount,
              order: boxData.items[0].order._id,
              product: boxData.items[0].product._id,
            },
          ],
        },
        ['_id', 'id', 'status', 'createdBy', 'lastModifiedBy', 'clientComment', 'createdAt'],
      )

      console.log('requestBox', requestBox)
      const editBoxesResult = await this.editBox({id, data: requestBox})

      await this.postTask({
        idsData: [editBoxesResult.guid],
        idsBeforeData: [id],
        type: TaskOperationType.EDIT,
        clientComment: boxData.clientComment,
      })
      await this.getTasksMy()
      this.onResetselectedBoxes()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickMerge(type, comment) {
    const mergeBoxesResult = await this.mergeBoxes(this.selectedBoxes)

    await this.postTask({
      idsData: [mergeBoxesResult.guid],
      idsBeforeData: [...this.selectedBoxes],
      type,
      clientComment: comment,
    })
    await this.getTasksMy()

    this.onTriggerOpenModal('showMergeBoxModal')

    this.onResetselectedBoxes()

    this.tmpClientComment = ''
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
        this.tasksMy = result.sort(sortObjectsArrayByFiledDate('createDate'))
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
        this.boxesMy = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  //  для тестов
  async removeBox(id) {
    try {
      await BoxesModel.removeBox(id)
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
