import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveSubCategory} from '@constants/navbar-active-category'
import {routsPathes} from '@constants/routs-pathes'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {OrderModel} from '@models/order-model'
import {SettingsModel} from '@models/settings-model'
import {StorekeeperModel} from '@models/storekeeper-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
import {getObjectFilteredByKeyArrayBlackList} from '@utils/object'
import {t} from '@utils/translations'
import {onSubmitPostImages} from '@utils/upload-files'

const setNavbarActiveSubCategory = pathname => {
  if (pathname) {
    switch (pathname) {
      case routsPathes.CLIENT_ORDERS + '/order':
        return navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS
      case routsPathes.CLIENT_PENDING_ORDERS + '/order':
        return navBarActiveSubCategory.SUB_NAVBAR_CLIENT_PENDING_ORDERS

      default:
        return navBarActiveSubCategory.SUB_NAVBAR_CLIENT_ORDERS
    }
  }
}

export class ClientOrderViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  orderId = undefined
  orderBoxes = []

  volumeWeightCoefficient = undefined
  storekeepers = []
  destinations = []
  selectedProduct = undefined

  drawerOpen = false
  order = undefined

  showConfirmModal = false
  showSetBarcodeModal = false
  showWarningInfoModal = false
  showOrderModal = false

  ordersDataStateToSubmit = undefined

  confirmModalSettings = {
    isWarning: false,
    confirmTitle: '',
    confirmMessage: '',
    onClickConfirm: () => {},
  }

  warningInfoModalSettings = {
    isWarning: false,
    title: '',
  }

  uploadedFiles = []

  get userInfo() {
    return UserModel.userInfo
  }

  get navbarActiveSubCategory() {
    return setNavbarActiveSubCategory(this.history.location.pathname)
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  constructor({history}) {
    this.history = history

    this.orderId = history.location.search.slice(1)

    makeAutoObservable(this, undefined, {autoBind: true})
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      await this.getOrderById()
      await this.getBoxesOfOrder(this.orderId)
      await this.getVolumeWeightCoefficient()

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  async onClickReorder() {
    try {
      const storekeepers = await StorekeeperModel.getStorekeepers()

      const destinations = await ClientModel.getDestinations()

      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.isPendingOrdering = false

        this.storekeepers = storekeepers

        this.destinations = destinations

        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.log(error)
    }
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onDoubleClickBarcode = item => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    this.uploadedFiles = []

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, {images: tmpBarCode, type: 'uploadedFiles'})
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, {barCode: this.uploadedFiles[0]})

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onConfirmSubmitOrderProductModal({ordersDataState, totalOrdersCost}) {
    this.ordersDataStateToSubmit = ordersDataState

    this.confirmModalSettings = {
      isWarning: false,
      confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
      confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onClickConfirm: () => this.onSubmitOrderProductModal(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      this.error = undefined
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        this.uploadedFiles = []

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, {images: orderObject.tmpBarCode, type: 'uploadedFiles'})

          await ClientModel.updateProductBarCode(orderObject.productId, {barCode: this.uploadedFiles[0]})
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, {barCode: null})
        }

        await this.createOrder(orderObject)
      }

      if (!this.error) {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['The order has been created']),
        }

        this.onTriggerOpenModal('showWarningInfoModal')
      }
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      this.error = error
    }
  }

  async createOrder(orderObject) {
    try {
      const requestData = getObjectFilteredByKeyArrayBlackList(orderObject, [
        'barCode',
        'tmpBarCode',
        'tmpIsPendingOrder',
      ])

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }

      await this.updateUserInfo()
    } catch (error) {
      console.log(error)

      this.warningInfoModalSettings = {
        isWarning: true,
        title: `${t(TranslationKey["You can't order"])} "${error.body.message}"`,
      }

      this.onTriggerOpenModal('showWarningInfoModal')
      this.error = error
    }
  }

  async getOrderById() {
    try {
      const result = await ClientModel.getOrderById(this.orderId)

      runInAction(() => {
        this.order = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSaveOrder(data) {
    try {
      await OrderModel.changeOrderComments(this.orderId, {clientComment: data.clientComment})

      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey['Data saved successfully']),
      }

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      this.uploadedFiles = []

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, {images: data.tmpTrackNumberFile, type: 'uploadedFiles'})
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: this.uploadedFiles[0] ? this.uploadedFiles[0] : data.trackNumberFile,
      })

      this.getBoxesOfOrder(this.orderId)

      this.warningInfoModalSettings = {
        isWarning: false,
        title: t(TranslationKey['Data saved successfully']),
      }

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  async getVolumeWeightCoefficient() {
    try {
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.volumeWeightCoefficient = result.volumeWeightCoefficient
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getBoxesOfOrder(orderId) {
    try {
      const result = await BoxesModel.getBoxesOfOrder(orderId)
      runInAction(() => {
        this.orderBoxes = result.sort(sortObjectsArrayByFiledDateWithParseISO('createdAt'))
      })
    } catch (error) {
      console.log(error)
    }
  }

  onClickCancelOrder() {
    this.confirmModalSettings = {
      isWarning: true,
      confirmTitle: t(TranslationKey.Attention),
      confirmMessage: t(TranslationKey['Are you sure you want to cancel the order?']),
      onClickConfirm: () => this.onSubmitCancelOrder(),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitCancelOrder() {
    try {
      await ClientModel.cancelOrder(this.order._id)

      this.onTriggerOpenModal('showConfirmModal')

      this.history.goBack()
    } catch (error) {
      console.log(error)
    }
  }

  onTriggerDrawerOpen() {
    this.drawerOpen = !this.drawerOpen
  }
  setRequestStatus(requestStatus) {
    this.requestStatus = requestStatus
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
