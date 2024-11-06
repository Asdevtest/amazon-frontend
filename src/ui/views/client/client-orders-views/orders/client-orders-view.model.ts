/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { GridColDef } from '@mui/x-data-grid-premium'

import { routsPathes } from '@constants/navigation/routs-pathes'
import { TranslationKey } from '@constants/translations/translation-key'
import { createOrderRequestWhiteList } from '@constants/white-list'

import { BatchesModel } from '@models/batches-model'
import { ClientModel } from '@models/client-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OrderModel } from '@models/order-model'
import { SettingsModel } from '@models/settings-model'
import { StorekeeperModel } from '@models/storekeeper-model'
import { UserModel } from '@models/user-model'

import { MyOrderModalSwitcherConditions } from '@components/modals/my-order-modal/components/tabs/tabs.type'
import { ProductAndBatchModalSwitcherConditions } from '@components/modals/product-and-batch-modal/product-and-batch-modal.type'

import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { IBatch } from '@typings/models/batches/batch'
import { IOrder } from '@typings/models/orders/order'
import { IProduct } from '@typings/models/products/product'
import { IStorekeeper } from '@typings/models/storekeepers/storekeeper'
import { IDestination } from '@typings/shared/destinations'
import { IUploadFile } from '@typings/shared/upload-file'
import { HistoryType } from '@typings/types/history'

import { clientOrdersViewColumns } from './client-orders-columns'
import { fieldsForSearch, filtersFields } from './client-orders-view.constants'
import { getDataGridTableKey } from './helpers/get-data-grid-table-key'
import { getOrderStatusGroup } from './helpers/get-order-status-group'
import { getSortModel } from './helpers/get-sort-model'
import { observerConfig } from './observer-config'

export class ClientOrdersViewModel extends DataGridFilterTableModel {
  orders = []
  order?: IOrder = undefined
  showOrderModal = false
  showProductModal = false
  showSetBarcodeModal = false
  showConfirmModal = false
  productBatches: IBatch[] = []
  showCheckPendingOrderFormModal = false
  showMyOrderModal = false
  showProductDataModal = false
  myOrderModalSwitcherCondition = MyOrderModalSwitcherConditions.BASIC_INFORMATION
  productAndBatchModalSwitcherCondition = ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION
  existingProducts: any = []
  shopsData = []
  selectedWarehouseOrderProduct?: IProduct = undefined
  selectedProduct?: IProduct = undefined
  reorderOrdersData: IOrder[] = []
  uploadedFiles: IUploadFile[] = []
  storekeepers: IStorekeeper[] = []
  destinations: IDestination[] = []
  currentBatch?: IBatch = undefined
  activeProductGuid: string = ''
  onAmazon: boolean = false

