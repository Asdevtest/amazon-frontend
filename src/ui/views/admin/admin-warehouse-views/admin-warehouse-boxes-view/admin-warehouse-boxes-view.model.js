import {makeAutoObservable, runInAction} from 'mobx'

import {BoxesModel} from '@models/boxes-model'

export class AdminWarehouseBoxesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  boxes = []

  drawerOpen = false
  curPage = 1
  rowsPerPage = 15
  selectedBoxes = ['2096c_box']
  modalSendOwnProduct = false
  modalEditBox = false
  showRedistributeBoxModal = false
  showRedistributeBoxAddNewBoxModal = null
  showRedistributeBoxSuccessModal = false

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onShowModalRedistributeBoxAddNewBox(value) {
    this.showRedistributeBoxAddNewBoxModal = value
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage = (e, value) => {
    this.curPage = value
  }

  onChangeRowsPerPage = e => {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
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

  onTriggerModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async getBoxes() {
    try {
      const result = await BoxesModel.getBoxes() // такого метода пока нет
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
