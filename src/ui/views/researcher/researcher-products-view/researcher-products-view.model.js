import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'

import {ResearcherModel} from '@models/researcher-model'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
}

export class ResearcherProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1

  formFields = {...formFieldsDefault}

  products = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onClickCheckBtn() {
    if (!this.formFields.productCode) {
      this.error = 'Product code field is required for this action'
      return
    }
    const checkProductExistResult = await this.checkProductExists(this.formFields.productCode)
    if (checkProductExistResult) {
      runInAction(() => {
        this.error = 'This product already exists'
      })
    }
  }

  async onClickAddBtn() {
    if (!(this.formFields.amazonLink || this.formFields.productCode)) {
      this.error = 'All fields are required for this action'
      return
    }
    const product = {
      id: this.formFields.productCode,
      lamazon: this.formFields.amazonLink,
    }
    this.createProduct(product)
  }

  async createProduct(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const productFullData = {
        ...product,
        lsupplier: '',
        bsr: 0,
        amazon: 0,
        supplier: 0,
        fbafee: 0,
        delivery: 0,
        icomment: '',
        images: [],
        reffee: 15,
      }
      await ResearcherModel.createProduct(productFullData)
      this.setActionStatus(loadingStatuses.success)
      runInAction(() => {
        this.formFields = formFieldsDefault
      })
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async getPropducts() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      const result = await ResearcherModel.getProductsVacant()
      console.log(result)
      this.setRequestStatus(loadingStatuses.success)
      runInAction(() => {
        this.products = result
      })
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async checkProductExists() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const checkProductExistResult = await ResearcherModel.checkProductExists(this.formFields.productCode)
      this.setActionStatus(loadingStatuses.success)
      return checkProductExistResult.isExist
    } catch (error) {
      console.log(error)
      this.setActionStatus(loadingStatuses.failed)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickTableRow(item) {
    this.history.push('/researcher/product', {product: toJS(item)})
  }

  onChangeFormFields = fieldName =>
    action(e => {
      this.error = undefined
      this.actionStatus = undefined
      this.formFields[fieldName] = e.target.value
    })

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }
}
