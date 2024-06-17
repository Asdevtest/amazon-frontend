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
import { getShowPartialPayment } from './helpers/get-show-partial-payment'
import { getStatusGroup } from './helpers/get-status-group'
import { observerConfig } from './observer-config'

export class BuyerMyOrdersViewModel extends DataGridFilterTableModel {
  orderStatusDataBase = []
  chosenStatus = []
  filteredStatus = []
  paymentMethods = []
  ordersMy = []
  baseNoConvertedOrders = []
  createBoxesResult = []
  paymentAmount: IOrderPayment | null = null

  selectedOrder: IOrder | null = null

  currentOrder = undefined
  updateSupplierData = false
  dataToCancelOrder = { orderId: undefined, buyerComment: undefined }
  progressValue = 0
  showProgress = false
  readyImages = []
  hsCodeData: IHSCode | null = null

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

    const columnsModel = buyerOrdersColumns({ rowHandlers, isShowPartialPayment })

    const statusGroup = getStatusGroup(pathname)

    const defaultFilterParams = () => ({
      statusGroup: {
        $eq: statusGroup,
      },
    })

    super({
      getMainDataMethod: BuyerModel.getOrdersMyPag,
      columnsModel,
      filtersFields: getFilterFields(columnsModel, ['amazonTitle', 'skuByClient']),
      mainMethodURL: 'buyers/orders/pag/my?',
      fieldsForSearch,
      tableKey: getDataGridTableKey(pathname),
      defaultFilterParams,
    })

    this.sortModel = [{ field: 'updatedAt', sort: 'desc' }]

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

  setUpdateSupplierData(value) {
    this.updateSupplierData = value
  }

