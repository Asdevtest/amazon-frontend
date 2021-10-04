import {makeAutoObservable} from 'mobx'

import {getNewObjectWithDefaultValue} from '@utils/object'

const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdAt: '',
  createdBy: {},
  delivery: 0,
  dirdecision: 0,
  express: false,
  fba: false,
  fbafee: 0,
  icomment: '',
  id: '',
  images: [],
  lamazon: '',
  material: '',
  reffee: 15,
  status: 0,
  supplier: [],
  updateDate: '',
  _id: '',
  buyerscomment: '',
}

export class AdminProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  product = undefined
  suppliers = []
  curUpdateProductData = {}
  confirmMessage = ''

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showNoSuplierErrorModal = false
  showConfirmModal = false

  readyImages = []
  progressValue = 0
  showProgress = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      const product = {
        ...location.state.product,
        suppliers: location.state.product.suppliers.map(supplierItem => supplierItem._id),
      }
      this.product = product
      this.suppliers = location.state.product.suppliers
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  onChangeProductFields() {}

  onChangeProduct(e, value) {
    this.product = value
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
