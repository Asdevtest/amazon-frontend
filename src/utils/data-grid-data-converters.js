import { OrderStatusByCode, OrderStatusTranslate } from '@constants/orders/order-status'
import { ProductStatusByCode, productStatusTranslateKey } from '@constants/product/product-status'
import { productStrategyStatusesEnum } from '@constants/product/product-strategy-status'
import { ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status.ts'
import { mapTaskOperationTypeKeyToEnum, mapTaskOperationTypeToLabel } from '@constants/task/task-operation-type'
import { mapTaskStatusKeyToEnum } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Notification } from '@typings/enums/notification'

import {
  calcPriceForBox,
  calcVolumeWeightForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
  getTariffRateForBoxOrOrder,
} from './calculation'
import { getNewTariffTextForBoxOrOrder } from './text'
import { t } from './translations'

export const addIdDataConverter = data =>
  data.map((item, index) => ({ ...item, originalData: item, id: item._id ? item._id : index }))

export const ideaNoticeDataConverter = data =>
  data.map((item, index) => ({
    ...item,
    originalData: item,
    id: index,

    updatedAt: item.idea.updatedAt,
    createdAt: item.createdAt,
    createdByName: item.createdBy.name,
    productName: item.idea.productName,
    status: ideaStatusTranslate(ideaStatusByCode[item.idea.status]),
  }))

export const stockReportDataConverter = data =>
  data.map(item => ({
    ...item,
    originalData: item,
    id: item._id,

    shopName: item.shop.name,
  }))

export const myRequestsDataConverter = (data, shopsData) =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,
    status: item.status,
    title: item.title,
    price: item.price,
    executor: item?.executor,
    asin: item.asin,
    humanFriendlyId: item.humanFriendlyId,
    updatedAt: item.updatedAt,
    createdAt: item.createdAt,
    timeoutAt: item.timeoutAt,
    acceptedProposals: item?.countProposalsByStatuses?.acceptedProposals,
    allProposals: item?.countProposalsByStatuses?.allProposals,
    atWorkProposals: item?.countProposalsByStatuses?.atWorkProposals,
    verifyingProposals: item?.countProposalsByStatuses?.verifyingProposals,
    waitedProposals: item?.countProposalsByStatuses?.waitedProposals,
    spec: item?.spec,
    uploadedToListing: item?.uploadedToListing,
    taskComplexity: item?.taskComplexity,
    shopId: shopsData?.find(el => el._id === item?.product?.shopId)?.name || '',
  }))

export const clientProductsDataConverter = data =>
  data.map(item => ({
    originalData: item,

    researcherName: item.createdBy?.name,
    buyerName: item.buyer?.name,
    supervisorName: item.checkedBy?.name,

    strategyStatus: productStrategyStatusesEnum[item.strategyStatus],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    images: item.images,
    category: item.category,
    weight: item.weight,
    fbaamount: item.fbaamount,

    amazon: item.amazon,
    bsr: item.bsr,

    id: item._id,
  }))

export const clientInventoryDataConverter = data =>
  data.map(item => ({
    originalData: item,

    researcherName: item.createdBy?.name,
    buyerName: item.buyer?.name,
    strategyStatus: productStrategyStatusesEnum[item.strategyStatus],
    status: t(productStatusTranslateKey(ProductStatusByCode[item.status])),
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    category: item.category,
    weight: item.weight,
    fbaamount: item.fbaamount,

    amazon: item.amazon,
    profit: item.profit,
    margin: item.margin,
    bsr: item.bsr,
    fbafee: item.fbafee,

    id: item._id,
    _id: item._id,
    asin: item.asin,
    inTransfer: item.inTransfer,
    amountInOrders: item.amountInOrders,

    fbaFbmStockSum: item.fbaFbmStockSum,
    reservedSum: item.reservedSum,
    sentToFbaSum: item.sentToFbaSum,

    sumStock: item.sumStock,
    stockCost: item.stockCost,
    purchaseQuantity: item.purchaseQuantity,

    hsCode: item.hsCode,
    transparency: item.transparency,

    fourMonthesStock: item.fourMonthesStock,
    clientComment: item.clientComment,
    stockUSA: item.stockUSA,

    ideasOnCheck: item.ideasOnCheck,
    ideasFinished: item.ideasFinished,
    ideasClosed: item.ideasClosed,
  }))