  async getBuyersOrdersPaymentByStatus() {
    if (
      Number(OrderStatusByKey[this.orderStatusDataBase]) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])
    ) {
      const response = await BuyerModel.getBuyersOrdersPaymentByStatus(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])

      runInAction(() => {
        this.paymentAmount = response
      })
    } else if (
      Number(OrderStatusByKey[this.orderStatusDataBase]) === Number(OrderStatusByKey[OrderStatus.PARTIALLY_PAID])
    ) {
      const response = await BuyerModel.getBuyersOrdersPaymentByStatus(OrderStatusByKey[OrderStatus.PARTIALLY_PAID])

      runInAction(() => {
        this.paymentAmount = response
      })
    } else if (
      this.orderStatusDataBase.some(
        status =>
          Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.AT_PROCESS]) ||
          Number(OrderStatusByKey[status]) === Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
      ) &&
      this.orderStatusDataBase.length === 2
    ) {
      const response = await BuyerModel.getBuyersOrdersPaymentByStatus(
        [
          Number(OrderStatusByKey[OrderStatus.AT_PROCESS]),
          Number(OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]),
        ].join(','),
      )

      runInAction(() => {
        this.paymentAmount = response
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

  async onClickSaveSupplierBtn({ supplier, itemId, editPhotosOfSupplier, editPhotosOfUnit }) {
    try {
      supplier = {
        ...supplier,
        amount: parseFloat(supplier?.amount) || '',
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
        minlot: parseInt(supplier?.minlot) || '',
        price: parseFloat(supplier?.price) || '',
        heightUnit: supplier?.heightUnit || null,
        widthUnit: supplier?.widthUnit || null,
        lengthUnit: supplier?.lengthUnit || null,
        weighUnit: supplier?.weighUnit || null,
      }

      await onSubmitPostImages.call(this, { images: editPhotosOfSupplier, type: 'readyImages' })
      supplier = {
        ...supplier,
        images: this.readyImages,
      }

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

      const orderData = await BuyerModel.getOrderById(this.selectedOrder._id)

      runInAction(() => {
        this.selectedOrder = orderData
      })
    } catch (error) {
      console.error(error)
    }
  }

  async onClickSaveWithoutUpdateSupData(DataForSaveOrder, orderFields) {
    if (orderFields.status !== OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER] && orderFields.status < 20) {
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
        }
      })

      this.onTriggerOpenModal('showConfirmModal')
    } else {
      this.onSubmitSaveOrder(DataForSaveOrder)
    }
  }

  async onClickUpdataSupplierData({ supplier, productId, orderFields }) {
    this.updateSupplierData = false

    try {
      supplier = {
        ...supplier,
        paymentMethods: supplier.paymentMethods.map(item => getObjectFilteredByKeyArrayWhiteList(item, ['_id'])),
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

      const orderData = await BuyerModel.getOrderById(this.selectedOrder._id)

      runInAction(() => {
        this.selectedOrder = orderData
      })
    } catch (error) {
      console.error(error)
    }
  }

  onClickPaymentMethodsCell(row) {
    this.currentOrder = row
    this.onTriggerOpenModal('showPaymentMethodsModal')
  }

  async onSaveOrderItem(orderId, orderItem) {
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

  async saveOrderPayment(order, orderPayments) {
    if (Number(order.status) === Number(OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT])) {
      try {
        const validOrderPayments = []

        for (const payment of orderPayments) {
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

      await onSubmitPostImages.call(this, { images: photosToLoad, type: 'readyImages' })
      orderFields = {
        ...orderFields,
        images: this.readyImages,
      }

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
        orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`
      ) {
        await this.onSubmitCreateBoxes({ order, boxesForCreation, trackNumber, commentToWarehouse })
      }

      if (
        orderFields.status === OrderStatusByKey[OrderStatus.AT_PROCESS] ||
        orderFields.status === OrderStatusByKey[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE]
      ) {
        if (toFixed(orderFields.totalPriceChanged, 2) !== toFixed(orderFields.totalPrice, 2)) {
          await BuyerModel.setOrderTotalPriceChanged(order._id, { totalPriceChanged: orderFields.totalPriceChanged })
        }
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.AT_PROCESS]}`) {
        await BuyerModel.setOrdersAtProcess(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.PAID_TO_SUPPLIER]}`) {
        await BuyerModel.orderPayToSupplier(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.TRACK_NUMBER_ISSUED]}`) {
        await BuyerModel.orderTrackNumberIssued(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.IN_STOCK]}`) {
        await BuyerModel.orderSetInStock(order._id, { refundPrice: Number(orderFields.tmpRefundToClient) })
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.READY_FOR_PAYMENT]}`) {
        const validOrderPayments = []

        for (const payment of orderPayments) {
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

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.PARTIALLY_PAID]}`) {
        await BuyerModel.orderPartiallyPaid(order._id)
      }

      if (orderFields.status === `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
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

      if (orderFields.status !== `${OrderStatusByKey[OrderStatus.CANCELED_BY_BUYER]}`) {
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

  async onSaveOrder(order, updateOrderData) {
    try {
      const updateOrderDataFiltered = getObjectFilteredByKeyArrayWhiteList(
        {
          ...updateOrderData,
          orderSupplierId: updateOrderData.orderSupplier._id,
          amount: updateOrderData?.amount,
          priceInYuan: updateOrderData.priceInYuan,
          priceBatchDeliveryInYuan: updateOrderData.priceBatchDeliveryInYuan,
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

  async onSubmitCreateBoxes({ order, boxesForCreation, trackNumber, commentToWarehouse }) {
    try {
      runInAction(() => {
        this.createBoxesResult = []
      })

      if (trackNumber?.files.length) {
        await onSubmitPostImages.call(this, { images: trackNumber.files, type: 'readyImages' })
      }

      for (let i = 0; i < boxesForCreation.length; i++) {
        const elementOrderBox = {
          ...boxesForCreation[i],
          trackNumberText: trackNumber?.text || '',
          trackNumberFile: this.readyImages.length ? this.readyImages : [],
        }

        await this.onCreateBox(elementOrderBox, order)

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
          order.priority === mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.PROBLEMATIC]
            ? mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.URGENT]
            : mapTaskPriorityStatusEnumToKey[TaskPriorityStatus.STANDART],
      })

      toast.success(t(TranslationKey['A task was created for the warehouse: "Receive a box"']))
    } catch (error) {
      console.error(error)
    }
  }

  async onCreateBox(formFields) {
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
            orderId: this.selectedOrder._id,

            transparencyFile: formFields?.items?.[0]?.transparencyFile || '',
            isBarCodeAlreadyAttachedByTheSupplier: formFields?.items?.[0]?.isBarCodeAlreadyAttachedByTheSupplier,
            isTransparencyFileAlreadyAttachedByTheSupplier:
              formFields?.items?.[0]?.isTransparencyFileAlreadyAttachedByTheSupplier,
          },
        ],
      }

      const createBoxResult = await BoxesModel.createBox(createBoxData)

      runInAction(() => {
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
