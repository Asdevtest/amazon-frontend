import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'

import {ResearcherModel} from '@models/researcher-model'
import {ResearcherUpdateProductContract} from '@models/researcher-model/researcher-model.contracts'
import {SupplierModel} from '@models/supplier-model'

import {
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
  getNewObjectWithDefaultValue,
} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const fieldsOfProductAllowedToUpdate = [
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'supplier',
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
  'currentSupplier',
]

const formFieldsDefault = {
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
  fbaamount: '',
}

export class ResearcherProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  productBase = undefined
  product = undefined
  suppliers = []
  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  constructor({history, location}) {
    this.history = history
    if (location.state) {
      const product = {
        ...location.state.product,
        supplier: location.state.product.supplier.map(supplierItem => supplierItem._id),
      }
      this.productBase = product
      this.product = product
      this.suppliers = location.state.product.supplier
      this.updateAutoCalculatedFields()
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

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldName]: ''}
      if (fieldName === 'express') {
        this.product[fieldName] = !this.product[fieldName]
      } else {
        this.product[fieldName] = e.target.value
      }
      if (['express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba'].includes(fieldName)) {
        this.updateAutoCalculatedFields()
      }
    })

  updateAutoCalculatedFields() {
    const strBsr = this.product.bsr + ''
    this.product.bsr = parseFloat(strBsr.replace(',', '.')) || 0

    this.product.amazon = parseFloat(this.product.amazon) || 0
    this.product.weight = parseFloat(this.product.weight) || 0
    this.product.length = parseFloat(this.product.length) || 0
    this.product.width = parseFloat(this.product.width) || 0
    this.product.height = parseFloat(this.product.height) || 0
    this.product.fbafee = parseFloat(this.product.fbafee) || 0
    this.product.profit = parseFloat(this.product.profit) || 0

    this.product.totalFba = (parseFloat(this.product.fbafee) || 0) + (parseFloat(this.product.amazon) || 0) * 0.15

    this.product.maxDelivery = this.product.express ? (this.product.weight || 0) * 7 : (this.product.weight || 0) * 5

    this.product.minpurchase =
      (parseFloat(this.product.amazon) || 0) -
      (parseFloat(this.product.totalFba) || 0) -
      0.4 * ((parseFloat(this.product.amazon) || 0) - (parseFloat(this.product.totalFba) || 0)) -
      (parseFloat(this.product.maxDelivery) || 0)

    if (this.product.currentSupplier) {
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

  onChangeActiveChip(e, value) {
    this.activeChip = value
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  async onClickSupplierButtons(actionType) {
    switch (actionType) {
      case 'add':
        runInAction(() => {
          this.selectedSupplier = undefined
        })
        this.onTriggerAddOrEditSupplierModal()
        break
      case 'edit':
        this.onTriggerAddOrEditSupplierModal()
        break
      case 'accept':
        this.product.currentSupplier = this.selectedSupplier
        this.selectedSupplier = undefined
        this.updateAutoCalculatedFields()
        break
      case 'acceptRevoke':
        this.product.currentSupplier = undefined
        this.selectedSupplier = undefined
        this.updateAutoCalculatedFields()
        break
      case 'delete':
        this.onRemoveSupplier()
        break
    }
  }

  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)
      const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === this.selectedSupplier._id)
      const findProductSupplierIndex = this.product.supplier.findIndex(
        supplierItem => supplierItem._id === this.selectedSupplier._id,
      )
      runInAction(() => {
        this.suppliers.splice(findSupplierIndex, 1)
        this.product.supplier.splice(findProductSupplierIndex, 1)
        this.selectedSupplier = undefined
        const editingСontinues = true
        this.onSaveProductData(editingСontinues)
      })
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'accept':
        this.onSaveProductData()
        break
      case 'cancel':
        this.onResetInitialProductData()
        break
      case 'delete':
        this.onDeleteProduct()
        break
    }
  }

  async onClickSaveSupplierBtn(supplier) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
        const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === supplier._id)
        runInAction(() => {
          this.suppliers[findSupplierIndex] = supplier
        })
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        runInAction(() => {
          this.product.supplier.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })
        const editingСontinues = true
        this.onSaveProductData(editingСontinues)
      }
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickParseProductData(productDataParser, product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const parseResult = await (() => {
        switch (productDataParser) {
          case ProductDataParser.AMAZON:
            return ResearcherModel.parseAmazon(product.id)
          case ProductDataParser.SELLCENTRAL:
            return ResearcherModel.parseParseSellerCentral(product.id)
        }
      })()
      runInAction(() => {
        this.product = {
          ...this.product,
          ...parseFieldsAdapter(parseResult, productDataParser),
        }
        this.updateAutoCalculatedFields()
      })

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSaveProductData(editingСontinues) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const updateProductData = getObjectFilteredByKeyArrayWhiteList(
        toJS(this.product),
        fieldsOfProductAllowedToUpdate,
        true,
        (key, value) => {
          switch (key) {
            case 'status':
              return value < 10 && this.product.currentSupplier ? 10 : value
            case 'bsr':
              return value && parseFloat(value)
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
            case 'fbafee':
              return value && parseFloat(value)
            case 'profit':
              return value && parseFloat(value)
            case 'currentSupplier':
              return this.product.currentSupplier._id
            default:
              return value
          }
        },
      )

      await transformAndValidate(ResearcherUpdateProductContract, updateProductData)

      await ResearcherModel.updateProduct(this.product._id, updateProductData)
      this.setActionStatus(loadingStatuses.success)

      !editingСontinues && this.history.goBack()
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)

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
  onResetInitialProductData() {
    this.history.goBack()
  }

  async onDeleteProduct() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await ResearcherModel.removeProduct(this.product._id)
      this.setActionStatus(loadingStatuses.success)
      this.history.goBack()
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

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
