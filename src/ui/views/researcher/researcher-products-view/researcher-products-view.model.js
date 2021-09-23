import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {ResearcherModel} from '@models/researcher-model'
import {SettingsModel} from '@models/settings-model'

import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getAmazonCodeFromLink} from '@utils/get-amazon-code-from-link'
import {getNewObjectWithDefaultValue} from '@utils/object'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

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

  formFields = {...formFieldsDefault}
  newProductId = undefined

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  products = []
  chekedCode = ''

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    SettingsModel.setDataGridState(state, DataGridTablesKeys.RESEARCHER_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.RESEARCHER_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.curPage = state.pagination.page
      this.rowsPerPage = state.pagination.pageSize
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e.pageSize
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectionModel = model
  }

  getCurrentData() {
    return toJS(this.products)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getPropductsVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
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
        return
      })
    }
    this.chekedCode = this.formFields.productCode
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
    await this.createProduct(product)

    const foundedProd = this.products.find(prod => prod._id === this.newProductId)

    this.history.push('/researcher/product', {
      product: foundedProd,
    })
  }

  async createProduct(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const productFullData = {
        ...product,
        lsupplier: '',
        bsr: 0,
        amazon: 0,
        supplier: [],
        fbafee: 0,
        delivery: 0,
        icomment: '',
        images: [],
        reffee: 15,
      }
      const response = await ResearcherModel.createProduct(productFullData)

      this.setActionStatus(loadingStatuses.success)
      runInAction(() => {
        this.formFields = formFieldsDefault
        this.newProductId = response.guid
      })
      await this.loadData()
    } catch (error) {
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

  async getPropductsVacant() {
    try {
      const result = await ResearcherModel.getProductsVacant()
      runInAction(() => {
        this.products = result.sort(sortObjectsArrayByFiledDate('createdat'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  async checkProductExists() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const checkProductExistResult = await ResearcherModel.checkProductExists(
        this.formFields.productCode.toUpperCase(),
      )
      this.setActionStatus(loadingStatuses.success)
      return checkProductExistResult.isExist
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

  onClickTableRow(item) {
    if (item.status < ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]) {
      this.history.push('/researcher/product', {product: toJS(item)})
    }
  }

  onChangeFormFields = fieldName =>
    action(e => {
      this.error = undefined
      this.actionStatus = undefined
      this.chekedCode = ''
      if (fieldName === 'amazonLink') {
        this.formFields[fieldName] = e.target.value
        this.formFields.productCode = getAmazonCodeFromLink(e.target.value)
      }
    })

  onChangeCurPage(e, value) {
    this.curPage = value
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
