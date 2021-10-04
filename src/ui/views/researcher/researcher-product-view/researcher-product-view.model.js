import {transformAndValidate} from 'class-transformer-validator'
import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {texts} from '@constants/texts'

import {OtherModel} from '@models/other-model'
import {ProductModel} from '@models/product-model'
import {ResearcherModel} from '@models/researcher-model'
import {ResearcherUpdateProductContract} from '@models/researcher-model/researcher-model.contracts'
import {SupplierModel} from '@models/supplier-model'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {
  getObjectFilteredByKeyArrayWhiteList,
  getObjectFilteredByKeyArrayBlackList,
  getNewObjectWithDefaultValue,
} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const textConsts = getLocalizedTexts(texts, 'en').researcherProductView

const fieldsOfProductAllowedToUpdate = [
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
  'currentSupplier',
  'strategyStatus',
]

const formFieldsDefault = {
  amazon: '',
  bsr: '',
  createdAt: '',
  createdBy: {},
  delivery: '',
  dirdecision: '',
  express: false,
  fba: false,
  fbafee: '',
  icomment: '',
  id: '',
  images: [],
  lamazon: '',
  material: '',
  reffee: '',
  status: '',
  suppliers: [],
  updatedAt: '',
  _id: '',
  fbaamount: '',
}

export class ResearcherProductViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  product = undefined
  curUpdateProductData = {}
  suppliers = []

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showConfirmModal = false

  confirmModalSettings = {
    isWarning: false,
    message: textConsts.confirmMessage,
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
        suppliers: location.state.product.suppliers.map(supplierItem =>
          typeof supplierItem === 'string' ? supplierItem : supplierItem._id,
        ),
      }
      this.product = product
      this.suppliers = location.state.suppliers ? location.state.suppliers : location.state.product.suppliers
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
      } else if (['icomment'].includes(fieldName)) {
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
      if (['express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba'].includes(fieldName)) {
        this.updateAutoCalculatedFields()
      }
    })

  updateAutoCalculatedFields() {
    const strBsr = this.product.bsr + ''
    this.product.bsr = parseFloat(strBsr.replace(',', '')) || 0

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
        this.confirmModalSettings = {
          isWarning: true,
          message: textConsts.deleteSupplierMessage,
          onClickOkBtn: () => this.onRemoveSupplier(),
        }

        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }

  async onRemoveSupplier() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      await ProductModel.removeSuppliersFromProduct(this.product._id, [this.selectedSupplier._id])
      await SupplierModel.removeSupplier(this.selectedSupplier._id)
      this.setActionStatus(loadingStatuses.success)
      const findSupplierIndex = this.suppliers.findIndex(supplierItem => supplierItem._id === this.selectedSupplier._id)

      runInAction(() => {
        this.suppliers.splice(findSupplierIndex, 1)
        this.selectedSupplier = undefined

        this.product.suppliers
        this.selectedSupplier = undefined
      })

      const forcedSaveSupplierItem = {supplier: [...this.product.suppliers]}
      await this.onForcedSaveSelectedFields(forcedSaveSupplierItem)
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
        this.openConfirmModalWithTextByStatus()
        break
      case 'cancel':
        this.history.goBack()
        break
      case 'delete':
        this.confirmModalSettings = {
          isWarning: true,
          message: textConsts.deleteMessage,
          onClickOkBtn: () => this.onDeleteProduct(),
        }

        this.onTriggerOpenModal('showConfirmModal')

        break
    }
  }

  async openConfirmModalWithTextByStatus() {
    try {
      const curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
        toJS(this.product),
        fieldsOfProductAllowedToUpdate,
        true,
        (key, value) => {
          switch (key) {
            case 'status':
              return value < 10 && this.product.currentSupplier ? 10 : value
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
      runInAction(() => {
        this.curUpdateProductData = curUpdateProductData
      })

      console.log('curUpdateProductData ', curUpdateProductData)

      await transformAndValidate(ResearcherUpdateProductContract, curUpdateProductData)

      runInAction(() => {
        this.confirmModalSettings = {
          isWarning: false,
          message: textConsts.confirmMessage,
          onClickOkBtn: () => this.onSaveProductData(),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
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

  async onSubmitPostImages({images, type}) {
    const loadingStep = 100 / images.length

    this[type] = []
    this.showProgress = true

    for (let i = 0; i < images.length; i++) {
      const image = images[i]
      await this.onPostImage(image, type)
      this.progressValue = this.progressValue + loadingStep
    }

    this.showProgress = false
    this.progressValue = 0
  }

  async onPostImage(imageData, imagesType) {
    const formData = new FormData()
    formData.append('filename', imageData)

    try {
      const imageFile = await OtherModel.postImage(formData)

      this[imagesType].push('https://api1.kurakste.ru/uploads/' + imageFile.data.fileName)
    } catch (error) {
      this.error = error
    }
  }

  async onClickSaveSupplierBtn(supplier, photosOfSupplier) {
    try {
      await this.onSubmitPostImages({images: photosOfSupplier, type: 'readyImages'})

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        delivery: parseFloat(supplier?.delivery) || '',
        lotcost: parseFloat(supplier?.lotcost) || '',
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }

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
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        runInAction(() => {
          this.product.suppliers.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })

        const forcedSaveSupplierItem = {suppliers: [...this.product.suppliers]}
        await this.onForcedSaveSelectedFields(forcedSaveSupplierItem)
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

  async onForcedSaveSelectedFields(selectedFieldsObj) {
    try {
      await ResearcherModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(selectedFieldsObj, ['suppliers']),
      )
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  async onSaveProductData(editingСontinues) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      await ResearcherModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(this.curUpdateProductData, ['suppliers']),
      )
      this.setActionStatus(loadingStatuses.success)

      this.history.replace('/researcher/product', {product: toJS(this.product), suppliers: toJS(this.suppliers)})

      !editingСontinues && this.history.push('/researcher/products')
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
