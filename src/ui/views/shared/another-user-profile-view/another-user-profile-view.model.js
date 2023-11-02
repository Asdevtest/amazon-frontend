import { makeAutoObservable, runInAction, toJS } from 'mobx'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { UserRole, UserRoleCodeMap, UserRoleCodeMapForRoutes, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatsModel } from '@models/chats-model'
import { ClientModel } from '@models/client-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { ShopModel } from '@models/shop-model'
import { StorekeeperModel } from '@models/storekeeper-model'
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

export class AnotherProfileViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  userId = undefined

  user = undefined

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

  platformSettings = undefined

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
    this.curUser.role === mapUserRoleEnumToKey[UserRole.CLIENT]
      ? clientExchangeViewColumns(this.rowHandlers)
      : vacByUserIdExchangeColumns()

  paginationModel = { page: 0, pageSize: 15 }
  columnVisibilityModel = {}

  constructor({ history }) {
    runInAction(() => {
      this.history = history

      this.userId = history.location.search.slice(1)
    })

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  setDataGridState() {
    const requestState = {
      sortModel: toJS(this.sortModel),
      filterModel: toJS(this.filterModel),
      paginationModel: toJS(this.paginationModel),
      columnVisibilityModel: toJS(this.columnVisibilityModel),
    }

    SettingsModel.setDataGridState(requestState, DataGridTablesKeys.PROFILE_VAC_PRODUCTS)
  }

  getDataGridState() {
    const state = SettingsModel.dataGridState[DataGridTablesKeys.PROFILE_VAC_PRODUCTS]

    runInAction(() => {
      if (state) {
        this.sortModel = toJS(state.sortModel)
        this.filterModel = toJS(this.startFilterModel ? this.startFilterModel : state.filterModel)
        this.paginationModel = toJS(state.paginationModel)
        this.columnVisibilityModel = toJS(state.columnVisibilityModel)
      }
    })
  }

  onDoubleClickBarcode = item => {
    this.setSelectedProduct(item)
    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  onClickCancelBtn = () => {
    this.onTriggerOpenModal('showOrderModal')

    runInAction(() => {
      this.selectedProduct = {}

      this.showWarningModalText = t(TranslationKey['This item has been moved to Inventory'])
      this.onTriggerOpenModal('showWarningModal')
    })
  }

  onClickLaunchPrivateLabelBtn(product) {
    runInAction(() => {
      this.selectedProduct = product

      this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey['You buy a product card, are you sure?']),
        confirmMessage: `${t(TranslationKey['You will be charged'])} (${
          this.selectedProduct && toFixedWithDollarSign(this.selectedProduct.priceForClient, 2)
        })?`,
        onClickConfirm: () => this.onClickBuyProductBtn(),
      }
    })

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
      runInAction(() => {
        this.error = error
      })
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
        await ChatsModel.createSimpleChatByUserId(anotherUserId)
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

      runInAction(() => {
        this.selectedShops = shops
      })

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
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async openCreateOrder() {
    try {
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
    } catch (error) {
      console.log(error)
      if (error.body && error.body.message) {
        runInAction(() => {
          this.error = error.body.message
        })
      }
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onClickOrderNowBtn = ({ ordersDataState, totalOrdersCost }) => {
    runInAction(() => {
      this.ordersDataStateToSubmit = ordersDataState[0]

      this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
        confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
          ? t(TranslationKey['Pending order will be created'])
          : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
        onClickConfirm: () => this.onLaunchPrivateLabel(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onLaunchPrivateLabel() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const requestProduct = getObjectFilteredByKeyArrayBlackList({ ...this.ordersDataStateToSubmit }, [
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
      runInAction(() => {
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
      })
    }
  }

  async createOrder(orderObject) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

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
      await this.updateUserInfo()
    } catch (error) {
      console.log(error)
      this.error = error
      throw new Error('Failed to create order')
    }
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
  }

  onColumnVisibilityModelChange(model) {
    runInAction(() => {
      this.columnVisibilityModel = model
    })
    this.setDataGridState()
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
  }

  getCurrentData() {
    return toJS(this.productsVacant)
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getUserById()

      if (!checkIsFreelancer(UserRoleCodeMap[this.curUser.role])) {
        await this.getProductsVacant()
      }

      if (checkIsClient(UserRoleCodeMap[this.curUser.role])) {
        await this.getShops()
      }

      await this.getDataGridState()

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
      runInAction(() => {
        this.productsVacant = []
        if (error.body && error.body.message) {
          this.error = error.body.message
        }
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
      console.log(error)
    }
  }

  onChangeTabReview(e, value) {
    runInAction(() => {
      this.tabReview = value
    })
  }

  onChangeTabHistory(e, value) {
    runInAction(() => {
      this.tabHistory = value
    })
  }

  onChangeTabExchange(e, value) {
    runInAction(() => {
      this.tabExchange = value
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
