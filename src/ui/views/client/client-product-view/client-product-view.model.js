import {action, makeAutoObservable} from 'mobx'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {getNewObjectWithDefaultValue} from '@utils/object'

const formFieldsDefault = {
  checkednotes: '',
  amazon: 0,
  bsr: 0,
  createdat: '',
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
        supplier: location.state.product.suppliers.map(supplierItem =>
          typeof supplierItem === 'string' ? supplierItem : supplierItem._id,
        ),
      }
      this.product = product
      this.suppliers = location.state.suppliers ? location.state.suppliers : location.state.product.suppliers
      updateProductAutoCalculatedFields.call(this)
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeProductFields = fieldsName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldsName]: ''}

      this.product[fieldsName] = e.target.value
      updateProductAutoCalculatedFields.call(this)
    })

  onChangeProduct(e, value) {
    this.product = value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'cancel':
        this.history.push('/client/inventory')
        break
    }
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
}
