import { makeAutoObservable, runInAction } from 'mobx'

import { ProductModel } from '@models/product-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { getNewObjectWithDefaultValue } from '@utils/object'

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

  productId = undefined
  product = undefined
  storekeepers = []
  platformSettings = undefined

  selectedSupplier = undefined
  showAddOrEditSupplierModal = false

  formFieldsValidationErrors = getNewObjectWithDefaultValue(formFieldsDefault, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    const url = new URL(window.location.href)

    this.history = history
    this.productId = url.searchParams.get('product-id')

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  loadData() {
    try {
      this.getProductById()
      this.getStorekeepers()
      this.getPlatformSettings()
    } catch (error) {
      console.log(error)
    }
  }

  onClickSupplierButtons(actionType) {
    switch (actionType) {
      case 'view':
        this.onTriggerOpenModal('showAddOrEditSupplierModal')
        break
    }
  }

  async getStorekeepers() {
    try {
      const response = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById() {
    try {
      const response = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = response
      })

      updateProductAutoCalculatedFields.call(this)
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

  async getPlatformSettings() {
    try {
      const response = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettings = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
