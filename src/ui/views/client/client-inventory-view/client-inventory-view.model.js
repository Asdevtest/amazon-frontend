import { makeAutoObservable, reaction, runInAction, toJS } from 'mobx'

import { poundsWeightCoefficient } from '@constants/configs/sizes-settings'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductDataParser } from '@constants/product/product-data-parser'
import { ProductStatus, ProductStatusByCode } from '@constants/product/product-status'
import { RequestStatus } from '@constants/requests/request-status'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier } from '@constants/white-list'

import { BatchesModel } from '@models/batches-model'
import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { GeneralModel } from '@models/general-model'
import { IdeaModel } from '@models/ideas-model'
import { OrderModel } from '@models/order-model'
import { OtherModel } from '@models/other-model'
import { ProductModel } from '@models/product-model'
import { SellerBoardModel } from '@models/seller-board-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { clientInventoryColumns } from '@components/table/table-columns/client/client-inventory-columns'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { addIdDataConverter, clientInventoryDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { parseFieldsAdapter } from '@utils/parse-fields-adapter'
import { getTableByColumn, objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

const fieldsOfProductAllowedToUpdate = [
  'dirdecision',
  'researcherFine',
  'researcherFineComment',
  'supervisorFine',
  'supervisorFineComment',
  'barCode',
  'clientComment',
]

const fieldsOfProductAllowedToCreate = [
  'lamazon',
  'lsupplier',
  'bsr',
  'status',
  'amazon',
  'fbafee',
  'reffee',
  'delivery',
  'icomment',
  'fba',
  'profit',
  'margin',
  'images',
  'width',
  'height',
  'length',
  'amazonTitle',
  'amazonDetail',
  'amazonDescription',
  'category',
  'weight',
  'minpurchase',
  'fbaamount',
  'strategyStatus',
  'currentSupplierId',
  'asin',
]

const filtersFields = [
  'shopIds',
  'asin',
  'skusByClient',
  'amazonTitle',
  'strategyStatus',
  'amountInOrders',
  'inTransfer',
  'stockUSA',
  'boxAmounts',
  'sumStock',
  'amazon',
  'createdAt',
  'updatedAt',
  'profit',
  'fbafee',
  'status',
  'reservedSum',
  'sentToFbaSum',
  'fbaFbmStockSum',
  'ideasOnCheck',
  'stockCost',
  'purchaseQuantity',
  'ideasClosed',
  'ideasFinished',
  'tags',
  'redFlags',
]

// const defaultHiddenFields = ['strategyStatus', 'createdAt', 'updatedAt']

export class ClientInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  product = undefined
  ordersDataStateToSubmit = undefined

  baseNoConvertedProducts = undefined
  productsMy = []
  productsMyBase = []
  withoutProduct = false
  withProduct = false
  user = undefined
  orders = []
  ideasData = []
  selectedRowIds = []
  sellerBoardDailyData = []
  storekeepers = []
  destinations = []
  shopsData = []
  currentShops = []
  ideaId = ''
  isArchive = false
  batchesData = []

  receivedFiles = undefined

  paymentMethods = []

  hsCodeData = {}

  curProduct = undefined

  // isNeedPurchaseFilter = null

  nameSearchValue = ''

  productsToLaunch = []
  productVariations = []
  selectedProductToLaunch = undefined

  existingProducts = []

  selectedRowId = undefined
  yuanToDollarRate = undefined
  platformSettings = undefined

  showOrderModal = false
  showSuccessModal = false

  showCheckPendingOrderFormModal = false
  showSetBarcodeModal = false
  showSelectionSupplierModal = false
  showAddOrEditSupplierModal = false
  selectedProduct = undefined
  showSendOwnProductModal = false
  showBindInventoryGoodsToStockModal = false
  showAddSupplierToIdeaFromInventoryModal = false
  showInfoModal = false
  showConfirmModal = false
  showSetChipValueModal = false
  showBarcodeOrHscodeModal = false
  showSetFourMonthsStockValueModal = false
  showCircularProgressModal = false
  showAddSuppliersModal = false
  showSetStockUsValueModal = false
  showProductLotDataModal = false
  showGetFilesModal = false
  showEditHSCodeModal = false
  productCardModal = false
  showProductLaunch = false
  showIdeaModal = false
  showProductVariationsForm = false

  successModalText = ''
  confirmMessage = ''
  showInfoModalTitle = ''
  currentBarcode = ''
  currentHscode = ''
  isModalOpen = false

  onHover = null

  isTransfer = false

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.onLeaveColumnField()
      this.getProductsMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    isNeedPurchaseFilterData: {
      isNeedPurchaseFilter: true,
      isNotNeedPurchaseFilter: true,
      onChangeIsNeedPurchaseFilter: (value, value2) => this.onChangeIsNeedPurchaseFilter(value, value2),
    },

    isHaveBarCodeFilterData: {
      isHaveBarCodeFilter: null,
      onChangeIsHaveBarCodeFilter: value => this.onChangeIsHaveBarCodeFilter(value),
    },

    ...filtersFields.reduce(
      (ac, cur) =>
        (ac = {
          ...ac,
          [cur]: {
            filterData: [],
            currentFilterData: [],
          },
        }),
      {},
    ),
  }

  barCodeHandlers = {
    onClickBarcode: item => this.onClickBarcode(item),
    onDoubleClickBarcode: item => this.onDoubleClickBarcode(item),
    onDeleteBarcode: item => this.onDeleteBarcode(item),
    showBarcodeOrHscode: (barCode, hsCode) => this.showBarcodeOrHscode(barCode, hsCode),
  }

  hsCodeHandlers = {
    onClickHsCode: item => this.onClickHsCode(item),
    onDoubleClickHsCode: item => this.onDoubleClickHsCode(item),
    onDeleteHsCode: item => this.onDeleteHsCode(item),
    showBarcodeOrHscode: (barCode, hsCode) => this.showBarcodeOrHscode(barCode, hsCode),
  }

  fourMonthesStockHandlers = {
    onClickSaveFourMonthsStock: (item, value) => this.onClickSaveFourMonthesStockValue(item, value),
  }

  stockUsHandlers = {
    onClickSaveStockUs: (item, value) => this.onClickSaveStockUs(item, value),
  }

  otherHandlers = {
    onClickInStock: (item, storekeeper) => this.onClickInStock(item, storekeeper),
    onClickInTransfer: productId => this.onClickInTransfer(productId),
    onClickOrderCell: productId => this.onClickOrderCell(productId),
    onClickShowProduct: row => this.onClickShowProduct(row),
    onClickVariationButton: id => this.onClickVariationButton(id),
  }

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  currentData = []

  readyImages = []
  progressValue = 0
  showProgress = false

  rowCount = 0
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = clientInventoryColumns(
    this.barCodeHandlers,
    this.hsCodeHandlers,
    this.fourMonthesStockHandlers,
    this.stockUsHandlers,
    this.otherHandlers,
    () => this.columnMenuSettings,
    () => this.onHover,
  )
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(el => this.columnMenuSettings[el]?.currentFilterData.length)
  }

  constructor({ history, location }) {
    runInAction(() => {
      this.history = history
    })

    if (location.state) {
      runInAction(() => {
        this.isArchive = location.state.isArchive
        this.isModalOpen = location.state.isModalOpen
      })

      const state = { ...history.location.state }
      delete state.isModalOpen
      history.replace({ ...history.location, state })
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.productsMy,
      () =>
        runInAction(() => {
          this.currentData = this.getCurrentData()
        }),
    )
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onChangeFilterModel(model) {
    runInAction(() => {
      this.filterModel = model
    })

    this.setDataGridState()
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
    this.getProductsMy()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
    this.getProductsMy()
  }

  onClickShowProduct(id) {
    const win = window.open(`${window.location.origin}/client/inventory/product?product-id=${id}`, '_blank')

    win.focus()
  }

  onClickProductModal(row) {
    if (window.getSelection().toString()) {
      return
    }
    if (row) {
      this.isArchive
        ? this.history.push(`/client/inventory/archive?product-id=${row.originalData._id}`)
        : this.history.push(`/client/inventory?product-id=${row.originalData._id}`)
    } else {
      this.isArchive ? this.history.push(`/client/inventory/archive`) : this.history.push(`/client/inventory`)
    }

    this.onTriggerOpenModal('productCardModal')
  }

  onClickPandingOrder(id) {
    const win = window.open(`${window.location.origin}/client/my-orders/pending-orders/order?orderId=${id}`, '_blank')
    win.focus()
  }

  onClickInStock(boxId, storekeeper) {
    const win = window.open(
      `${window.location.origin}/client/warehouse/in-stock?storekeeper-id=${storekeeper?._id}&search-text=${boxId}`,
      '_blank',
    )

    win.focus()
  }

  onClickOrderCell(productId) {
    const win = window.open(
      `${window.location.origin}/client/inventory/product?product-id=${productId}&show-tab=orders`,
      '_blank',
    )

    win.focus()
  }

  onHoverColumnField(field) {
    this.onHover = field
  }

  onLeaveColumnField() {
    this.onHover = null
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_INVENTORY)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_INVENTORY]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  async onClickVariationButton(id) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const result = await ProductModel.getProductsVariationsByGuid(id)
      runInAction(() => {
        this.productVariations = result
      })

      this.onTriggerOpenModal('showProductVariationsForm')

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
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
    this.setDataGridState()

    this.getProductsMy()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  getCurrentData() {
    return toJS(this.productsMy)
  }

  onSearchSubmit(searchValue) {
    runInAction(() => {
      this.nameSearchValue = searchValue
    })

    this.getProductsMy()
  }

  async uploadTemplateFile(file) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.showProgress = true
      })
      const result = await OtherModel.postTemplate(file)
      runInAction(() => {
        this.showProgress = false
      })
      this.onTriggerOpenModal('showAddSuppliersModal')

      const blob = new Blob([result.data], { type: result.headers['content-type'] })
      const url = window.URL.createObjectURL(blob)

      runInAction(() => {
        this.receivedFiles = url
      })

      this.onTriggerOpenModal('showGetFilesModal')
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  checkIsNoEditProductSelected() {
    return this.selectedRowIds.some(prodId => {
      const findProduct = this.productsMy.find(prod => prod._id === prodId)

      return [
        ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
        ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
        ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
        ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
        ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
        ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ].includes(ProductStatusByCode[findProduct?.originalData.status])
    })
  }

  onClickTriggerArchOrResetProducts() {
    if (this.checkIsNoEditProductSelected()) {
      runInAction(() => {
        this.showInfoModalTitle = t(TranslationKey['Product with invalid status selected'])
      })
      this.onTriggerOpenModal('showInfoModal')
      return
    }

    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: this.isArchive ? false : true,
        confirmTitle: this.isArchive ? t(TranslationKey['Return to Inventory']) : t(TranslationKey['Delete a card']),
        confirmMessage: this.isArchive
          ? t(TranslationKey['After confirmation, the card will be moved to the Inventory. Continue?'])
          : t(TranslationKey['After confirmation, the card will be moved to the archive. Move?']),
        onClickConfirm: () => this.onSubmitTriggerArchOrResetProducts(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitTriggerArchOrResetProducts() {
    try {
      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const productId = this.selectedRowIds[i]

        await ClientModel.updateProduct(productId, { archive: this.isArchive ? false : true })
      }

      this.onTriggerOpenModal('showConfirmModal')
      await this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerArchive() {
    runInAction(() => {
      this.selectedRowIds = []
    })

    this.isArchive
      ? this.history.push('/client/inventory', { isArchive: !this.isArchive })
      : this.history.push('/client/inventory/archive', { isArchive: !this.isArchive })
  }

  async getSuppliersPaymentMethods() {
    this.paymentMethods = await SupplierModel.getSuppliersPaymentMethods()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await Promise.all([this.getShops(), this.getProductsMy()])

      this.isModalOpen && this.onTriggerOpenModal('showSendOwnProductModal')

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickVariationRadioButton() {
    try {
      const result = await ClientModel.getProductPermissionsData({ isChild: false })
      this.productsToLaunch = result
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickProductLaunch() {
    try {
      const result = this.currentData?.find(
        product => product?.originalData?._id === this.selectedRowIds?.[0] && !product?.originalData?.parentProductId,
      )
      runInAction(() => (this.selectedProductToLaunch = result))

      this.onTriggerOpenModal('showProductLaunch')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async onClickNextButton(chosenProduct) {
    runInAction(() => (this.selectedProductToLaunch = chosenProduct?.originalData || chosenProduct))

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

  async onClickOrderBtn() {
    try {
      runInAction(() => {
        this.showCircularProgressModal = true
      })

      const resultArray = []

      for await (const id of this.selectedRowIds) {
        await OrderModel.checkPendingOrderByProductGuid(id).then(result => {
          if (result?.length) {
            const currentProduct = this.currentData.find(product => product?.originalData?._id === id)

            const resultObject = {
              asin: currentProduct?.originalData?.asin,
              orders: result,
            }

            resultArray.push(resultObject)
          }
        })
      }

      if (resultArray?.length) {
        runInAction(() => {
          this.existingProducts = resultArray
        })

        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      } else {
        await this.onClickContinueBtn()
      }
    } catch (error) {
      console.log(error)
    } finally {
      runInAction(() => {
        this.showCircularProgressModal = false
      })
    }
  }

  async onClickContinueBtn() {
    const [storekeepers, destinations, result] = await Promise.all([
      StorekeeperModel.getStorekeepers(),
      ClientModel.getDestinations(),
      UserModel.getPlatformSettings(),
    ])

    runInAction(() => {
      this.storekeepers = storekeepers
      this.destinations = destinations
      this.platformSettings = result
    })

    this.onTriggerOpenModal('showOrderModal')

    if (this.showCheckPendingOrderFormModal) {
      this.onTriggerOpenModal('showCheckPendingOrderFormModal')
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShopNames()

      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onClickPrevButton = () => {
    this.onTriggerOpenModal('showAddOrEditSupplierModal')
    this.onTriggerOpenModal('showSelectionSupplierModal')
  }

  async getIdeas() {
    try {
      const result = await IdeaModel.getIdeas(this.selectedRowIds.slice()[0])

      runInAction(() => {
        this.ideasData = [...result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))]
      })
    } catch (error) {
      console.log(error)
    }
  }

  onChangeIsNeedPurchaseFilter(isNotNeedPurchaseFilter, isNeedPurchaseFilter) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        isNeedPurchaseFilterData: {
          ...this.columnMenuSettings.isNeedPurchaseFilterData,
          isNeedPurchaseFilter,
          isNotNeedPurchaseFilter,
        },
      }
    })

    this.getProductsMy()
  }

  onChangeIsHaveBarCodeFilter(value) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        isHaveBarCodeFilterData: {
          ...this.columnMenuSettings.isHaveBarCodeFilterData,
          isHaveBarCodeFilter: value,
        },
      }
    })

    this.getProductsMy()
  }

  setFilterRequestStatus(requestStatus) {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        filterRequestStatus: requestStatus,
      }
    })
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.isLoading)

      const shops = this.currentShops.map(item => item._id).join(',') // Похоже будет лишним
      const curShops = this.columnMenuSettings.shopIds.currentFilterData?.map(shop => shop._id).join(',')
      const shopFilter = shops
        ? shops
        : this.columnMenuSettings.shopIds.currentFilterData && column !== 'shopIds'
        ? curShops
        : null

      const purchaseQuantityAboveZero =
        this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter &&
        this.columnMenuSettings.isNeedPurchaseFilterData.isNotNeedPurchaseFilter
          ? ''
          : this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,

        `clients/products/my_with_pag?filters=${this.getFilter(column)}${
          shopFilter ? `;&[shopIds][$eq]=${shopFilter}` : ''
        }&purchaseQuantityAboveZero=${purchaseQuantityAboveZero}`,
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

  onClickResetFilters() {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,

        ...filtersFields.reduce(
          (ac, cur) =>
            (ac = {
              ...ac,
              [cur]: {
                filterData: [],
                currentFilterData: [],
              },
            }),
          {},
        ),
      }
    })

    this.getProductsMy()
    this.getDataGridState()
  }

  getFilter(exclusion) {
    const asinFilter = exclusion !== 'asin' && this.columnMenuSettings.asin.currentFilterData.join(',')
    const skusByClientFilter =
      exclusion !== 'skusByClient' &&
      this.columnMenuSettings.skusByClient.currentFilterData /* .map(el => `"${el}"`) */
        .join(',')
    const amazonTitleFilter =
      exclusion !== 'amazonTitle' &&
      this.columnMenuSettings.amazonTitle.currentFilterData.map(el => `"${el}"`).join(',')

    const createdAtFilter = exclusion !== 'createdAt' && this.columnMenuSettings.createdAt.currentFilterData.join(',')
    const updatedAtFilter = exclusion !== 'updatedAt' && this.columnMenuSettings.updatedAt.currentFilterData.join(',')

    const strategyStatusFilter =
      exclusion !== 'strategyStatus' && this.columnMenuSettings.strategyStatus.currentFilterData.join(',')
    const amountInOrdersFilter =
      exclusion !== 'amountInOrders' && this.columnMenuSettings.amountInOrders.currentFilterData.join(',')
    const stockUSAFilter = exclusion !== 'stockUSA' && this.columnMenuSettings.stockUSA.currentFilterData.join(',')
    const inTransferFilter =
      exclusion !== 'inTransfer' && this.columnMenuSettings.inTransfer.currentFilterData.join(',')
    const boxAmountsFilter =
      exclusion !== 'boxAmounts' && this.columnMenuSettings.boxAmounts.currentFilterData.map(el => el._id).join(',')
    const sumStockFilter = exclusion !== 'sumStock' && this.columnMenuSettings.sumStock.currentFilterData.join(',')
    const amazonFilter = exclusion !== 'amazon' && this.columnMenuSettings.amazon.currentFilterData.join(',')
    const profitFilter = exclusion !== 'profit' && this.columnMenuSettings.profit.currentFilterData.join(',')
    const fbafeeFilter = exclusion !== 'fbafee' && this.columnMenuSettings.fbafee.currentFilterData.join(',')
    const statusFilter = exclusion !== 'status' && this.columnMenuSettings.status.currentFilterData.join(',')
    const ideaCountFilter =
      exclusion !== 'ideasOnCheck' && this.columnMenuSettings.ideasOnCheck.currentFilterData.join(',')

    const fbaFbmStockSumFilter =
      exclusion !== 'fbaFbmStockSum' && this.columnMenuSettings.fbaFbmStockSum.currentFilterData.join(',')
    const reservedSumFilter =
      exclusion !== 'reservedSum' && this.columnMenuSettings.reservedSum.currentFilterData.join(',')
    const sentToFbaSumFilter =
      exclusion !== 'sentToFbaSum' && this.columnMenuSettings.sentToFbaSum.currentFilterData.join(',')

    const stockCostFilter = exclusion !== 'stockCost' && this.columnMenuSettings.stockCost.currentFilterData.join(',')

    const purchaseQuantityFilter =
      exclusion !== 'purchaseQuantity' && this.columnMenuSettings.purchaseQuantity.currentFilterData.join(',')

    const ideasClosedFilter =
      exclusion !== 'ideasClosed' && this.columnMenuSettings.ideasClosed.currentFilterData.join(',')
    const ideasVerifiedFilter =
      exclusion !== 'ideasFinished' && this.columnMenuSettings.ideasFinished.currentFilterData.join(',')

    const tagsFilter =
      exclusion !== 'tags' && this.columnMenuSettings.tags.currentFilterData.map(el => el._id).join(',')

    const redFlagsFilter =
      exclusion !== 'redFlags' && this.columnMenuSettings.redFlags.currentFilterData.map(el => el._id).join(',')

    const filter = objectToUrlQs({
      archive: { $eq: this.isArchive },
      or: [
        { asin: { $contains: this.nameSearchValue } },
        { amazonTitle: { $contains: this.nameSearchValue } },
        { skusByClient: { $contains: this.nameSearchValue } },
      ],

      ...(asinFilter && {
        asin: { $eq: asinFilter },
      }),
      ...(skusByClientFilter && {
        skusByClient: { $eq: skusByClientFilter },
      }),
      ...(amazonTitleFilter && {
        amazonTitle: { $eq: amazonTitleFilter },
      }),

      ...(createdAtFilter && {
        createdAt: { $eq: createdAtFilter },
      }),
      ...(updatedAtFilter && {
        updatedAt: { $eq: updatedAtFilter },
      }),

      ...(strategyStatusFilter && {
        strategyStatus: { $eq: strategyStatusFilter },
      }),

      ...(amountInOrdersFilter && {
        amountInOrders: { $eq: amountInOrdersFilter },
      }),

      ...(stockUSAFilter && {
        stockUSA: { $eq: stockUSAFilter },
      }),
      ...(inTransferFilter && {
        inTransfer: { $eq: inTransferFilter },
      }),
      ...(boxAmountsFilter && {
        boxAmounts: { $eq: boxAmountsFilter },
      }),

      ...(sumStockFilter && {
        sumStock: { $eq: sumStockFilter },
      }),

      ...(amazonFilter && {
        amazon: { $eq: amazonFilter },
      }),
      ...(profitFilter && {
        profit: { $eq: profitFilter },
      }),
      ...(fbafeeFilter && {
        fbafee: { $eq: fbafeeFilter },
      }),

      ...(statusFilter && {
        status: { $eq: statusFilter },
      }),

      ...(fbaFbmStockSumFilter && {
        fbaFbmStockSum: { $eq: fbaFbmStockSumFilter },
      }),
      ...(reservedSumFilter && {
        reservedSum: { $eq: reservedSumFilter },
      }),
      ...(sentToFbaSumFilter && {
        sentToFbaSum: { $eq: sentToFbaSumFilter },
      }),

      ...(ideaCountFilter && {
        ideasOnCheck: { $eq: ideaCountFilter },
      }),

      ...(this.columnMenuSettings.isHaveBarCodeFilterData.isHaveBarCodeFilter !== null && {
        barCode: { [this.columnMenuSettings.isHaveBarCodeFilterData.isHaveBarCodeFilter ? '$null' : '$notnull']: true },
      }),

      ...(stockCostFilter && {
        stockCost: { $eq: stockCostFilter },
      }),

      ...(purchaseQuantityFilter && {
        purchaseQuantity: { $eq: purchaseQuantityFilter },
      }),

      ...(ideasClosedFilter && {
        ideasClosed: { $eq: ideasClosedFilter },
      }),

      ...(ideasVerifiedFilter && {
        ideasFinished: { $eq: ideasVerifiedFilter },
      }),

      ...(tagsFilter && {
        tags: { $any: tagsFilter },
      }),

      ...(redFlagsFilter && {
        redFlags: { $any: redFlagsFilter },
      }),
    })

    return filter
  }

  async getProductsMy(noProductBaseUpdate) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const shops = this.currentShops.map(item => item._id).join(',') // Похоже будет лишним

      const curShops = this.columnMenuSettings.shopIds.currentFilterData?.map(shop => shop._id).join(',')

      const purchaseQuantityAboveZero =
        this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter &&
        this.columnMenuSettings.isNeedPurchaseFilterData.isNotNeedPurchaseFilter
          ? null
          : this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter

      const result = await ClientModel.getProductsMyFilteredByShopIdWithPag({
        filters: this.getFilter(), // this.nameSearchValue ? filter : null,

        shopIds: shops ? shops : this.columnMenuSettings.shopIds.currentFilterData ? curShops : null,

        purchaseQuantityAboveZero,

        limit: this.paginationModel.pageSize,
        offset: this.paginationModel.page * this.paginationModel.pageSize,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'sumStock',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.baseNoConvertedProducts = result

        this.rowCount = result.count

        this.productsMy = clientInventoryDataConverter(result.rows, this.shopsData)

        if (!noProductBaseUpdate) {
          this.productsMyBase = clientInventoryDataConverter(result.rows, this.shopsData)
        }
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      runInAction(() => {
        this.rowCount = 0

        this.productsMy = []
        this.baseNoConvertedProducts = []
      })

      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async onClickSaveHsCode(hsCode) {
    await ProductModel.editProductsHsCods([
      {
        productId: this.selectedProduct._id,
        chinaTitle: hsCode.chinaTitle || null,
        hsCode: hsCode.hsCode || null,
        material: hsCode.material || null,
        productUsage: hsCode.productUsage || null,
      },
    ])

    this.onTriggerOpenModal('showEditHSCodeModal')
    this.loadData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onClickSaveBarcode(tmpBarCode) {
    runInAction(() => {
      this.uploadedFiles = []
    })

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    const noProductBaseUpdate = true
    this.getProductsMy(noProductBaseUpdate)

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onSaveProductData(productId, updateProductData) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)

      const updateProductDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        toJS(updateProductData),
        fieldsOfProductAllowedToUpdate,
        true,
      )

      await ClientModel.updateProduct(productId, updateProductDataFiltered)
      await this.loadData()
      this.setActionStatus(loadingStatuses.success)
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

  onClickBarcode(item) {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickHsCode(item) {
    this.setSelectedProduct(item)
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(this.selectedProduct._id)

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onClickSaveFourMonthesStockValue(productId, fourMonthesStock) {
    try {
      await ClientModel.updateProductFourMonthesStock(productId, { fourMonthesStock })

      this.getProductsMy()
    } catch (error) {
      console.log(error)
    }
  }

  showBarcodeOrHscode(barcode, hscode) {
    runInAction(() => {
      this.currentHscode = hscode
      this.currentBarcode = barcode
    })
    this.onTriggerOpenModal('showBarcodeOrHscodeModal')
  }

  async onClickSaveStockUs(productId, value) {
    try {
      await ClientModel.editProductsStockUS(productId, {
        stockUSA: value,
      })

      this.getProductsMy()
    } catch (error) {
      console.log(error)
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
        onClickConfirm: () => {
          this.onTriggerOpenModal('showConfirmModal')
          this.onSubmitOrderProductModal()
        },
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      runInAction(() => {
        this.error = undefined
        this.showProgress = true
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

      runInAction(() => {
        this.showProgress = false
      })

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

      const noProductBaseUpdate = true
      await this.getProductsMy(noProductBaseUpdate)

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

      await this.updateUserInfo()
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
        this.error = error
      })
      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async createIdea(data) {
    try {
      const resId = await IdeaModel.createIdea({ ...data, price: data.price || 0, quantity: data.quantity || 0 })
      runInAction(() => {
        this.ideaId = resId.guid
      })
    } catch (error) {
      console.log(error)
    }
  }

  async createSupplierSearchRequest(curId, ideaData, data) {
    try {
      if (curId) {
        await IdeaModel.createSupplierSearchRequestForIdea(curId, data)
        await IdeaModel.editSupplierSearchRequestStatus(curId, {
          requestStatus: RequestStatus.READY_TO_VERIFY_BY_SUPERVISOR,
        })
      } else {
        await this.createIdea(ideaData)
        await IdeaModel.createSupplierSearchRequestForIdea(this.ideaId, data)
        await IdeaModel.editSupplierSearchRequestStatus(this.ideaId, {
          requestStatus: RequestStatus.READY_TO_VERIFY_BY_SUPERVISOR,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSaveSupplier({ supplier, photosOfSupplier, addMore, makeMainSupplier }) {
    try {
      runInAction(() => {
        this.readyImages = []
      })

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, { images: photosOfSupplier, type: 'readyImages' })
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }

      const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
      const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)
      await ProductModel.addSuppliersToProduct(this.selectedRowId, [createSupplierResult.guid])

      if (makeMainSupplier) {
        await ClientModel.updateProduct(this.selectedRowId, {
          currentSupplierId: createSupplierResult.guid,
        })
      }

      runInAction(() => {
        this.successModalText = t(TranslationKey['Supplier added'])
      })
      this.onTriggerOpenModal('showSuccessModal')

      this.loadData()

      !addMore && this.onTriggerOpenModal('showAddOrEditSupplierModal')
    } catch (error) {
      !addMore && this.onTriggerOpenModal('showAddOrEditSupplierModal')

      console.log(error)
      runInAction(() => {
        this.error = error
        this.showInfoModalTitle = t(TranslationKey.Error)
      })

      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async onClickAddSupplierButton() {
    try {
      const [result] = await Promise.all([UserModel.getPlatformSettings(), this.getSuppliersPaymentMethods()])

      runInAction(() => {
        this.yuanToDollarRate = result.yuanToDollarRate
        this.platformSettings = result
      })

      this.onTriggerOpenModal('showAddOrEditSupplierModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickParseProductsBtn() {
    try {
      if (this.checkIsNoEditProductSelected()) {
        runInAction(() => {
          this.showInfoModalTitle = t(TranslationKey['Product with invalid status selected'])
        })
        this.onTriggerOpenModal('showInfoModal')
        return
      }

      runInAction(() => {
        this.showCircularProgressModal = true
      })

      await SellerBoardModel.refreshProducts(this.selectedRowIds)

      this.loadData()

      runInAction(() => {
        this.successModalText = t(TranslationKey['Products will be updated soon'])
      })
      this.onTriggerOpenModal('showSuccessModal')
      this.showCircularProgressModal = false
    } catch (error) {
      runInAction(() => {
        this.showCircularProgressModal = false
      })

      runInAction(() => {
        this.showInfoModalTitle = t(TranslationKey['Parsing data not updated'])
      })
      this.onTriggerOpenModal('showInfoModal')

      console.log(error)
    }
  }

  async onClickAddSupplierBtn() {
    try {
      this.selectedProductToLaunch = undefined

      if (this.checkIsNoEditProductSelected()) {
        runInAction(() => {
          this.showInfoModalTitle = t(TranslationKey['Product with invalid status selected'])
        })
        this.onTriggerOpenModal('showInfoModal')
        return
      }

      if (this.selectedRowIds.length > 1) {
        const result = await ClientModel.calculatePriceToSeekSomeSuppliers(this.selectedRowIds)
        runInAction(() => {
          this.confirmMessage = this.confirmModalSettings = {
            isWarning: false,
            confirmTitle: t(TranslationKey.Attention),
            confirmMessage: `${t(TranslationKey['The cost of the supplier search service will be'])} $${toFixed(
              result.priceForClient,
              2,
            )}.\n ${t(TranslationKey['Apply?'])}`,
            onClickConfirm: () => this.onSubmitSeekSomeSuppliers(),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        runInAction(() => {
          this.selectedRowId = this.selectedRowIds[0]
        })
        this.onTriggerOpenModal('showSelectionSupplierModal')
      }
      this.getIdeas()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickInTransfer(productId) {
    try {
      const result = await BoxesModel.getBoxesInTransfer(productId)
      runInAction(() => {
        this.isTransfer = true

        this.batchesData = result

        this.curProduct = this.currentData.filter(product => productId === product.id).map(prod => prod.originalData)
      })
      this.onTriggerOpenModal('showProductLotDataModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickProductLotDataBtn() {
    try {
      const result = await BatchesModel.getBatchesbyProduct(this.selectedRowIds[0], { archive: false })
      runInAction(() => {
        this.isTransfer = false
        this.batchesData = result

        this.curProduct = this.currentData
          .filter(product => this.selectedRowIds.includes(product.id))
          .map(prod => prod.originalData)
      })
      this.onTriggerOpenModal('showProductLotDataModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickToggleArchiveProductLotData(isArchive) {
    try {
      const result = await BatchesModel.getBatchesbyProduct(this.selectedRowIds[0], { archive: isArchive })
      runInAction(() => {
        this.batchesData = result
      })
    } catch (error) {
      console.log(error)

      runInAction(() => {
        this.batchesData = []
      })
    }
  }

  async onSubmitCalculateSeekSupplier(clientComment) {
    try {
      const result = await ClientModel.calculatePriceToSeekSupplier(
        this.selectedProductToLaunch?._id || this.selectedRowId,
      )

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
      console.log(error)
    }
  }

  async onSubmitSeekSomeSuppliers() {
    try {
      await ClientModel.sendProductToSeekSomeSuppliers(this.selectedRowIds)

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSeekSupplier(clientComment, priceForSeekSupplier) {
    try {
      await ClientModel.sendProductToSeekSupplier(this.selectedProductToLaunch?._id || this.selectedRowId, {
        clientComment,
        priceForClient: priceForSeekSupplier,
      })

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
    } catch (error) {
      console.log(error)
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
    }
  }

  async parseAmazon(asin) {
    try {
      const parseResult = await ProductModel.parseAmazon(asin)

      runInAction(() => {
        if (Object.keys(parseResult).length > 5) {
          // проверка, что ответ не пустой (иначе приходит объект {length: 2})
          this.product = {
            ...this.product,
            ...parseFieldsAdapter(parseResult, ProductDataParser.AMAZON),
            weight:
              this.product.weight > parseResult.weight * poundsWeightCoefficient
                ? this.product.weight
                : parseResult.weight * poundsWeightCoefficient,
            amazonDescription: parseResult.info?.description || this.product.amazonDescription,
            amazonDetail: parseResult.info?.detail || this.product.amazonDetail,
            fbafee: this.product.fbafee,
          }
        }
        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async parseParseSellerCentral(asin) {
    try {
      const parseResult = await ProductModel.parseParseSellerCentral(asin)

      runInAction(() => {
        if (Object.keys(parseResult).length > 5) {
          // проверка, что ответ не пустой (иначе приходит объект {length: 2})
          this.product = {
            ...this.product,
            ...parseFieldsAdapter(parseResult, ProductDataParser.SELLCENTRAL),
            weight:
              this.product.weight > parseResult.weight * poundsWeightCoefficient
                ? this.product.weight
                : parseResult.weight * poundsWeightCoefficient,
            amazonDescription: parseResult.info?.description || this.product.amazonDescription,
            amazonDetail: parseResult.info?.detail || this.product.amazonDetail,
            fbafee: this.product.fbafee,
          }
        }
        updateProductAutoCalculatedFields.call(this)
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitCreateProduct(data, photosOfNewProduct, isNoAsin) {
    try {
      this.onTriggerOpenModal('showSendOwnProductModal')

      runInAction(() => {
        this.showCircularProgressModal = true
      })

      if (!isNoAsin) {
        runInAction(() => {
          this.product = { asin: data.asin, lamazon: data.lamazon, fba: true, images: [] }
        })

        await Promise.all([this.parseAmazon(data.asin), this.parseParseSellerCentral(data.asin)])

        const curUpdateProductData = getObjectFilteredByKeyArrayWhiteList(
          toJS(this.product),
          fieldsOfProductAllowedToCreate,
          true,
          (key, value) => {
            switch (key) {
              case 'bsr':
                return (value && parseInt(value)) || 0
              case 'amazon':
                return (value && parseFloat(value)) || 0
              case 'weight':
                return (value && parseFloat(value)) || 0
              case 'length':
                return (value && parseFloat(value)) || 0
              case 'width':
                return (value && parseFloat(value)) || 0
              case 'height':
                return (value && parseFloat(value)) || 0
              case 'fbaamount':
                return (value && parseFloat(value)) || 0
              case 'fbafee':
                return (value && parseFloat(value)) || 0
              case 'profit':
                return value && parseFloat(value)
              default:
                return value
            }
          },
        )

        const result = await ClientModel.createProduct(curUpdateProductData)

        if (result) {
          runInAction(() => {
            this.selectedRowId = result.guid
          })

          this.onTriggerOpenModal('showSelectionSupplierModal')
        }
      } else {
        if (photosOfNewProduct.length) {
          await onSubmitPostImages.call(this, { images: photosOfNewProduct, type: 'readyImages' })
        }

        const resData = { ...data, images: this.readyImages.length ? this.readyImages : data.images }

        const result = await ClientModel.createProduct(resData)

        if (result) {
          runInAction(() => {
            this.selectedRowId = result.guid
          })

          this.onTriggerOpenModal('showSelectionSupplierModal')
        }
      }

      runInAction(() => {
        this.showCircularProgressModal = false

        this.successModalText = t(TranslationKey['Product added'])
      })
      this.onTriggerOpenModal('showSuccessModal')
      const noProductBaseUpdate = true
      await this.getProductsMy(noProductBaseUpdate)

      // this.onTriggerOpenModal('showSendOwnProductModal')
    } catch (error) {
      runInAction(() => {
        this.showCircularProgressModal = false
      })
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onDoubleClickHsCode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetChipValueModal')
  }

  async onDeleteBarcode(product) {
    try {
      await ClientModel.updateProductBarCode(product._id, { barCode: null })

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onDeleteHsCode(product) {
    try {
      await ProductModel.editProductsHsCods([{ productId: product._id, hsCode: '' }])

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickBindInventoryGoodsToStockBtn() {
    try {
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async getStockGoodsByFilters(filter, isRecCall) {
    try {
      const result = await SellerBoardModel.getStockGoodsByFilters(filter)

      runInAction(() => {
        this.sellerBoardDailyData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      if (isRecCall) {
        this.getStockGoodsByFilters()
      } else {
        this.sellerBoardDailyData = []
        if (error.body && error.body.message) {
          runInAction(() => {
            this.error = error.body.message
          })
        }
      }
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      runInAction(() => {
        this.successModalText = t(TranslationKey['Goods are bound'])
      })
      this.onTriggerOpenModal('showSuccessModal')

      this.loadData()
    } catch (error) {
      runInAction(() => {
        this.showInfoModalTitle = t(TranslationKey["You can't bind"])
      })
      this.onTriggerOpenModal('showInfoModal')

      console.log(error)
    }
  }

  onChangeCurPage(e) {
    runInAction(() => {
      this.curPage = e
    })
    this.getProductsMy()
  }

  onTriggerOpenModal(modalState) {
    runInAction(() => {
      this[modalState] = !this[modalState]
    })
  }

  setSelectedProduct(item) {
    runInAction(() => {
      this.selectedProduct = item
    })
  }

  setActionStatus(actionStatus) {
    runInAction(() => {
      this.actionStatus = actionStatus
    })
  }
}
