import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ideaStatus, ideaStatusByKey, ideaStatusGroups, ideaStatusGroupsNames } from '@constants/statuses/idea-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { t } from '@utils/translations'

import { ClientModel } from '@models/client-model'
import { IdeaModel } from '@models/ideas-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { UserModel } from '@models/user-model'

import {
  clientAddAsinIdeasColumns,
  clientAllIdeasColumns,
  clientClosedIdeasColumns,
  clientCreateCardIdeasColumns,
  clientNewIdeasColumns,
  clientOnCheckingIdeasColumns,
  clientRealizedIdeasColumns,
  clientSearchSuppliersIdeasColumns,
} from '@components/table/table-columns/client/client-ideas-columns'

import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { objectToUrlQs } from '@utils/text'
import { ProductModel } from '@models/product-model'
import { onSubmitPostImages } from '@utils/upload-files'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { RequestModel } from '@models/request-model'
import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { createProductByClient } from '@constants/white-list'
import { TranslationKey } from '@constants/translations/translation-key'

// * Объект с доп. фильтра в зависимости от текущего роута

const settingsByUrl = {
  '/client/ideas/new': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.NEW],
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientNewIdeasColumns,
  },
  '/client/ideas/on-checking': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.ON_CHECKING],
    queries: {
      withOrder: false,
      withRequests: true,
    },
    columnsModel: clientOnCheckingIdeasColumns,
  },
  '/client/ideas/search-suppliers': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.SEARCH_SUPPLIERS],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientSearchSuppliersIdeasColumns,
  },
  '/client/ideas/create-card': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.CREATE_CARD],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientCreateCardIdeasColumns,
  },
  '/client/ideas/add-asin': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.ADD_ASIN],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientAddAsinIdeasColumns,
  },
  '/client/ideas/realized': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.REALIZED],
    queries: {
      withOrder: true,
      withRequests: true,
    },
    columnsModel: clientRealizedIdeasColumns,
  },
  '/client/ideas/closed': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.CLOSED],
    queries: {
      withOrder: false,
      withRequests: false,
    },
    columnsModel: clientClosedIdeasColumns,
  },
  '/client/ideas/all': {
    statuses: ideaStatusGroups[ideaStatusGroupsNames.ALL],
    queries: {
      withOrder: true,
      withRequests: true,
    },
    columnsModel: clientAllIdeasColumns,
  },
}

// * Список полей для фильтраций

const filtersFields = []

