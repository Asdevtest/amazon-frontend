import {makeAutoObservable, runInAction} from 'mobx'

import {BuyerModel} from '@models/buyer-model'

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

  async getBoxesMy() {
    try {
      const result = await BuyerModel.getBoxesMy()
      console.log(result)
      runInAction(() => {
        this.boxesMy = result
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }
}
