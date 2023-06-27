import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier } from '@constants/white-list'

import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { SellerBoardModel } from '@models/seller-board-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { clientDailySellerBoardColumns } from '@components/table/table-columns/client/client-daily-seller-board-columns'

import { addIdDataConverter, stockReportDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class StockReportModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  sellerBoardDailyData = []
  selectedRowId = undefined

  shopsData = []
  currentShop = undefined

  inventoryProducts = []
  drawerOpen = false

  successModalText = ''
  clientComment = ''
  priceForSeekSupplier = 0
  yuanToDollarRate = undefined
  volumeWeightCoefficient = undefined

  infoModalText = ''

  showCircularProgressModal = false

  showAddProductSellerboardModal = false
  showBindStockGoodsToInventoryModal = false
  showAddOrEditSupplierModal = false
  showSelectionSupplierModal = false
  showSuccessModal = false
  showInfoModal = false
  showConfirmModal = false

  addProductSettings = {
    product: {},
    onSubmit: data => this.onSubmitCreateSinglePermission(data),
  }

  readyImages = []
  progressValue = 0
  showProgress = false

  selectedRows = []
  selectedRow = {}
  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = clientDailySellerBoardColumns()

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  confirmModalSettings = {
    isWarning: false,
    title: '',
    message: '',
    onSubmit: () => {},
    onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
  }

  constructor({ history, curShop }) {
    this.history = history

    this.currentShop = curShop
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangePaginationModelChange(model) {
    runInAction(() => {
      this.paginationModel = model
    })

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_DAILY_SELLER_BOARD)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_DAILY_SELLER_BOARD]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  getCurrentData() {
    return toJS(this.sellerBoardDailyData)
  }

  onClickShopBtn(shop) {
    this.currentShop = shop ? shop : undefined

    this.getStockGoods()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await Promise.all([this.getShops(), this.getStockGoods()])

      this.getDataGridState()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  async onClickAddSupplierButton() {
    try {
      const result = await UserModel.getPlatformSettings()

      this.yuanToDollarRate = result.yuanToDollarRate
      this.volumeWeightCoefficient = result.volumeWeightCoefficient

      this.onTriggerOpenModal('showAddOrEditSupplierModal')
      this.onTriggerOpenModal('showSelectionSupplierModal')
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onSelectionModel(model) {
    this.selectedRows = model
  }

  async onSubmitMoveToInventoryGoods() {
    try {
      this.showCircularProgressModal = true
      const productsToCreate = []

      this.sellerBoardDailyData.forEach(
        cur =>
          this.selectedRows.includes(cur.id) &&
          productsToCreate.push({ shopId: cur.shop._id, asin: cur.asin, sku: cur.sku, title: cur.title }),
      )

      this.selectedRows = []

      await SellerBoardModel.createAndLinkSkuProducts({ payload: productsToCreate })

      this.showCircularProgressModal = false

      this.infoModalText = t(TranslationKey['The products will appear in the inventory soon'])
      this.onTriggerOpenModal('showInfoModal')
    } catch (error) {
      console.log(error)
      this.error = error

      this.showCircularProgressModal = false

      this.infoModalText = t(TranslationKey['Will not be moved to inventory'])
      this.onTriggerOpenModal('showInfoModal')
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

  async getStockGoods() {
    try {
      const result = await SellerBoardModel.getStockGoods(this.currentShop && { shopId: this.currentShop._id })

      runInAction(() => {
        this.sellerBoardDailyData = stockReportDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
      this.error = error

      this.sellerBoardDailyData = []
    }
  }

  onClickAddBtn() {
    this.onTriggerOpenModal('showAddProductSellerboardModal')
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async onClickBindStockGoodsToInventoryBtn() {
    try {
      this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getProductsMy(filters, isRecCall) {
    try {
      const result = await ClientModel.getProductsMy(filters)
      runInAction(() => {
        this.inventoryProducts = addIdDataConverter(result)
          .sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
          .filter(el => !el.archive)
      })

      if (!this.inventoryProducts.length && isRecCall) {
        this.getProductsMy()
      }
    } catch (error) {
      console.log(error)
      if (isRecCall) {
        this.getProductsMy()
      } else {
        this.inventoryProducts = []
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      }
    }
  }

  async onSubmitCreateAndBindProduct(data, photosOfNewProduct) {
    try {
      if (photosOfNewProduct.length) {
        await onSubmitPostImages.call(this, { images: photosOfNewProduct, type: 'readyImages' })
      }

      const resData = { ...data, images: this.readyImages.length ? this.readyImages : data.images }

      const result = await ClientModel.createProduct(resData)

      await SellerBoardModel.bindStockProductsBySku({ productId: result.guid, skus: data.skusByClient })

      if (result) {
        this.selectedRowId = result.guid

        this.onTriggerOpenModal('showSelectionSupplierModal')
      }

      this.successModalText = t(TranslationKey['Moved to inventory'])
      this.onTriggerOpenModal('showSuccessModal')

      this.onTriggerOpenModal('showAddProductSellerboardModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitCalculateSeekSupplier(clientComment) {
    try {
      this.clientComment = clientComment

      const result = await ClientModel.calculatePriceToSeekSupplier(this.selectedRowId)

      this.priceForSeekSupplier = result.priceForClient

      // this.confirmMessage = `Стоимость услуги поиска поставщика составит $${toFixed(
      //   result.priceForClient,
      //   2,
      // )}.\n Подать заявку?`

      this.confirmModalSettings = {
        isWarning: false,
        title: t(TranslationKey.Attention),
        message: `Стоимость услуги поиска поставщика составит $${toFixed(result.priceForClient, 2)}.\n Подать заявку?`,
        onSubmit: () => {
          this.onSubmitSeekSupplier()
        },

        onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
      }

      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitDeleteRow() {
    try {
      await SellerBoardModel.deleteStockGoodsById(this.selectedRows[0])

      this.loadData()

      this.onTriggerOpenModal('showConfirmModal')

      this.successModalText = t(TranslationKey['Row deleted'])
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  onClickDeleteBtn() {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey['Delete row from report']),
      message: t(TranslationKey['After confirmation, the row will be deleted. Confirm?']),
      onSubmit: () => {
        this.onSubmitDeleteRow()
      },

      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
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

      this.successModalText = t(TranslationKey['Moved to inventory'])
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSaveSupplier({ supplier, photosOfSupplier, addMore, makeMainSupplier }) {
    try {
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

      this.successModalText = t(TranslationKey['Supplier added'])
      this.onTriggerOpenModal('showSuccessModal')

      !addMore && this.onTriggerOpenModal('showAddOrEditSupplierModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')

      this.successModalText = t(TranslationKey['The product is bound'])
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.infoModalText = t(TranslationKey["You can't bind"])
      this.onTriggerOpenModal('showInfoModal')
      console.log(error)
    }
  }
}
