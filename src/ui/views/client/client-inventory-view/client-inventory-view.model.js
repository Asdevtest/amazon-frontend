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
import { dataGridFiltersConverter, dataGridFiltersInitializer } from '@utils/data-grid-filters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { parseFieldsAdapter } from '@utils/parse-fields-adapter'
import { getTableByColumn, objectToUrlQs, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import {
  fieldsOfProductAllowedToCreate,
  fieldsOfProductAllowedToUpdate,
  filtersFields,
} from './client-inventory-view.constants'

const defaultHiddenColumns = ['stockUSA', 'strategyStatus', 'fbafee', 'profit', 'amazon']

export class ClientInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  product = undefined
  ordersDataStateToSubmit = undefined

  baseNoConvertedProducts = undefined
  productsMy = []
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
  dataForOrderModal = []
  ideaId = ''
  isArchive = false
  batchesData = []

  receivedFiles = undefined

  paymentMethods = []

  hsCodeData = {}

  curProduct = undefined

  // isNeedPurchaseFilter = null

  currentSearchValue = ''

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

  isTransfer = false

  alertShieldSettings = {
    showAlertShield: false,
    alertShieldMessage: '',
  }

  transparencyYesNoFilterData = {
    yes: true,
    no: true,
    handleFilters: (yes, no) => this.onHandleOrderedFilter(yes, no),
  }

  onHandleOrderedFilter = (yes, no) => {
    runInAction(() => {
      this.columnMenuSettings = {
        ...this.columnMenuSettings,
        transparencyYesNoFilterData: {
          ...this.columnMenuSettings.transparencyYesNoFilterData,
          yes,
          no,
        },
      }
      this.getProductsMy()
    })
  }

  columnMenuSettings = {
    onClickFilterBtn: field => this.onClickFilterBtn(field),
    onChangeFullFieldMenuItem: (value, field) => this.onChangeFullFieldMenuItem(value, field),
    onClickAccept: () => {
      this.getProductsMy()
      this.getDataGridState()
    },

    filterRequestStatus: undefined,

    transparencyYesNoFilterData: this.transparencyYesNoFilterData,

    isNeedPurchaseFilterData: {
      isNeedPurchaseFilter: true,
      isNotNeedPurchaseFilter: true,
      onChangeIsNeedPurchaseFilter: (value, value2) => this.onChangeIsNeedPurchaseFilter(value, value2),
    },

    isHaveBarCodeFilterData: {
      isHaveBarCodeFilter: null,
      onChangeIsHaveBarCodeFilter: value => this.onChangeIsHaveBarCodeFilter(value),
    },

    ...dataGridFiltersInitializer(filtersFields),
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
  )
  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return filtersFields.some(
      el =>
        this.columnMenuSettings[el]?.currentFilterData.length ||
        !(
          this.columnMenuSettings?.transparencyYesNoFilterData.yes &&
          this.columnMenuSettings?.transparencyYesNoFilterData.no
        ),
    )
  }

  constructor({ history }) {
    this.history = history

    const url = new URL(window.location.href)
    this.isArchive = url.searchParams.get('isArchive')

    if (history.location.state) {
      this.isModalOpen = history.location.state.isModalOpen

      const state = { ...history.location.state }
      delete state.isModalOpen
      history.replace({ ...history.location, state })
    }

    makeAutoObservable(this, undefined, { autoBind: true })

    reaction(
      () => this.productsMy,
      () => (this.currentData = this.getCurrentData()),
    )
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
    this.getProductsMy()
  }

  onChangePaginationModel(model) {
    this.paginationModel = model

    this.setDataGridState()
    this.getProductsMy()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

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
        ? this.history.push(`/client/inventory?product-id=${row.originalData._id}&isArchive=true`)
        : this.history.push(`/client/inventory?product-id=${row.originalData._id}`)
    } else {
      this.isArchive ? this.history.push(`/client/inventory?isArchive=true`) : this.history.push(`/client/inventory`)
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
    if (productId) {
      this.isArchive
        ? this.history.push(`/client/inventory?product-id=${productId}&isArchive=true&show-tab=orders`)
        : this.history.push(`/client/inventory?product-id=${productId}&show-tab=orders`)
    }

    this.onTriggerOpenModal('productCardModal')
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

      defaultHiddenColumns.forEach(el => {
        this.columnVisibilityModel[el] = false
      })
    })
  }

  async onClickVariationButton(id) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const result = await ProductModel.getProductsVariationsByGuid(id)
      runInAction(() => {
        this.productVariations = result
      })

      this.onTriggerOpenModal('showProductVariationsForm')

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

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
    this.currentSearchValue = searchValue

    this.getProductsMy()
  }

  async uploadTemplateFile(file) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
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
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
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
      this.showInfoModalTitle = t(TranslationKey['Product with invalid status selected'])

      this.onTriggerOpenModal('showInfoModal')
      return
    }

    this.confirmModalSettings = {
      isWarning: this.isArchive ? false : true,
      confirmTitle: this.isArchive ? t(TranslationKey['Return to Inventory']) : t(TranslationKey['Delete a card']),
      confirmMessage: this.isArchive
        ? t(TranslationKey['After confirmation, the card will be moved to the Inventory. Continue?'])
        : t(TranslationKey['After confirmation, the card will be moved to the archive. Move?']),
      onClickConfirm: () => this.onSubmitTriggerArchOrResetProducts(),
    }

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
    this.selectedRowIds = []

    this.isArchive ? this.history.push('/client/inventory') : this.history.push('/client/inventory?isArchive=true')
    this.isArchive = this.isArchive ? false : true

    this.loadData()
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response
      })
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.getDataGridState()
      await this.getShops()
      await this.getProductsMy()
      this.isModalOpen && this.onTriggerOpenModal('showSendOwnProductModal')
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
      console.log(error)
    }
  }

  async onClickVariationRadioButton() {
    try {
      const result = await ClientModel.getProductPermissionsData({ isChild: false })

      runInAction(() => {
        this.productsToLaunch = result.rows
      })
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
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
    const [storekeepers, destinations, result /* , dataForOrder */] = await Promise.all([
      StorekeeperModel.getStorekeepers(),
      ClientModel.getDestinations(),
      UserModel.getPlatformSettings(),
      // ClientModel.getProductsInfoForOrders(this.selectedRowIds.join(',')),
    ])

    runInAction(() => {
      this.storekeepers = storekeepers
      this.destinations = destinations
      this.platformSettings = result
      // this.dataForOrderModal = dataForOrder
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
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      isNeedPurchaseFilterData: {
        ...this.columnMenuSettings.isNeedPurchaseFilterData,
        isNeedPurchaseFilter,
        isNotNeedPurchaseFilter,
      },
    }

    this.getProductsMy()
  }

  onChangeIsHaveBarCodeFilter(value) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      isHaveBarCodeFilterData: {
        ...this.columnMenuSettings.isHaveBarCodeFilterData,
        isHaveBarCodeFilter: value,
      },
    }

    this.getProductsMy()
  }

  setFilterRequestStatus(requestStatus) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      filterRequestStatus: requestStatus,
    }
  }

  async onClickFilterBtn(column) {
    try {
      this.setFilterRequestStatus(loadingStatuses.IS_LOADING)

      const curShops = this.columnMenuSettings.shopId.currentFilterData?.map(shop => shop._id).join(',')
      const shopFilter =
        this.columnMenuSettings.shopId.currentFilterData.length > 0 && column !== 'shopId' ? curShops : null

      const purchaseQuantityAboveZero =
        this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter &&
        this.columnMenuSettings.isNeedPurchaseFilterData.isNotNeedPurchaseFilter
          ? ''
          : this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter

      const data = await GeneralModel.getDataForColumn(
        getTableByColumn(column, 'products'),
        column,

        `clients/products/my_with_pag?filters=${this.getFilters(column)}${
          shopFilter ? `;&[shopId][$eq]=${shopFilter}` : ''
        }&purchaseQuantityAboveZero=${purchaseQuantityAboveZero}`,
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

      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  onChangeFullFieldMenuItem(value, field) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      [field]: {
        ...this.columnMenuSettings[field],
        currentFilterData: value,
      },
    }
  }

  onClickResetFilters() {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      transparencyYesNoFilterData: {
        ...this.columnMenuSettings.transparencyYesNoFilterData,
        yes: true,
        no: true,
      },
      ...dataGridFiltersInitializer(filtersFields),
    }

    this.getProductsMy()
    this.getDataGridState()
  }

  getFilters(exclusion) {
    const transparency =
      this.columnMenuSettings.transparencyYesNoFilterData.yes && this.columnMenuSettings.transparencyYesNoFilterData.no
        ? null
        : this.columnMenuSettings.transparencyYesNoFilterData.yes

    return objectToUrlQs(
      dataGridFiltersConverter(
        this.columnMenuSettings,
        this.currentSearchValue,
        exclusion,
        filtersFields,
        ['asin', 'amazonTitle', 'skuByClient'],
        {
          ...(this.columnMenuSettings.isHaveBarCodeFilterData.isHaveBarCodeFilter !== null && {
            barCode: {
              [this.columnMenuSettings.isHaveBarCodeFilterData.isHaveBarCodeFilter ? '$null' : '$notnull']: true,
            },
          }),
          ...(transparency !== null && {
            transparency: { $eq: transparency },
          }),

          ...(this.isArchive && {
            archive: { $eq: true },
          }),
        },
      ),
    )
  }

  async getProductsMy() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const curShops = this.columnMenuSettings.shopId.currentFilterData?.map(shop => shop._id).join(',')

      const isNeedPurchaseFilter = this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter
      const isNotNeedPurchaseFilter = this.columnMenuSettings.isNeedPurchaseFilterData.isNotNeedPurchaseFilter

      const purchaseQuantityAboveZero = isNeedPurchaseFilter && isNotNeedPurchaseFilter ? null : isNeedPurchaseFilter

      const result = await ClientModel.getProductsMyFilteredByShopIdWithPag({
        filters: this.getFilters(),

        shopId: this.columnMenuSettings.shopId.currentFilterData.length > 0 ? curShops : null,

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
      })
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
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
    await this.loadData()

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

    await ClientModel.updateProductBarCode(this.selectedProduct._id, {
      barCode: this.uploadedFiles?.[0] || tmpBarCode?.[0],
    })

    const noProductBaseUpdate = true
    this.getProductsMy(noProductBaseUpdate)

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onSaveProductData(productId, updateProductData) {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)

      const updateProductDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        toJS(updateProductData),
        fieldsOfProductAllowedToUpdate,
        true,
      )

      await ClientModel.updateProduct(productId, updateProductDataFiltered)
      await this.loadData()
      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.FAILED)
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
    this.currentHscode = hscode
    this.currentBarcode = barcode

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

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.setRequestStatus(loadingStatuses.IS_LOADING)
      runInAction(() => {
        this.error = undefined
        this.showProgress = true
      })

      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        let orderObject = this.ordersDataStateToSubmit[i]

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        if (orderObject.tmpTransparencyFile.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpTransparencyFile, type: 'uploadedFiles' })

          orderObject = {
            ...orderObject,
            transparencyFile: this.uploadedFiles[0],
          }
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

      this.setRequestStatus(loadingStatuses.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.FAILED)
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
        'tmpTransparencyFile',
        'transparency',
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

      await this.loadData()

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

      await this.loadData()

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
      const result = await BatchesModel.getBatchesbyProduct(this.selectedRowIds[0], false)
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
      const result = await BatchesModel.getBatchesbyProduct(this.selectedRowIds[0], isArchive)
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

      await this.loadData()

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

      await this.loadData()

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

      await this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onDeleteHsCode(product) {
    try {
      await ProductModel.editProductsHsCods([{ productId: product._id, hsCode: '' }])

      await this.loadData()
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
        this.sellerBoardDailyData = addIdDataConverter(result?.rows)
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

      await this.loadData()
    } catch (error) {
      runInAction(() => {
        this.showInfoModalTitle = t(TranslationKey["You can't bind"])
      })
      this.onTriggerOpenModal('showInfoModal')

      console.log(error)
    }
  }

  onChangeCurPage(e) {
    this.curPage = e

    this.getProductsMy()
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  setSelectedProduct(item) {
    this.selectedProduct = item
  }
}
