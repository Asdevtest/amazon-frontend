import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {ResearcherModel} from '@models/researcher-model'

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
  rowsPerPage = 15
  curPage = 1

  formFields = {...formFieldsDefault}

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  products = []
  chekedCode = ''

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.getPropductsVacant()
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
        supplier: [],
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
      this.loadData()
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
