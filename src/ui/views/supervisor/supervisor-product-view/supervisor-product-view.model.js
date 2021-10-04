import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {ProductModel} from '@models/product-model'
import {SupervisorModel} from '@models/supervisor-model'
import {SupervisorUpdateProductContract} from '@models/supervisor-model/supervisor-model.contracts'
import {SupplierModel} from '@models/supplier-model'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
} from '@utils/object'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const fieldsOfProductAllowedToUpdate = [
  'checkednotes',
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'fbafee',
  'reffee',
  'delivery',
  'icomment',
  'fba',
  'profit',
  'margin',
  'images',
  'width',
  'height',
  'length',
  'amazonTitle',
  'amazonDetail',
  'amazonDescription',
  'category',
  'weight',
  'minpurchase',
  'fbaamount',
  'strategyStatus',
]

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
  updateDate: '',
  _id: '',
  fbaamount: 0,
}

const confirmMessageByProductStatus = {
  30: 'Отправить на поиск поставщика?',
  20: 'Товар не подходит?',
  70: 'Опубликовать на бирже?',
  80: 'Поставщик не найден?',
}

const confirmMessageWithoutStatus = 'Сохранить без статуса?'

const warningModalTitleVariants = {
  NO_SUPPLIER: 'Нельзя выбрать без поставщика.',
  CHOOSE_STATUS: 'Нужно выбрать статус',
}

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  product = undefined

  suppliers = []
  curUpdateProductData = {}
  confirmMessage = ''
  warningModalTitle = ''

  drawerOpen = false
  selectedSupplier = undefined
  showWarningModal = false
  showConfirmModal = false

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
      console.log(product)
      console.log(this.suppliers)
    }
    makeAutoObservable(this, undefined, {autoBind: true})
    this.updateAutoCalculatedFields()
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldName]: ''}

      if (['checkednotes'].includes(fieldName)) {
        this.product[fieldName] = e.target.value
      } else {
        if (!checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)) {
          return
        }

        if (['bsr', 'fbaamount'].includes(fieldName)) {
          this.product[fieldName] = parseInt(e.target.value)
        } else {
          this.product[fieldName] = e.target.value
        }
      }

      this.updateAutoCalculatedFields()
    })

  onClickSetProductStatusBtn(statusKey) {
    if (statusKey === ProductStatus.COMPLETE_SUCCESS && !this.product.currentSupplier) {
      this.warningModalTitle = warningModalTitleVariants.NO_SUPPLIER

      this.onTriggerOpenModal('showWarningModal')
    } else {
      this.product.status = ProductStatusByKey[statusKey]
    }
  }

  async handleProductActionButtons(actionType, withoutStatus) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(withoutStatus)

        break
      case 'cancel':
        this.history.push('/supervisor/products')
        break
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus) {
    try {
      this.curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.product,
        fieldsOfProductAllowedToUpdate,
        false,
        (key, value) => {
          switch (key) {
            case 'checkednotes':
              return value || ''
            case 'bsr':
              return value && parseInt(value)
            case 'amazon':
              return value && parseFloat(value)
            case 'weight':
              return value && parseFloat(value)
            case 'length':
              return value && parseFloat(value)
            case 'width':
              return value && parseFloat(value)
            case 'height':
              return value && parseFloat(value)
            case 'fbaamount':
              return value && parseFloat(value)
            case 'reffee':
              return value && parseFloat(value)
            case 'fbafee':
              return value && parseFloat(value)
            case 'profit':
              return value && parseFloat(value)
            default:
              return value
          }
        },
      )
      if (withoutStatus) {
        this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(this.curUpdateProductData, ['status'])
      }

      await transformAndValidate(SupervisorUpdateProductContract, this.curUpdateProductData)

      this.confirmMessage = withoutStatus
        ? confirmMessageWithoutStatus
        : confirmMessageByProductStatus[this.curUpdateProductData.status]

      if (this.confirmMessage) {
        this.onTriggerOpenModal('showConfirmModal')
      } else {
        this.warningModalTitle = warningModalTitleVariants.CHOOSE_STATUS
        this.onTriggerOpenModal('showWarningModal')
      }
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({errorProperty, constraint}) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
          })
        })
      } else {
        console.warn('error ', error)
        runInAction(() => {
          this.error = error
        })
      }
    }
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      await SupervisorModel.updateProduct(this.product._id, this.curUpdateProductData)
      this.setActionStatus(loadingStatuses.success)

      this.history.replace('/supervisor/product', {product: toJS(this.product), suppliers: toJS(this.suppliers)})

      this.history.push('/supervisor/products')
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
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
      this.onRemoveSupplier()
    }
  }

  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      await ProductModel.removeSuppliersFromProduct(this.product._id, [this.selectedSupplier._id])
      this.setActionStatus(loadingStatuses.success)
      const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === this.selectedSupplier._id)
      const findProductSupplierIndex = this.product.suppliers.findIndex(
        supplierItem => supplierItem._id === this.selectedSupplier._id,
      )
      runInAction(() => {
        this.suppliers.splice(findSupplierIndex, 1)
        this.product.suppliers.splice(findProductSupplierIndex, 1)
        this.selectedSupplier = undefined
        this.onSaveProductData()
      })
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  onTriggerAddOrEditSupplierModal() {
    if (this.showAddOrEditSupplierModal) {
      this.selectedSupplier = undefined
    }
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  onTriggerDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  updateAutoCalculatedFields() {
    const strBsr = this.product.bsr + ''
    this.product.bsr = parseFloat(strBsr.replace(',', '')) || 0

    this.product.totalFba = (parseFloat(this.product.fbafee) || 0) + (parseFloat(this.product.amazon) || 0) * 0.15

    this.product.maxDelivery = this.product.express ? (this.product.weight || 0) * 7 : (this.product.weight || 0) * 5
    // что-то не то
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
