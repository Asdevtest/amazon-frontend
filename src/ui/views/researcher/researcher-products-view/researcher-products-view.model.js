import { action, makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductStatus, ProductStatusByKey } from '@constants/product/product-status'
import { ProductStrategyStatus, mapProductStrategyStatusEnumToKey } from '@constants/product/product-strategy-status'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ResearcherModel } from '@models/researcher-model'
import { UserModel } from '@models/user-model'

import { checkIsPositiveNummberAndNoMoreTwoCharactersAfterDot } from '@utils/checks'
import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getAmazonCodeFromLink } from '@utils/get-amazon-code-from-link'
import { getNewObjectWithDefaultValue } from '@utils/object'
import { isValidationErrors, plainValidationErrorAndApplyFuncForEachError } from '@utils/validation'

import { loadingStatus } from '@typings/enums/loading-status'

import { researcherProductsViewColumns } from './researcher-products-view.columns'
import { formFieldsDefault, paginationInitModel, researcherProductsViewConfig } from './researcher-products-view.config'

export class ResearcherProductsViewModel extends DataGridFilterTableModel {
  error = undefined
  reasonError = undefined
  actionStatus = undefined
  newProductId = undefined
  formFields = { ...formFieldsDefault }
  formFieldsValidationErrors = getNewObjectWithDefaultValue(this.formFields, undefined)
  products = []
  chekedCode = undefined

  get userInfo() {
    return UserModel.userInfo
  }

  constructor() {
    const columns = researcherProductsViewColumns()
    const filtersFields = getFilterFields(columns)

    super({
      getMainDataMethod: ResearcherModel.getProductsVacant,
      columnsModel: columns,
      filtersFields,
      tableKey: DataGridTablesKeys.RESEARCHER_PRODUCTS,
    })

    this.paginationModel = paginationInitModel
    this.initHistory()
    this.getDataGridState()
    this.getCurrentData()

    makeObservable(this, researcherProductsViewConfig)
  }

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

        const foundedProd = this.products.find(prod => prod._id === this.newProductId)

        this.history.push(
          {
            pathname: '/researcher/products/product',
            search: foundedProd._id,
          },
          { startParse: true },
        )
      } catch (error) {
        console.error(error)
      }
    }
  }

  async createProduct(product) {
    try {
      const response = await ResearcherModel.createProduct(product)

      runInAction(() => {
        this.formFields = formFieldsDefault
        this.newProductId = response.guid
      })

      this.getCurrentData()
    } catch (error) {
      toast.error(error.body.message)

      if (isValidationErrors(error)) {
        plainValidationErrorAndApplyFuncForEachError(error, ({ errorProperty, constraint }) => {
          runInAction(() => {
            this.formFieldsValidationErrors[errorProperty] = constraint
          })
        })
      } else {
        console.error(error)
        runInAction(() => {
          this.error = error.message
        })
      }
      throw new Error('Failed to create product')
    }
  }

  async checkProductExists() {
    try {
      this.setActionStatus(loadingStatus.IS_LOADING)
      const checkProductExistResult = await ResearcherModel.checkProductExists(
        this.formFields.productCode,
        this.formFields.strategyStatus,
      )

      this.setActionStatus(loadingStatus.SUCCESS)
      return checkProductExistResult
    } catch (error) {
      console.error(error)
      this.setActionStatus(loadingStatus.FAILED)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  onClickTableRow(item) {
    if (item.status < ProductStatusByKey[ProductStatus.TO_BUYER_FOR_RESEARCH]) {
      this.history.push({
        pathname: '/researcher/products/product',
        search: item._id,
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

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
