import {action, makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductStatus, ProductStatusByKey} from '@constants/product-status'
import {mapProductStrategyStatusEnumToKey, ProductStrategyStatus} from '@constants/product-strategy-status'

import {ResearcherModel} from '@models/researcher-model'
import {SettingsModel} from '@models/settings-model'
import {UserModel} from '@models/user-model'

import {researcherProductsViewColumns} from '@components/table-columns/researcher/researcher-products-columns'

import {checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot} from '@utils/checks'
import {researcherProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getAmazonCodeFromLink} from '@utils/get-amazon-code-from-link'
import {getNewObjectWithDefaultValue, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {isValidationErrors, plainValidationErrorAndApplyFuncForEachError} from '@utils/validation'

const formFieldsDefault = {
  amazonLink: '',
  productCode: '',
  strategyStatus: '',

  niche: '',
  asins: '',
  avgRevenue: '',
  avgBSR: '',
  totalRevenue: '',
  coefficient: '',
  avgPrice: '',
  avgReviews: '',
}

export class ResearcherProductsViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  drawerOpen = false

  formFields = {...formFieldsDefault}
  newProductId = undefined

  showWarningInfoModal = false

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  products = []
  chekedCode = ''

  sortModel = []
  startFilterModel = undefined
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = researcherProductsViewColumns()

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  get user() {
    return UserModel.userInfo
  }

  constructor({history, location}) {
    this.history = history

    if (location?.state?.dataGridFilter) {
      this.startFilterModel = location.state.dataGridFilter
    }

    makeAutoObservable(this, undefined, {autoBind: true})

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
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
      this.filterModel = this.startFilterModel ? this.startFilterModel : state.filter.filterModel
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
      this.getDataGridState()
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
        asin: this.formFields.productCode,
        lamazon: this.formFields.amazonLink,
        strategyStatus: Number(this.formFields.strategyStatus),
        fba: true,

        niche: this.formFields.niche,
        asins: this.formFields.asins,
        avgRevenue: this.formFields.avgRevenue,
        avgBSR: this.formFields.avgBSR,
        totalRevenue: this.formFields.totalRevenue,
        coefficient: this.formFields.coefficient,
        avgPrice: this.formFields.avgPrice,
        avgReviews: this.formFields.avgReviews,
      }

      await this.createProduct(product)

      const foundedProd = this.products.find(prod => prod.originalData._id === this.newProductId)

      this.history.push(
        {
          pathname: '/researcher/products/product',
          search: foundedProd.originalData._id,
        },
        {startParse: true},
      )
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

      this.warningInfoModalSettings = {
        isWarning: true,
        title: error.body.message,
      }

      this.onTriggerOpenModal('showWarningInfoModal')

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
        this.products = researcherProductsDataConverter(
          result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')),
        )
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
      this.history.push({
        pathname: '/researcher/products/product',
        search: item.originalData._id,
      })
    }
  }

  onChangeFormFields = fieldName =>
    action(e => {
      this.error = undefined
      this.actionStatus = undefined

      if (
        ['avgRevenue', 'coefficient', 'avgPrice'].includes(fieldName) &&
        !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)
      ) {
        return
      }
      if (['avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName)) {
        this.formFields[fieldName] = parseInt(e.target.value) || ''
      } else {
        this.formFields[fieldName] = e.target.value
      }

      if (fieldName === 'amazonLink') {
        this.chekedCode = ''
        this.formFields.productCode = getAmazonCodeFromLink(e.target.value)
      }

      if (fieldName === 'strategyStatus') {
        if (Number(e.target.value) !== mapProductStrategyStatusEnumToKey[ProductStrategyStatus.PRIVATE_LABEL]) {
          this.formFields.niche = ''
          this.formFields.asins = ''
          this.formFields.avgRevenue = ''
          this.formFields.avgBSR = ''
          this.formFields.totalRevenue = ''
          this.formFields.coefficient = ''
          this.formFields.avgPrice = ''
          this.formFields.avgReviews = ''
        }
      }
    })

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