export class ClientIdeasViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  // * Modals

  showBarcodeOrHscodeModal = false
  showSetBarcodeModal = false
  productCardModal = false

  // * Data

  ideaList = []
  currentData = []
  shopList = []
  currentSettings = undefined
  selectedProduct = undefined
  currentBarcode = undefined
  currentHscode = undefined
  storekeepers = undefined
  destinations = undefined
  platformSettings = undefined

  // * Filtration

  currentSearchValue = ''
  filterModel = { items: [] }

  // * Pagination & Sort

  rowCount = 0
  sortModel = []
  densityModel = 'compact'
  paginationModel = { page: 0, pageSize: 15 }

  // * Modal data

  selectedIdea = undefined
  currentProduct = undefined
  requestsForProduct = []

  // * Modal states

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }
  successModalTitle = ''

  showIdeaModal = false
  showBindingModal = false
  showConfirmModal = false
  showSuccessModal = false

  // * Table settings

  columnVisibilityModel = {}
  rowHandlers = {
    onClickToCheck: id => this.handleStatusToCheck(id),
    onClickReject: id => this.handleStatusToReject(id),
    onClickCreateRequest: (productId, asin) => this.onClickCreateRequestButton(productId, asin),
    onClickLinkRequest: (productId, idea) => this.onClickLinkRequestButton(productId, idea),
    onClickCreateCard: ideaData => this.onClickCreateProduct(ideaData),
    onClickSelectSupplier: ideaData => this.getDataForIdeaModal(ideaData),
    onClickClose: ideaId => this.onClickCloseIdea(ideaId),
    onClickRestore: id => this.handleRestore(id),
    onClickAcceptOnCheckingStatus: id => this.handleStatusToSupplierSearch(id),
    onClickAcceptOnSuppliersSearch: id => this.handleStatusToProductCreating(id),
    onClickAcceptOnCreatingProduct: id => this.handleStatusToAddingAsin(id),
    onClickAcceptOnAddingAsin: id => this.handleStatusToFinished(id),
    onClickParseProductData: idea => this.onClickParseProductData(idea),
    onClickToOrder: id => this.onClickToOrder(id),

    barCodeHandlers: {
      onClickBarcode: item => this.onClickBarcode(item),
      onDoubleClickBarcode: item => this.onDoubleClickBarcode(item),
      onDeleteBarcode: item => this.onDeleteBarcode(item),
      showBarcodeOrHscode: (barCode, hsCode) => this.showBarcodeOrHscode(barCode, hsCode),
    },
  }
  columnsModel = clientNewIdeasColumns(this.rowHandlers, this.shopList)
  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getBatchesPagMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    ...dataGridFiltersInitializer(filtersFields),
  }

  get curUser() {
    return UserModel.userInfo
  }

  constructor({ history }) {
    runInAction(() => {
      this.history = history
      this.currentSettings = settingsByUrl[history.location.pathname]
      this.handleUpdateColumnModel()
    })

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.ideaList,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
    reaction(
      () => this.shopList,
      () => {
        this.handleUpdateColumnModel()
      },
    )
  }

  // * Table settings handlers

  handleUpdateColumnModel() {
    this.columnsModel = this.currentSettings.columnsModel(this.rowHandlers, this.shopList)
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_IDEAS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_IDEAS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  // * Filtration handlers

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })
    this.setDataGridState()
    this.getIdeaList()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getIdeaList()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getIdeaList()
  }

  onChangeSortingModel(sortModel) {
    runInAction(() => {
      this.sortModel = sortModel
    })

    this.setDataGridState()
    this.getIdeaList()
  }

  onChangeSearchValue(value) {
    this.currentSearchValue = value
    this.getIdeaList()
  }

  getFilters(exclusion) {
    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.currentSearchValue,
        exclusion,
        filtersFields,
        [
          'parentProductSkusByClient',
          'parentProductAmazonTitle',
          'parentProductAsin',
          'childProductAmazonTitle',
          'childProductSkusByClient',
          'childProductAsin',
          'title',
        ],
        {
          status: {
            $eq: this.currentSettings.statuses.join(','),
          },
        },
      ),
    )
  }

  // * Data getters

  async loadData() {
    this.getDataGridState()
    await this.getIdeaList()
    await this.getShopList()
  }

  async getIdeaList() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const response = await IdeaModel.getIdeaList({
        ...this.currentSettings.queries,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',

        filters: this.getFilters(),
      })

      runInAction(() => {
        this.ideaList = addIdDataConverter(response.rows) || []
        this.rowCount = response.count
      })

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log(error)
      this.error = error

      this.requestStatus = loadingStatuses.failed
    }
  }

  getCurrentData() {
    return toJS(this.ideaList)
  }

  async getShopList() {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const response = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopList = response
      })

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log(error)
      this.error = error

      this.requestStatus = loadingStatuses.failed
    }
  }

  async getDataForIdeaModal(row) {
    try {
      this.requestStatus = loadingStatuses.isLoading

      const result = await ProductModel.getProductById(row?.parentProduct?._id)
      runInAction(() => {
        this.currentProduct = result
        this.currentIdeaId = row._id
      })

      this.onTriggerOpenModal('showIdeaModal')

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log('error', error)
      this.requestStatus = loadingStatuses.failed
    }
  }
  // * Idea handlers

  async statusHandler(method, id) {
    try {
      this.requestStatus = loadingStatuses.isLoading
      await method(id)

      await this.getIdeaList()

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log(error)
      this.error = error
      this.requestStatus = loadingStatuses.failed
    }
  }

  handleStatusToCheck(id) {
    this.statusHandler(IdeaModel.setStatusToCheck, id)
  }

  handleStatusToReject(id) {
    this.statusHandler(IdeaModel.setStatusToReject, id)
  }

  handleStatusToSupplierSearch(id) {
    this.statusHandler(IdeaModel.setStatusToSupplierSearch, id)
  }

  handleStatusToProductCreating(id) {
    this.statusHandler(IdeaModel.setStatusToProductCreating, id)
  }

  handleStatusToAddingAsin(id) {
    this.statusHandler(IdeaModel.setStatusToAddingAsin, id)
  }

  handleStatusToFinished(id) {
    this.statusHandler(IdeaModel.setStatusToFinished, id)
  }

  handleRestore(id) {
    this.statusHandler(IdeaModel.restore, id)
  }

  async onSubmitRemoveIdea(ideaId) {
    try {
      await IdeaModel.removeIdea(ideaId)
      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  //  * Barcode handlers

  onClickBarcode(item) {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onDeleteBarcode(product) {
    try {
      await ClientModel.updateProductBarCode(product._id, { barCode: null })

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  showBarcodeOrHscode(barcode, hscode) {
    runInAction(() => {
      // this.currentHscode = hscode
      this.currentBarcode = barcode
    })
    this.onTriggerOpenModal('showBarcodeOrHscodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    runInAction(() => {
      this.uploadedFiles = []
    })

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    this.loadData()

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  // * Product handlers

  onClickParseProductData(item) {
    this.setSelectedProduct(item)
    this.onClickProductModal()
  }

  setSelectedProduct(item) {
    runInAction(() => {
      this.selectedProduct = item
    })
  }

  onClickProductModal() {
    this.history.push(`/client/ideas/add-asin?product-id=${this.selectedProduct._id}`)

    this.onTriggerOpenModal('productCardModal')
  }

  onClickShowProduct(row) {
    const win = window.open(
      `${window.location.origin}/client/inventory/product?product-id=${row.originalData._id}`,
      '_blank',
    )

    win.focus()
  }

  async editIdea(id, data, isForceUpdate) {
    try {
      await IdeaModel.editIdea(id, data)

      if (!isForceUpdate) {
        this.successModalTitle = t(TranslationKey['Idea edited'])

        this.onTriggerOpenModal('showSuccessModal')
      }
    } catch (error) {
      console.log(error)
    }
  }

  // * Modal handlers

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  async onClickBindButton(requests) {
    const methodBody =
      this.selectedIdea.status === ideaStatusByKey[ideaStatus.NEW] ||
      this.selectedIdea.status === ideaStatusByKey[ideaStatus.ON_CHECK]
        ? { onCheckedIdeaId: this.selectedIdea._id }
        : { onFinishedIdeaId: this.selectedIdea._id }

    for (const request of requests) {
      try {
        await RequestModel.bindIdeaToRequest(request, methodBody)
      } catch (error) {
        console.error('error', error)
      }
    }

    this.onTriggerOpenModal('showBindingModal')
  }

  async onSubmitCreateProduct(ideaData) {
    try {
      const createData = getObjectFilteredByKeyArrayWhiteList(
        {
          images: ideaData?.linksToMediaFiles,
          amazonTitle: ideaData?.productName,
          asin: ideaData?.parentProduct?.asin || '',
          suppliersIds: ideaData?.suppliers?.map(el => el._id),
          parentProductId: ideaData?.parentProduct?._id,
          clientComment: ideaData?.comments,
          lamazon: ideaData?.productLinks[0],
        },
        createProductByClient,
      )

      const result = await ClientModel.createProduct(createData)

      await this.editIdea(ideaData._id, { childProductId: result.guid })

      this.loadData()

      this.successModalTitle = t(TranslationKey['Product added'])
      this.onTriggerOpenModal('showSuccessModal')

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  // * Order handlers

  onClickToOrder(id) {
    this.history.push(`/client/my-orders/orders/order?orderId=${id}`)
  }

  async onClickCreateRequestButton(productId, asin) {
    this.history.push(`/${UserRoleCodeMapForRoutes[this.curUser.role]}/freelance/my-requests/create-request`, {
      parentProduct: { _id: productId, asin },
    })
  }

  async onClickLinkRequestButton(productId, idea) {
    try {
      const result = await RequestModel.getRequestsByProductLight(productId)
      runInAction(() => {
        this.requestsForProduct = addIdDataConverter(result)
        this.selectedIdea = idea
      })
      this.onTriggerOpenModal('showBindingModal')
    } catch (error) {
      console.log('error', error)
    }
  }

  onClickCreateProduct(ideaData) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to create a product?']),
      onClickConfirm: () => this.onSubmitCreateProduct(ideaData),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickCloseIdea(ideaId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to close this idea?']),
      onClickConfirm: () => this.onSubmitRemoveIdea(ideaId),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }
}
