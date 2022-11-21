import {makeAutoObservable} from 'mobx'

export class AdminSettingsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showNoSuplierErrorModal = false
  showConfirmModal = false

  constructor({history}) {
    this.history = history

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onClickTechnicalBtn() {
    this.history.push('/admin/settings/technical-works')
  }
}