export const clientOrdersDataConverter = (data, shopsData) =>
  data.map(item => ({
    originalData: item,
    id: item._id,

    idItem: `${item.id} / ${item.item ? item.item : '-'}`,

    barCode: item.product.barCode,
    totalPrice: item.totalPrice,
    grossWeightKg: item.product.weight * item.amount,
    warehouses: item.destination?.name,
    // status: OrderStatusByCode[item.status],

    status: OrderStatusTranslate(OrderStatusByCode[item.status]),

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    amount: item.amount,
    trackingNumberChina: item.trackingNumberChina,
    asin: item.product.asin,
    storekeeper: item.storekeeper?.name,
    deadline: item.deadline,
    needsResearch: item.needsResearch,
    buyerComment: item.buyerComment,
    clientComment: item.clientComment,
    shopId: shopsData?.find(el => el._id === item.product.shopId)?.name || '',
  }))

export const addOrEditBatchDataConverter = (
  data,
  volumeWeightCoefficient,
  finalWeightCalculationMethod,
  getBatchWeightCalculationMethodForBox,
  calculationMethod,
  // isDifferentMethodForEach,
) =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    qty: item.items?.reduce((acc, cur) => (acc += cur.amount), 0),

    amazonPrice: calcPriceForBox(item),

    finalWeight: getBatchWeightCalculationMethodForBox
      ? getBatchWeightCalculationMethodForBox(
          calculationMethod,
          checkActualBatchWeightGreaterVolumeBatchWeight([item], volumeWeightCoefficient),
        )(item, volumeWeightCoefficient) * item.amount
      : finalWeightCalculationMethod(item, volumeWeightCoefficient) * item.amount,
    grossWeight: item.weighGrossKgWarehouse,

    destination: item.destination?.name,
    storekeeper: item.storekeeper?.name,
    // storekeeper: item.storekeeper,
    logicsTariff: getNewTariffTextForBoxOrOrder(item),
    client: item.client?.name,

    isDraft: item.isDraft,
    isFormed: item.isFormed,

    createdAt: item.createdAt,

    updatedAt: item.updatedAt,

    humanFriendlyId: item.humanFriendlyId,
    deliveryTotalPrice:
      getTariffRateForBoxOrOrder(item) *
      (getBatchWeightCalculationMethodForBox
        ? getBatchWeightCalculationMethodForBox(
            calculationMethod,
            checkActualBatchWeightGreaterVolumeBatchWeight([item], volumeWeightCoefficient),
          )(item, volumeWeightCoefficient) * item.amount
        : finalWeightCalculationMethod(item, volumeWeightCoefficient) * item.amount),

    deliveryTotalPriceChanged: item.deliveryTotalPriceChanged,

    shippingLabel: item.shippingLabel,
    fbaShipment: item.fbaShipment,
    volumeWeightCoefficient,

    orderIdsItems: `${t(TranslationKey.Order)} №: ${item.items
      ?.reduce((acc, cur) => (acc += cur.order?.id + ', '), '')
      .slice(0, -2)}  item №: ${item.items
      ?.reduce((acc, cur) => (acc += (cur.order?.item ? cur.order?.item : '-') + ', '), '')
      .slice(0, -2)}`,
  }))

export const warehouseBatchesDataConverter = (data, volumeWeightCoefficient) =>
  data.map(item => ({
    originalData: item,
    ...item,

    id: item._id,

    tariff: getNewTariffTextForBoxOrOrder(item.boxes[0]),

    volumeWeight: item.boxes.reduce(
      (prev, box) => (prev = prev + calcVolumeWeightForBox(box, volumeWeightCoefficient)),
      0,
    ),

    deliveryTotalPrice: getTariffRateForBoxOrOrder(item.boxes[0]) * item.finalWeight,
  }))

export const warehouseTasksDataConverter = data =>
  data.map(item => ({
    originalData: item,

    id: item?._id,
    operationType: mapTaskOperationTypeToLabel[mapTaskOperationTypeKeyToEnum[item?.operationType]],
    status: mapTaskStatusKeyToEnum[item?.status],

    priority: item?.priority,
    isBarCodeAttached: item?.isBarCodeAttached,

    createdAt: item?.createdAt,
    updatedAt: item?.updatedAt,
    storekeeper: item?.storekeeper?.name,

    asin: Array.from(
      new Set(
        item?.boxesBefore?.reduce(
          (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur?.product?.asin && cur?.product?.asin], [])],
          [],
        ),
      ),
    ),

    orderId: Array.from(
      new Set(
        item.boxesBefore.reduce(
          (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur.order.id && cur.order.id], [])],
          [],
        ),
      ),
    ),

    item: Array.from(
      new Set(
        item.boxesBefore.reduce(
          (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur.order.item && cur.order.item], [])],
          [],
        ),
      ),
    ),

    trackNumber: Array.from(
      new Set(item.boxesBefore.reduce((ac, c) => [...ac, c.trackNumberText && c.trackNumberText], [])),
    ),

    barcode: !item[item.boxes?.length ? 'boxes' : 'boxesBefore'].some(box =>
      box.items.some(item => !item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper),
    ),
  }))

