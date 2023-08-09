import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { BatchStatus } from '@constants/statuses/batch-status'
import { freelanceRequestType, freelanceRequestTypeByCode } from '@constants/statuses/freelance-request-type'
import { ideaStatus, ideaStatusByKey, ideaStatusGroups, ideaStatusGroupsNames } from '@constants/statuses/idea-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, createProductByClient, patchSuppliers } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { IdeaModel } from '@models/ideas-model'
import { ProductModel } from '@models/product-model'
import { RequestModel } from '@models/request-model'
import { RequestProposalModel } from '@models/request-proposal'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { SupplierModel } from '@models/supplier-model'
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

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getTableByColumn, objectToUrlQs } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

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

const filtersFields = [
  'parentProductSkusByClient',
  'parentProductAmazonTitle',
  'parentProductAsin',
  'childProductAmazonTitle',
  'childProductSkusByClient',
  'childProductAsin',
  'title',
  'shopIds',
  'comments',
  'createdAt',
  'dateStatusOnCheck',
  'suppliers',
  'minlot',
  'productionTerm',
  'dateStatusProductCreating',
  'buyerComment',
  'dateStatusAddingAsin',
  'amount',
  'intervalStatusNew',
  'intervalStatusOnCheck',
  'intervalStatusSupplierSearch',
  'intervalStatusSupplierFound',
  'intervalStatusProductCreating',
  'intervalStatusAddingAsin',
  'intervalStatusFinished',
  'intervalsSum',
  'updatedAt',
  'amazonTitle',
  'asin',
  'skusByClient',
  'status',
]

