import { makeAutoObservable, reaction, runInAction } from 'mobx'

import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
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
  actionStatus = undefined

  // inInventory = undefined

  productId = undefined
  product = undefined
  curUpdateProductData = {}
  confirmMessage = ''
  storekeepersData = []

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

  formFields = { ...formFieldsDefault }

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  get userInfo() {
    return UserModel.userInfo
  }

  get languageTag() {
    return SettingsModel.languageTag
  }

  constructor({ history /* , location */ }) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.history = history
      this.productId = url.searchParams.get('productId')
    })

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.languageTag,
      () =>
        runInAction(() => {
          this.product = this.product ? { ...this.product } : undefined
        }),
    )
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
        runInAction(() => {
          this.supplierModalReadOnly = true
        })

        this.onTriggerAddOrEditSupplierModal()
        break
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      this.storekeepersData = result
    } catch (error) {
      console.log(error)
    }
  }

  async getProductById() {
    try {
      const result = await ProductModel.getProductById(this.productId)

      runInAction(() => {
        runInAction(() => {
          this.product = result
        })

        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeSelectedSupplier(supplier) {
    if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
      runInAction(() => {
        this.selectedSupplier = undefined
      })
    } else {
      runInAction(() => {
        this.selectedSupplier = supplier
      })
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
    runInAction(() => {
      this.product = value
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } else {
        const [result] = await Promise.all([UserModel.getPlatformSettings(), this.getStorekeepers()])

        runInAction(() => {
          this.yuanToDollarRate = result.yuanToDollarRate
          this.volumeWeightCoefficient = result.volumeWeightCoefficient
        })
      }

      runInAction(() => {
        this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
      })
    } catch (error) {
      console.log(error)
    }
  }
}
