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

  imagesForLoad = []
  productId = undefined
  product = undefined

  storekeepersData = []

  platformSettings = undefined

  formFieldsValidationErrors = getNewObjectWithDefaultValue(formFieldsDefault, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    this.history = history
    const url = new URL(window.location.href)
    this.productId = url.searchParams.get('product-id')

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      await this.getProductById()
      this.getPlatformSettings()
      this.getStorekeepers()
    } catch (error) {
      console.log(error)
    }
  }

  async getStorekeepers() {
    try {
      const response = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepersData = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getPlatformSettings() {
    try {
      const response = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettings = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        this.product = result
        this.imagesForLoad = result.images

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
}
