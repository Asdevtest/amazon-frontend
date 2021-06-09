import {makeAutoObservable} from 'mobx'

export class BuyerBatchesViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  selectedBatchIndex = undefined
  showEditBoxesModal = false
  rowsPerPage = 5
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickTableRow(batch, index) {
    if (this.selectedBatchIndex === index) {
      this.selectedBatchIndex = undefined
    } else {
      this.selectedBatchIndex = index
    }
  }

  onDoubleClickTableRow(batch, index) {
    if (this.selectedBatchIndex === index) {
      this.selectedBatchIndex = undefined
    } else {
      this.selectedBatchIndex = index
      this.onTriggerEditBoxesModal()
    }
  }

  onTriggerEditBoxesModal() {
    this.showEditBoxesModal = !this.showEditBoxesModal
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
