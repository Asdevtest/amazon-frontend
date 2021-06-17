import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ClientModel} from '@models/client-model'

export class ClientWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  curPage = 1
  rowsPerPage = 5
  boxes = []
  selectedBoxes = ['2096c_box']
  showSendOwnProductModal = false
  showEditBoxModal = false
  showRedistributeBoxModal = false
  modalRedistributeBoxAddNewBox = undefined
  showRedistributeBoxSuccessModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getBoxes()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  getBoxes() {
    try {
      const result = ClientModel.gegetBoxestBox()
      runInAction(() => {
        this.boxes = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerCheckbox(boxId) {
    const {selectedBoxes} = this.state

    const updatedselectedBoxes = selectedBoxes.includes(boxId)
      ? selectedBoxes.filter(id => id !== boxId)
      : selectedBoxes.concat(boxId)
    this.selectedBoxes = updatedselectedBoxes
  }

  onRedistribute(updatedBoxes) {
    this.boxes = updatedBoxes
    this.selectedBoxes = []
  }

  onClickMerge() {
    alert('Box merging')
  }

  onTriggerModal(modalKey) {
    this[modalKey] = !this.modalKey
  }

  onRedistributeBoxAddNewBox(value) {
    this.modalRedistributeBoxAddNewBox = value
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
