import {makeAutoObservable, reaction, runInAction, toJS} from 'mobx'

import {DataGridTablesKeys} from '@constants/data-grid-tables-keys'
import {loadingStatuses} from '@constants/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'
import {mapUserRoleEnumToKey, UserRole, UserRoleCodeMapForRoutes} from '@constants/user-roles'

import {ChatModel} from '@models/chat-model'
import {ClientModel} from '@models/client-model'
import {ProductModel} from '@models/product-model'
import {RequestModel} from '@models/request-model'
import {SettingsModel} from '@models/settings-model'
import {ShopModel} from '@models/shop-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {clientExchangeViewColumns} from '@components/table-columns/client/client-exchange-columns'
// import {UserModel} from '@models/user-model'
import {vacByUserIdExchangeColumns} from '@components/table-columns/product/vac-by-user-id-exchange-columns'

import {addIdDataConverter, clientProductsDataConverter} from '@utils/data-grid-data-converters'
import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList} from '@utils/object'
import {toFixedWithDollarSign} from '@utils/text'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

export class AnotherProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined

  user = undefined

  drawerOpen = false

  rowsPerPage = 15
  curPage = 1
  productList = []

  productsVacant = []
  shopsData = []
  selectedShops = []

  tabExchange = 0
  tabHistory = 0
  tabReview = 0
  selectedUser = undefined
  showTabModal = false
  showInfoModal = false
  firstRowId = undefined

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

  get curUser() {
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
  showWarningModal = false
  showSuccessModal = false
  showWarningModalText = ''
  showSelectShopsModal = false

  selectedProduct = undefined

  storekeepers = []

  destinations = []

  volumeWeightCoefficient = undefined

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  sortModel = []
  filterModel = {items: []}
  curPage = 0
  rowsPerPage = 15
  densityModel = 'compact'
  columnsModel =
    this.curUser.role === mapUserRoleEnumToKey[UserRole.CLIENT]
      ? clientExchangeViewColumns(this.rowHandlers, this.firstRowId)
      : vacByUserIdExchangeColumns()

  constructor({history}) {
    this.history = history

    this.userId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, {autoBind: true})
    reaction(
      () => SettingsModel.languageTag,
      () => this.updateColumnsModel(),
    )
    reaction(
      () => this.firstRowId,
      () => this.updateColumnsModel(),
    )
  }

  async updateColumnsModel() {
    if (await SettingsModel.languageTag) {
      this.getDataGridState()
    }
  }

  setDataGridState(state) {
    this.firstRowId = state.sorting.sortedRows[0]
    const requestState = getObjectFilteredByKeyArrayWhiteList(state, [
      'sorting',
      'filter',
      'pagination',
      'density',
      'columns',
    ])

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.PROFILE_VAC_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.PROFILE_VAC_PRODUCTS]

    if (state) {
      this.sortModel = state.sorting.sortModel
      this.filterModel = state.filter.filterModel
      this.rowsPerPage = state.pagination.pageSize

      this.densityModel = state.density.value
      this.columnsModel = (
        this.curUser.role === mapUserRoleEnumToKey[UserRole.CLIENT]
          ? clientExchangeViewColumns(this.rowHandlers, this.firstRowId)
          : vacByUserIdExchangeColumns()
      ).map(el => ({
        ...el,
        hide: state.columns?.lookup[el?.field]?.hide,
      }))
    }
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onClickCancelBtn = () => {
    this.onTriggerOpenModal('showOrderModal')

    this.selectedProduct = {}

    this.showWarningModalText = t(TranslationKey['This item has been moved to Inventory'])
    this.onTriggerOpenModal('showWarningModal')
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
      console.log(error)
      this.error = error
    }
  }

  async onSaveProductData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await ClientModel.updateProduct(
        this.selectedProduct._id,
        getObjectFilteredByKeyArrayBlackList(
          {
            shopIds: this.selectedShops,
          },
          ['suppliers'],
        ),
      )
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log('error', error)
    }
  }

  async onClickWriteBtn(anotherUserId) {
    try {
      if (!this.simpleChats.some(el => el.users.map(e => e._id).includes(anotherUserId))) {
        await RequestModel.createSimpleChatByUserId(anotherUserId)

        ChatModel.init()
      }

      this.history.push(`/${UserRoleCodeMapForRoutes[this.curUser.role]}/messages`, {
        anotherUserId,
      })
    } catch (e) {
      console.log(e)
    }
  }

  async onClickBuyProductBtn(shops) {
    try {
      await ClientModel.makePayments([this.selectedProduct._id])

      this.selectedShops = shops

      await this.onSaveProductData()

      this.onTriggerOpenModal('showSelectShopsModal')

      this.openCreateOrder()

      this.updateUserInfo()
      this.loadData()
    } catch (error) {
      this.showWarningModalText = t(TranslationKey["You can't buy the product"])
      this.onTriggerOpenModal('showWarningModal')

      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async openCreateOrder() {
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
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onClickOrderNowBtn = (orderData, totalOrdersCost) => {
    this.ordersDataStateToSubmit = orderData[0]

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(
        TranslationKey['Confirm order'],
      )}?`,
      onClickConfirm: () => this.onLaunchPrivateLabel(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onLaunchPrivateLabel() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const requestProduct = getObjectFilteredByKeyArrayBlackList({...this.ordersDataStateToSubmit}, [
        'tmpResearcherName',
        'tmpBuyerName',
        'tmpStrategyStatus',
      ])

      await this.createOrder(requestProduct)
      this.setRequestStatus(loadingStatuses.success)

      this.onTriggerOpenModal('showOrderModal')
      this.onTriggerOpenModal('showSuccessModal')

      this.onTriggerOpenModal('showConfirmModal')

      this.loadData()
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async createOrder(orderObject) {
    try {
      this.uploadedFiles = []

      if (orderObject.tmpBarCode.length) {
        await onSubmitPostImages.call(this, {images: orderObject.tmpBarCode, type: 'uploadedFiles'})
      } else if (!orderObject.barCode) {
        await ClientModel.updateProductBarCode(orderObject.productId, {barCode: null})
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
        await ClientModel.updateProductBarCode(orderObject.productId, {barCode: this.uploadedFiles[0]})
      }

      this.selectedProduct = {}
      await this.updateUserInfo()
    } catch (error) {
      console.log(error)
      this.error = error
      throw new Error('Failed to create order')
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
    return toJS(this.productsVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)
      await this.getUserById()
      this.getDataGridState()

      if (this.curUser.role === mapUserRoleEnumToKey[UserRole.CLIENT]) {
        await this.getShops()
      }

      await this.getProductsVacant()
      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
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
      console.log(error)
      this.productsVacant = []
      if (error.body && error.body.message) {
        this.error = error.body.message
      }
    }
  }

  async getUserById() {
    try {
      const result = await UserModel.getUserInfoById(this.userId)

      runInAction(() => {
        this.user = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  // async loadData() {
  //   try {
  //     this.setRequestStatus(loadingStatuses.isLoading)

  //     await this.getUserById()

  //     this.setRequestStatus(loadingStatuses.success)
  //   } catch (error) {
  //     this.setRequestStatus(loadingStatuses.failed)
  //     console.log(error)
  //   }
  // }

  onChangeTabReview(e, value) {
    this.tabReview = value
  }

  onChangeTabHistory(e, value) {
    this.tabHistory = value
  }

  onChangeTabExchange(e, value) {
    this.tabExchange = value
  }

  onTriggerDrawerOpen = () => {
    this.drawerOpen = !this.drawerOpen
  }

  onChangeCurPage(e) {
    this.curPage = e
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
