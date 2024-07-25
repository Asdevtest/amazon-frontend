import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { clientExchangeViewColumns } from '@components/table/table-columns/client/client-exchange-columns'

import { addIdDataConverter, clientProductsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'

export class ClientExchangeViewModel {
  requestStatus = undefined

  productsVacant = []
  dataToPay = {}
  storekeepers = []
  shopsData = []

  destinations = []

  ordersDataStateToSubmit = undefined

  showPrivateLabelModal = false
  showConfirmModal = false
  showSelectShopsModal = false

  selectedProduct = {}
  selectedShopId = ''
  product = {}
  uploadedFiles = []

  rowHandlers = {
    onClickLaunchPrivateLabelBtn: item => this.onClickLaunchPrivateLabelBtn(item),
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel = clientExchangeViewColumns(this.rowHandlers)

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  showOrderModal = false

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get platformSettings() {
    return SettingsModel.platformSettings
  }

  constructor() {
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.CLIENT_EXCHANGE)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.CLIENT_EXCHANGE)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onPaginationModelChange(model) {
    this.paginationModel = model

    this.setDataGridState()
  }

  onColumnVisibilityModelChange(model) {
    this.columnVisibilityModel = model

    this.setDataGridState()
  }

  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onChangeSortingModel(sortModel) {
    this.sortModel = sortModel

    this.setDataGridState()
  }

  onSelectionModel(model) {
    this.rowSelectionModel = model
  }

  get currentData() {
    return this.productsVacant
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)
      this.getDataGridState()

      this.getProductsVacant()
      this.getShops()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  async getProductsVacant() {
    try {
      const result = await ClientModel.getProductsVacant()
      runInAction(() => {
        this.productsVacant = clientProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getProductById(productId) {
    try {
      const result = await ProductModel.getProductById(productId)

      runInAction(() => {
        this.product = result
        this.selectedProduct = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickLaunchPrivateLabelBtn(product) {
    this.selectedProduct = product
    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['Purchasing a product card']),
      confirmMessage: `${t(TranslationKey['You will be charged'])} ${
        this.selectedProduct && toFixedWithDollarSign(this.selectedProduct.priceForClient, 2)
      }`,
      onClickConfirm: () => this.onClickBuyProductBtn(),
    }

    this.onTriggerOpenModal('showSelectShopsModal')
  }

  async getShops() {
    try {
      const result = await ShopModel.getMyShops()
      runInAction(() => {
        this.shopsData = addIdDataConverter(result)
      })
    } catch (error) {
      console.error(error)
    }
  }

  async createOrder(orderObject) {
    try {
      if (orderObject.tmpBarCode.length) {
        await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })
      } else if (!orderObject.barCode) {
        await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
      }

      const createorderData = {
        amount: orderObject.amount,
        deliveryMethod: orderObject.deliveryMethod,
        warehouse: orderObject.warehouse,
        clientComment: orderObject.clientComment,
        productId: orderObject.productId,
        storekeeperId: orderObject.storekeeperId,
        destinationId: orderObject.destinationId,
        logicsTariffId: orderObject.logicsTariffId,
        totalPrice: orderObject.totalPrice,
        priority: orderObject.priority,
        expressChinaDelivery: orderObject.expressChinaDelivery,
        deadline: orderObject.deadline,
        needsResearch: orderObject.needsResearch,
        buyerId: orderObject.buyerId,
        variationTariffId: orderObject.variationTariffId,
      }

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(createorderData)
      } else {
        await ClientModel.createOrder(createorderData)
      }

      if (this.uploadedFiles.length) {
        await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
      }

      runInAction(() => {
        this.selectedProduct = {}
      })
      await this.updateUserInfo()
    } catch (error) {
      console.error(error)
    }
  }

  async onLaunchPrivateLabel() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const requestProduct = getObjectFilteredByKeyArrayBlackList({ ...this.ordersDataStateToSubmit }, [
        'tmpResearcherName',
        'tmpBuyerName',
        'tmpStrategyStatus',
      ])

      await this.createOrder(requestProduct)
      this.setRequestStatus(loadingStatus.SUCCESS)

      this.onTriggerOpenModal('showOrderModal')

      toast.success(t(TranslationKey['Order successfully created!']))

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async openCreateOrder() {
    try {
      const [storekeepers, destinations] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        this.getProductById(this.selectedProduct._id),
      ])

      runInAction(() => {
        this.storekeepers = storekeepers
        this.destinations = destinations
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onClickBuyProductBtn(shop) {
    try {
      await ClientModel.makePayments([this.selectedProduct._id])

      runInAction(() => {
        this.selectedShopId = shop?._id
      })

      await this.onSaveProductData()
      this.onTriggerOpenModal('showSelectShopsModal')

      this.openCreateOrder()

      this.updateUserInfo()
      this.loadData()
    } catch (error) {
      toast.error(t(TranslationKey["You can't buy the product"]))

      console.error(error)
    }
  }

  async onSaveProductData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await ClientModel.updateProduct(
        this.selectedProduct._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            shopId: this.selectedShopId,
          },
          ['suppliers'],
        ),
      )
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  onClickCancelBtn = () => {
    this.onTriggerOpenModal('showOrderModal')

    this.selectedProduct = undefined

    toast.warning(t(TranslationKey['This item has been moved to Inventory']))
  }

  onClickOrderNowBtn = ({ ordersDataState, totalOrdersCost }) => {
    this.ordersDataStateToSubmit = ordersDataState[0]

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onClickConfirm: () => this.onLaunchPrivateLabel(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }
}
