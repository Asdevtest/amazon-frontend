import {action, makeAutoObservable} from 'mobx'

import {getNewObjectWithDefaultValue} from '@utils/object'

const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdat: '',
  createdby: {},
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

export class ClientProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  product = undefined
  suppliers = []
  curUpdateProductData = {}
  warningModalTitle = ''

  drawerOpen = false

  showWarningModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickOkBtn: () => this.onSaveProductData(),
  }

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
        supplier: location.state.product.supplier.map(supplierItem =>
          typeof supplierItem === 'string' ? supplierItem : supplierItem._id,
        ),
      }
      this.product = product
      this.suppliers = location.state.suppliers ? location.state.suppliers : location.state.product.supplier
      this.updateAutoCalculatedFields()
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeProductFields = fieldsName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldsName]: ''}

      this.product[fieldsName] = e.target.value
      this.updateAutoCalculatedFields()
    })

  onChangeProduct(e, value) {
    this.product = value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  updateAutoCalculatedFields() {
    this.product.totalFba = (parseFloat(this.product.fbafee) || 0) + (parseFloat(this.product.amazon) || 0) * 0.15
    this.product.maxDelivery = this.product.express ? (this.product.weight || 0) * 7 : (this.product.weight || 0) * 5

    this.product.minpurchase =
      (parseFloat(this.product.amazon) || 0) -
      (parseFloat(this.product.totalFba) || 0) -
      0.4 * ((parseFloat(this.product.amazon) || 0) - (parseFloat(this.product.totalFba) || 0)) -
      (parseFloat(this.product.maxDelivery) || 0)
    if (this.product.currentSupplier && this.product.currentSupplier._id) {
      this.product.reffee = (parseFloat(this.product.amazon) || 0) * 0.15
      if (this.product.fbafee) {
        this.product.profit = (
          (parseFloat(this.product.amazon) || 0).toFixed(2) -
            (this.product.reffee || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) -
            (parseFloat(this.product.fbafee) || 0).toFixed(2) || 0
        ).toFixed(4)
      } else {
        this.product.profit = (
          (parseFloat(this.product.amazon) || 0).toFixed(2) -
            (this.product.reffee || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.delivery) || 0).toFixed(2) -
            (parseFloat(this.product.currentSupplier.price) || 0).toFixed(2) || 0
        ).toFixed(4)
      }
      this.product.margin =
        (this.product.profit /
          ((parseFloat(this.product.currentSupplier.price) || 0) +
            (parseFloat(this.product.currentSupplier.delivery) || 0))) *
        100
    } else {
      this.product.profit = 0
      this.product.margin = 0
    }
  }
}
