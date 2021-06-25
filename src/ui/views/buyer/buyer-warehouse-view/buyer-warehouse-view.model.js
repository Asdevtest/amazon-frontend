import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {BoxesModel} from '@models/boxes-model'

export class BuyerWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxesMy = []

  drawerOpen = false
  curPage = 1
  rowsPerPage = 5
  selectedBoxes = []

  showSendOwnProductModal = false
  showEditBoxModal = false
  showRedistributeBoxModal = false
  showRedistributeBoxAddNewBoxModal = false
  showRedistributeBoxSuccessModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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
    const updatedselectedBoxes = this.selectedBoxes.includes(boxId)
      ? this.selectedBoxes.filter(_id => _id !== boxId)
      : this.selectedBoxes.concat(boxId)
    this.selectedBoxes = updatedselectedBoxes
  }

  onRedistribute(id, updatedBoxes) {
    const boxes = updatedBoxes.map(el => el.items)
    this.splitBoxes(id, boxes)
    this.selectedBoxes = []
  }

  onEditBoxSubmit(id, data) {
    this.updateBox(id, data)
  }

  onClickMerge() {
    this.mergeBoxes(this.selectedBoxes)
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getBoxesMy()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async mergeBoxes(boxes) {
    try {
      const result = await BoxesModel.mergeBoxes(boxes)

      console.log(result, 'RESULT')

      await this.getBoxesMy()

      this.selectedBoxes = []
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async splitBoxes(id, data) {
    try {
      await BoxesModel.splitBoxes(id, data)

      await this.getBoxesMy()
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

  async cancelMergeBoxes() {
    try {
      await BoxesModel.cancelMergeBoxes()
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxes()
      console.log(result)
      runInAction(() => {
        this.boxesMy = []
      })
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

  //  для тестов
  async createBox() {
    try {
      await BoxesModel.createBox({
        lengthCm: 10,
        widthCm: 10,
        heightCm: 10,
        weighGrossKg: 15.5,
        volumeWeightKg: 25.5,
        weightFinalAccountingKg: 25.5,
        lengthCmSupplier: 25,
        widthCmSupplier: 35,
        heightCmSupplier: 45,
        weighGrossKgSupplier: 45,
        volumeWeightKgSupplier: 15,
        weightFinalAccountingKgSupplier: 25,
        warehouse: 25,
        deliveryMethod: 25,
        scheduledDispatchDate: '2021-06-24',
        factDispatchDate: '2021-06-24',
        isDraft: false,
        items: [
          {
            product: '607dceac3551e3fa7e7fbb69',
            amount: '39',
            order: '607dceac3551e3fa7e7fbb69',
          },
        ],
        clientId: '607dceac3551e3fa7e7fbb69',
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