export const warehouseBoxesDataConverter = (data, volumeWeightCoefficient) =>
  data?.map(item => ({
    originalData: item,
    id: item?._id,
    _id: item?._id,

    warehouse: item?.destination?.name,
    logicsTariff: getNewTariffTextForBoxOrOrder(item),

    client: item?.client?.name,

    humanFriendlyId: item?.humanFriendlyId,
    amount: item?.items?.reduce((acc, cur) => (acc += cur?.amount), 0),

    isDraft: item?.isDraft,
    createdAt: item?.createdAt,
    updatedAt: item?.updatedAt,
    batchId: item?.batch?.humanFriendlyId,
    volumeWeightCoefficient,

    prepId: item?.prepId,

    orderIdsItems: `${t(TranslationKey.Order)} №: ${item?.items
      .reduce((acc, cur) => (acc += cur?.order?.id + ', '), '')
      .slice(0, -2)}  item №: ${item?.items
      .reduce((acc, cur) => (acc += (cur?.order?.item ? cur.order?.item : '-') + ', '), '')
      .slice(0, -2)}`,
  }))

export const freelancerServiceDetaildsDataConverter = data =>
  data.requests.map(item => ({
    id: item?._id,
    originalData: item,
    createdBy: item.createdBy,
    price: item?.price,
    status: item?.status,
    timeoutAt: item?.timeoutAt,
    updatedAt: item?.updatedAt,
    title: item?.title,
    humanFriendlyId: item?.humanFriendlyId,
  }))

export const SourceFilesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item?._id,

    _id: item?._id,
    sourceFile: item?.sourceFile,
    comments: item?.comments,
    proposal: item?.proposal,
    spec: item?.spec,
    productId: item?.productId,

    performer: item?.createdBy,
    sub: item?.proposal?.sub,

    createdAt: item?.createdAt,
    updatedAt: item?.updatedAt,

    humanFriendlyId: item?.proposal?.request?.humanFriendlyId,
    title: item?.proposal?.request?.title,
    asin: item?.proposal?.request?.asin,
    client: item?.proposal?.client,
  }))

export const notificationDataConverter = data =>
  data.map(item => ({
    ...item,
    originalData: item,
    id: item?._id,
    product:
      item.type === Notification.Idea
        ? {
            ...item?.data?.[0]?.parentProduct,
            title: item?.data?.[0]?.productName,
          }
        : item.type === Notification.Order
        ? item?.data?.[0]?.product
          ? {
              ...item?.data?.[0]?.product,
              humanFriendlyId: item?.data?.[0]?.id,
            }
          : item?.data?.needConfirmOrders?.[0]?.product
          ? {
              ...item?.data?.needConfirmOrders?.[0]?.product,
              humanFriendlyId: item?.data?.needConfirmOrders?.[0]?.id,
            }
          : {
              ...item?.data?.vacOrders?.[0]?.product,
              humanFriendlyId: item?.data?.vacOrders?.[0]?.id,
            }
        : item.type === Notification.Proposal
        ? {
            ...item?.data?.[0]?.request?.product,
            humanFriendlyId: item?.data?.[0]?.request?.humanFriendlyId,
            title: item?.data?.[0]?.request?.title,
          }
        : item.type === Notification.Request
        ? {
            ...item?.data?.[0]?.product,
            humanFriendlyId: item?.data?.[0]?.humanFriendlyId,
            title: item?.data?.[0]?.title,
          }
        : item.type === Notification.Launch
        ? item?.data?.[0]?.product
        : {
            ...item?.data?.items?.[0]?.product,
            humanFriendlyId: item?.data?.humanFriendlyId,
          },
    sub: item.type === Notification.Proposal ? item?.data?.[0]?.sub : undefined,
    type: item?.type,
  }))
