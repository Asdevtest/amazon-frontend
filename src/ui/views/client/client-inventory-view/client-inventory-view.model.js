import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {ProductDataParser} from '@constants/product-data-parser'
import {ProductStatus, ProductStatusByCode} from '@constants/product-status'
import {RequestStatus} from '@constants/request-status'
import {poundsWeightCoefficient} from '@constants/sizes-settings'
import {TranslationKey} from '@constants/translations/translation-key'

import {BatchesModel} from '@models/batches-model'
import {ClientModel} from '@models/client-model'
import {IdeaModel} from '@models/ideas-model'
import {OtherModel} from '@models/other-model'
import {ProductModel} from '@models/product-model'
import {SellerBoardModel} from '@models/seller-board-model'
import {SettingsModel} from '@models/settings-model'
import {ShopModel} from '@models/shop-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {clientInventoryColumns} from '@components/table-columns/client/client-inventory-columns'

import {updateProductAutoCalculatedFields} from '@utils/calculation'
import {addIdDataConverter, clientInventoryDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {parseFieldsAdapter} from '@utils/parse-fields-adapter'
import {toFixed} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

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
  currentShop = undefined
  ideaId = ''
  isArchive = false
  batchesData = []

  nameSearchValue = ''

  selectedRowId = undefined
  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  drawerOpen = false
  showOrderModal = false
  showSuccessModal = false
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

  successModalText = ''
  confirmMessage = ''
  showInfoModalTitle = ''
  priceForSeekSupplier = 0
  currentBarcode = ''
  currentHscode = ''
  isModalOpen = false
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

  rowCount = undefined
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientInventoryColumns(
    this.barCodeHandlers,
    this.hsCodeHandlers,
    this.fourMonthesStockHandlers,
    this.stockUsHandlers,
  )

  get userInfo() {
    return UserModel.userInfo
  }

  constructor({history, location}) {
    this.history = history

    if (location.state) {
      this.isArchive = location.state.isArchive
      this.isModalOpen = location.state.isModalOpen

      const state = {...history.location.state}
      delete state.isModalOpen
      history.replace({...history.location, state})
    }

    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )

    reaction(
      () => this.productsMy,
      () => {
        this.currentData = this.getCurrentData()
      },
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()

      this.productsMy = clientInventoryDataConverter(this.baseNoConvertedProducts.rows)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onClickShowProduct(row) {
    this.history.push({
      pathname: '/client/inventory/product',
      search: row.originalData._id,
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

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_INVENTORY)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_INVENTORY]

    if (state) {
      this.sortModel = [...state.sorting.sortModel]
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientInventoryColumns(
        this.barCodeHandlers,
        this.hsCodeHandlers,
        this.fourMonthesStockHandlers,
        this.stockUsHandlers,
      ).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
    this.curPage = 0

    this.getProductsMy()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.getProductsMy()
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  getCurrentData() {
    return toJS(this.productsMy)
  }

  onSearchSubmit(searchValue) {
    this.nameSearchValue = searchValue

    console.log('searchValue', searchValue)

    this.getProductsMy()
  }

  async uploadTemplateFile(file) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.showProgress = true
      await OtherModel.postTemplate(file)
      this.showProgress = false
      this.onTriggerOpenModal('showAddSuppliersModal')
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
      this.showInfoModalTitle = t(TranslationKey['Product with invalid status selected'])
      this.onTriggerOpenModal('showInfoModal')
      return
    }

    this.confirmModalSettings = {
      isWarning: this.isArchive ? false : true,
      confirmTitle: this.isArchive ? t(TranslationKey['Return to Inventory']) : t(TranslationKey['Delete a card']),
      confirmMessage: this.isArchive
        ? t(TranslationKey['After confirmation, the card will be moved to the Inventory. Continue?'])
        : t(TranslationKey['After confirmation, the card will be moved to the archive. Delete?']),
      onClickConfirm: () => this.onSubmitTriggerArchOrResetProducts(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitTriggerArchOrResetProducts() {
    try {
      for (let i = 0; i < this.selectedRowIds.length; i++) {
        const productId = this.selectedRowIds[i]

        await ClientModel.updateProduct(productId, {archive: this.isArchive ? false : true})
      }

      this.onTriggerOpenModal('showConfirmModal')
      await this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerArchive() {
    this.selectedRowIds = []

    this.isArchive
      ? this.history.push('/client/inventory', {isArchive: !this.isArchive})
      : this.history.push('/client/inventory/archive', {isArchive: !this.isArchive})

    // this.isArchive = !this.isArchive
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      this.getDataGridState()

      await this.getShops()

      await this.getProductsMy()
      this.isModalOpen && this.onTriggerOpenModal('showSendOwnProductModal')

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickOrderBtn() {
    try {
      const storekeepers = await StorekeeperModel.getStorekeepers()

      const destinations = await ClientModel.getDestinations()

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.storekeepers = storekeepers

        this.destinations = destinations

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()
      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      this.error = error
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

  onClickShopBtn(shop) {
    this.currentShop = shop ? shop : undefined
    const noProductBaseUpdate = true
    this.getProductsMy(noProductBaseUpdate)

    this.withoutProduct = false
    this.withProduct = false
  }

  async onClickWithoutProductsShopBtn() {
    this.currentShop = undefined
    this.withoutProduct = true
    this.withProduct = false

    await this.getProductsMy()
    this.productsMy = this.productsMy.filter(product => !product.originalData.shopIds?.length)
  }

  async onClickWithProductsShopBtn() {
    this.currentShop = undefined
    this.withoutProduct = false
    this.withProduct = true

    await this.getProductsMy()
    this.productsMy = this.productsMy.filter(product => product.originalData.shopIds?.length)
  }

  async getProductsMy(noProductBaseUpdate) {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const filter = `[archive][$eq]=${this.isArchive ? 'true' : 'false'};or[0][asin][$contains]=${
        this.nameSearchValue
      };or[1][amazonTitle][$contains]=${this.nameSearchValue};or[2][skusByClient][$contains]=${this.nameSearchValue};`

      const result = await ClientModel.getProductsMyFilteredByShopIdWithPag({
        filters: filter, // this.nameSearchValue ? filter : null,

        shopId: this.currentShop ? this.currentShop._id : null,

        limit: this.rowsPerPage,
        offset: this.curPage * this.rowsPerPage,

        sortField: this.sortModel.length ? this.sortModel[0].field : 'updatedAt',
        sortType: this.sortModel.length ? this.sortModel[0].sort.toUpperCase() : 'DESC',
      })

      runInAction(() => {
        this.baseNoConvertedProducts = result

        this.rowCount = result.count

        this.productsMy = clientInventoryDataConverter(result.rows)

        if (!noProductBaseUpdate) {
          this.productsMyBase = clientInventoryDataConverter(result.rows)
        }
      })
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      this.rowCount = undefined

      this.productsMy = []
      this.baseNoConvertedProducts = []

      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickSaveHsCode(hsCode) {
    await ProductModel.editProductsHsCods([{productId: this.selectedProduct._id, hsCode}])

    this.onTriggerOpenModal('showSetChipValueModal')
    this.loadData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onClickSaveBarcode(tmpBarCode) {
    this.uploadedFiles = []

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, {images: tmpBarCode, type: 'uploadedFiles'})
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, {barCode: this.uploadedFiles[0]})

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
        this.error = error.body.message
      }
    }
  }

  onClickBarcode(item) {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onClickHsCode(item) {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetChipValueModal')
  }

  async onClickSaveFourMonthesStockValue(item, fourMonthesStock) {
    try {
      await ClientModel.updateProductFourMonthesStock(item._id, {fourMonthesStock})

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

  async onClickSaveStockUs(item, value) {
    try {
      await ClientModel.editProductsStockUS(item._id, {
        stockUSA: value,
      })

      this.getProductsMy()
    } catch (error) {
      console.log(error)
    }
  }

  onConfirmSubmitOrderProductModal(ordersDataState, totalOrdersCost) {
    this.ordersDataStateToSubmit = ordersDataState

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(
        TranslationKey['Confirm order'],
      )}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      this.error = undefined
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const product = this.ordersDataStateToSubmit[i]

        this.uploadedFiles = []

        if (product.tmpBarCode.length) {
          await onSubmitPostImages.call(this, {images: product.tmpBarCode, type: 'uploadedFiles'})

          await ClientModel.updateProductBarCode(product.productId, {barCode: this.uploadedFiles[0]})
        } else if (!product.barCode) {
          await ClientModel.updateProductBarCode(product.productId, {barCode: null})
        }

        await this.createOrder(product)
      }

      if (!this.error) {
        this.successModalText = t(TranslationKey['The order has been created'])
        this.onTriggerOpenModal('showSuccessModal')
      }
      this.onTriggerOpenModal('showConfirmModal')
      // this.onTriggerOpenModal('showOrderModal')
      const noProductBaseUpdate = true
      await this.getProductsMy(noProductBaseUpdate)

      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async createOrder(orderObject) {
    try {
      await ClientModel.createOrder(getObjectFilteredByKeyArrayBlackList(orderObject, ['barCode', 'tmpBarCode']))

      await this.updateUserInfo()
    } catch (error) {
      console.log(error)

      this.showInfoModalTitle = `${t(TranslationKey["You can't order"])} "${error.body.message}"`
      this.onTriggerOpenModal('showInfoModal')
      this.error = error
    }
  }

  async createIdea(data) {
    try {
      const resId = await IdeaModel.createIdea({...data, price: data.price || 0, quantity: data.quantity || 0})
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

  async onSubmitSaveSupplier(supplier, photosOfSupplier, addMore, makeMainSupplier) {
    try {
      this.readyImages = []

      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, {images: photosOfSupplier, type: 'readyImages'})
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',

        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        images: supplier.images.concat(this.readyImages),
      }

      const createSupplierResult = await SupplierModel.createSupplier(supplier)
      await ProductModel.addSuppliersToProduct(this.selectedRowId, [createSupplierResult.guid])

      if (makeMainSupplier) {
        await ClientModel.updateProduct(this.selectedRowId, {
          currentSupplierId: createSupplierResult.guid,
        })
      }

      this.successModalText = t(TranslationKey['Supplier added'])
      this.onTriggerOpenModal('showSuccessModal')

      this.loadData()

      !addMore && this.onTriggerOpenModal('showAddOrEditSupplierModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onClickAddSupplierButton() {
    try {
      const result = await UserModel.getPlatformSettings()

      this.yuanToDollarRate = result.yuanToDollarRate
      this.volumeWeightCoefficient = result.volumeWeightCoefficient

      this.onTriggerOpenModal('showAddOrEditSupplierModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onClickParseProductsBtn() {
    try {
      if (this.checkIsNoEditProductSelected()) {
        this.showInfoModalTitle = t(TranslationKey['Product with invalid status selected'])
        this.onTriggerOpenModal('showInfoModal')
        return
      }

      this.showCircularProgressModal = true

      await SellerBoardModel.refreshProducts(this.selectedRowIds)

      this.successModalText = t(TranslationKey['Products will be updated soon'])
      this.onTriggerOpenModal('showSuccessModal')
      this.showCircularProgressModal = false
    } catch (error) {
      this.showCircularProgressModal = false

      this.showInfoModalTitle = t(TranslationKey['Parsing data not updated'])
      this.onTriggerOpenModal('showInfoModal')

      console.log(error)
    }
  }

  async onClickAddSupplierBtn() {
    try {
      if (this.checkIsNoEditProductSelected()) {
        this.showInfoModalTitle = t(TranslationKey['Product with invalid status selected'])
        this.onTriggerOpenModal('showInfoModal')
        return
      }

      if (this.selectedRowIds.length > 1) {
        const result = await ClientModel.calculatePriceToSeekSomeSuppliers(this.selectedRowIds)
        this.confirmMessage = this.confirmModalSettings = {
          isWarning: false,
          confirmTitle: t(TranslationKey.Attention),
          confirmMessage: `${t(TranslationKey['The cost of the supplier search service will be'])} $${toFixed(
            result.priceForClient,
            2,
          )}.\n ${t(TranslationKey['Apply?'])}`,
          onClickConfirm: () => this.onSubmitSeekSomeSuppliers(),
        }

        this.onTriggerOpenModal('showConfirmModal')
      } else {
        this.selectedRowId = this.selectedRowIds[0]
        this.onTriggerOpenModal('showSelectionSupplierModal')
      }
      this.getIdeas()
    } catch (error) {
      console.log(error)
    }
  }

  async onClickProductLotDataBtn() {
    try {
      const result = await BatchesModel.getBatchesbyProduct(this.selectedRowIds[0])
      console.log('result', result)
      this.batchesData = result
      this.onTriggerOpenModal('showProductLotDataModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitCalculateSeekSupplier(clientComment) {
    try {
      this.clientComment = clientComment

      const result = await ClientModel.calculatePriceToSeekSupplier(this.selectedRowId)

      this.priceForSeekSupplier = result.priceForClient

      this.confirmMessage = this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey.Attention),
        confirmMessage: `${t(TranslationKey['The cost of the supplier search service will be'])} $${toFixed(
          result.priceForClient,
          2,
        )}.\n ${t(TranslationKey['Apply?'])}`,
        onClickConfirm: () => this.onSubmitSeekSupplier(),
      }

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

  async onSubmitSeekSupplier() {
    try {
      await ClientModel.sendProductToSeekSupplier(this.selectedRowId, {
        clientComment: this.clientComment,
        priceForClient: this.priceForSeekSupplier,
      })

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')

      this.onTriggerOpenModal('showSelectionSupplierModal')
    } catch (error) {
      console.log(error)
    }
  }

  async parseAmazon(asin) {
    try {
      const parseResult = await ProductModel.parseAmazon(asin)

      runInAction(() => {
        if (Object.keys(parseResult).length > 5) {
          // проверка, что ответ не пустой (иначе приходит объект {length: 2})
          this.product = getObjectFilteredByKeyArrayBlackList(
            {
              ...this.product,
              ...parseFieldsAdapter(parseResult, ProductDataParser.AMAZON),
              weight:
                this.product.weight > parseResult.weight
                  ? this.product.weight
                  : parseResult.weight * poundsWeightCoefficient,
              amazonDescription: parseResult.info?.description || this.product.amazonDescription,
              amazonDetail: parseResult.info?.detail || this.product.amazonDetail,
            },
            ['fbafee'],
          )
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
          this.product = getObjectFilteredByKeyArrayBlackList(
            {
              ...this.product,
              ...parseFieldsAdapter(parseResult, ProductDataParser.SELLCENTRAL),
              weight: this.product.weight > parseResult.weight ? this.product.weight : parseResult.weight,
              amazonDescription: parseResult.info?.description || this.product.amazonDescription,
              amazonDetail: parseResult.info?.detail || this.product.amazonDetail,
            },
            ['fbafee'],
          )
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

      this.showCircularProgressModal = true

      if (!isNoAsin) {
        this.product = {asin: data.asin, lamazon: data.lamazon, fba: true, images: []}

        await this.parseAmazon(data.asin)
        await this.parseParseSellerCentral(data.asin)

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
          this.selectedRowId = result.guid

          this.onTriggerOpenModal('showSelectionSupplierModal')
        }
      } else {
        if (photosOfNewProduct.length) {
          await onSubmitPostImages.call(this, {images: photosOfNewProduct, type: 'readyImages'})
        }

        const resData = {...data, images: this.readyImages.length ? this.readyImages : data.images}

        const result = await ClientModel.createProduct(resData)

        if (result) {
          this.selectedRowId = result.guid

          this.onTriggerOpenModal('showSelectionSupplierModal')
        }
      }

      this.showCircularProgressModal = false

      this.successModalText = t(TranslationKey['Product added'])
      this.onTriggerOpenModal('showSuccessModal')
      const noProductBaseUpdate = true
      await this.getProductsMy(noProductBaseUpdate)

      // this.onTriggerOpenModal('showSendOwnProductModal')
    } catch (error) {
      this.showCircularProgressModal = false
      console.log(error)
      this.error = error
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
      await ClientModel.updateProductBarCode(product._id, {barCode: null})

      this.loadData()
    } catch (error) {
      console.log(error)
    }
  }

  async onDeleteHsCode(product) {
    try {
      await ProductModel.editProductsHsCods([{productId: product._id, hsCode: ''}])

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
        this.error = error.body.message
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
          this.error = error.body.message
        }
      }
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      this.successModalText = t(TranslationKey['Goods are bound'])
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.showInfoModalTitle = t(TranslationKey["You can't bind"])
      this.onTriggerOpenModal('showInfoModal')

      console.log(error)
    }
  }

  onChangeCurPage(e) {
    this.curPage = e
    this.getProductsMy()
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onTriggerOpenModal(modalState) {
    this[modalState] = !this[modalState]
  }

  setSelectedProduct(item) {
    this.selectedProduct = item
  }

  setActionStatus(actionStatus) {
    this.actionStatus = actionStatus
  }
}
