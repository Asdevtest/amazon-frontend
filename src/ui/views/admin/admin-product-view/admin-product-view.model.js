import { makeAutoObservable, runInAction } from 'mobx'

import { ProductModel } from '@models/product-model'
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
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById() {
    try {
      const response = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = response
        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async handleProductActionButtons(actionType) {
    switch (actionType) {
      case 'cancel':
        this.history.goBack()

        break
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }
}
