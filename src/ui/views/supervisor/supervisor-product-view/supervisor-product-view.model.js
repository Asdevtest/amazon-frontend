import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {ProductModel} from '@models/product-model'
import {SupervisorModel} from '@models/supervisor-model'
import {SupervisorUpdateProductContract} from '@models/supervisor-model/supervisor-model.contracts'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'
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
  15: 'Продукт подходит?',
  30: 'Отправить на поиск поставщика?',
  20: 'Товар не подходит?',
  70: 'Опубликовать на бирже?',
  80: 'Поставщик не найден?',
  90: 'Прайс поставщика не подходит?',
  230: 'Отправить на поиск поставщика?',
  270: 'Подтвердить нахождение поставщика?',
  280: 'Поставщик не найден?',
  290: 'Цена поставщика неприемлема?',
}

const confirmMessageWithoutStatus = 'Сохранить без статуса?'

const warningModalTitleVariants = {
  NO_SUPPLIER: 'Нельзя выбрать без поставщика.',
  CHOOSE_STATUS: 'Нужно выбрать статус',
  PRICE_WAS_NOT_ACCEPTABLE: 'Неприемлемая цена поставщика.',
  SUPPLIER_WAS_NOT_FOUND_BY_BUYER: 'Поставщик не найден',
  ERROR: 'Ошибка',
}

export class SupervisorProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  product = undefined
  productId = undefined
  productBase = undefined

  curUpdateProductData = {}
  confirmMessage = ''
  warningModalTitle = ''

  drawerOpen = false
  selectedSupplier = undefined
  showWarningModal = false
  showConfirmModal = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history}) {
    this.history = history

    this.productId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await this.getProductById()
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result

        this.productBase = result
        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeProductFields = fieldName =>
    action(e => {
      this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, [fieldName]: ''}

      if (['checkednotes'].includes(fieldName)) {
        this.product = {...this.product, [fieldName]: e.target.value}
      } else {
        if (['weight'].includes(fieldName) && !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(e.target.value, 13)) {
          return
        }
        if (!['weight'].includes(fieldName) && !checkIsPositiveNummberAndNoMoreNCharactersAfterDot(e.target.value, 5)) {
          return
        }
        if (
          ['amazon', 'fbafee'].includes(fieldName) &&
          !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)
        ) {
          return
        }
        if (['bsr', 'fbaamount'].includes(fieldName)) {
          this.product = {...this.product, [fieldName]: parseInt(e.target.value)}
        } else {
          this.product = {...this.product, [fieldName]: e.target.value}
        }
      }

      updateProductAutoCalculatedFields.call(this)
    })

  onClickSetProductStatusBtn(statusKey) {
    if (
      statusKey === ProductStatus.COMPLETE_SUCCESS &&
      (!this.product.currentSupplierId ||
        this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE] ||
        this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER])
    ) {
      if (this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE]) {
        this.warningModalTitle = warningModalTitleVariants.PRICE_WAS_NOT_ACCEPTABLE
      } else if (this.productBase.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER]) {
        this.warningModalTitle = warningModalTitleVariants.SUPPLIER_WAS_NOT_FOUND_BY_BUYER
      } else if (!this.product.currentSupplierId) {
        this.warningModalTitle = warningModalTitleVariants.NO_SUPPLIER
      } else {
        this.warningModalTitle = warningModalTitleVariants.ERROR
      }

      this.onTriggerOpenModal('showWarningModal')
    } else {
      this.product = {...this.product, status: ProductStatusByKey[statusKey]}
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
              return (value && parseInt(value)) || 0
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
      const findProductSupplierIndex = this.product.suppliers.findIndex(
        supplierItem => supplierItem._id === this.selectedSupplier._id,
      )
      runInAction(() => {
        this.product.suppliers.splice(findProductSupplierIndex, 1)
        this.selectedSupplier = undefined
        this.onSaveProductData()
      })

      this.loadData()
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

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
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

  async onClickParseProductData(productDataParser, product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
      if (product.asin) {
        const parseResult = await (() => {
          switch (productDataParser) {
            case ProductDataParser.AMAZON:
              return ProductModel.parseAmazon(product.asin)
            case ProductDataParser.SELLCENTRAL:
              return ProductModel.parseParseSellerCentral(product.asin)
          }
        })()

        runInAction(() => {
          if (Object.keys(parseResult).length > 5) {
            // проверка, что ответ не пустой (иначе приходит объект {length: 2})
            this.product = {
              ...this.product,
              ...parseFieldsAdapter(parseResult, productDataParser),
              weight: this.product.weight > parseResult.weight ? this.product.weight : parseResult.weight,
              amazonDescription: parseResult.info?.description || this.product.amazonDescription,
              amazonDetail: parseResult.info?.detail || this.product.amazonDetail,
            }
          }
          updateProductAutoCalculatedFields.call(this)
        })
      } else {
        this.formFieldsValidationErrors = {...this.formFieldsValidationErrors, asin: 'Пустой асин!'}
      }

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }
}
