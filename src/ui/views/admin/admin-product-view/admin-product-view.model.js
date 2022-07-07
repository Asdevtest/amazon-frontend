import {makeAutoObservable, runInAction} from 'mobx'

import {ProductModel} from '@models/product-model'
import {UserModel} from '@models/user-model'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
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

  inInventory = undefined

  productId = undefined
  product = undefined
  curUpdateProductData = {}
  confirmMessage = ''

  drawerOpen = false
  selectedSupplier = undefined
  showAddOrEditSupplierModal = false
  showNoSuplierErrorModal = false
  showConfirmModal = false

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  supplierModalReadOnly = false

  readyImages = []
  progressValue = 0
  showProgress = false

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history, location}) {
    this.history = history
    this.productId = history.location.search.slice(1)

    if (location.state) {
      this.inInventory = location.state.inInventory
    }
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      await this.getProductById()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickSupplierButtons(actionType) {
    switch (actionType) {
      case 'view':
        this.supplierModalReadOnly = true

        this.onTriggerAddOrEditSupplierModal()
        break
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result

        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      this.selectedSupplier = undefined
    } else {
      this.selectedSupplier = supplier
    }
  }

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'cancel':
        this.history.goBack()

        break
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

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        this.selectedSupplier = undefined
      } else {
        const result = await UserModel.getPlatformSettings()

        this.yuanToDollarRate = result.yuanToDollarRate
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      }

      this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
    } catch (error) {
      console.log(error)
    }
  }
}
