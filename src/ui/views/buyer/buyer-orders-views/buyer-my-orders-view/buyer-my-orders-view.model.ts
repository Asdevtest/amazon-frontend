/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeObservable, runInAction } from 'mobx'
import { toast } from 'react-toastify'

import { OrderStatus, OrderStatusByKey } from '@constants/orders/order-status'
import { TaskPriorityStatus, mapTaskPriorityStatusEnumToKey } from '@constants/task/task-priority-status'
import { TranslationKey } from '@constants/translations/translation-key'
import { creatSupplier, patchSuppliers } from '@constants/white-list'

import { BoxesModel } from '@models/boxes-model'
import { BuyerModel } from '@models/buyer-model'
import { DataGridFilterTableModel } from '@models/data-grid-filter-table-model'
import { ProductModel } from '@models/product-model'
import { SupplierModel } from '@models/supplier-model'
import { UserModel } from '@models/user-model'

import { getFilterFields } from '@utils/data-grid-filters/data-grid-get-filter-fields'
import { getObjectFilteredByKeyArrayBlackList, getObjectFilteredByKeyArrayWhiteList } from '@utils/object'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'
import { onSubmitPostImages } from '@utils/upload-files'

import { loadingStatus } from '@typings/enums/loading-status'
import { IOrderPayment } from '@typings/models/buyers/order-payment-by-status'
import { IOrder } from '@typings/models/orders/order'
import { IHSCode } from '@typings/shared/hs-code'

import { fieldsForSearch, updateOrderKeys } from './buyer-my-orders-view.constants'
import { buyerOrdersColumns } from './buyer-orders.columns'
import { getDataGridTableKey } from './helpers/get-data-grid-table-key'
import { getDisableCustomSort } from './helpers/get-disable-custom-sort'
import { getShowPartialPayment } from './helpers/get-show-partial-payment'
import { getStatusGroup } from './helpers/get-status-group'
import { getStatusesOrderPayment } from './helpers/get-statuses-order-payment'
import { observerConfig } from './observer-config'

export class BuyerMyOrdersViewModel extends DataGridFilterTableModel {
  orderStatusDataBase: string = ''
  paymentMethods: any[] = []

  createBoxesResult = []
  paymentAmount: IOrderPayment | null = null

  selectedOrder: IOrder | null = null

  currentOrder: IOrder | null = null
  updateSupplierData = false
  dataToCancelOrder: { orderId: string; buyerComment: string } = { orderId: '', buyerComment: '' }

  readyImages: string[] = []
  hsCodeData: IHSCode | null = null

  showProgress: boolean = false
  progressValue: number = 0

  showOrderModal = false
  showConfirmModal = false
  showPaymentMethodsModal = false

  get userInfo() {
    return UserModel.userInfo
  }

  get platformSettings() {
    return UserModel.platformSettings
  }

