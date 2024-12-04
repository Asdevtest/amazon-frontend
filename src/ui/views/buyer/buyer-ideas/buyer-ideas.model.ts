/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ideaStatusByKey, ideaStatusGroupsNames } from '@constants/statuses/idea-status'

import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { IdeaModel } from '@models/ideas-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'

import { loadingStatus } from '@typings/enums/loading-status'
import { IIdea } from '@typings/models/ideas/idea'
import { IProduct } from '@typings/models/products/product'

import { buyerIdeasColumns } from './buyer-ideas.columns'
import { fieldsForSearch } from './buyer-ideas.constants'
import { observerConfig } from './observer.config'

export class BuyerIdeasViewModel extends DataGridFilterTableModel {
  showIdeaModal: boolean = false
  showAddSupplierProductModal: boolean = false

  productId: string = ''
  currentIdeaId: string = ''
  currentProduct: IProduct | null = null

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const rowHandlers = {
      onClickAddSupplierButton: (id: string) => this.onClickAddSupplierButton(id),
      onClickSupplierFound: (id: string) => this.setIdeaSupplierFound(id),
      onClickSupplierNotFound: (id: string) => this.setIdeaSupplierNotFound(id),
    }

    const columnsModel = buyerIdeasColumns(rowHandlers)

    const filtersFields = getFilterFields(columnsModel, [
      'parentProductAsin',
      'parentProductSkuByClient',
      'parentProductAmazonTitle',
      'childProductShop',
      'maxProductionTerm',
      'sub',
    ])

    const defaultGetCurrentDataOptions = () => ({
      withOrder: false,
      withRequests: false,
    })

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: ideaStatusGroupsNames.SEARCH_SUPPLIERS,
      },
    })

    super({
      getMainDataMethod: IdeaModel.getIdeaList,
      columnsModel,
      filtersFields,
      mainMethodURL: 'ideas/pag/my?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.BUYER_IDEAS,
      defaultGetCurrentDataOptions,
      defaultFilterParams,
      defaultSortModel: [{ field: 'status', sort: 'desc' }],
    })
    makeObservable(this, observerConfig)

    this.getTableSettingsPreset()
  }

  async getDataForIdeaModal(idea: IIdea) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const isChildProcuct =
        idea.childProduct && (idea.status === ideaStatusByKey.ADDING_ASIN || idea.status === ideaStatusByKey.VERIFIED)

      const currentProductId = isChildProcuct ? idea.childProduct._id : idea.parentProduct._id

      runInAction(() => {
        this.productId = currentProductId
        this.currentIdeaId = idea._id
        this.currentProduct = idea?.parentProduct
      })

      this.onTriggerOpenModal('showIdeaModal')

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickAddSupplierButton(id: string) {
    runInAction(() => {
      this.currentIdeaId = id
    })

    this.onTriggerOpenModal('showAddSupplierProductModal')
  }

  async onClickSaveSupplierBtn(supplierCardId?: string) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await IdeaModel.addSuppliersToIdea(this.currentIdeaId, {
        supplierCardIds: [supplierCardId],
      })

      runInAction(() => {
        this.currentIdeaId = ''
      })

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async setIdeaSupplierFound(id: string) {
    try {
      await IdeaModel.changeStatusToSupplierFound(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async setIdeaSupplierNotFound(id: string) {
    try {
      await IdeaModel.changeStatusToSupplierNotFound(id)
      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }
}
