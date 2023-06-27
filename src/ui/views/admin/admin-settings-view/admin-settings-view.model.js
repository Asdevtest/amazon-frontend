import { makeAutoObservable, runInAction } from 'mobx'

export class AdminSettingsViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showNoSuplierErrorModal = false
  showConfirmModal = false

  constructor({ history }) {
    runInAction(() => {
      this.history = history
    })

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onClickTechnicalBtn() {
    this.history.push('/admin/settings/technical-works')
  }
}
