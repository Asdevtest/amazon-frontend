import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {ClientModel} from '@models/client-model'
import {ProductModel} from '@models/product-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {
  checkIsPositiveNummberAndNoMoreNCharactersAfterDot,
  checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot,
} from '@utils/checks'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'
import {onSubmitPostImages} from '@utils/upload-files'

const textConsts = getLocalizedTexts(texts, 'en').clientProductView

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
  asin: '',
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

const fieldsOfProductAllowedToUpdate = [
  'lamazon',
  'lsupplier',
  'bsr',
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
  'currentSupplierId',
  'asin',
  'clientComment',
  'skusByClient',
]

export class ClientProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  product = undefined
  productBase = undefined
  productId = undefined

  curUpdateProductData = {}
  warningModalTitle = ''

  drawerOpen = false

  selectedSupplier = undefined

  showWarningModal = false
  showConfirmModal = false
  showAddOrEditSupplierModal = false

  confirmModalSettings = {
    isWarning: false,
    message: '',
    onClickOkBtn: () => this.onSaveProductData(),
  }

  imagesForLoad = []
  uploadedImages = []

  readyImages = []
  progressValue = 0
  showProgress = false

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
      if (
        [
          'icomment',
          'category',
          'asin',
          'lamazon',
          'clientComment',
          'amazonTitle',
          'amazonDescription',
          'amazonDetail',
          'skusByClient',
        ].includes(fieldName)
      ) {
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
        if (['fbaamount'].includes(fieldName)) {
          this.product[fieldName] = parseInt(e.target.value)
        } else {
          this.product = {...this.product, [fieldName]: e.target.value}
        }
      }

      if (['bsr', 'express', 'weight', 'fbafee', 'amazon', 'delivery', 'totalFba'].includes(fieldName)) {
        updateProductAutoCalculatedFields.call(this)
      }
    })

  onChangeProduct(e, value) {
    this.product = value
  }

  onChangeImagesForLoad(value) {
    this.imagesForLoad = value
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async handleProductActionButtons(actionType, withoutStatus) {
    switch (actionType) {
      case 'accept':
        this.openConfirmModalWithTextByStatus(withoutStatus)
        break
      case 'cancel':
        this.history.goBack()
        break
      case 'delete':
        // this.confirmModalSettings = {
        //   isWarning: true,
        //   message: textConsts.deleteMessage,
        //   onClickOkBtn: () => this.onDeleteProduct()
        // }

        // this.onTriggerOpenModal('showConfirmModal')

        break
    }
  }

  async openConfirmModalWithTextByStatus(withoutStatus) {
    try {
      this.formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

      const curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
        toJS(this.product),
        fieldsOfProductAllowedToUpdate,
        true,
        (key, value) => {
          switch (key) {
            case 'bsr':
              return (value && parseInt(value)) || 0
            case 'amazon':
              return (value && parseFloat(value)) || 0
            case 'weight':
              return (value && parseFloat(value)) || 0
            case 'length':
              return (value && parseFloat(value)) || 0
            case 'width':
              return (value && parseFloat(value)) || 0
            case 'height':
              return (value && parseFloat(value)) || 0
            case 'fbaamount':
              return (value && parseFloat(value)) || 0
            case 'fbafee':
              return (value && parseFloat(value)) || 0
            case 'profit':
              return value && parseFloat(value)
            case 'currentSupplier':
              return this.product.currentSupplier._id
            default:
              return value
          }
        },
      )

      if (withoutStatus) {
        this.curUpdateProductData = getObjectFilteredByKeyArrayBlackList(curUpdateProductData, ['status'])
      } else {
        this.curUpdateProductData = curUpdateProductData
      }

      await this.onSaveProductData()

      await this.loadData()
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)

      this.error = error
    }
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      this.uploadedImages = []

      if (this.imagesForLoad.length) {
        await onSubmitPostImages.call(this, {images: this.imagesForLoad, type: 'uploadedImages'})

        this.imagesForLoad = []
      }

      await ClientModel.updateProduct(
        this.product._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            ...this.curUpdateProductData,
            images: this.uploadedImages.length
              ? [...this.curUpdateProductData.images, ...this.uploadedImages]
              : this.curUpdateProductData.images,
          },
          this.curUpdateProductData.currentSupplierId === null ? ['suppliers', 'currentSupplierId'] : ['suppliers'],
        ),
      )
      this.setActionStatus(loadingStatuses.success)

      this.warningModalTitle = 'Данные сохранены'
      this.onTriggerOpenModal('showWarningModal')
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log('error', error)
    }
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
        this.product = {...this.product, currentSupplierId: this.selectedSupplier._id}
        this.product = {...this.product, currentSupplier: this.selectedSupplier}
        this.selectedSupplier = undefined
        updateProductAutoCalculatedFields.call(this)
        break
      case 'acceptRevoke':
        this.product = {...this.product, currentSupplierId: null}
        this.product = {...this.product, currentSupplier: undefined}
        this.selectedSupplier = undefined
        updateProductAutoCalculatedFields.call(this)
        break
      case 'delete':
        runInAction(() => {
          this.confirmModalSettings = {
            isWarning: true,
            message: textConsts.deleteSupplierMessage,
            onClickOkBtn: () => this.onRemoveSupplier(),
          }
        })
        this.onTriggerOpenModal('showConfirmModal')
        break
    }
  }

  async onClickSaveSupplierBtn(supplier, photosOfSupplier) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.readyImages = []

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, {images: photosOfSupplier, type: 'readyImages'})
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        delivery: parseFloat(supplier?.delivery) || 0,
        lotcost: parseFloat(supplier?.lotcost) || '',
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayBlackList(supplier, ['_id'])
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.product.currentSupplierId) {
          this.product.currentSupplier = supplier
          updateProductAutoCalculatedFields.call(this)
        }
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        await ProductModel.addSuppliersToProduct(this.product._id, [createSupplierResult.guid])
        runInAction(() => {
          this.product.suppliers.push(createSupplierResult.guid)
        })
      }

      this.onSaveForceProductData()

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSaveForceProductData() {
    try {
      await ClientModel.updateProduct(
        this.productId,
        getObjectFilteredByKeyArrayWhiteList(this.product, fieldsOfProductAllowedToUpdate, false, (key, value) => {
          switch (key) {
            case 'bsr':
              return (value && parseInt(value)) || 0
            case 'amazon':
              return (value && parseFloat(value)) || 0
            case 'weight':
              return (value && parseFloat(value)) || 0
            case 'length':
              return (value && parseFloat(value)) || 0
            case 'width':
              return (value && parseFloat(value)) || 0
            case 'height':
              return (value && parseFloat(value)) || 0
            case 'fbaamount':
              return (value && parseFloat(value)) || 0
            case 'fbafee':
              return (value && parseFloat(value)) || 0
            case 'profit':
              return value && parseFloat(value)
            default:
              return value
          }
        }),
      )

      this.loadData()
    } catch (error) {
      console.log('error', error)
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

  onTriggerAddOrEditSupplierModal() {
    if (this.showAddOrEditSupplierModal) {
      this.selectedSupplier = undefined
    }
    this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }
}
