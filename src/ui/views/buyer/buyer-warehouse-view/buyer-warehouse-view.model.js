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
  selectedBoxes = ['2096c_box']
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
      ? this.selectedBoxes.filter(id => id !== boxId)
      : this.selectedBoxes.concat(boxId)
    this.selectedBoxes = updatedselectedBoxes
  }

  onRedistribute(updatedBoxes) {
    this.boxes = updatedBoxes
    this.selectedBoxes = []
  }

  onClickMerge() {
    alert('Box merging')
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

  async getBoxesMy() {
    try {
      const result = await BoxesModel.getBoxes()
      runInAction(() => {
        this.boxesMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
