import { makeAutoObservable, runInAction } from 'mobx'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { BoxesModel } from '@models/boxes-model'
import { ClientModel } from '@models/client-model'
import { OrderModel } from '@models/order-model'
import { ProductModel } from '@models/product-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { sortObjectsArrayByFiledDateWithParseISO } from '@utils/date-time'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

export class ClientOrderViewModel {
  history = undefined
  requestStatus = undefined
  error = undefined

  yuanToDollarRate = undefined

  selectedSupplier = undefined

  orderId = undefined
  orderBoxes = []

  platformSettings = undefined
  storekeepers = []
  destinations = []
  selectedProduct = undefined

  hsCodeData = {}
  showEditHSCodeModal = false

  order = undefined

  showConfirmModal = false
  showSetBarcodeModal = false
  showWarningInfoModal = false
  showOrderModal = false

  ordersDataStateToSubmit = undefined

  showAddOrEditSupplierModal = false

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

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }

  constructor({ history }) {
    const url = new URL(window.location.href)

    runInAction(() => {
      this.history = history
      this.orderId = url.searchParams.get('orderId')
      SettingsModel.changeLastCrumbAdditionalText(` № ${this.orderId}`)
      // this.orderId = history.location.search.slice(1)
    })
    makeAutoObservable(this, undefined, { autoBind: true })
  }

  async updateOrderId(orderId) {
    runInAction(() => {
      this.orderId = orderId
    })

    try {
      await Promise.all([this.getOrderById(), this.getBoxesOfOrder(this.orderId)])
    } catch (error) {
      console.log(error)
    }
  }

  async loadData() {
    try {
      this.setRequestStatus(loadingStatuses.isLoading)

      const [destinations, storekeepers] = await Promise.all([
        ClientModel.getDestinations(),
        StorekeeperModel.getStorekeepers(),
        this.getVolumeWeightCoefficient(),
      ])

      runInAction(() => {
        this.destinations = destinations
        this.storekeepers = storekeepers
      })

      this.setRequestStatus(loadingStatuses.success)
    } catch (error) {
      this.setRequestStatus(loadingStatuses.failed)
      console.log(error)
    }
  }

  onChangeSelectedSupplier(supplier) {
    runInAction(() => {
      if (this.selectedSupplier && this.selectedSupplier._id === supplier._id) {
        this.selectedSupplier = undefined
      } else {
        this.selectedSupplier = supplier
      }
    })
  }

  async onTriggerAddOrEditSupplierModal() {
    try {
      if (this.showAddOrEditSupplierModal) {
        runInAction(() => {
          this.selectedSupplier = undefined
        })
      } else {
        const [result] = await Promise.all([UserModel.getPlatformSettings(), this.getStorekeepers()])

        runInAction(() => {
          this.yuanToDollarRate = result.yuanToDollarRate
          this.platformSettings = result
        })
      }
      runInAction(() => {
        this.showAddOrEditSupplierModal = !this.showAddOrEditSupplierModal
      })
    } catch (error) {
      console.log(error)
    }
  }

  async getStorekeepers() {
    try {
      const result = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepersData = result
      })
    } catch (error) {
      console.log(error)
    }
  }

  async onClickReorder() {
    try {
      const [storekeepers, destinations, result] = await Promise.all([
        StorekeeperModel.getStorekeepers(),
        ClientModel.getDestinations(),
        UserModel.getPlatformSettings(),
      ])

      runInAction(() => {
        this.isPendingOrdering = false

        this.storekeepers = storekeepers

        this.destinations = destinations

        this.platformSettings = result
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
    runInAction(() => {
      this.selectedProduct = item
    })

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveHsCode(hsCode) {
    await ProductModel.editProductsHsCods([
      {
        productId: hsCode._id,
        chinaTitle: hsCode.chinaTitle || null,
        hsCode: hsCode.hsCode || null,
        material: hsCode.material || null,
        productUsage: hsCode.productUsage || null,
      },
    ])

    this.onTriggerOpenModal('showEditHSCodeModal')
    this.loadData()

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async onClickHsCode(id) {
    this.hsCodeData = await ProductModel.getProductsHsCodeByGuid(id)

    this.onTriggerOpenModal('showEditHSCodeModal')
  }

  async onClickSaveBarcode(tmpBarCode) {
    runInAction(() => {
      this.uploadedFiles = []
    })

    if (tmpBarCode.length) {
      await onSubmitPostImages.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct._id, { barCode: this.uploadedFiles[0] })

    this.onTriggerOpenModal('showSetBarcodeModal')
    runInAction(() => {
      runInAction(() => {
        this.selectedProduct = undefined
      })
    })
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  onConfirmSubmitOrderProductModal({ ordersDataState, totalOrdersCost }) {
    runInAction(() => {
      this.ordersDataStateToSubmit = ordersDataState

      this.confirmModalSettings = {
        isWarning: false,
        confirmTitle: t(TranslationKey['You are making an order, are you sure?']),
        confirmMessage: ordersDataState.some(el => el.tmpIsPendingOrder)
          ? t(TranslationKey['Pending order will be created'])
          : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
        onClickConfirm: () => this.onSubmitOrderProductModal(),
      }
    })

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitOrderProductModal() {
    try {
      runInAction(() => {
        this.error = undefined
      })
      this.onTriggerOpenModal('showOrderModal')

      for (let i = 0; i < this.ordersDataStateToSubmit.length; i++) {
        const orderObject = this.ordersDataStateToSubmit[i]

        runInAction(() => {
          this.uploadedFiles = []
        })

        if (orderObject.tmpBarCode.length) {
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        const dataToRequest = getObjectFilteredByKeyArrayWhiteList(orderObject, [
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
        ])

        await Promise.all([
          OrderModel.changeOrderData(orderObject._id, dataToRequest),
          ClientModel.updateOrderStatusToReadyToProcess(orderObject._id),
        ])
      }

      if (!this.error) {
        runInAction(() => {
          this.warningInfoModalSettings = {
            isWarning: false,
            title: t(TranslationKey['The order has been created']),
          }
        })

        await this.getOrderById()

        this.onTriggerOpenModal('showWarningInfoModal')
      }
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.log(error)
      runInAction(() => {
        this.error = error
      })
    }
  }

  async getOrderById() {
    try {
      const result = await ClientModel.getOrderById(this.orderId)
      runInAction(() => {
        this.order = result
      })
      // SettingsModel.changeLastCrumbAdditionalText(` № ${result.id}`)
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitSaveOrder({ data }) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

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
        ],
      )

      await OrderModel.changeOrderData(this.orderId, dataToRequest)

      this.loadData()

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  async onSubmitChangeBoxFields(data) {
    try {
      runInAction(() => {
        this.uploadedFiles = []
      })

      if (data.tmpTrackNumberFile?.length) {
        await onSubmitPostImages.call(this, { images: data.tmpTrackNumberFile, type: 'uploadedFiles' })
      }

      await BoxesModel.editAdditionalInfo(data._id, {
        clientComment: data.clientComment,
        referenceId: data.referenceId,
        fbaNumber: data.fbaNumber,
        trackNumberText: data.trackNumberText,
        trackNumberFile: [...data.trackNumberFile, ...this.uploadedFiles],

        prepId: data.prepId,
      })

      const dataToSubmitHsCode = data.items.map(el => ({ productId: el.product._id, hsCode: el.product.hsCode }))
      await ProductModel.editProductsHsCods(dataToSubmitHsCode)

      this.getBoxesOfOrder(this.orderId)

      runInAction(() => {
        this.warningInfoModalSettings = {
          isWarning: false,
          title: t(TranslationKey['Data saved successfully']),
        }
      })

      this.onTriggerOpenModal('showWarningInfoModal')
    } catch (error) {
      console.log(error)
    }
  }

  async getVolumeWeightCoefficient() {
    try {
      const result = await UserModel.getPlatformSettings()

      runInAction(() => {
        this.platformSettings = result
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
    runInAction(() => {
      this.confirmModalSettings = {
        isWarning: true,
        confirmTitle: t(TranslationKey.Attention),
        confirmMessage: t(TranslationKey['Are you sure you want to cancel the order?']),
        onClickConfirm: () => this.onSubmitCancelOrder(),
      }
    })

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

  setRequestStatus(requestStatus) {
    runInAction(() => {
      this.requestStatus = requestStatus
    })
  }

  onTriggerOpenModal(modal) {
    runInAction(() => {
      this[modal] = !this[modal]
    })
  }
}
