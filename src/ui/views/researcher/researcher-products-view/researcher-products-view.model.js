import {action, makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'

import {ResearcherModel} from '@models/researcher-model'
import {SettingsModel} from '@models/settings-model'

import {researcherProductsViewColumns} from '@components/table-columns/researcher/researcher-products-columns'

import {researcherProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDate} from '@utils/date-time'
import {getAmazonCodeFromLink} from '@utils/get-amazon-code-from-link'
import {getNewObjectWithDefaultValue, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
  strategyStatus: '',
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
  densityModel = 'standart'
  columnsModel = researcherProductsViewColumns()

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.RESEARCHER_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.RESEARCHER_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = researcherProductsViewColumns().map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
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
    runInAction(() => {
      this.chekedCode = this.formFields.productCode
    })
  }

  async onClickAddBtn() {
    try {
      if (!(this.formFields.amazonLink || this.formFields.productCode)) {
        this.error = 'All fields are required for this action'
        return
      }
      const product = {
        id: this.formFields.productCode,
        lamazon: this.formFields.amazonLink,
        strategyStatus: Number(this.formFields.strategyStatus),
        fba: true,
      }
      await this.createProduct(product)

      const foundedProd = this.products.find(prod => prod.originalData._id === this.newProductId)

      this.history.push('/researcher/product', {product: toJS(foundedProd.originalData)})
    } catch (error) {
      console.warn(error)
    }
  }

  async createProduct(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const productFullData = {
        ...product,
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
          this.error = error.message
        })
      }
      throw new Error('Failed to create product')
    }
  }

  async getPropductsVacant() {
    try {
      const result = await ResearcherModel.getProductsVacant()
      runInAction(() => {
        this.products = researcherProductsDataConverter(result.sort(sortObjectsArrayByFiledDate('createdAt')))
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
    if (item.originalData.status < ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]) {
      this.history.push('/researcher/product', {product: toJS(item.originalData)})
    }
  }

  onChangeFormFields = fieldName =>
    action(e => {
      this.error = undefined
      this.actionStatus = undefined

      this.formFields[fieldName] = e.target.value

      if (fieldName === 'amazonLink') {
        this.chekedCode = ''
        this.formFields.productCode = getAmazonCodeFromLink(e.target.value)
      }
    })

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
