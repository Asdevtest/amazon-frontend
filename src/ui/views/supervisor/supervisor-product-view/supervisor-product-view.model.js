import {action, makeAutoObservable} from 'mobx'

import {SUPERVISOR_INITIAL_SUPPLIERS} from '@constants/mocks'

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  product = undefined
  drawerOpen = false
  suppliers = SUPERVISOR_INITIAL_SUPPLIERS
  selectedSupplier = 0
  showAddSupplierModal = false
  showEditSupplierModal = false
  activeChip = null

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.product = location.state.product
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSelectedSupplier(e, value) {
    this.selectedSupplier = value
  }

  onChangeSuppliers(e, value) {
    this.suppliers = value
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.product[fieldName] = e.target.value
    })

  onChangeActiveChip(e, value) {
    this.activeChip = value
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onClickSupplierButtons(actionType) {
    if (actionType === 'add') {
      this.onTriggerAddSupplierModal()
    } else if (actionType === 'edit') {
      this.onTriggerEditSupplierModal()
    } else {
      this.suppliers = this.suppliers.filter((supplier, index) => this.state.selectedSupplier !== index)
    }
  }

  onTriggerAddSupplierModal() {
    this.showAddSupplierModal = !this.showAddSupplierModal
  }

  onTriggerEditSupplierModal() {
    this.showEditSupplierModal = !this.showEditSupplierModal
  }
}