export class ClientIdeasViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  progressValue = 0
  showProgress = false
  uploadedFiles = []

  // * Modals

  showBarcodeOrHscodeModal = false
  showSetBarcodeModal = false
  productCardModal = false

  showIdeaModal = false
  showBindingModal = false
  showConfirmModal = false
  showSuccessModal = false
  showProductLaunch = false
  showRequestDesignerResultModal = false
  showRequestBloggerResultModal = false
  showRequestStandartResultModal = false
  showOrderModal = false
  showAddOrEditSupplierModal = false

  // * Data

  readyImages = []
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

  ordersDataStateToSubmit = undefined

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
  productsToLaunch = []
  currentProposal = undefined

  paymentMethods = []

  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  // * Modal states

  confirmModalSettings = {
    isWarning: false,
    confirmMessage: '',
    onClickConfirm: () => {},
  }
  successModalTitle = ''
  isIdeaCreate = false

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  // * Table settings

  columnVisibilityModel = {}
  rowHandlers = {
    onClickToCheck: id => this.handleStatusToCheck(id),
    onClickReject: id => this.handleStatusToReject(id),
    onClickCreateRequest: (productId, asin) => this.onClickCreateRequestButton(productId, asin),
    onClickLinkRequest: (productId, idea) => this.onClickLinkRequestButton(productId, idea),
    onClickResultButton: (requestTypeTask, proposalId) => this.onClickResultButton(requestTypeTask, proposalId),
    onClickCreateCard: ideaData => this.onClickCreateProduct(ideaData),
    onClickSelectSupplier: ideaData => this.onTriggerAddOrEditSupplierModal(ideaData),
    onClickClose: ideaId => this.onClickCloseIdea(ideaId),
    onClickRestore: id => this.handleRestore(id),
    onClickAcceptOnCheckingStatus: id => this.handleStatusToSupplierSearch(id),
    onClickAcceptOnSuppliersSearch: id => this.handleStatusToProductCreating(id),
    onClickAcceptOnCreatingProduct: id => this.handleStatusToAddingAsin(id),
    onClickAcceptOnAddingAsin: id => this.handleStatusToFinished(id),
    onClickParseProductData: idea => this.onClickParseProductData(idea),
    onClickToOrder: id => this.onClickToOrder(id),
    onClickRequestId: id => this.onClickRequestId(id),

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
      this.getIdeaList()
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

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

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
    const statusFilterData = exclusion !== 'status' ? this.columnMenuSettings.status.currentFilterData : []

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
          ...(!statusFilterData.length && {
            status: {
              $eq: this.currentSettings.statuses.join(','),
            },
          }),
        },
      ),
    )
  }

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        ...dataGridFiltersInitializer(filtersFields),
      }
    })

    this.getIdeaList()
    this.getDataGridState()
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)
      console.log(123)
      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'ideas'),
        column,

        `ideas/pag/my?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        this.columnMenuSettings = {
          ...this.columnMenuSettings,
          [column]: { ...this.columnMenuSettings[column], filterData: data },
        }
      }

      this.setFilterRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        [field]: {
          ...this.columnMenuSettings[field],
          currentFilterData: value,
        },
      }
    })
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

      this.isIdeaCreate = false
      runInAction(() => {
        this.productId = row?.originalData?.parentProduct?._id
        this.currentIdeaId = row._id
      })

      this.onTriggerOpenModal('showIdeaModal')

      this.requestStatus = loadingStatuses.success
    } catch (error) {
      console.log('error', error)
      this.requestStatus = loadingStatuses.failed
    }
  }

  async onClickVariationRadioButton() {
    try {
      const result = await ClientModel.getProductPermissionsData({ ideaParent: true })
      this.productsToLaunch = result
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getSuppliersPaymentMethods() {
    this.paymentMethods = await SupplierModel.getSuppliersPaymentMethods()
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onTriggerAddOrEditSupplierModal(row) {
    try {
      if (!this.showAddOrEditSupplierModal) {
        this.requestStatus = loadingStatuses.isLoading

        const product = await ProductModel.getProductById(row?.parentProduct?._id)

        this.getSuppliersPaymentMethods()

        runInAction(() => {
          this.currentProduct = product
          this.currentIdeaId = row._id
        })

        const [result] = await Promise.all([UserModel.getPlatformSettings(), this.getStorekeepers()])

        runInAction(() => {
          this.yuanToDollarRate = result.yuanToDollarRate
          this.volumeWeightCoefficient = result.volumeWeightCoefficient
        })

        this.requestStatus = loadingStatuses.success
      }

      runInAction(() => {
        this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
      })
    } catch (error) {
      console.log(error)
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
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onClickConfirm: () => {
        this.statusHandler(IdeaModel.setStatusToCheck, id)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToReject(id) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to dismiss the idea']),
      onClickConfirm: () => {
        this.statusHandler(IdeaModel.setStatusToReject, id)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToSupplierSearch(id) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onClickConfirm: () => {
        this.statusHandler(IdeaModel.setStatusToSupplierSearch, id)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToProductCreating(id) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onClickConfirm: () => {
        this.statusHandler(IdeaModel.setStatusToProductCreating, id)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToAddingAsin(id) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onClickConfirm: () => {
        this.statusHandler(IdeaModel.setStatusToAddingAsin, id)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleStatusToFinished(id) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onClickConfirm: () => {
        this.statusHandler(IdeaModel.setStatusToFinished, id)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  handleRestore(id) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to restore the idea']),
      onClickConfirm: () => {
        this.statusHandler(IdeaModel.restore, id)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitRemoveIdea(ideaId) {
    try {
      await IdeaModel.setStatusToClosed(ideaId)
      this.loadData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickRequestId(id) {
    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.curUser.role]}/freelance/my-requests/custom-request?request-id=${id}`,
      '_blank',
    )

    win.focus()
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

  showBarcodeOrHscode(barcode /* , hscode */) {
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
    this.setActionStatus(loadingStatuses.isLoading)
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

    this.loadData()

    this.setRequestStatus(loadingStatuses.success)

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

  async onClickSaveSupplierBtn({ supplier, photosOfSupplier, editPhotosOfSupplier }) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      this.clearReadyImages()

      if (editPhotosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: this.readyImages,
      }

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: photosOfSupplier, type: 'readyImages' })
        supplier = {
          ...supplier,
          images: [...supplier.images, ...this.readyImages],
        }
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(supplier, patchSuppliers)
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.currentProduct.currentSupplierId) {
          runInAction(() => {
            this.currentProduct.currentSupplier = supplier
          })
          updateProductAutoCalculatedFields.call(this)
        }
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await IdeaModel.addSuppliersToIdea(this.currentIdeaId, { suppliersIds: [createSupplierResult.guid] })

        // await ProductModel.addSuppliersToProduct(this.currentProduct._id, [createSupplierResult.guid])

        // await ClientModel.updateProduct(this.currentProduct._id, {
        //   currentSupplierId: createSupplierResult.guid,
        // })
      }

      this.loadData()

      this.setRequestStatus(loadingStatuses.success)
      this.onTriggerAddOrEditSupplierModal()
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

  // * Order handlers

  async onClickToOrder(id) {
    try {
      this.requestStatus = loadingStatuses.isLoading
      const [storekeepers, destinations, platformSettings] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers
        this.destinations = destinations
        this.platformSettings = platformSettings
      })

      const result = await ProductModel.getProductById(id)
      runInAction(() => {
        this.currentProduct = result
      })

      this.onTriggerOpenModal('showOrderModal')
      this.requestStatus = loadingStatuses.success
    } catch (error) {
      this.requestStatus = loadingStatuses.failed
    }
  }

  async onClickCreateRequestButton(productId, asin) {
    const win = window.open(
      `/${
        UserRoleCodeMapForRoutes[this.curUser.role]
      }/freelance/my-requests/create-request?parentProduct=${productId}&asin=${asin}`,
      '_blank',
    )

    win.focus()
  }

  async onClickLinkRequestButton(productId, idea) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

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
      confirmMessage:
        t(TranslationKey['Are you sure you want to close this idea?']) +
        '\n' +
        t(TranslationKey['Once confirmed, the idea will be irretrievably lost/deleted']),
      onClickConfirm: () => this.onSubmitRemoveIdea(ideaId),
    }
    this.onTriggerOpenModal('showConfirmModal')
  }

  async onClickProductLaunch() {
    try {
      this.isIdeaCreate = true
      this.productId = undefined
      this.currentIdeaId = undefined
      this.onTriggerOpenModal('showProductLaunch')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickNextButton(chosenProduct) {
    runInAction(() => (this.currentProduct = chosenProduct))
    this.onTriggerOpenModal('showProductLaunch')
    this.onTriggerOpenModal('showIdeaModal')
  }

  async onClickResultButton(requestTypeTask, proposalId) {
    try {
      const result = await RequestProposalModel.getRequestProposalsCustom(proposalId)

      runInAction(() => {
        this.currentProposal = result
      })

      if (freelanceRequestTypeByCode[requestTypeTask] === freelanceRequestType.DESIGNER) {
        this.onTriggerOpenModal('showRequestDesignerResultModal')
      } else if (freelanceRequestTypeByCode[requestTypeTask] === freelanceRequestType.BLOGGER) {
        this.onTriggerOpenModal('showRequestBloggerResultModal')
      } else {
        this.onTriggerOpenModal('showRequestStandartResultModal')
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    runInAction(() => {
      this.ordersDataStateToSubmit = ordersDataState

      this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
        confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
          ? t(TranslationKey['Pending order will be created'])
          : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
        onClickConfirm: () => this.onSubmitOrderProductModal(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.error = undefined
      })
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        runInAction(() => {
          this.uploadedFiles = []
        })

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        await this.createOrder(orderObject)
      }

      if (!this.error) {
        runInAction(() => {
          this.alertShieldSettings = {
            showAlertShield: true,
            alertShieldMessage: t(TranslationKey['The order has been created']),
          }

          setTimeout(() => {
            this.alertShieldSettings = {
              ...this.alertShieldSettings,
              showAlertShield: false,
            }
            setTimeout(() => {
              this.alertShieldSettings = {
                showAlertShield: false,
                alertShieldMessage: '',
              }
            }, 1000)
          }, 3000)
        })
      }
      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayBlackList(orderObject, [
        'barCode',
        'tmpBarCode',
        'tmpIsPendingOrder',
        '_id',
      ])

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
        this.error = error
      })
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  clearReadyImages() {
    runInAction(() => {
      this.readyImages = []
    })
  }

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }
}
