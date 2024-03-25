import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { freelanceRequestType } from '@constants/statuses/freelance-request-type'
import { ideaStatus, ideaStatusByKey } from '@constants/statuses/idea-status'
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

import { clientNewIdeasColumns } from '@components/table/table-columns/client/client-ideas-columns'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { checkIsValidProposalStatusToShowResoult } from '@utils/checks'
import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { getCurrentSortingDirectionOfColumns } from '@utils/sortings'
import { getTableByColumn, objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { filtersFields, intervalFields } from './client-ideas-view.constants'
import { settingsByUrl } from './settings-by-url'

export class ClientIdeasViewModel {
  history = undefined
  requestStatus = undefined

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
  showMainRequestResultModal = false
  showOrderModal = false
  showSelectionSupplierModal = false
  showCommentsModal = false
  showAddOrEditSupplierModal = false

  // * Data

  readyImages = []
  ideaList = []
  shopList = []
  currentSettings = undefined
  selectedProduct = undefined
  currentBarcode = undefined
  currentHscode = undefined
  storekeepers = undefined
  destinations = undefined
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
  selectedIdeaId = undefined
  currentProduct = undefined
  requestsForProduct = []
  productsToLaunch = []
  productId = undefined
  currentProposal = undefined
  currentRequest = undefined
  paymentMethods = []

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
    onClickCreateRequest: ideaData => this.onClickCreateRequestButton(ideaData),
    onClickLinkRequest: (productId, idea) => this.onClickLinkRequestButton(productId, idea),
    onClickResultButton: request => this.onClickResultButton(request),
    onClickUnbindButton: requestId => this.onClickUnbindButton(requestId),
    onClickCreateCard: ideaData => this.onClickCreateProduct(ideaData),
    onClickClose: ideaId => this.onClickCloseIdea(ideaId),
    onClickRestore: id => this.handleRestore(id),
    onClickAcceptOnCheckingStatus: id => this.handleStatusToSupplierSearch(id),
    onClickAcceptOnSuppliersSearch: (id, ideaData) => this.handleStatusToProductCreating(id, ideaData),
    onClickAcceptOnCreatingProduct: id => this.handleStatusToAddingAsin(id),
    onClickAcceptOnAddingAsin: id => this.handleStatusToFinished(id),
    onClickParseProductData: idea => this.onClickParseProductData(idea),
    onClickToOrder: id => this.onClickToOrder(id),
    onClickRequestId: id => this.onClickRequestId(id),
    onClickAddSupplierButton: id => this.onClickAddSupplierButton(id),

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

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  get currentData() {
    return this.ideaList
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  constructor({ history }) {
    this.history = history
    this.currentSettings = settingsByUrl[history.location.pathname]
    this.handleUpdateColumnModel()

    this.isSearchForSuppliers = this.currentSettings.dataGridKey === DataGridTablesKeys.CLIENT_SEARCH_SUPPLIERS_IDEAS

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.shopList,
      () => this.handleUpdateColumnModel(),
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

    SettingsModel.setDataGridState(requestState, this.currentSettings.dataGridKey)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[this.currentSettings.dataGridKey]
    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  // * Filtration handlers

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  onChangeFilterModel(model) {
    this.filterModel = model
    this.setDataGridState()
    this.getIdeaList()
  }

  onPaginationModelChange(model) {
    this.paginationModel = model
    this.setDataGridState()
    this.getIdeaList()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model
    this.setDataGridState()
    this.getIdeaList()
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel
    this.setDataGridState()
    this.getIdeaList()
  }

  onChangeSearchValue(value) {
    this.currentSearchValue = value
    this.getIdeaList()
  }

  getFilters(exclusion) {
    const statusFilterData = exclusion !== 'status' ? this.columnMenuSettings.status.currentFilterData : []

    const commentsFilter =
      exclusion !== 'comments' && this.columnMenuSettings.comments?.currentFilterData.map(item => `"${item}"`).join(',')

    const buyerCommentFilter =
      exclusion !== 'buyerComment' &&
      this.columnMenuSettings.buyerComment?.currentFilterData.map(item => `"${item}"`).join(',')

    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.currentSearchValue,
        exclusion,
        filtersFields,
        [
          'parentProductSkuByClient',
          'parentProductAmazonTitle',
          'parentProductAsin',
          'childProductAmazonTitle',
          'childProductSkuByClient',
          'childProductAsin',
          'title',
        ],
        {
          ...(!statusFilterData.length && {
            status: {
              $eq: this.currentSettings.statuses.join(','),
            },
          }),
          ...(commentsFilter && {
            comments: { $eq: commentsFilter },
          }),

          ...(buyerCommentFilter && {
            buyerComment: { $eq: buyerCommentFilter },
          }),
        },
      ),
    )
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getIdeaList()
    this.getDataGridState()
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings.filterRequestStatus = requestStatus
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'ideas'),
        column,
        `ideas/pag/my?filters=${this.getFilters(column)}`,
      )

      if (this.columnMenuSettings[column]) {
        runInAction(() => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            [column]: { ...this.columnMenuSettings[column], filterData: data },
          }
        })
      }

      this.setFilterRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setFilterRequestStatus(loadingStatuses.FAILED)
      console.error(error)
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings[field].currentFilterData = value
  }

  // * Data getters

  loadData() {
    try {
      this.getDataGridState()
      this.getIdeaList()
      this.getShopList()
    } catch (error) {
      console.error(error)
    }
  }

  async getIdeaList() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const response = await IdeaModel.getIdeaList({
        ...this.currentSettings.queries,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : this.currentSettings.defaultSortingModel,
        sortType: getCurrentSortingDirectionOfColumns(this.sortModel, intervalFields),

        filters: this.getFilters(),
      })

      runInAction(() => {
        this.ideaList = addIdDataConverter(response.rows) || []
        this.rowCount = response.count
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.error(error)

      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async getShopList() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const response = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopList = response
      })

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.error(error)

      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async getDataForIdeaModal(idea) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const isChildProcuct =
        idea.childProduct && (idea.status === ideaStatusByKey.ADDING_ASIN || idea.status === ideaStatusByKey.VERIFIED)
      const currentProductId = isChildProcuct ? idea.childProduct._id : idea.parentProduct._id

      this.isIdeaCreate = false

      runInAction(() => {
        this.productId = currentProductId
        this.currentIdeaId = idea._id
        this.currentProduct = idea?.parentProduct
      })

      this.onTriggerOpenModal('showIdeaModal')

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onClickVariationRadioButton() {
    try {
      const result = await ClientModel.getProductPermissionsData({ isParent: true, isChild: false })
      this.productsToLaunch = result.rows
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.error(error)
    }
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  // * Idea handlers

  async statusHandler(method, id, addSupliersToParentProductData, data) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      await method(id, data)

      if (addSupliersToParentProductData) {
        await ProductModel.addSuppliersToProduct(
          addSupliersToParentProductData?.parentProduct?._id,
          addSupliersToParentProductData?.suppliers?.map(supplier => supplier._id),
        )
      }

      await this.getIdeaList()

      UserModel.getUsersInfoCounters()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.error(error)

      this.setRequestStatus(loadingStatuses.FAILED)
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

  handleStatusToReject(ideaId) {
    this.selectedIdea = ideaId
    this.onTriggerOpenModal('showCommentsModal')
  }

  setRejectStatusHandler(reasonReject) {
    this.statusHandler(IdeaModel.setStatusToReject, this.selectedIdea, undefined, { reasonReject })
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

  handleStatusToProductCreating(id, ideaData) {
    this.confirmModalSettings = {
      isWarning: false,
      confirmMessage: t(TranslationKey['Are you sure you want to change the status of an idea']),
      onClickConfirm: () => {
        this.statusHandler(
          ideaData?.variation ? IdeaModel.setStatusToProductCreating : IdeaModel.setStatusToAddingAsin,
          id,
          !ideaData?.variation && ideaData?.parentProduct?._id && ideaData,
        )
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
      console.error(error)
    }
  }

  onClickRequestId(id) {
    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/custom-request?request-id=${id}`,
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
      console.error(error)
    }
  }

  showBarcodeOrHscode(barcode /* , hscode */) {
    // this.currentHscode = hscode
    this.currentBarcode = barcode

    this.onTriggerOpenModal('showBarcodeOrHscodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    this.loadData()

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
    this.selectedProduct = item
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
      console.error(error)
    }
  }

  // * Modal handlers

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  async onClickBindButton(requests) {
    this.setRequestStatus(loadingStatuses.IS_LOADING)
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

    this.setRequestStatus(loadingStatuses.SUCCESS)

    this.onTriggerOpenModal('showBindingModal')
  }

  async onSubmitCreateProduct(ideaData) {
    try {
      const createData = getObjectFilteredByKeyArrayWhiteList(
        {
          images: ideaData?.linksToMediaFiles,
          amazonTitle: ideaData?.productName,
          asin: '',
          suppliersIds: ideaData?.suppliers?.map(el => el._id),
          parentProductId: ideaData?.parentProduct?._id,
          clientComment: ideaData?.comments,
          lamazon: ideaData?.productLinks[0],
          buyerId: ideaData?.parentProduct?.buyerId,
        },
        createProductByClient,
      )

      const result = await ClientModel.createProduct(createData)

      await this.editIdea(ideaData._id, { childProductId: result.guid })

      if (createData.suppliersIds?.length) {
        await ClientModel.updateProduct(result.guid, {
          currentSupplierId: createData.suppliersIds[0],
        })
      }

      this.loadData()

      this.successModalTitle = t(TranslationKey['Product added'])
      this.onTriggerOpenModal('showSuccessModal')

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn({ supplier, itemId, editPhotosOfSupplier, editPhotosOfUnit }) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
      }

      await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
      supplier = {
        ...supplier,
        images: this.readyImages,
      }

      await onSubmitPostImages.call(this, { images: editPhotosOfUnit, type: 'readyImages' })
      supplier = {
        ...supplier,
        imageUnit: this.readyImages,
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
          supplier,
          patchSuppliers,
          undefined,
          undefined,
          true,
        )
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)

        if (supplier._id === this.currentProduct.currentSupplierId) {
          runInAction(() => {
            this.currentProduct.currentSupplier = supplier
            updateProductAutoCalculatedFields.call(this)
          })
        }
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await IdeaModel.addSuppliersToIdea(itemId || this.selectedIdeaId, {
          suppliersIds: [createSupplierResult.guid],
        })
      }

      runInAction(() => {
        this.selectedIdeaId = undefined
      })

      this.loadData()

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  // * Order handlers

  async onClickToOrder(id) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      const [storekeepers, destinations] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers
        this.destinations = destinations
      })

      const result = await ProductModel.getProductById(id)
      runInAction(() => {
        this.currentProduct = result
      })

      this.onTriggerOpenModal('showOrderModal')
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
    }
  }

  async onClickCreateRequestButton(ideaData) {
    const isCreateByChildProduct = ideaData?.status >= ideaStatusByKey[ideaStatus.ADDING_ASIN] && ideaData?.childProduct

    const win = window.open(
      `/${UserRoleCodeMapForRoutes[this.userInfo.role]}/freelance/my-requests/create-request?parentProduct=${
        isCreateByChildProduct ? ideaData?.childProduct?._id : ideaData?.parentProduct?._id
      }&asin=${isCreateByChildProduct ? ideaData?.childProduct?.asin : ideaData?.parentProduct?.asin}`,
      '_blank',
    )

    win.focus()
  }

  async onClickLinkRequestButton(idea) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const isChildProcuct =
        idea.childProduct && (idea.status === ideaStatusByKey.ADDING_ASIN || idea.status === ideaStatusByKey.VERIFIED)
      const currentProductId = isChildProcuct ? idea.childProduct._id : idea.parentProduct._id

      const result = await RequestModel.getRequestsByProductLight({
        guid: currentProductId,
        status: 'DRAFT, PUBLISHED, IN_PROCESS',
        excludeIdeaId: idea._id,
      })

      runInAction(() => {
        this.requestsForProduct = addIdDataConverter(result)
        this.selectedIdea = idea
      })

      this.onTriggerOpenModal('showBindingModal')

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.error(error)

      this.setRequestStatus(loadingStatuses.FAILED)
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
        t(TranslationKey['Once confirmed, the idea will be closed without reopening']),
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
      console.error(error)
    }
  }

  async onClickNextButton(chosenProduct) {
    runInAction(() => {
      this.currentProduct = chosenProduct
      this.productId = chosenProduct?._id
    })

    if (!!chosenProduct && !chosenProduct?.buyerId && !chosenProduct?.originalData?.buyer?._id) {
      this.confirmModalSettings = {
        isWarning: true,
        confirmMessage: t(TranslationKey['The card does not fit, send to supplier search']),
        onClickConfirm: () => {
          this.onTriggerOpenModal('showSelectionSupplierModal')
          this.onTriggerOpenModal('showConfirmModal')
          this.onTriggerOpenModal('showProductLaunch')
        },
      }
      this.onTriggerOpenModal('showConfirmModal')
    } else {
      this.onTriggerOpenModal('showProductLaunch')
      this.onTriggerOpenModal('showIdeaModal')
    }
  }

  async onSubmitCalculateSeekSupplier(clientComment) {
    try {
      const result = await ClientModel.calculatePriceToSeekSupplier(this.productId)

      runInAction(() => {
        const priceForSeekSupplier = result.priceForClient

        this.confirmMessage = this.confirmModalSettings = {
          isWarning: false,
          confirmTitle: t(TranslationKey.Attention),
          confirmMessage: `${t(TranslationKey['The cost of the supplier search service will be'])} $${toFixed(
            result.priceForClient,
            2,
          )}.\n ${t(TranslationKey['Apply?'])}`,
          onClickConfirm: () => this.onSubmitSeekSupplier(clientComment, priceForSeekSupplier),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSeekSupplier(clientComment, priceForSeekSupplier) {
    try {
      await ClientModel.sendProductToSeekSupplier(this.productId, {
        clientComment,
        priceForClient: priceForSeekSupplier,
      })

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
    } catch (error) {
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
      console.error(error)
    }
  }

  async onClickResultButton(request) {
    try {
      const proposals = await RequestProposalModel.getRequestProposalsCustomByRequestId(request._id)

      runInAction(() => {
        this.currentProposal = proposals.find(proposal =>
          checkIsValidProposalStatusToShowResoult(proposal.proposal.status),
        )
        this.currentRequest = request
      })

      if (request?.spec?.title === freelanceRequestType.DESIGNER) {
        this.onTriggerOpenModal('showRequestDesignerResultModal')
      } else if (request?.spec?.title === freelanceRequestType.BLOGGER) {
        this.onTriggerOpenModal('showRequestBloggerResultModal')
      } else {
        this.onTriggerOpenModal('showMainRequestResultModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async unbindRequest(requestId) {
    try {
      await RequestModel.bindIdeaToRequest(requestId, { onCheckedIdeaId: null, onFinishedIdeaId: null })
      this.getIdeaList()
    } catch (error) {
      console.error('error', error)
    }
  }

  async onClickUnbindButton(requestId) {
    this.confirmModalSettings = {
      isWarning: true,
      confirmMessage: t(TranslationKey['Are you sure you want to unbind the request from the idea?']),
      onClickConfirm: () => {
        this.unbindRequest(requestId)
        this.onTriggerOpenModal('showConfirmModal')
      },
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    this.ordersDataStateToSubmit = ordersDataState

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        await this.createOrder(orderObject)
      }

      toast.success(t(TranslationKey['The order has been created']))

      this.onTriggerOpenModal('showConfirmModal')
      this.loadData()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.error(error)
    }
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayBlackList(orderObject, [
        'barCode',
        'tmpBarCode',
        'tmpIsPendingOrder',
        'tmpTransparencyFile',
        'transparency',
        '_id',
      ])

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }
    } catch (error) {
      console.error(error)

      runInAction(() => {
        this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      })
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  async onClickAddSupplierButton(id) {
    runInAction(() => {
      this.selectedIdeaId = id
    })

    await this.getSuppliersPaymentMethods()

    this.onTriggerOpenModal('showAddOrEditSupplierModal')
  }
}
