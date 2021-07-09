import {makeAutoObservable} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

export class BuyerSubUsersViewModel {
  history = undefined
  requestStatus = undefined

  drawerOpen = false
  selected = undefined
  showAddSubUserModal = false
  showEditSubUserModal = false
  showPermissionsModal = false
  rowsPerPage = 15
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
      console.log(error)
    }
  }

  onTriggerShowEditSubUserModal() {
    this.showEditSubUserModal = !this.showEditSubUserModal
  }

  onTriggerShowPermissionsModal() {
    this.showPermissionsModal = !this.showPermissionsModal
  }

  onTriggerAddSubUserModal = () => {
    this.showAddSubUserModal = !this.showAddSubUserModal
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangePage(e, value) {
    this.curPage = value
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }
}
