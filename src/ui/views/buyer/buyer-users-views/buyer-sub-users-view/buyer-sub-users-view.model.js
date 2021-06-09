import {makeAutoObservable} from 'mobx'

export class BuyerSubUsersViewModel {
  history = undefined
  requestStatus = undefined

  drawerOpen = false
  selected = undefined
  showAddSubUserModal = false
  showEditSubUserModal = false
  showPermissionsModal = false
  rowsPerPage = 5
  curPage = 1

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
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
