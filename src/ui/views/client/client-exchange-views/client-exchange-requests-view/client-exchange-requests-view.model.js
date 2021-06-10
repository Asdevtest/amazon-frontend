import {makeAutoObservable} from 'mobx'

export class ClientExchangeRequestsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  paginationPage = 1
  rowsPerPage = 5
  modalNewRequest = false
  modalEditRequest = false
  modalCloseRequest = false
  selectedIndex = null
  selectedRequests = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onSelectRequest(index) {
    const newSelectedRequests = [...this.selectedRequests]
    const findRequestIndex = this.selectedRequests.indexOf(index)
    if (findRequestIndex !== -1) {
      newSelectedRequests.splice(findRequestIndex, 1)
    } else {
      newSelectedRequests.push(index)
    }
    this.selectedRequests = newSelectedRequests
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePagination(e, value) {
    this.paginationPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.paginationPage = 1
  }

  onClickCloseModal(modalState) {
    this[modalState] = false
  }
  onClickOpenModal(modalState) {
    this[modalState] = true
  }
}