  constructor({ pathname }: { pathname: string }) {
    const rowHandlers = {
      onClickPaymentMethodsCell: (row: IOrder) => this.onClickPaymentMethodsCell(row),
    }

    const isShowPartialPayment = getShowPartialPayment(pathname)
    const isDisableCustomSort = getDisableCustomSort(pathname)

    const columnsModel = buyerOrdersColumns({ rowHandlers, isShowPartialPayment, isDisableCustomSort })

    const statusGroup = getStatusGroup(pathname)

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: statusGroup,
      },
    })

    const tableKey = getDataGridTableKey(pathname)

    super({
      getMainDataMethod: BuyerModel.getOrdersMyPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, [
        'amazonTitle',
        'skuByClient',
        'maxProductionTerm',
        'partialPaymentAmountRmb',
      ]),
      mainMethodURL: 'buyers/orders/pag/my?',
      fieldsForSearch,
      tableKey,
      defaultFilterParams,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

    this.orderStatusDataBase = getStatusesOrderPayment(pathname)

    this.getDataGridState()
    this.getCurrentData()
    this.getBuyersOrdersPaymentByStatus()
    this.getSuppliersPaymentMethods()

    const orderId = new URL(window.location.href)?.searchParams?.get('orderId')

    if (orderId) {
      this.onClickOrder(orderId)
    }

    makeObservable(this, observerConfig)
  }

  setUpdateSupplierData(value: boolean) {
    this.updateSupplierData = value
  }

  async getBuyersOrdersPaymentByStatus() {
    if (this.orderStatusDataBase) {
      const response = await BuyerModel.getBuyersOrdersPaymentByStatus(this.orderStatusDataBase)

      runInAction(() => {
        this.paymentAmount = response as unknown as IOrderPayment
      })
    }
  }

  async getSuppliersPaymentMethods() {
    try {
      const response = await SupplierModel.getSuppliersPaymentMethods()

      runInAction(() => {
        this.paymentMethods = response.map(paymentMethod => ({
          isChecked: false,
          paymentDetails: '',
          paymentImages: [],
          paymentMethod,
        }))
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveSupplierBtn({
    supplier,
    itemId,
    editPhotosOfSupplier,
    editPhotosOfUnit,
  }: {
    supplier: any
    itemId: string
    editPhotosOfSupplier: string[]
    editPhotosOfUnit: string[]
  }) {
    try {
      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map((item: any) => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
      }

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

  async onClickSaveWithoutUpdateSupData(DataForSaveOrder: any, orderFields: any) {
    if (
      orderFields.status !== OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER as keyof typeof OrderStatusByKey] &&
      orderFields.status < 20
    ) {
      runInAction(() => {
        this.confirmModalSettings = {
          title: t(TranslationKey.Attention),
          isWarning: false,
          message: t(
            TranslationKey[
              'The price per unit in the order is different from the supplier price, do you want to continue?'
            ],
          ),
          onSubmit: () => {
            this.onSubmitSaveOrder(DataForSaveOrder)
            this.onTriggerOpenModal('showConfirmModal')
          },
          onCancel: () => this.onTriggerOpenModal('showConfirmModal'),
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } else {
      this.onSubmitSaveOrder(DataForSaveOrder)
    }
  }

  async onClickUpdataSupplierData({
    supplier,
    productId,
    orderFields,
  }: {
    supplier: any
    productId: string
    orderFields: any
  }) {
    this.updateSupplierData = false

    try {
      supplier = {
        ...supplier,
        paymentMethods: supplier.paymentMethods.map((item: any) => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        // @ts-ignore
        yuanRate: this.platformSettings?.yuanToDollarRate,
        amount: orderFields.amount,
        price: orderFields.price,
        priceInYuan: orderFields.priceInYuan,
        batchDeliveryCostInYuan: orderFields.batchDeliveryCostInYuan,
        batchDeliveryCostInDollar: orderFields.batchDeliveryCostInDollar,
        batchTotalCostInDollar: orderFields.batchTotalCostInDollar,
      }

      if (supplier._id) {
        const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(supplier, patchSuppliers)
        await SupplierModel.updateSupplier(supplier._id, supplierUpdateData)
      } else {
        const supplierCreat = getObjectFilteredByKeyArrayWhiteList(supplier, creatSupplier)
        const createSupplierResult = await SupplierModel.createSupplier(supplierCreat)
        await ProductModel.addSuppliersToProduct(productId, [createSupplierResult.guid])
      }

      const orderData = (await BuyerModel.getOrderById(this.selectedOrder?._id)) as unknown as IOrder

      runInAction(() => {
        this.selectedOrder = orderData
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickPaymentMethodsCell(row: IOrder) {
    this.currentOrder = row
    this.onTriggerOpenModal('showPaymentMethodsModal')
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
      const orderData = await BuyerModel.getOrderById(orderId)

      runInAction(() => {
        this.selectedOrder = orderData as unknown as IOrder
      })

      // @ts-ignore
      await this.onClickHsCode(orderData?.product?._id)

      this.onTriggerOpenModal('showOrderModal')
    } catch (error) {
      console.error(error)
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

  async saveOrderPayment(order: IOrder, orderPayments: any) {
    if (
      Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT as keyof typeof OrderStatusByKey])
    ) {
      try {
        const validOrderPayments = []

        for (const payment of orderPayments) {
          // @ts-ignore
          await onSubmitPostImages.call(this, { images: payment.paymentImages, type: 'readyImages' })

          const updatedPayment = {
            paymentMethodId: payment.paymentMethod._id,
            paymentDetails: payment.paymentDetails,
            paymentImages: this.readyImages,
          }

          validOrderPayments.push(updatedPayment)
        }

        await BuyerModel.patchBuyersOrdersPaymentByGuid(order._id, { orderPayments: validOrderPayments })

        this.getCurrentData()
      } catch (error) {
        console.error(error)
        this.setRequestStatus(loadingStatus.FAILED)
      }
    }
  }

  async onSubmitSaveOrder({
    order,
    orderFields,
    boxesForCreation,
    photosToLoad,
    hsCode,
    trackNumber,
    commentToWarehouse,
    editPaymentDetailsPhotos,
    orderPayments,
  }: {
    order: IOrder
    orderFields: any
    boxesForCreation: any
    photosToLoad: any
    hsCode: IHSCode
    trackNumber: string
    commentToWarehouse: string
    editPaymentDetailsPhotos: any
    orderPayments: any
  }) {
    try {
      this.setRequestStatus(loadingStatus.IS_LOADING)

      const isMismatchOrderPrice = parseFloat(orderFields.totalPriceChanged) - parseFloat(orderFields.totalPrice) > 0

      if (isMismatchOrderPrice && toFixed(orderFields.totalPriceChanged, 2) !== toFixed(orderFields.totalPrice, 2)) {
        toast.warning(
          t(
            TranslationKey[
              'The "Paid" status will become available after the client confirms the change of the cost of the order. The current status will not be changed! Boxes will not be created'
            ],
          ),
        )
      }

      orderFields = {
        ...orderFields,
        partiallyPaid: Number(orderFields.partiallyPaid) || 0,
        partialPaymentAmountRmb: Number(orderFields.partialPaymentAmountRmb) || 0,
      }

      // @ts-ignore
      await onSubmitPostImages.call(this, { images: photosToLoad, type: 'readyImages' })
      orderFields = {
        ...orderFields,
        images: this.readyImages,
      }

      // @ts-ignore
      await onSubmitPostImages.call(this, { images: editPaymentDetailsPhotos, type: 'readyImages' })
      orderFields = {
        ...orderFields,
        paymentDetails: this.readyImages,
      }

      await this.onSaveOrder(order, orderFields)

      await this.saveOrderPayment(order, orderPayments)

      if (
        boxesForCreation.length > 0 &&
        !isMismatchOrderPrice &&
        orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER as keyof typeof OrderStatusByKey]}`
      ) {
        await this.onSubmitCreateBoxes({ order, boxesForCreation, trackNumber, commentToWarehouse })
      }

      if (
        orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS as keyof typeof OrderStatusByKey] ||
        orderFields.status ===
          OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE as keyof typeof OrderStatusByKey]
      ) {
        if (toFixed(orderFields.totalPriceChanged, 2) !== toFixed(orderFields.totalPrice, 2)) {
          await BuyerModel.setOrderTotalPriceChanged(order._id, { totalPriceChanged: orderFields.totalPriceChanged })
        }
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.AT_PROCESS as keyof typeof OrderStatusByKey]}`) {
        await BuyerModel.setOrdersAtProcess(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER as keyof typeof OrderStatusByKey]}`) {
        await BuyerModel.orderPayToSupplier(order._id)
      }

      if (
        orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED as keyof typeof OrderStatusByKey]}`
      ) {
        await BuyerModel.orderTrackNumberIssued(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.IN_STOCK as keyof typeof OrderStatusByKey]}`) {
        await BuyerModel.orderSetInStock(order._id, { refundPrice: Number(orderFields.tmpRefundToClient) })
      }

      if (
        orderFields.status === `${OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT as keyof typeof OrderStatusByKey]}`
      ) {
        const validOrderPayments = []

        for (const payment of orderPayments) {
          // @ts-ignore
          await onSubmitPostImages.call(this, { images: payment.paymentImages, type: 'readyImages' })

          const updatedPayment = {
            paymentMethodId: payment.paymentMethod._id,
            paymentDetails: payment.paymentDetails,
            paymentImages: this.readyImages,
          }

          validOrderPayments.push(updatedPayment)
        }

        await BuyerModel.orderReadyForPayment(order._id, { orderPayments: validOrderPayments })
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.PARTIALLY_PAID as keyof typeof OrderStatusByKey]}`) {
        await BuyerModel.orderPartiallyPaid(order._id)
      }

      if (
        orderFields.status === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER as keyof typeof OrderStatusByKey]}`
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

      if (
        orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER as keyof typeof OrderStatusByKey]}`
      ) {
        runInAction(() => {
          this.dataToCancelOrder = { orderId: order._id, buyerComment: orderFields.buyerComment }
        })
        this.onTriggerOpenModal('showOrderModal')
        UserModel.getUsersInfoCounters()
      }

      this.getCurrentData()

      this.setRequestStatus(loadingStatus.SUCCESS)
    } catch (error) {
      this.setRequestStatus(loadingStatus.FAILED)

      console.error(error)
    }
  }

  async onSaveOrder(order: IOrder, updateOrderData: any) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        {
          ...updateOrderData,
          orderSupplierId: updateOrderData.orderSupplier._id,
          amount: updateOrderData?.amount,
          priceInYuan: updateOrderData.priceInYuan,
          priceBatchDeliveryInYuan: updateOrderData?.priceBatchDeliveryInYuan,
        },
        updateOrderKeys,
        true,
      )
      await BuyerModel.editOrder(order._id, {
        ...updateOrderDataFiltered,
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onSubmitCreateBoxes({
    order,
    boxesForCreation,
    trackNumber,
    commentToWarehouse,
  }: {
    order: IOrder
    boxesForCreation: any
    trackNumber: any
    commentToWarehouse: string
  }) {
    try {
      runInAction(() => {
        this.createBoxesResult = []
      })

      if (trackNumber?.files.length) {
        // @ts-ignore
        await onSubmitPostImages.call(this, { images: trackNumber.files, type: 'readyImages' })
      }

      for (let i = 0; i < boxesForCreation.length; i++) {
        const elementOrderBox = {
          ...boxesForCreation[i],
          trackNumberText: trackNumber?.text || '',
          trackNumberFile: this.readyImages.length ? this.readyImages : [],
        }

        await this.onCreateBox(elementOrderBox)

        if (elementOrderBox.tmpUseToUpdateSupplierBoxDimensions) {
          const supplierUpdateData = getObjectFilteredByKeyArrayWhiteList(
            {
              ...order.orderSupplier,
              paymentMethods: order?.orderSupplier?.paymentMethods?.map(paymentMethod => ({
                _id: paymentMethod._id,
              })),
              boxProperties: {
                amountInBox: elementOrderBox.items[0].amount || 0,
                boxHeightCm: parseFloat(elementOrderBox?.heightCmSupplier) || 0,
                boxLengthCm: parseFloat(elementOrderBox?.lengthCmSupplier) || 0,
                boxWeighGrossKg: parseFloat(elementOrderBox?.weighGrossKgSupplier) || 0,
                boxWidthCm: parseFloat(elementOrderBox?.widthCmSupplier) || 0,
              },
            },
            patchSuppliers,
          )

          await SupplierModel.updateSupplier(order.orderSupplier._id, supplierUpdateData)
        }
      }

      await BuyerModel.postTask({
        taskId: 0,
        boxes: [],
        boxesBefore: this.createBoxesResult,
        operationType: 'receive',
        clientComment: order.clientComment || '',
        buyerComment: commentToWarehouse || '',
        priority:
          order.priority ===
          mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC as keyof typeof mapTaskPriorityStatusEnumToKey]
            ? mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.URGENT as keyof typeof mapTaskPriorityStatusEnumToKey]
            : mapTaskPriorityStatusEnumToKey[
                TaskPriorityStatus.STANDART as keyof typeof mapTaskPriorityStatusEnumToKey
              ],
      })

      toast.success(t(TranslationKey['A task was created for the warehouse: "Receive a box"']))
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateBox(formFields: any) {
    try {
      const createBoxData = {
        ...getObjectFilteredByKeyArrayBlackList(formFields, [
          'items',
          'tmpBarCode',
          'tmpWarehouses',
          'tmpDeliveryMethod',
          'tmpStatus',
          'weightFinalAccountingKgSupplier',
          'tmpUseToUpdateSupplierBoxDimensions',
          'tmpUseCurrentSupplierDimensions',

          'deliveryMethod',
          'volumeWeightKgSupplier',
          'warehouse',
        ]),
        lengthCmSupplier: parseFloat(formFields?.lengthCmSupplier) || 0,
        widthCmSupplier: parseFloat(formFields?.widthCmSupplier) || 0,
        heightCmSupplier: parseFloat(formFields?.heightCmSupplier) || 0,
        weighGrossKgSupplier: parseFloat(formFields?.weighGrossKgSupplier) || 0,

        items: [
          {
            productId: formFields.items[0].product._id,
            amount: formFields.items[0].amount,
            orderId: this.selectedOrder?._id,

            transparencyFile: formFields?.items?.[0]?.transparencyFile || '',
            isBarCodeAlreadyAttachedByTheSupplier: formFields?.items?.[0]?.isBarCodeAlreadyAttachedByTheSupplier,
            isTransparencyFileAlreadyAttachedByTheSupplier:
              formFields?.items?.[0]?.isTransparencyFileAlreadyAttachedByTheSupplier,
          },
        ],
      }

      const createBoxResult = await BoxesModel.createBox(createBoxData)

      runInAction(() => {
        // @ts-ignore
        this.createBoxesResult = [...this.createBoxesResult, createBoxResult.guid]
      })
      return
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