  get destinationsFavourites() {
    return SettingsModel.destinationsFavourites
  }
  get isPendingOrdering() {
    return this.history.location.pathname === routsPathes.CLIENT_PENDING_ORDERS
  }
  get userInfo() {
    return UserModel.userInfo
  }
  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor(history: HistoryType) {
    const rowHandlers = {
      onClickReorder: (item: IOrder, isPending: boolean) => this.onClickReorder(item, isPending),
      onClickOpenNewTab: (id: string) => this.onClickOpenNewTab(id),
      onClickWarehouseOrderButton: (guid: string) => this.onClickWarehouseOrderButton(guid),
    }
    const statusGroup = getOrderStatusGroup(history.location.pathname)

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: statusGroup,
      },
    })

    super({
      getMainDataMethod: ClientModel.getOrdersPag,
      columnsModel: clientOrdersViewColumns(rowHandlers) as GridColDef[],
      filtersFields,
      mainMethodURL: 'clients/pag/orders?',
      fieldsForSearch,
      tableKey: getDataGridTableKey(history.location.pathname),
      defaultFilterParams,
      defaultSortModel: getSortModel(history.location.pathname),
    })

    makeObservable(this, observerConfig)

    this.history = history
    // this.getDataGridState()
    // this.getCurrentData()
    this.getDestinations()
    this.getStorekeepers()
    this.getTableSettingsPreset()
  }

  onChangeIsFormed(value: boolean) {
    this.columnMenuSettings = {
      ...this.columnMenuSettings,
      isFormedData: {
        ...this.columnMenuSettings.isFormedData,
        isFormed: value,
      },
    }

    this.getCurrentData()
  }

  setDestinationsFavouritesItem(item: string) {
    SettingsModel.setDestinationsFavouritesItem(item)
  }

  async onClickManyReorder() {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      runInAction(() => {
        this.reorderOrdersData = []
      })

      for (let i = 0; i < this.selectedRows.length; i++) {
        const orderId = this.selectedRows[i]

        const order = (await ClientModel.getOrderById(orderId)) as unknown as IOrder

        runInAction(() => {
          this.reorderOrdersData = [...this.reorderOrdersData, order]
        })
      }

      this.onTriggerOpenModal('showOrderModal')
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  onConfirmCancelManyReorder() {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Cancel selected orders']) + '?',
      onSubmit: () => this.onClickCancelManyReorder(),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitCancelOrder(orderId: string) {
    try {
      await ClientModel.cancelOrder(orderId)
    } catch (error) {
      console.error(error)
    }
  }

  async onClickCancelManyReorder() {
    try {
      for (let i = 0; i < this.selectedRows.length; i++) {
        const orderId = this.selectedRows[i]
        await this.onSubmitCancelOrder(orderId)
      }

      this.getCurrentData()
      this.onTriggerOpenModal('showConfirmModal')
    } catch (error) {
      console.error(error)
    }
  }

  async getBatches() {
    try {
      const result = await BatchesModel.getBatchesbyProduct({ guid: this.activeProductGuid, archive: false })

      runInAction(() => {
        this.productBatches = result as IBatch[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickReorder(item: IOrder, isPending: boolean) {
    try {
      if (isPending) {
        await this.onClickContinueBtn(item)
        return
      }

      this.setRequestStatus(loadingStatus.IS_LOADING)

      const res = await OrderModel.checkPendingOrderByProductGuid(item?.product?._id)

      const resultWithoutCurrentOrder = res?.filter(order => order?._id !== item?._id)

      if (resultWithoutCurrentOrder?.length) {
        runInAction(() => {
          this.existingProducts = [
            {
              _id: item?._id,
              asin: item?.product?.asin,
              orders: resultWithoutCurrentOrder,
            },
          ]
        })

        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      } else {
        await this.onClickContinueBtn(item)
      }
      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onClickContinueBtn(item: IOrder) {
    try {
      const response = await ClientModel.getOrderById(item._id)

      runInAction(() => {
        this.reorderOrdersData = [response as unknown as IOrder]
      })

      this.onTriggerOpenModal('showOrderModal')

      if (this.showCheckPendingOrderFormModal) {
        this.onTriggerOpenModal('showCheckPendingOrderFormModal')
      }
    } catch (error) {
      console.error(error)
    }
  }

  onClickPandingOrder(id: string) {
    window?.open(`${window.location.origin}/client/my-orders/pending-orders/order?orderId=${id}`, '_blank')?.focus()
  }

  onDoubleClickBarcode = (item: IProduct) => {
    this.selectedProduct = item

    this.onTriggerOpenModal('showSetBarcodeModal')
  }

  async onClickSaveBarcode(tmpBarCode: IUploadFile[]) {
    if (tmpBarCode.length) {
      // @ts-ignore
      await onSubmitPostImages?.call(this, { images: tmpBarCode, type: 'uploadedFiles' })
    }

    await ClientModel.updateProductBarCode(this.selectedProduct?._id, { barCode: this.uploadedFiles[0] })

    this.onTriggerOpenModal('showSetBarcodeModal')

    runInAction(() => {
      this.selectedProduct = undefined
    })
  }

  async createOrder(orderObject: any) {
    try {
      const requestData = getObjectFilteredByKeyArrayWhiteList(orderObject, createOrderRequestWhiteList)

      if (orderObject.tmpIsPendingOrder) {
        await ClientModel.createFormedOrder(requestData)
      } else {
        await ClientModel.createOrder(requestData)
      }

      await this.updateUserInfo()
    } catch (error) {
      console.error(error)

      this.onTriggerOpenModal('showInfoModal')
    }
  }

  async updateUserInfo() {
    await UserModel.getUserInfo()
  }

  async onSubmitOrderProductModal(ordersDataState: any) {
    try {
      for (let i = 0; i < ordersDataState.length; i++) {
        let orderObject = ordersDataState[i]
        let uploadedTransparencyFiles = []

        if (orderObject.tmpBarCode.length) {
          // @ts-ignore
          await onSubmitPostImages.call(this, { images: orderObject.tmpBarCode, type: 'uploadedFiles' })

          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: this.uploadedFiles[0] })
        } else if (!orderObject.barCode) {
          await ClientModel.updateProductBarCode(orderObject.productId, { barCode: null })
        }

        if (orderObject.tmpTransparencyFile.length) {
          // @ts-ignore
          uploadedTransparencyFiles = await onSubmitPostImages.call(this, {
            images: orderObject.tmpTransparencyFile,
            type: 'uploadedFiles',
          })

          orderObject = {
            ...orderObject,
            transparencyFile: uploadedTransparencyFiles[0],
          }
        }

        if (this.isPendingOrdering) {
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
              'transparencyFile',
            ],
            undefined,
            undefined,
            true,
          )

          await OrderModel.changeOrderData(orderObject._id, dataToRequest)

          await ClientModel.updateOrderStatusToReadyToProcess(orderObject._id)
        } else {
          await this.createOrder(orderObject)
        }
      }

      this.getCurrentData()
      this.updateUserInfo()

      this.onTriggerOpenModal('showConfirmModal')

      this.onTriggerOpenModal('showOrderModal')

      this.showMyOrderModal = false
    } catch (error) {
      console.error(error)
    }
  }

  onConfirmSubmitOrderProductModal({
    ordersDataState,
    totalOrdersCost,
  }: {
    ordersDataState: any
    totalOrdersCost: number
  }) {
    this.confirmModalSettings = {
      isWarning: false,
      title: t(TranslationKey['You are making an order, are you sure?']),
      // @ts-ignore
      message: ordersDataState.some(el => el.tmpIsPendingOrder)
        ? t(TranslationKey['Pending order will be created'])
        : `${t(TranslationKey['Total amount'])}: ${totalOrdersCost}. ${t(TranslationKey['Confirm order'])}?`,
      onSubmit: () => this.onSubmitOrderProductModal(ordersDataState),
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  onClickOpenNewTab(orderId: string) {
    window
      ?.open(`/client/my-orders/orders/order?orderId=${orderId}&order-human-friendly-id=${orderId}`, '_blank')
      ?.focus()
  }

  async getOrderById(orderId: string) {
    try {
      const resolve = await ClientModel.getOrderById(orderId)

      runInAction(() => {
        this.order = resolve as unknown as IOrder
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickMyOrderModal(id: string) {
    if (window?.getSelection?.()?.toString?.()) {
      return
    }

    await this.getOrderById(id)

    this.onTriggerOpenModal('showMyOrderModal')

    if (this.showMyOrderModal) {
      this.myOrderModalSwitcherCondition = MyOrderModalSwitcherConditions.BASIC_INFORMATION
    }
  }

  async getCurrBatch(guid: string) {
    try {
      const result = await BatchesModel.getBatchesByGuid(guid)

      runInAction(() => {
        this.currentBatch = result as unknown as IBatch
      })
    } catch (error) {
      console.error(error)
      runInAction(() => {
        this.currentBatch = undefined
      })
    }
  }

  onClickChangeProductAndBatchModalCondition(value: ProductAndBatchModalSwitcherConditions) {
    this.productAndBatchModalSwitcherCondition = value
  }

  async onClickWarehouseOrderButton(guid: string) {
    try {
      this.productBatches = []
      this.activeProductGuid = guid

      const result = (await ClientModel.getProductById(guid)) as unknown as IProduct

      runInAction(() => {
        this.selectedWarehouseOrderProduct = { ...result, _id: guid }
      })

      this.getBatches()

      this.onTriggerOpenModal('showProductModal')

      if (this.showProductModal) {
        this.productAndBatchModalSwitcherCondition = ProductAndBatchModalSwitcherConditions.ORDER_INFORMATION
      }
    } catch (error) {
      console.error(error)

      runInAction(() => {
        this.selectedWarehouseOrderProduct = undefined
      })
    }
  }

  onClickChangeMyOrderModalCondition(value: MyOrderModalSwitcherConditions) {
    this.myOrderModalSwitcherCondition = value
  }

  async getDestinations() {
    try {
      const response = await ClientModel.getDestinations()

      runInAction(() => {
        this.destinations = response as unknown as IDestination[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  async getStorekeepers() {
    try {
      const response = await StorekeeperModel.getStorekeepers()

      runInAction(() => {
        this.storekeepers = response as unknown as IStorekeeper[]
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickCancelOrder(orderId: string) {
    this.confirmModalSettings = {
      isWarning: true,
      title: t(TranslationKey.Attention),
      message: t(TranslationKey['Are you sure you want to cancel the order?']),
      onSubmit: () => {
        this.onSubmitCancelOrder(orderId)
        this.onTriggerOpenModal('showConfirmModal')
        this.onTriggerOpenModal('showMyOrderModal')
        this.getCurrentData()
      },
      onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
    }

    this.onTriggerOpenModal('showConfirmModal')
  }

  async onSubmitSaveOrder(order: any) {
    try {
      if (order.tmpBarCode.length) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: order.tmpBarCode, type: 'uploadedFiles' })

        await ClientModel.updateProductBarCode(order.product._id, { barCode: this.uploadedFiles[0] })
      } else if (!order.product.barCode) {
        await ClientModel.updateProductBarCode(order.product._id, { barCode: null })
      }

      const dataToRequest = getObjectFilteredByKeyArrayWhiteList(
        {
          ...order,
          totalPrice:
            order.amount *
            (order.orderSupplier?.price + order.orderSupplier?.batchDeliveryCostInDollar / order.orderSupplier?.amount),
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

      await OrderModel.changeOrderData(this.order?._id, dataToRequest)

      this.getCurrentData()

      toast.success(t(TranslationKey['Data saved successfully']))

      this.onTriggerOpenModal('showMyOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async patchActualShippingCostBatch(id: string, cost: number) {
    await BatchesModel.changeBatch(id, {
      actualShippingCost: cost,
    })
  }

  onOpenProductDataModal(onAmazon: boolean) {
    this.onAmazon = onAmazon

    this.onTriggerOpenModal('showProductDataModal')
  }
}
