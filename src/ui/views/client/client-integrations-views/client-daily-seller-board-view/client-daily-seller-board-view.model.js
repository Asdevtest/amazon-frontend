import {makeAutoObservable, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {texts} from '@constants/texts'

import {ClientModel} from '@models/client-model'
import {ProductModel} from '@models/product-model'
import {SellerBoardModel} from '@models/seller-board-model'
import {SettingsModel} from '@models/settings-model'
import {SupplierModel} from '@models/supplier-model'

import {clientDailySellerBoardColumns} from '@components/table-columns/client/client-daily-seller-board-columns'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getLocalizedTexts} from '@utils/get-localized-texts'
import {getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {onSubmitPostImages} from '@utils/upload-files'

const textConsts = getLocalizedTexts(texts, 'ru').clientDailySellerBoardView

export class ClientDailySellerBoardViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  sellerBoardDailyData = []
  selectedRowId = undefined

  inventoryProducts = []
  drawerOpen = false

  successModalText = ''
  confirmMessage = ''
  clientComment = ''
  priceForSeekSupplier = 0

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

  rowHandlers = {
    selectedRow: item => this.onClickRowRadioBtn(item),
  }

  readyImages = []
  progressValue = 0
  showProgress = false

  selectedRows = []
  selectedRow = {}
  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel = clientDailySellerBoardColumns(this.selectedRow, this.rowHandlers)

  constructor({history}) {
    this.history = history
    makeAutoObservable(this, undefined, {autoBind: true})
  }

  setDataGridState(state) {
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.CLIENT_DAILY_SELLER_BOARD)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.CLIENT_DAILY_SELLER_BOARD]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = clientDailySellerBoardColumns(this.selectedRow, this.rowHandlers).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model
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

  getCurrentData() {
    return toJS(this.sellerBoardDailyData)
  }

  onClickRowRadioBtn = item => {
    this.selectedRow = item
    this.getDataGridState()
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getMyDailyReports()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      console.log(error)
      this.setRequestStatus(loadingStatuses.failed)
    }
  }

  onTriggerDrawer() {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onSelectionModel(model) {
    this.selectedRows = model
  }

  async getMyDailyReports() {
    try {
      const result = await SellerBoardModel.getMyDailyReports()

      runInAction(() => {
        this.sellerBoardDailyData = addIdDataConverter(result)
      })
    } catch (error) {
      console.log(error)
      this.error = error
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

  async getProductsMy(filters) {
    try {
      const result = await ClientModel.getProductsMy(filters)
      runInAction(() => {
        this.inventoryProducts = result.sort(sortObjectsArrayByFiledDateWithParseISO('updatedAt'))
      })
    } catch (error) {
      console.log(error)
      this.inventoryProducts = []

      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async onSubmitCreateAndBindProduct(data, photosOfNewProduct) {
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

      this.successModalText = textConsts.successSeekSupplierTitle
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

      this.confirmMessage = `Стоимость услуги поиска поставщика составит ${result.priceForClient} $. Подать заявку?`

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

      this.successModalText = textConsts.successSeekSupplierTitle
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      console.log(error)
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

  async onSubmitBindStockGoods(data) {
    try {
      await SellerBoardModel.bindStockProductsBySku(data)
      this.onTriggerOpenModal('showBindStockGoodsToInventoryModal')

      this.successModalText = textConsts.successBindTitle
      this.onTriggerOpenModal('showSuccessModal')
    } catch (error) {
      this.onTriggerOpenModal('showInfoModal')
      console.log(error)
    }
  }
}
