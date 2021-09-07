import {action, makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatusByKey, ProductStatus} from '@constants/product-status'

import {BuyerModel} from '@models/buyer-model'
import {OtherModel} from '@models/other-model'
import {SupplierModel} from '@models/supplier-model'

import {isNotUndefined, isUndefined} from '@utils/checks'
import {
  getNewObjectWithDefaultValue,
  getObjectFilteredByKeyArrayBlackList,
  getObjectFilteredByKeyArrayWhiteList,
} from '@utils/object'

const fieldsOfProductAllowedToUpdate = [
  'lsupplier',
  'amazon',
  'reffee',
  'fbalink',
  'fbafee',
  'fbaamount',
  'delivery',
  'status',
  'profit',
  'margin',
  'buyerscomment',
  'additionalProp1',
  'supplier',
  'currentSupplier',
]

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
}

export class BuyerProductViewModel {
  history = undefined
  requestStatus = undefined
  actionStatus = undefined

  productBase = undefined
  product = undefined
  suppliers = []
  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showNoSuplierErrorModal = false

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
        supplier: location.state.product.supplier.map(supplierItem => supplierItem._id),
      }
      this.productBase = product
      this.product = product
      this.suppliers = location.state.product.supplier
      this.updateAutoCalculatedFields()
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeProductFields = fieldsName =>
    action(e => {
      this.product[fieldsName] = e.target.value
      this.updateAutoCalculatedFields()
    })

  onClickSetProductStatusBtn(statusKey) {
    this.product.status = ProductStatusByKey[statusKey]
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  onChangeProduct(e, value) {
    this.product = value
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
        if (this.product.currentSupplier && this.product.currentSupplier._id === this.selectedSupplier._id) {
          this.product.currentSupplier = undefined
        }
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
    }
  }

  async onSaveProductData() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const updateProductData = getObjectFilteredByKeyArrayWhiteList(
        this.product,
        fieldsOfProductAllowedToUpdate,
        false,
        (key, value) => {
          if (key === 'buyerscomment' && isUndefined(value)) {
            return ''
          } else if (key === 'currentSupplier' && isNotUndefined(value)) {
            return value && value._id
          } else {
            return value
          }
        },
      )

      if (
        updateProductData.currentSupplier ||
        updateProductData.status === ProductStatusByKey[ProductStatus.SUPPLIER_WAS_NOT_FOUND_BY_BUYER]
      ) {
        console.log('updateProductData', updateProductData)
        await BuyerModel.updateProduct(this.product._id, updateProductData)
        this.history.push('/buyer/my-products')
      } else {
        this.onTriggerOpenModal('showNoSuplierErrorModal')
      }

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        console.log(error.body.message)
        this.error = error.body.message
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
        this.suppliers[findSupplierIndex] = supplier
      } else {
        const createSupplierResult = await SupplierModel.createSupplier(supplier)
        runInAction(() => {
          this.product.supplier.push(createSupplierResult.guid)
          this.suppliers.push({...supplier, _id: createSupplierResult.guid})
        })
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

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onResetInitialProductData() {
    this.setActionStatus(loadingStatuses.isLoading)
    this.product = this.productBase
    this.setActionStatus(loadingStatuses.success)
    this.history.push('/buyer/my-products')
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
