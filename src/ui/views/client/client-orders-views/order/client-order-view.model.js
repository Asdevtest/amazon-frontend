import { makeAutoObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { TranslationKey } from '@constants/translations/translation-key'

import { ClientModel } from '@models/client-model'
import { OrderModel } from '@models/order-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class ClientOrderViewModel {
  history = undefined

  orderId = undefined
  storekeepers = []
  destinations = []
  selectedProduct = undefined
  order = undefined
  ordersDataStateToSubmit = undefined
  uploadedFiles = []

  showConfirmModal = false
  showSetBarcodeModal = false
  showWarningInfoModal = false
  showOrderModal = false

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

  get userInfo() {
    return UserModel.userInfo
  }

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ history }) {
    this.history = history

    const url = new URL(window.location.href)
    this.orderId = url.searchParams.get('orderId')

    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async loadData() {
    try {
      await this.getStorekeepers()
      await this.getDestinations()
      await this.getOrderById()
    } catch (error) {
      console.error(error)
    }
  }

  async getDestinations() {
    try {
      const destinations = await ClientModel.getDestinations()
      runInAction(() => {
        this.destinations = destinations
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const storekeepers = await StorekeeperModel.getStorekeepers()
      runInAction(() => {
        this.storekeepers = storekeepers
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickReorder() {
    this.isPendingOrdering = false

    this.onTriggerOpenModal('showOrderModal')
  }

  setDestinationsFavouritesItem(item) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  onDoubleClickBarcode = item => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, {
      barCode: this.uploadedFiles?.[0] || tmpBarCode?.[0],
    })

    this.onTriggerOpenModal('showSetBarcodeModal')

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
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
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        const dataToRequest = getObjectFilteredByKeyArrayWhiteList(
          orderObject,
          [
            'amount',
            'orderSupplierId',
            'images',
            'totalPrice',
            'item',
            'needsResearch',
            'deadline',
            'priority',
            'expressChinaDelivery',
            'clientComment',

            'destinationId',
            'storekeeperId',
            'logicsTariffId',
            'variationTariffId',
          ],
          undefined,
          undefined,
          true,
        )

        await Promise.all([
          OrderModel.changeOrderData(orderObject._id, dataToRequest),
          ClientModel.updateOrderStatusToReadyToProcess(orderObject._id),
        ])
      }

      await this.getOrderById()

      this.onTriggerOpenModal('showConfirmModal')

      toast.success(t(TranslationKey['Order successfully created!']))
    } catch (error) {
      console.error(error)
    }
  }

  async getOrderById() {
    try {
      const result = await ClientModel.getOrderById(this.orderId)
      runInAction(() => {
        SettingsModel.changeLastCrumbAdditionalText(` № ${result.id}`)

        this.order = result
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSaveOrder({ data }) {
    try {
      if (data.tmpBarCode.length) {
        await onSubmitPostImages.call(this, { images: data.tmpBarCode, type: 'uploadedFiles' })

        await ClientModel.updateProductBarCode(data.product._id, { barCode: this.uploadedFiles[0] })
      } else if (!data.product.barCode) {
        await ClientModel.updateProductBarCode(data.product._id, { barCode: null })
      }

      const dataToRequest = getObjectFilteredByKeyArrayWhiteList(
        {
          ...data,
          totalPrice:
            data.amount *
            (data.orderSupplier?.price + data.orderSupplier?.batchDeliveryCostInDollar / data.orderSupplier?.amount),
        },
        [
          'amount',
          'orderSupplierId',
          'images',
          'totalPrice',
          'item',
          'needsResearch',
          'deadline',
          'priority',
          'expressChinaDelivery',
          'clientComment',
          'destinationId',
          'storekeeperId',
          'logicsTariffId',
          'variationTariffId',
        ],
        undefined,
        undefined,
        true,
      )

      await OrderModel.changeOrderData(this.orderId, dataToRequest)

      this.loadData()

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      await this.getOrderById()

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.error(error)
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
      await this.getOrderById()
    } catch (error) {
      console.error(error)
    }
  }

  onTriggerOpenModal(modal) {
    this[modal] = !this[modal]
  }
}
