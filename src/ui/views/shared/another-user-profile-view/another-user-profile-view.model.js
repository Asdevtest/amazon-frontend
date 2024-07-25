import { makeAutoObservable, runInAction, toJS } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRoleCodeMap, UserRoleCodeMapForRoutes } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { ClientModel } from '@models/client-model'
import { FeedbackModel } from '@models/feedback-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { TableSettingsModel } from '@models/table-settings'
import { UserModel } from '@models/user-model'

import { clientExchangeViewColumns } from '@components/table/table-columns/client/client-exchange-columns'
// import {UserModel} from '@models/user-model'
import { vacByUserIdExchangeColumns } from '@components/table/table-columns/product/vac-by-user-id-exchange-columns'

import { checkIsClient, checkIsFreelancer } from '@utils/checks'
import { addIdDataConverter, clientProductsDataConverter } from '@utils/data-grid-data-converters'
import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayBlackList } from '@utils/object'
import { toFixedWithDollarSign } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { Roles } from '@typings/enums/roles'

export class AnotherProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined

  user = undefined

  productList = []
  reviews = []

  productsVacant = []
  shopsData = []
  selectedShopId = ''

  tabExchange = 0
  tabHistory = 0
  tabReview = 0
  selectedUser = undefined
  showTabModal = false
  showInfoModal = false
  showConfirmWorkResultFormModal = false

  headerInfoData = {
    investorsCount: 255,
    goodsFound: 875,
    transactionsVolume: 7555,
    earnedAmount: 1255,
    addInSave: 12,
    inBlocked: 12,
    youBlocked: 14,
    accountCreateAt: 11,
  }

  get userInfo() {
    return UserModel.userInfo
  }

  get simpleChats() {
    return ChatModel.simpleChats || []
  }

  rowHandlers = {
    onClickLaunchPrivateLabelBtn: item => this.onClickLaunchPrivateLabelBtn(item),
  }

  showConfirmModal = false
  showOrderModal = false

  showSelectShopsModal = false

  selectedProduct = undefined

  storekeepers = []

  destinations = []

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  sortModel = []
  filterModel = { items: [] }
  densityModel = 'compact'
  columnsModel =
    this.userInfo.role === Roles.CLIENT ? clientExchangeViewColumns(this.rowHandlers) : vacByUserIdExchangeColumns()

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  get currentData() {
    return this.productsVacant
  }

  get platformSettings() {
    return SettingsModel.platformSettings
  }

  constructor({ history }) {
    this.history = history

    this.userId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    TableSettingsModel.saveTableSettings(requestState, DataGridTablesKeys.PROFILE_VAC_PRODUCTS)
  }

  getDataGridState() {
    const state = TableSettingsModel.getTableSettings(DataGridTablesKeys.PROFILE_VAC_PRODUCTS)

    if (state) {
      this.sortModel = toJS(state.sortModel)
      this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
      this.paginationModel = toJS(state.paginationModel)
      this.columnVisibilityModel = toJS(state.columnVisibilityModel)
    }
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onClickCancelBtn = () => {
    this.onTriggerOpenModal('showOrderModal')

    this.selectedProduct = {}

    toast.warning(t(TranslationKey['This item has been moved to Inventory']))
  }

  onClickLaunchPrivateLabelBtn(product) {
    this.selectedProduct = product

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You buy a product card, are you sure?']),
      confirmMessage: `${t(TranslationKey['You will be charged'])} (${
        this.selectedProduct && toFixedWithDollarSign(this.selectedProduct.priceForClient, 2)
      })?`,
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

  async onClickWriteBtn(anotherUserId) {
    try {
      if (!this.simpleChats.some(el => el.users.map(e => e._id).includes(anotherUserId))) {
        await ChatsModel.createSimpleChatByUserId(anotherUserId)
      }

      this.history.push(`/${UserRoleCodeMapForRoutes[this.userInfo.role]}/messages`, {
        anotherUserId,
      })
    } catch (e) {
      console.error(e)
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

      this.loadData()
    } catch (error) {
      toast.error(t(TranslationKey["You can't buy the product"]))

      console.error(error)
    }
  }

  async openCreateOrder() {
    try {
      const [storekeepers, destinations] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
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

  async getReviews() {
    try {
      const result = await FeedbackModel.getFeedback(this.userId)

      runInAction(() => {
        this.reviews = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.error(error)
    }
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
      runInAction(() => {
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      })
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
      }
      await ClientModel.createOrder(createorderData)

      if (this.uploadedFiles.length) {
        await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
      }

      runInAction(() => {
        this.selectedProduct = {}
      })
    } catch (error) {
      console.error(error)
    }
  }

  onChangeFilterModel(model) {
    this.filterModel = model

    this.setDataGridState()
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

  async loadData() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      await this.getUserById()

      if (!checkIsFreelancer(UserRoleCodeMap[this.userInfo.role])) {
        await this.getProductsVacant()
      }

      if (checkIsClient(UserRoleCodeMap[this.userInfo.role])) {
        await this.getShops()
      }

      await Promise.all(this.getDataGridState(), this.getReviews())

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async getProductsVacant() {
    try {
      const result = await ProductModel.getVacProductByUserId(this.userId)

      runInAction(() => {
        this.productsVacant = clientProductsDataConverter(result).sort(
          sortObjectsArrayByFiledDateWithParseISO('updatedAt'),
        )
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.productsVacant = []
      })
    }
  }

  async getUserById() {
    try {
      const result = await UserModel.getUserInfoById(this.userId)

      runInAction(() => {
        this.user = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }

  async onAcceptReview(review) {
    await FeedbackModel.sendFeedback(this.userId, {
      rating: review.rating,
      comment: review.review,
    })
    await this.getReviews()
    this.onTriggerOpenModal('showConfirmWorkResultFormModal')
  }
}
