import {makeAutoObservable, runInAction} from 'mobx'

import {BuyerModel} from '@models/buyer-model'

export class BuyerWarehouseViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxes = []

  drawerOpen = false
  paginationPage = 1
  rowsPerPage = 5
  selectedBoxes = ['2096c_box']
  modalSendOwnProduct = false
  modalEditBox = false
  modalRedistributeBox = false
  modalRedistributeBoxAddNewBox = null
  modalRedistributeBoxSuccess = false

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

  onChangePagination = (e, value) => {
    this.paginationPage = value
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

  onClickCloseModal(modalState) {
    this[modalState] = false
  }

  onClickOpenModal(modalState) {
    this[modalState] = true
  }

  async getBoxes() {
    try {
      const result = await BuyerModel.getBoxes()
      console.log(result)
      runInAction(() => {
        this.boxes = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
