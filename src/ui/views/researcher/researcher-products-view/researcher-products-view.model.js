import {action, makeAutoObservable, runInAction} from 'mobx'

import {ResearcherModel} from '@models/researcher-model'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
}

export class ResearcherProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  drawerOpen = false
  rowsPerPage = 5
  curPage = 1

  formFields = formFieldsDefault

  products = []

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async onClickCheckBtn() {
    if (!this.formFields.productCode) {
      return
    }
    const checkProductExistResult = await this.checkProductExists(this.formFields.productCode)
    return checkProductExistResult
  }

  async onClickAddBtn() {
    if (!(this.formFields.amazonLink || this.formFields.productCode)) {
      return
    }
    const checkProductExistResult = await this.checkProductExists(this.formFields.productCode)
    if (!checkProductExistResult) {
      const product = {
        id: this.formFields.productCode,
        lamazon: this.formFields.amazonLink,
      }
      this.createProduct(product)
    }
  }

  async createProduct(product) {
    try {
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
      }
      await ResearcherModel.createProduct(productFullData)
      runInAction(() => {
        this.formFields = formFieldsDefault
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async getPropducts() {
    try {
      const productsResult = await ResearcherModel.getProducts()
      runInAction(() => {
        this.products = productsResult
      })
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async checkProductExists() {
    try {
      const checkProductExistResult = await ResearcherModel.checkProductExists(this.formFields.productCode)
      return checkProductExistResult.isExist
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onChangeFormFields = fieldName =>
    action(e => {
      this.formFields[fieldName] = e.target.value
    })

  onChangeRowsPerPage(e) {
    this.rowsPerPage = Number(e.target.value)
    this.curPage = 1
  }

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onChangeTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
}
