import {makeAutoObservable, runInAction} from 'mobx'

import {loadingStatuses} from '@constants/loading-statuses'
import {navBarActiveSubCategory} from '@constants/navbar-active-category'
import {routsPathes} from '@constants/routs-pathes'
import {TranslationKey} from '@constants/translations/translation-key'

import {BoxesModel} from '@models/boxes-model'
import {ClientModel} from '@models/client-model'
import {OrderModel} from '@models/order-model'
import {UserModel} from '@models/user-model'

import {sortObjectsArrayByFiledDateWithParseISO} from '@utils/date-time'
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

  drawerOpen = false
  order = undefined

  showConfirmModal = false

  showWarningInfoModal = false

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
