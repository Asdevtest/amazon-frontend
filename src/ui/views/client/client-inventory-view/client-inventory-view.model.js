import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {ClientModel} from '@models/client-model'
import {ProductModel} from '@models/product-model'
import {SellerBoardModel} from '@models/seller-board-model'
import {SettingsModel} from '@models/settings-model'
import {SupplierModel} from '@models/supplier-model'
import {UserModel} from '@models/user-model'

import {clientInventoryColumns} from '@components/table-columns/client/client-inventory-columns'

import {copyToClipBoard} from '@utils/clipboard'
import {addIdDataConverter, clientInventoryDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixed} from '@utils/text'
import {onSubmitPostImages} from '@utils/upload-files'

const textConsts = getLocalizedTexts(texts, 'en').inventoryView

const fieldsOfProductAllowedToUpdate = [
  'dirdecision',
  'researcherFine',
  'researcherFineComment',
  'supervisorFine',
  'supervisorFineComment',
  'barCode',
  'clientComment',
]

export class ClientInventoryViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined
  actionStatus = undefined

  productsMy = []
  orders = []
  selectedRowIds = []
  sellerBoardDailyData = []

  selectedRowId = undefined

  drawerOpen = false
  showOrderModal = false
  showSuccessModal = false
  showSetBarcodeModal = false
  showSelectionSupplierModal = false
  showAddOrEditSupplierModal = false
  selectedProduct = undefined
  showSendOwnProductModal = false
  showBindInventoryGoodsToStockModal = false
  showInfoModal = false
  showConfirmModal = false

  successModalText = ''
  confirmMessage = ''
  showInfoModalTitle = ''
  priceForSeekSupplier = 0

  barCodeHandlers = {
    onClickBarcode: item => this.onClickBarcode(item),
    onDoubleClickBarcode: item => this.onDoubleClickBarcode(item),
    onDeleteBarcode: item => this.onDeleteBarcode(item),
  }

  readyImages = []
  progressValue = 0
  showProgress = false

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientInventoryColumns(this.barCodeHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  onChangeFilterModel(model) {
    this.filterModel = model
  }

  onClickShowProduct(row) {
    this.history.push({
      pathname: '/client/product',
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
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientInventoryColumns(this.barCodeHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeRowsPerPage(e) {
    this.rowsPerPage = e
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeDrawerOpen(e, value) {
    this.drawerOpen = value
  }

  onChangeSortingModel(e) {
    this.sortModel = e.sortModel
  }

  onSelectionModel(model) {
    this.selectedRowIds = model
  }

  getCurrentData() {
    return toJS(this.productsMy)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getProductsMy()
      await this.getOrders()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async getOrders() {
    try {
      const result = await ClientModel.getOrders()

      runInAction(() => {
        this.orders = result
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getProductsMy() {
    try {
      const result = await ClientModel.getProductsMy()
      runInAction(() => {
        this.productsMy = clientInventoryDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onClickSaveBarcode(barCode) {
    await ClientModel.updateProductBarCode(this.selectedProduct._id, {barCode})

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
    if (item.barCode) {
      copyToClipBoard(item.barCode)
    } else {
      this.setSelectedProduct(item)
      this.onTriggerOpenModal('showSetBarcodeModal')
    }
  }

  async onSubmitOrderProductModal(ordersDataState) {
    try {
      this.setActionStatus(loadingStatuses.isLoading)
      this.error = undefined
      for (let i = 0; i < ordersDataState.length; i++) {
        const product = ordersDataState[i]
        await this.createOrder(product)
      }

      if (!this.error) {
        this.successModalText = textConsts.successOrderTitle
        this.onTriggerOpenModal('showSuccessModal')
      }
      this.setActionStatus(loadingStatuses.success)
    } catch (error) {
      this.setActionStatus(loadingStatuses.failed)
      console.log(error)
      this.error = error
    }
  }

  async createOrder(orderObject) {
    try {
      await ClientModel.createOrder(getObjectFilteredByKeyArrayBlackList(orderObject, ['barCode']))

      await ClientModel.updateProductBarCode(orderObject.productId, {barCode: orderObject.barCode})

      await this.updateUserInfo()
    } catch (error) {
      console.log(error)

      this.showInfoModalTitle = `${textConsts.infoNoMakeOrder} "${error.body.message}"`
      this.onTriggerOpenModal('showInfoModal')
      this.error = error
    }
  }

  async onSubmitSaveSupplier(supplier, photosOfSupplier, addMore, makeMainSupplier) {
    try {
      if (photosOfSupplier.length) {
        await onSubmitPostImages.call(this, {images: photosOfSupplier, type: 'readyImages'})
      }

      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        delivery: parseFloat(supplier?.delivery) || 0,
        lotcost: parseFloat(supplier?.lotcost) || '',
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

      this.successModalText = textConsts.successSupplierTitle
      this.onTriggerOpenModal('showSuccessModal')

      !addMore && this.onTriggerOpenModal('showAddOrEditSupplierModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  onClickAddSupplierBtn() {
    this.selectedRowId = this.selectedRowIds[0]
    this.onTriggerOpenModal('showSelectionSupplierModal')
  }

  async onSubmitCalculateSeekSupplier(clientComment) {
    try {
      this.clientComment = clientComment

      const result = await ClientModel.calculatePriceToSeekSupplier(this.selectedRowId)

      this.priceForSeekSupplier = result.priceForClient

      this.confirmMessage = `Стоимость услуги поиска поставщика составит $${toFixed(
        result.priceForClient,
        2,
      )}.\n Подать заявку?`

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

  async onSubmitCreateProduct(data, photosOfNewProduct) {
    try {
      if (photosOfNewProduct.length) {
        await onSubmitPostImages.call(this, {images: photosOfNewProduct, type: 'readyImages'})
      }

      const resData = {...data, images: this.readyImages.length ? this.readyImages : data.images}

      const result = await ClientModel.createProduct(resData)

      if (result) {
        this.selectedRowId = result.guid

        this.onTriggerOpenModal('showSelectionSupplierModal')
      }

      this.successModalText = textConsts.successAddProductTitle
      this.onTriggerOpenModal('showSuccessModal')

      await this.getProductsMy()
      this.onTriggerOpenModal('showSendOwnProductModal')
    } catch (error) {
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

  async onDeleteBarcode(product) {
    await ClientModel.updateProductBarCode(product._id, {barCode: ''})
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

  async getStockGoodsByFilters(filter) {
    try {
      const result = await SellerBoardModel.getStockGoodsByFilters(filter)

      runInAction(() => {
        this.sellerBoardDailyData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      this.sellerBoardDailyData = []
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindInventoryGoodsToStockModal')

      this.successModalText = textConsts.successBindTitle
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.showInfoModalTitle = textConsts.infoModalTitle
      this.onTriggerOpenModal('showInfoModal')

      console.log(error)
    }
  }

  onChangeCurPage(e) {
    this.curPage = e
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
