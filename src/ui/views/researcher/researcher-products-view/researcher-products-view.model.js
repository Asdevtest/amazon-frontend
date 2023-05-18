import { action, makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { mapProductStrategyStatusEnumToKey, ProductStrategyStatus } from '@constants/product/product-strategy-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'

import { ResearcherModel } from '@models/researcher-model'
import { SettingsModel } from '@models/settings-model'
import { UserModel } from '@models/user-model'

import { researcherProductsViewColumns } from '@components/table/table-columns/researcher/researcher-products-columns'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { researcherProductsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getAmazonCodeFromLink } from '@utils/get-amazon-code-from-link'
import { getNewObjectWithDefaultValue, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { isValidationErrors, plainValidationErrorAndApplyFuncForEachError } from '@utils/validation'

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
  reasonError = undefined
  actionStatus = undefined

  formFields = { ...formFieldsDefault }
  newProductId = undefined

  showWarningInfoModal = false

  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)

  baseNoConvertedProducts = []
  products = []
  chekedCode = ''

  sortModel = []
  startFilterModel = undefined
  filterModel = { items: [] }
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

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history

      if (location?.state?.dataGridFilter) {
        this.startFilterModel = location.state.dataGridFilter
      }
    })
    // else {
    //       this.startFilterModel = resetDataGridFilter
    //     }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      runInAction(() => {
        this.products = researcherProductsDataConverter(
          this.baseNoConvertedProducts.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')),
        )
      })
    }
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
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

  changeColumnsModel(newHideState) {
    runInAction(() => {
      this.columnsModel = researcherProductsViewColumns().map(el => ({
        ...el,
        hide: !!newHideState[el?.field],
      }))
    })
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.RESEARCHER_PRODUCTS]

    runInAction(() => {
      if (state) {
        this.sortModel = state.sorting.sortModel
        this.filterModel = this.startFilterModel
          ? {
              ...this.startFilterModel,
              items: this.startFilterModel.items.map(el => ({ ...el, value: el.value.map(e => t(e)) })),
            }
          : state.filter.filterModel
        this.rowsPerPage = state.pagination.pageSize

        this.densityModel = state.density.value
        this.columnsModel = researcherProductsViewColumns().map(el => ({
          ...el,
          hide: state.columns?.lookup[el?.field]?.hide,
        }))
      }
    })
  }

  onChangeRowsPerPage(e) {
    runInAction(() => {
      this.rowsPerPage = e
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })
  }

  onSelectionModel(model) {
    runInAction(() => {
      this.selectionModel = model
    })
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

  // async onClickCheckBtn() {
  //   if (!this.formFields.productCode) {
  //     runInAction(() => {
  //       this.error = 'Product code field is required for this action'
  //     })
  //     return
  //   }

  //   const checkProductExistResult = await this.checkProductExists(this.formFields.productCode)

  //   if (checkProductExistResult.isExist) {
  //     runInAction(() => {
  //       this.error = 'This product already exists'
  //       this.reasonError = checkProductExistResult.reason
  //       return
  //     })
  //   } else {
  //     runInAction(() => {
  //       this.error = ''
  //       this.reasonError = ''
  //     })
  //   }

  //   runInAction(() => {
  //     this.chekedCode = this.formFields.productCode
  //   })
  // }

  // async onClickAddBtn() {
  //   try {
  //     if (!(this.formFields.amazonLink || this.formFields.productCode)) {
  //       this.error = 'All fields are required for this action'
  //       return
  //     }
  //     const product = {
  //       asin: this.formFields.productCode,
  //       lamazon: this.formFields.amazonLink,
  //       strategyStatus: Number(this.formFields.strategyStatus),
  //       fba: true,

  //       niche: this.formFields.niche,
  //       asins: this.formFields.asins,
  //       avgRevenue: this.formFields.avgRevenue,
  //       avgBSR: this.formFields.avgBSR,
  //       totalRevenue: this.formFields.totalRevenue,
  //       coefficient: this.formFields.coefficient,
  //       avgPrice: this.formFields.avgPrice,
  //       avgReviews: this.formFields.avgReviews,
  //     }

  //     await this.createProduct(product)

  //     const foundedProd = this.products.find(prod => prod.originalData._id === this.newProductId)

  //     this.history.push(
  //       {
  //         pathname: '/researcher/products/product',
  //         search: foundedProd.originalData._id,
  //       },
  //       {startParse: true},
  //     )
  //   } catch (error) {
  //     console.warn(error)
  //   }
  // }

  async onClickCheckAndAddProductBtn() {
    if (!this.formFields.productCode) {
      runInAction(() => {
        this.error = 'Product code field is required for this action'
      })
      return
    }

    const checkProductExistResult = await this.checkProductExists(this.formFields.productCode)

    if (checkProductExistResult.isExist) {
      runInAction(() => {
        this.error = 'This product already exists'
        this.reasonError = checkProductExistResult.reason
        return
      })
    } else {
      runInAction(() => {
        this.error = ''
        this.reasonError = ''
      })
    }

    runInAction(() => {
      this.chekedCode = this.formFields.productCode
    })

    if (!checkProductExistResult.isExist && !this.error && !this.reasonError) {
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
          { startParse: true },
        )
      } catch (error) {
        console.warn(error)
      }
    }
  }

  async createProduct(product) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      const productFullData = {
        ...product,
        // reffee: '',
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

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: true,
          title: error.body.message,
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
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

      const filteredResult = result
      // .filter(el =>
      //   [
      //     ProductStatusByKey[ProductStatus.NEW_PRODUCT],
      //     ProductStatusByKey[ProductStatus.DEFAULT],
      //     ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
      //     // ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER],
      //     ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
      //     ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
      //   ].includes(el.status),
      // )

      runInAction(() => {
        this.baseNoConvertedProducts = filteredResult

        this.products = researcherProductsDataConverter(
          filteredResult.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt')),
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
        this.formFields.productCode,
        this.formFields.strategyStatus,
      )

      this.setActionStatus(loadingStatuses.success)
      return checkProductExistResult
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
      runInAction(() => {
        this.error = undefined
        this.actionStatus = undefined
      })

      if (
        ['avgRevenue', 'coefficient', 'avgPrice'].includes(fieldName) &&
        !checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot(e.target.value)
      ) {
        return
      }
      runInAction(() => {
        if (['avgBSR', 'totalRevenue', 'avgReviews'].includes(fieldName)) {
          this.formFields[fieldName] = parseInt(e.target.value) || ''
        } else {
          this.formFields[fieldName] = e.target.value
        }
      })

      runInAction(() => {
        if (fieldName === 'amazonLink') {
          this.chekedCode = ''
          this.formFields.productCode = getAmazonCodeFromLink(e.target.value)
        }
      })

      runInAction(() => {
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
    })

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }
}
