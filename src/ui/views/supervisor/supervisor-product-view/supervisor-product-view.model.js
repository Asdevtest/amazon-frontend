import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ResearcherModel} from '@models/researcher-model'
import {SupplierModel} from '@models/supplier-model'

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  product = undefined
  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  activeChip = null

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      this.product = location.state.product
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier.id === supplier.id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
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

  async onClickSupplierButtons(actionType) {
    if (actionType === 'add') {
      runInAction(() => {
        this.selectedSupplier = undefined
      })
      this.onTriggerAddOrEditSupplierModal()
    } else if (actionType === 'edit') {
      this.onTriggerAddOrEditSupplierModal()
    } else {
      try {
        await SupplierModel.removeSupplier(this.selectedSupplier.id)
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } catch (error) {
        console.log(error)
      }
    }
  }

  onTriggerAddSupplierModal() {
    this.showAddSupplierModal = !this.showAddSupplierModal
  }

  onTriggerEditSupplierModal() {
    this.showEditSupplierModal = !this.showEditSupplierModal
  }

  async onClickParseAmazonBtn(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const parseResult = await ResearcherModel.parseAmazon(product.id)
      console.log(parseResult)
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickParseSellCenteralBtn(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const parseResult = await ResearcherModel.parseParseSellerCentral(product.id)
      console.log(parseResult)
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onClickSaveSupplierBtn() {}

  onTriggerAddOrEditSupplierModal() {
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
