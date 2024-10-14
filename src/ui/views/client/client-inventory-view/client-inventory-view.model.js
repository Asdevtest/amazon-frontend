import { makeObservable, reaction, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { poundsWeightCoefficient } from '@constants/configs/sizes-settings'
import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { ProductDataParser } from '@constants/product/product-data-parser'
import { ProductStatus, ProductStatusByCode } from '@constants/product/product-status'
import { BoxStatus } from '@constants/statuses/box-status'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, createOrderRequestWhiteList } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { DataGridTagsFilter } from '@models/data-grid-tags-filter'
import { IdeaModel } from '@models/ideas-model'
import { OrderModel } from '@models/order-model'
import { OtherModel } from '@models/other-model'
import { ParserModel } from '@models/parser-model'
import { ProductModel } from '@models/product-model'
import { SellerBoardModel } from '@models/seller-board-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { updateProductAutoCalculatedFields } from '@utils/calculation'
import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { parseFieldsAdapter } from '@utils/parse-fields-adapter'
import { formatCamelCaseString, toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

import { clientInventoryColumns } from './client-inventory-columns'
import {
  additionalFilterFields,
  fieldsOfProductAllowedToCreate,
  fieldsOfProductAllowedToUpdate,
} from './client-inventory-view.constants'
import { observerConfig } from './model-observer.config'

export class ClientInventoryViewModel extends DataGridTagsFilter {
  product = undefined
  ordersDataStateToSubmit = undefined

  sellerBoardDailyData = []
  storekeepers = []
  destinations = []
  ideaId = undefined
  isArchive = false

  presetsData = []
  productsTags = []
  activeProductsTags = []

  receivedFiles = undefined

  pendingOrderQuantity = undefined
  currentRow = undefined

  previousSelectedRows = []
  paymentMethods = []

  curProduct = undefined

  productsToLaunch = []
  productVariations = []
  selectedProductToLaunch = undefined

  dataForOrderModal = []

  existingProducts = []
  selectedProduct = undefined

  selectedRowId = undefined
  showOrderModal = false
  showCheckPendingOrderFormModal = false
  showSetBarcodeModal = false
  showSelectionSupplierModal = false
  showSendOwnProductModal = false
  showBindInventoryGoodsToStockModal = false
  showConfirmModal = false
  showBarcodeOrHscodeModal = false
  showSetFourMonthsStockValueModal = false
  showCircularProgressModal = false
  showAddSuppliersModal = false
  showSetStockUsValueModal = false
  showProductDataModal = false
  showGetFilesModal = false
  showEditHSCodeModal = false
  productCardModal = false
  showProductLaunch = false
  showIdeaModal = false
  showProductVariationsForm = false
  showAddOrEditSupplierModal = false
  showEditProductTagsModal = false

  onAmazon = false
  isBatches = false

  confirmMessage = ''
  currentBarcode = ''
  currentHscode = ''

  readyImages = []
  progressValue = 0
  showProgress = false

  getCustomSortFields = []

  setAllColumns = undefined

  get userInfo() {
    return UserModel.userInfo
  }

  get isSomeFilterOn() {
    return (
      this.filtersFields.some(el => this.columnMenuSettings?.[el]?.currentFilterData?.length) ||
      !(
        this.columnMenuSettings?.transparencyYesNoFilterData?.yes &&
        this.columnMenuSettings?.transparencyYesNoFilterData?.no
      ) ||
      !(this.columnMenuSettings?.childrenYesNoFilterData?.yes && this.columnMenuSettings?.childrenYesNoFilterData?.no)
    )
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const additionalPropertiesColumnMenuSettings = {
      transparencyYesNoFilterData: {
        yes: true,
        no: true,
        handleFilters: (yes, no) => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            transparencyYesNoFilterData: {
              ...this.columnMenuSettings.transparencyYesNoFilterData,
              yes,
              no,
            },
          }
          this.getCurrentData()
        },
      },

      childrenYesNoFilterData: {
        yes: true,
        no: true,
        handleFilters: (yes, no) => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            childrenYesNoFilterData: {
              ...this.columnMenuSettings.childrenYesNoFilterData,
              yes,
              no,
            },
          }
          this.getCurrentData()
        },
      },

      isNeedPurchaseFilterData: {
        isNeedPurchaseFilter: true,
        isNotNeedPurchaseFilter: true,
        onChangeIsNeedPurchaseFilter: (isNotNeedPurchaseFilter, isNeedPurchaseFilter) => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            isNeedPurchaseFilterData: {
              ...this.columnMenuSettings.isNeedPurchaseFilterData,
              isNeedPurchaseFilter,
              isNotNeedPurchaseFilter,
            },
          }
          this.getCurrentData()
        },
      },

      isNeedRefillFilterData: {
        isNeedPurchaseFilter: true,
        isNotNeedPurchaseFilter: true,
        onChangeIsNeedPurchaseFilter: (isNotNeedPurchaseFilter, isNeedPurchaseFilter) => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            isNeedRefillFilterData: {
              ...this.columnMenuSettings.isNeedRefillFilterData,
              isNeedPurchaseFilter,
              isNotNeedPurchaseFilter,
            },
          }

          this.getCurrentData()
        },
      },

      isHaveBarCodeFilterData: {
        isHaveBarCodeFilter: null,
        onChangeIsHaveBarCodeFilter: value => {
          this.columnMenuSettings = {
            ...this.columnMenuSettings,
            isHaveBarCodeFilterData: {
              ...this.columnMenuSettings.isHaveBarCodeFilterData,
              isHaveBarCodeFilter: value,
            },
          }
          this.getCurrentData()
        },
      },
    }

    const barCodeHandlers = {
      onClickBarcode: item => this.onClickBarcode(item),
      onDoubleClickBarcode: item => this.onDoubleClickBarcode(item),
      onDeleteBarcode: item => this.onDeleteBarcode(item),
      showBarcodeOrHscode: (barCode, hsCode) => this.showBarcodeOrHscode(barCode, hsCode),
    }

    const hsCodeHandlers = {
      onClickHsCode: item => this.onClickHsCode(item),
      onDeleteHsCode: item => this.onDeleteHsCode(item),
      showBarcodeOrHscode: (barCode, hsCode) => this.showBarcodeOrHscode(barCode, hsCode),
    }

    const fourMonthesStockHandlers = {
      onClickSaveFourMonthsStock: (item, value) => this.onClickSaveFourMonthesStockValue(item, value),
      editRecommendationForStockByGuid: (productId, storekeeperId, recommendedValue) =>
        this.editRecommendationForStockByGuid(productId, storekeeperId, recommendedValue),
      onClickRepurchase: (rowId, value) => this.onClickOrderBtn(rowId, value),
    }

    const stockUsHandlers = {
      onClickSaveStockUs: (item, value) => this.onClickSaveStockUs(item, value),
    }

    const otherHandlers = {
      onClickInStock: (item, storekeeper) => this.onClickInStock(item, storekeeper),
      onOpenProductDataModal: (product, onAmazon) => this.onOpenProductDataModal(product, onAmazon),
      onClickOrderCell: productId => this.onClickOrderCell(productId),
      onClickShowProduct: row => this.onClickShowProduct(row),
      onClickVariationButton: id => this.onClickVariationButton(id),
      onClickTag: tag => this.setActiveProductsTagFromTable(tag),
      onClickEdit: productId => this.onClickEditTags(productId),
    }

    const defaultGetCurrentDataOptions = () => ({
      noCache: true,
    })

    const additionalPropertiesGetFilters = () => {
      const isNeedPurchaseFilter = this.columnMenuSettings.isNeedPurchaseFilterData.isNeedPurchaseFilter
      const isNotNeedPurchaseFilter = this.columnMenuSettings.isNeedPurchaseFilterData.isNotNeedPurchaseFilter
      const purchaseQuantityAboveZero = !(isNeedPurchaseFilter && isNotNeedPurchaseFilter)

      const isNeedRefillFilterData = this.columnMenuSettings.isNeedRefillFilterData.isNeedPurchaseFilter
      const isNotNeedRefillFilterData = this.columnMenuSettings.isNeedRefillFilterData.isNotNeedPurchaseFilter
      const isNeedRefillFilter = !(isNeedRefillFilterData && isNotNeedRefillFilterData)

      return {
        ...(this.columnMenuSettings.isHaveBarCodeFilterData.isHaveBarCodeFilter !== null && {
          barCode: {
            [this.columnMenuSettings.isHaveBarCodeFilterData.isHaveBarCodeFilter ? '$null' : '$notnull']: true,
          },
        }),
        ...(this.columnMenuSettings.transparencyYesNoFilterData.yes &&
        this.columnMenuSettings.transparencyYesNoFilterData.no
          ? {}
          : {
              transparency: { $eq: this.columnMenuSettings.transparencyYesNoFilterData.yes },
            }),
        ...(this.columnMenuSettings.childrenYesNoFilterData.yes && this.columnMenuSettings.childrenYesNoFilterData.no
          ? {}
          : {
              isChild: { $eq: this.columnMenuSettings.childrenYesNoFilterData.yes },
            }),

        ...(isNeedRefillFilter && {
          toRefill: isNotNeedRefillFilterData ? { $eq: 0 } : { $gt: 0 },
        }),

        ...(purchaseQuantityAboveZero && {
          purchaseQuantityAboveZero: { $eq: isNeedPurchaseFilter },
        }),
        ...(this.isArchive && {
          archive: { $eq: true },
        }),
      }
    }

    const columns = clientInventoryColumns({
      barCodeHandlers,
      hsCodeHandlers,
      fourMonthesStockHandlers,
      stockUsHandlers,
      otherHandlers,
    })

    const filtersFields = getFilterFields(columns, additionalFilterFields)

    const operatorsSettings = {
      shop: '$any',
    }

    super({
      getMainDataMethod: ClientModel.getProductsMyFilteredByShopIdWithPag,
      columnsModel: columns,
      filtersFields,
      mainMethodURL: 'clients/products/my_with_pag_v2?',
      fieldsForSearch: ['asin', 'amazonTitle', 'skuByClient'],
      tableKey: DataGridTablesKeys.CLIENT_INVENTORY,
      defaultGetCurrentDataOptions,
      additionalPropertiesColumnMenuSettings,
      additionalPropertiesGetFilters,
      operatorsSettings,
      defaultSortModel: [{ field: 'sumStock', sort: 'desc' }],
    })

    makeObservable(this, observerConfig)

    const url = new URL(window.location.href)
    this.isArchive = url.searchParams.get('isArchive') || false

    this.setAllColumns = (storekeepers, integrationTables) => {
      const newColumns = clientInventoryColumns({
        barCodeHandlers,
        hsCodeHandlers,
        fourMonthesStockHandlers,
        stockUsHandlers,
        otherHandlers,
        storekeepers,
        integrationTables,
      })

      const newFiltersFields = getFilterFields(newColumns, additionalFilterFields)

      this.columnsModel = newColumns
      this.defaultColumnsModel = newColumns
      this.filtersFields = newFiltersFields
      this.setColumnMenuSettings(newFiltersFields, additionalPropertiesColumnMenuSettings)
    }

    this.initTableColumns()
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
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
        ? this.history.push(`/client/inventory?product-id=${row._id}&isArchive=true`)
        : this.history.push(`/client/inventory?product-id=${row._id}`)
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

  async onClickVariationButton(id) {
    try {
      const result = await ProductModel.getProductsVariationsByGuid(id)

      runInAction(() => {
        this.productVariations = result
      })

      this.onTriggerOpenModal('showProductVariationsForm')
    } catch (error) {
      console.error(error)
    }
  }

  async uploadTemplateFile(file) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
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
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  checkIsNoEditProductSelected() {
    return this.selectedRows.some(prodId => {
      const findProduct = this.currentData.find(prod => prod._id === prodId)

      return [
        ProductStatus.FROM_CLIENT_READY_TO_BE_CHECKED_BY_SUPERVISOR,
        ProductStatus.FROM_CLIENT_TO_BUYER_FOR_RESEARCH,
        ProductStatus.FROM_CLIENT_BUYER_PICKED_PRODUCT,
        ProductStatus.FROM_CLIENT_BUYER_FOUND_SUPPLIER,
        ProductStatus.FROM_CLIENT_SUPPLIER_WAS_NOT_FOUND_BY_BUYER,
        ProductStatus.FROM_CLIENT_SUPPLIER_PRICE_WAS_NOT_ACCEPTABLE,
      ].includes(ProductStatusByCode[findProduct?.status])
    })
  }

  onClickTriggerArchOrResetProducts() {
    if (this.checkIsNoEditProductSelected()) {
      toast.warning(t(TranslationKey['Product with invalid status selected']))

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
      for (let i = 0; i < this.selectedRows.length; i++) {
        const productId = this.selectedRows[i]

        await ClientModel.updateProduct(productId, { archive: this.isArchive ? false : true })
      }

      this.onTriggerOpenModal('showConfirmModal')
      await this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerArchive() {
    this.selectedRows = []

    this.isArchive ? this.history.push('/client/inventory') : this.history.push('/client/inventory?isArchive=true')
    this.isArchive = this.isArchive ? false : true

    this.getCurrentData()
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

  async onClickVariationRadioButton() {
    try {
      const result = await ClientModel.getProductPermissionsData({ isChild: false })

      runInAction(() => {
        this.productsToLaunch = result.rows
      })
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickProductLaunch() {
    try {
      const result = this.currentData?.find(product => product?._id === this.selectedRows?.[0])

      runInAction(() => (this.selectedProductToLaunch = result))

      this.onTriggerOpenModal('showProductLaunch')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickNextButton(chosenProduct) {
    runInAction(() => (this.selectedProductToLaunch = chosenProduct))

    if (!!chosenProduct && !chosenProduct?.buyerId && !chosenProduct?.buyer?._id) {
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

  async checkPendingOrder(id) {
    const result = await OrderModel.checkPendingOrderByProductGuid(id)
    if (result?.length) {
      const currentProduct = this.currentData.find(product => product?._id === id)
      return {
        asin: currentProduct?.asin,
        orders: result,
      }
    }
    return null
  }

  async onClickOrderBtn(rowId, value) {
    try {
      const resultArray = []
      if (value && rowId) {
        const result = await this.checkPendingOrder(rowId)
        if (result) {
          resultArray.push(result)
        }
      } else {
        for (const id of this.selectedRows) {
          const result = await this.checkPendingOrder(id)
          if (result) {
            resultArray.push(result)
          }
        }
      }

      this.pendingOrderQuantity = value
      this.currentRow = typeof rowId === 'string' ? rowId : null

      if (resultArray.length) {
        runInAction(() => {
          this.existingProducts = resultArray
        })
        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      } else {
        await this.onClickContinueBtn()
      }
    } catch (error) {
      console.error(error)
    } finally {
      runInAction(() => {
        this.showCircularProgressModal = false
      })
    }
  }

  async onClickContinueBtn() {
    const [storekeepers, destinations, dataForOrder] = await Promise.all([
      StorekeeperModel.getStorekeepers(),
      ClientModel.getDestinations(),
      ClientModel.getProductsInfoForOrders(this.currentRow ? this.currentRow : this.selectedRows.join(',')),
    ])

    if (this.pendingOrderQuantity === 0 || this.pendingOrderQuantity) {
      dataForOrder[0].pendingOrderQuantity = this.pendingOrderQuantity
      dataForOrder[0].isPending = true
    }

    runInAction(() => {
      this.storekeepers = storekeepers
      this.destinations = destinations
      this.dataForOrderModal = dataForOrder
    })

    this.onTriggerOpenModal('showOrderModal')

    if (this.showCheckPendingOrderFormModal) {
      this.onTriggerOpenModal('showCheckPendingOrderFormModal')
    }
  }

  onClickPrevButton = () => {
    this.onTriggerOpenModal('showSelectionSupplierModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, {
      barCode: this.uploadedFiles?.[0] || tmpBarCode?.[0],
    })

    this.getCurrentData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onSaveProductData(productId, updateProductData) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const updateProductDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        toJS(updateProductData),
        fieldsOfProductAllowedToUpdate,
        true,
      )

      await ClientModel.updateProduct(productId, updateProductDataFiltered)
      await this.getCurrentData()
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
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

  onClickHsCode(item) {
    this.setSelectedProduct(item)

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onClickSaveFourMonthesStockValue(productId, fourMonthesStock) {
    try {
      await ClientModel.updateProductFourMonthesStock(productId, { fourMonthesStock })

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async editRecommendationForStockByGuid(productId, storekeeperId, recommendedValue) {
    try {
      await ClientModel.postAddRecommendationForStock(productId, storekeeperId, recommendedValue || 0)

      this.getCurrentData()
    } catch (error) {
      console.error(error)
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

      this.getCurrentData()
    } catch (error) {
      console.error(error)
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
      this.setRequestStatus(loadingStatus.IS_LOADING)
      runInAction(() => {
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

      toast.success(t(TranslationKey['The order has been created']))
      this.pendingOrderQuantity = undefined
      await this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayWhiteList(orderObject, createOrderRequestWhiteList)

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }
    } catch (error) {
      console.error(error)

      toast.error(`${t(TranslationKey["You can't order"])} "${error.body.message}"`)
    }
  }

  async createIdea(data) {
    try {
      const resId = await IdeaModel.createIdea({ ...data, price: data.price || 0, quantity: data.quantity || 0 })
      runInAction(() => {
        this.ideaId = resId.guid
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSaveSupplier({ supplier, makeMainSupplier, editPhotosOfSupplier, editPhotosOfUnit }) {
    try {
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

      const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier, undefined, undefined, true)
      const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

      await ProductModel.addSuppliersToProduct(this.selectedRowId, [createSupplierResult.guid])

      if (makeMainSupplier) {
        await ClientModel.updateProduct(this.selectedRowId, {
          currentSupplierId: createSupplierResult.guid,
        })
      }

      toast.success(t(TranslationKey['Supplier added']))

      await this.getCurrentData()
    } catch (error) {
      console.error(error)

      toast.error(t(TranslationKey.Error))
    }
  }

  async onClickAddSupplierButton() {
    try {
      this.getSuppliersPaymentMethods()

      this.onTriggerOpenModal('showAddOrEditSupplierModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickParseProductsBtn() {
    try {
      if (this.checkIsNoEditProductSelected()) {
        toast.warning(t(TranslationKey['Product with invalid status selected']))

        return
      }

      runInAction(() => {
        this.showCircularProgressModal = true
      })

      await SellerBoardModel.refreshProducts(this.selectedRows)

      await this.getCurrentData()

      toast.success(t(TranslationKey['Products will be updated soon']))

      this.showCircularProgressModal = false
    } catch (error) {
      runInAction(() => {
        this.showCircularProgressModal = false
      })

      toast.error(t(TranslationKey['Parsing data not updated']))

      console.error(error)
    }
  }

  async onClickAddSupplierBtn() {
    try {
      this.selectedProductToLaunch = undefined

      if (this.checkIsNoEditProductSelected()) {
        toast.warning(t(TranslationKey['Product with invalid status selected']))

        return
      }

      if (this.selectedRows.length > 1) {
        const result = await ClientModel.calculatePriceToSeekSomeSuppliers(this.selectedRows)
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
          this.selectedRowId = this.selectedRows[0]
        })
        this.onTriggerOpenModal('showSelectionSupplierModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  onOpenProductDataModal(product, onAmazon) {
    runInAction(() => {
      this.curProduct = product
      this.onAmazon = onAmazon
      this.isBatches = false
    })

    this.onTriggerOpenModal('showProductDataModal')
  }

  onClickProducDataButton() {
    this.onAmazon = false
    this.isBatches = true
    this.curProduct = this.currentData.filter(product => this.selectedRows.includes(product._id))?.[0]

    this.onTriggerOpenModal('showProductDataModal')
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
      console.error(error)
    }
  }

  async onSubmitSeekSomeSuppliers() {
    try {
      await ClientModel.sendProductToSeekSomeSuppliers(this.selectedRows)

      await this.getCurrentData()

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSeekSupplier(clientComment, priceForSeekSupplier) {
    try {
      await ClientModel.sendProductToSeekSupplier(this.selectedProductToLaunch?._id || this.selectedRowId, {
        clientComment,
        priceForClient: priceForSeekSupplier,
      })

      await this.getCurrentData()
      toast.success(t(TranslationKey['Data added successfully']))
    } catch (error) {
      console.error(error)
      toast.success(t(TranslationKey['Data not added']))
    } finally {
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
      console.error(error)
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
      console.error(error)
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

        toast.success(t(TranslationKey['Product added']))
      })

      await this.getCurrentData()
    } catch (error) {
      runInAction(() => {
        this.showCircularProgressModal = false
      })
      console.error(error)
      toast.success(t(TranslationKey['Product not added']))
    }
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onDeleteBarcode(product) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ClientModel.updateProductBarCode(product._id, { barCode: null })
      await this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)

      console.error(error)
    }
  }

  async onDeleteHsCode(product) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ProductModel.editProductsHsCods([{ productId: product._id, hsCode: '' }])
      await this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getStockGoodsByFilters(filter, isRecCall) {
    try {
      const result = await SellerBoardModel.getStockGoodsByFilters(filter)

      runInAction(() => {
        this.sellerBoardDailyData = addIdDataConverter(result?.rows)
      })
    } catch (error) {
      console.error(error)
      if (isRecCall) {
        this.getStockGoodsByFilters()
      } else {
        this.sellerBoardDailyData = []
      }
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      toast.success(t(TranslationKey['Goods are bound']))

      await this.getCurrentData()
    } catch (error) {
      toast.error(t(TranslationKey["You can't bind"]))

      console.error(error)
    }
  }

  setSelectedProduct(item) {
    this.selectedProduct = item
  }

  async onClickSaveSupplierBtn({ supplier, editPhotosOfSupplier, editPhotosOfUnit }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
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

      const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
      const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

      await ProductModel.addSuppliersToProduct(this.selectedRowId || this.selectedRows[0], [createSupplierResult.guid])

      await this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async onClickEditTags(productId) {
    this.selectedRowId = productId
    this.onTriggerOpenModal('showEditProductTagsModal')
  }

  async getCurrentData(options) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const toRefill = 'toRefill'
      const amountInBoxes = 'amountInBoxes'

      let storekeeperId
      let sortField = this.sortModel?.[0]?.field

      if (sortField?.includes(toRefill)) {
        storekeeperId = sortField?.replace(toRefill, '')
        sortField = toRefill
      } else if (sortField?.includes(amountInBoxes)) {
        storekeeperId = sortField?.replace(amountInBoxes, '')
        sortField = amountInBoxes
      }

      const result = await this.getMainDataMethod(
        options || {
          filters: this.getFilters(),

          limit: this.paginationModel.pageSize,
          offset: this.paginationModel.page * this.paginationModel.pageSize,

          sortField: this.sortModel?.length ? sortField : 'updatedAt',
          sortType: this.sortModel?.length ? this.sortModel?.[0]?.sort?.toUpperCase() : 'DESC',
          storekeeper: storekeeperId,

          ...this.defaultGetCurrentDataOptions?.(),
        },
      )

      runInAction(() => {
        this.meta = result?.meta
        this.currentData = result?.rows || result
        this.rowCount = result?.count || result.length
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      console.error(error)
      this.currentData = []
      this.rowCount = 0
      this.setRequestStatus(loadingStatus.FAILED)
    }
  }

  async getPresets() {
    try {
      const currentPresets = await this.getCurrentPresets()
      const allPresets = await this.getAllPresets()

      const presetsData = []

      if (currentPresets) {
        for (const preset of allPresets) {
          const presetData = {}
          const existPreset = currentPresets.find(currentPreset => currentPreset?.table === preset?.table)

          if (existPreset) {
            presetData._id = existPreset?._id
            presetData.table = existPreset?.table

            const existFields = existPreset?.fields?.map(field => ({
              field,
              checked: true,
              name: formatCamelCaseString(field),
            }))

            const notExistFields = preset?.fields
              ?.filter(field => !existPreset?.fields?.includes(field))
              ?.map(field => ({
                field,
                checked: false,
                name: formatCamelCaseString(field),
              }))

            presetData.fields = [...existFields, ...notExistFields]
          } else {
            presetData._id = undefined
            presetData.table = preset?.table
            presetData.fields = preset?.fields?.map(field => ({
              field,
              checked: false,
              name: formatCamelCaseString(field),
            }))
          }

          presetsData.push(presetData)
        }
      } else {
        for (const preset of allPresets) {
          const presetData = {}

          presetData.fields = preset?.fields?.map(field => ({
            field,
            checked: false,
            name: formatCamelCaseString(field),
          }))
          presetData.table = preset?.table
          presetData._id = undefined

          presetsData.push(presetData)
        }
      }

      runInAction(() => {
        this.presetsData = presetsData
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getAllPresets() {
    try {
      const result = await OtherModel.getPresets()

      return result
    } catch (error) {
      console.error(error)
    }
  }

  async getCurrentPresets() {
    try {
      const result = await UserModel.getUsersPresets()

      return result
    } catch (error) {
      console.error(error)
    }
  }

  async resetPresetsHandler() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      for await (const preset of this.presetsData) {
        if (!preset?._id) {
          continue
        }

        await UserModel.deleteUsersPresetsByGuid(preset?._id)

        preset.fields = preset?.fields?.map(field => ({
          ...field,
          checked: false,
        }))
        preset._id = undefined
      }

      await this.getCurrentData()
      runInAction(() => {
        this.presetsData = [...this.presetsData]
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async savePresetsHandler(presetsData) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      for await (const preset of presetsData) {
        const presetId = preset?._id
        const presetTable = preset?.table
        const presetEndpoint = 'clients/products/my_with_pag_v2'
        const fields = preset?.fields?.filter(field => field?.checked)?.map(field => field?.field)

        if (!presetId) {
          if (!fields?.length) {
            continue
          }

          const body = {
            endpoint: presetEndpoint,
            table: presetTable,
            fields,
          }

          const response = await UserModel.postUsersPresets(body)

          preset._id = response.guid
        } else {
          if (!fields?.length) {
            await UserModel.deleteUsersPresetsByGuid(presetId)
            preset._id = undefined
          } else {
            const body = {
              endpoint: presetEndpoint,
              table: presetTable,
              fields,
            }

            await UserModel.patchUsersPresetsByGuid(presetId, body)
          }
        }
      }

      await this.getCurrentData()
      runInAction(() => {
        this.presetsData = [...this.presetsData]
      })

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers(BoxStatus.IN_STOCK, undefined, true)

      return result
    } catch (error) {
      console.error(error)
    }
  }

  async getIntegrationFields() {
    try {
      const result = await ParserModel.getFieldsInventoryIntegration()

      return result
    } catch (error) {
      console.error(error)
    }
  }

  async initTableColumns() {
    const [storekeepers, integrationTables] = await Promise.all([this.getStorekeepers(), this.getIntegrationFields()])

    const filteredStorekeepers = storekeepers?.filter(storekeeper => storekeeper?.boxesCount > 0)

    this.setAllColumns(filteredStorekeepers, integrationTables)

    this.getTableSettingsPreset()
  }
}
