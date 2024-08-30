import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { DataGridTablesKeys } from '@constants/data-grid/data-grid-tables-keys'
import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { BuyerModel } from '@models/buyer-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { OrderModel } from '@models/order-model'
import { ProductModel } from '@models/product-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { calcOrderTotalPrice, calcOrderTotalPriceInYuann } from '@utils/calculation'
import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrder } from '@typings/models/orders/order'
import { ISupplier } from '@typings/models/suppliers/supplier'
import { IHSCode } from '@typings/shared/hs-code'
import { IPaymentMethod } from '@typings/shared/payment-method'
import { IUploadFile } from '@typings/shared/upload-file'

import { fieldsForSearch, updateOrderKeys } from './buyer-pending-orders-view.constants'
import { observerConfig } from './observer-config'
import { pendingOrdersColumns } from './pending-orders.columns'

export class BuyerMyOrdersViewModel extends DataGridFilterTableModel {
  selectedOrder: IOrder | null = null

  showOrderModal = false
  showConfirmModal = false
  showProgress = false

  paymentMethods: IPaymentMethod[] = []
  hsCodeData: IHSCode | null = null

  dataToCancelOrder: { orderId: string; buyerComment: string } = { orderId: '', buyerComment: '' }

  progressValue = 0
  readyImages = []

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor() {
    const columnsModel = pendingOrdersColumns()

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: 'buyerPending',
      },
    })

    super({
      getMainDataMethod: BuyerModel.getOrdersMyPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['amazonTitle', 'skuByClient', 'maxProductionTerm']),
      mainMethodURL: 'buyers/orders/pag/my?',
      fieldsForSearch,
      tableKey: DataGridTablesKeys.BUYER_PENDING_ORDERS,
      defaultFilterParams,
    })

    makeObservable(this, observerConfig)

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.initHistory()

    this.getDataGridState()

    this.getCurrentData()

    this.getSuppliersPaymentMethods()

    const url = new URL(window.location.href)
    const orderId = url?.searchParams?.get('orderId')

    if (orderId) {
      this.onClickOrder(orderId)
    }
  }

  async onSubmitCancelOrder() {
    try {
      await BuyerModel.returnOrder(this.dataToCancelOrder.orderId, {
        buyerComment: this.dataToCancelOrder.buyerComment,
      })
      await UserModel.getUsersInfoCounters()
      this.getCurrentData()
      this.onTriggerOpenModal('showConfirmModal')
      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSaveOrderItem(orderId: string, orderItem: IOrder) {
    try {
      await BuyerModel.changeOrderItem(orderId, orderItem)

      toast.success(t(TranslationKey['Data saved successfully']))

      this.getCurrentData()
    } catch (error) {
      console.error(error)
    }
  }

  async onClickOrder(orderId: string) {
    try {
      const orderData = (await BuyerModel.getOrderById(orderId)) as unknown as IOrder

      runInAction(() => {
        this.selectedOrder = orderData
      })

      await this.onClickHsCode(orderData?.product?._id)

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitSaveOrder({
    order,
    orderFields,
    photosToLoad,
    hsCode,
  }: {
    order: IOrder
    orderFields: IOrder
    photosToLoad: IUploadFile[]
    hsCode: IHSCode
  }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      // @ts-ignore
      await onSubmitPostImages.call(this, { images: photosToLoad, type: 'readyImages' })

      const orderFieldsToSave = {
        ...orderFields,
        images: this.readyImages,
      }

      if (
        Number(orderFields.status) === OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER as keyof typeof OrderStatusByKey]
      ) {
        runInAction(() => {
          this.dataToCancelOrder = { orderId: order._id, buyerComment: orderFields.buyerComment }
          this.confirmModalSettings = {
            title: t(TranslationKey['Attention. Are you sure?']),
            isWarning: true,
            message: t(TranslationKey['Are you sure you want to cancel the order?']),
            onSubmit: () => this.onSubmitCancelOrder(),
            onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
          }
        })

        this.onTriggerOpenModal('showConfirmModal')
      }

      if (Number(order.status) === OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT as keyof typeof OrderStatusByKey]) {
        await OrderModel.changeOrderComments(order._id, { buyerComment: orderFields.buyerComment })
      } else {
        await this.onSaveOrder(order, orderFieldsToSave)
        if (
          Number(orderFields.status) === OrderStatusByKey[OrderStatus.READY_FOR_BUYOUT as keyof typeof OrderStatusByKey]
        ) {
          await OrderModel.orderReadyForBoyout(order._id)
        }
      }

      if (hsCode) {
        await ProductModel.editProductsHsCods([
          {
            productId: hsCode._id,
            chinaTitle: hsCode.chinaTitle || null,
            hsCode: hsCode.hsCode || null,
            material: hsCode.material || null,
            productUsage: hsCode.productUsage || null,
          },
        ])
      }

      this.onTriggerOpenModal('showOrderModal')

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)
      console.error(error)
    }
  }

  async onSaveOrder(order: IOrder, updateOrderData: IOrder) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        {
          ...updateOrderData,
          orderSupplierId: updateOrderData.orderSupplier?._id,
          totalPrice: toFixed(calcOrderTotalPrice(updateOrderData?.orderSupplier, updateOrderData?.amount), 2),
          priceInYuan: toFixed(calcOrderTotalPriceInYuann(updateOrderData?.orderSupplier, updateOrderData?.amount), 2),
        },
        updateOrderKeys,
        true,
      )

      await OrderModel.changeOrderData(order._id, updateOrderDataFiltered)
    } catch (error) {
      console.error(error)
    }
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response as IPaymentMethod[]
      })
    } catch (error) {
      console.error(error)

      runInAction(() => {
        this.paymentMethods = []
      })
    }
  }

  async onClickSaveSupplierBtn({
    supplier,
    itemId,
    editPhotosOfSupplier,
    editPhotosOfUnit,
  }: {
    supplier: ISupplier
    itemId: string
    editPhotosOfSupplier: IUploadFile[]
    editPhotosOfUnit: IUploadFile[]
  }) {
    try {
      supplier = {
        ...supplier,
        amount: supplier?.amount || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: supplier?.minlot || '',
        price: supplier?.price || '',
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
      } as ISupplier

      // @ts-ignore
      await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
      supplier = {
        ...supplier,
        images: this.readyImages,
      }

      // @ts-ignore
      await onSubmitPostImages.call(this, { images: editPhotosOfUnit, type: 'readyImages' })
      supplier = {
        ...supplier,
        imageUnit: this.readyImages,
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
          supplier,
          patchSuppliers,
          undefined,
          undefined,
          true,
        )

        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)

        await ProductModel.addSuppliersToProduct(itemId, [createSupplierResult.guid])
      }

      const orderData = await BuyerModel.getOrderById(this.selectedOrder?._id)

      runInAction(() => {
        this.selectedOrder = orderData as unknown as IOrder
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickHsCode(productId: string) {
    try {
      const response = await ProductModel.getProductsHsCodeByGuid(productId)

      runInAction(() => {
        this.hsCodeData = response as unknown as IHSCode
      })
    } catch (error) {
      console.error(error)
    }
  }
}
