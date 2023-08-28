import { tariffTypes } from '@constants/keys/tariff-types'
import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { OrderStatusByCode, OrderStatusTranslate } from '@constants/orders/order-status'
import {
  ProductStatus,
  ProductStatusByCode,
  ProductStatusByKey,
  productStatusTranslateKey,
} from '@constants/product/product-status'
import { mapProductStrategyStatusEnum } from '@constants/product/product-strategy-status'
import { ideaStatusByCode, ideaStatusTranslate } from '@constants/statuses/idea-status.ts'
import { mapTaskOperationTypeKeyToEnum, mapTaskOperationTypeToLabel } from '@constants/task/task-operation-type'
import { mapTaskStatusKeyToEnum } from '@constants/task/task-status'
import { TranslationKey } from '@constants/translations/translation-key'

import {
  calcFinalWeightForBox,
  calcPriceForBox,
  calcTotalFbaForProduct,
  calcTotalPriceForBatch,
  calcVolumeWeightForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
  getTariffRateForBoxOrOrder,
  roundSafely,
} from './calculation'
import { getFullTariffTextForBoxOrOrder, getNewTariffTextForBoxOrOrder } from './text'
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

export const feedBackDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    media: item.media,
    text: item.text,
    userName: item.user.name,
    updatedAt: item.updatedAt,
  }))

export const myRequestsDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,
    status: item.status,
    title: item.title,
    price: item.price,
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
    typeTask: item?.typeTask,
    uploadedToListing: item?.uploadedToListing,
  }))

export const researcherCustomRequestsDataConverter = data =>
  data.map((item, i) => ({
    originalData: item,
    id: i,
    createdAt: item.request.createdAt,
    timeoutAt: item.request.timeoutAt,
    name: item.details.name,
    maxAmountOfProposals: item.request.maxAmountOfProposals,
    price: item.request.price,
  }))

export const researcherProductsDataConverter = data =>
  data.map(item => ({
    originalData: item,
    status: [
      ProductStatusByKey[ProductStatus.NEW_PRODUCT],
      ProductStatusByKey[ProductStatus.DEFAULT],
      ProductStatusByKey[ProductStatus.RESEARCHER_CREATED_PRODUCT],
      // ProductStatusByKey[ProductStatus.RESEARCHER_FOUND_SUPPLIER],
      ProductStatusByKey[ProductStatus.CHECKED_BY_SUPERVISOR],
      ProductStatusByKey[ProductStatus.REJECTED_BY_SUPERVISOR_AT_FIRST_STEP],
    ].includes(item.status)
      ? t(productStatusTranslateKey(ProductStatusByCode[item.status]))
      : 'OK',
    strategyStatus: mapProductStrategyStatusEnum[item.strategyStatus],
    createdAt: item.createdAt,
    amazon: item.amazon,
    bsr: item.bsr,
    asin: item.asin,
    id: item._id,
    supervisorComment: item.checkednotes,
  }))

export const researcherFinancesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    creatorName: item.createdBy?.name,
    recipientName: item.recipient?.name,
    createdAt: item.createdAt,
    comment: item.comment,
    sum: item.sum,
  }))

export const supervisorFinancesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    creatorName: item.createdBy?.name,
    recipientName: item.recipient?.name,
    createdAt: item.createdAt,
    comment: item.comment,
    sum: item.sum,
  }))

export const supervisorProductsDataConverter = data =>
  data?.map(item => ({
    originalData: item,

    status: item.status,
    statusForAttention: ProductStatusByCode[item.status],
    researcherName: item.createdBy?.name,
    buyerName: item.buyer?.name,
    strategyStatus: mapProductStrategyStatusEnum[item.strategyStatus],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    amazon: item.amazon,
    bsr: item.bsr,
    id: item._id,
    fbafee: item.fbafee,
    asin: item.asin,
    ordered: item.ordered,
  }))

export const buyerFinancesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    creatorName: item.createdBy?.name,
    recipientName: item.recipient?.name,
    createdAt: item.createdAt,
    comment: item.comment,
    sum: item.sum,
  }))

export const buyerProductsDataConverter = data =>
  data.map(item => ({
    originalData: item,

    status: t(productStatusTranslateKey(ProductStatusByCode[item.status])),
    statusForAttention: ProductStatusByCode[item.status],
    strategyStatus: mapProductStrategyStatusEnum[item.strategyStatus],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    ideasOnCheck: item.ideasOnCheck,
    ideasVerified: item.ideasVerified,
    ideasClosed: item.ideasClosed,
    ideasFinished: item?.ideasFinished,

    amazon: item.amazon,
    profit: item.profit,
    bsr: item.bsr,
    id: item._id,
    fbaamount: item.fbaamount,
    asin: item.asin,
  }))

export const buyerMyOrdersDataConverter = data =>
  data.map(item => ({
    id: item._id,
    originalData: item,

    barCode: item.product.barCode,

    status: OrderStatusTranslate(OrderStatusByCode[item.status]),

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    amount: item.amount,
    clientComment: item.clientComment,
    buyerComment: item.buyerComment,
    idAndItem: `${item.id} / ${item.item ? item.item : '-'}`,
    asin: item.product.asin,
    storekeeper: item.storekeeper?.name,
    warehouses: item.destination?.name,
    client: item.product.client?.name,
    needsResearch: item.needsResearch,

    deadline: item.deadline,

    payments: item?.payments,
  }))

export const buyerVacantOrdersDataConverter = data =>
  data.map(item => ({
    originalData: item,

    barCode: item.product.barCode,
    warehouses: item.destination?.name,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    amount: item.amount,
    clientComment: item.clientComment,
    buyerComment: item.buyerComment,

    ID: item.id,

    id: item._id,
    asin: item.product.asin,
    storekeeper: item.storekeeper?.name,
    client: item.product.client?.name,
    needsResearch: item.needsResearch,
    deadline: item.deadline,
    productionTerm: item?.orderSupplier?.productionTerm,
    totalPrice: item?.totalPrice,
  }))

export const clientProductsDataConverter = data =>
  data.map(item => ({
    originalData: item,

    researcherName: item.createdBy?.name,
    buyerName: item.buyer?.name,
    supervisorName: item.checkedBy?.name,

    strategyStatus: mapProductStrategyStatusEnum[item.strategyStatus],

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

export const clientInventoryDataConverter = (data, shopsData) =>
  data.map(item => ({
    originalData: item,

    researcherName: item.createdBy?.name,
    buyerName: item.buyer?.name,
    strategyStatus: mapProductStrategyStatusEnum[item.strategyStatus],
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

    fourMonthesStock: item.fourMonthesStock,
    clientComment: item.clientComment,
    stockUSA: item.stockUSA,

    ideasOnCheck: item.ideasOnCheck,
    ideasVerified: item.ideasVerified,
    ideasClosed: item.ideasClosed,

    shopIds: shopsData?.find(el => el._id === item.shopIds?.[0])?.name || '',
  }))

export const clientCustomRequestsDataConverter = data =>
  data.map((item, i) => ({
    originalData: item,
    id: i,
    status: item.request.status,
    createdAt: item.request.createdAt,
    timeoutAt: item.request.timeoutAt,
    name: item.details.name,
    maxAmountOfProposals: item.request.maxAmountOfProposals,
    price: item.request.price,
    direction: item.request.direction,
  }))

export const freelancerCustomRequestsDataConverter = data =>
  data.map((item, i) => ({
    originalData: item,
    id: i,
    status: item.request.status,
    createdAt: item.request.createdAt,
    timeoutAt: item.request.timeoutAt,
    name: item.details.name,
    maxAmountOfProposals: item.request.maxAmountOfProposals,
    price: item.request.price,
    direction: item.request.direction,
  }))

export const depersonalizedPickDataConverter = data =>
  data.map((item, index) => ({
    originalData: item,
    id: item._id,

    number: index + 1,
    checkednotes: item.checkednotes,
    clientComment: item.clientComment,
    updatedAt: item.updatedAt,
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
    shopIds: shopsData?.find(el => el._id === item.product.shopIds?.[0])?.name || '',
    // shopIds: item.product.shopIds?.[0],
  }))

export const clientWarehouseDataConverter = (data, volumeWeightCoefficient, shopsData) =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    amount: item.items.reduce((acc, cur) => (acc += cur.amount), 0),

    amazonPrice: calcPriceForBox(item),

    finalWeight: calcFinalWeightForBox(item, volumeWeightCoefficient),
    grossWeight: item.weighGrossKgWarehouse,

    destination: item.destination?.name,
    storekeeper: item.storekeeper?.name,

    logicsTariff: getFullTariffTextForBoxOrOrder(item),
    client: item.client?.name,

    status: item.status,

    isDraft: item.isDraft,
    isFormed: item.isFormed,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    deadline: item.deadline,

    humanFriendlyId: item.humanFriendlyId,
    deliveryTotalPrice: item.deliveryTotalPrice,

    deliveryTotalPriceChanged: item.deliveryTotalPriceChanged,

    prepId: item.prepId,

    shippingLabel: item.shippingLabel,
    fbaShipment: item.fbaShipment,
    variationTariff: item?.variationTariff,
    volumeWeightCoefficient,

    orderIdsItems: `${t(TranslationKey.Order)} №: ${item.items
      .reduce((acc, cur) => (acc += cur.order?.id + ', '), '')
      .slice(0, -2)}  item №: ${item.items
      .reduce((acc, cur) => (acc += (cur.order?.item ? cur.order?.item : '-') + ', '), '')
      .slice(0, -2)}`,

    shopIds: Array.from(
      new Set(
        `${item.items.reduce(
          (ac, cur) =>
            (ac +=
              cur.product.shopIds?.reduce((a, c) => (a += shopsData?.find(el => el._id === c)?.name + ', '), '') +
              ', '),
          '',
        )}`
          .replace(/undefined/g, '')
          .split(', '),
      ),
    )
      .join(', ')
      .slice(0, -2),
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

export const clientBatchesDataConverter = (data, volumeWeightCoefficient) =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    destination: item.boxes[0].destination?.name,
    tariff: getFullTariffTextForBoxOrOrder(item.boxes[0]),
    humanFriendlyId: item.humanFriendlyId,
    storekeeper: item.storekeeper?.name,

    title: item.title,

    updatedAt: item.updatedAt,

    volumeWeight: item.boxes.reduce(
      (prev, box) => (prev = prev + calcVolumeWeightForBox(box, volumeWeightCoefficient)),
      0,
    ),

    finalWeight: item.boxes.reduce(
      (prev, box) => (prev = prev + calcFinalWeightForBox(box, volumeWeightCoefficient)),
      0,
    ),
    totalPrice: item.boxes.reduce((prev, box) => (prev = prev + calcPriceForBox(box)), 0),
    deliveryTotalPrice: item.boxes.reduce((prev, box) => (prev = prev + box.deliveryTotalPrice), 0),
  }))

export const clientFinancesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    creatorName: item.createdBy?.name,
    recipientName: item.recipient?.name,
    createdAt: item.createdAt,
    comment: item.comment,
    sum: item.sum,
  }))

export const clientOrdersNotificationsDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,

    barCode: item.product.barCode,
    totalPrice: item.totalPrice,
    grossWeightKg: item.product.weight * item.amount,
    warehouses: item.destination?.name,

    status: OrderStatusTranslate(OrderStatusByCode[item.status]),

    createdAt: item.createdAt,
    amount: item.amount,
    trackingNumberChina: item.trackingNumberChina,
    totalPriceChanged: item.totalPriceChanged,
    deliveryCostToTheWarehouse: item.deliveryCostToTheWarehouse,
    buyerComment: item.buyerComment,
    asin: item.product.asin,
  }))

export const warehouseFinancesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    creatorName: item.createdBy?.name,
    recipientName: item.recipient?.name,
    createdAt: item.createdAt,
    comment: item.comment,
    sum: item.sum,
  }))

export const warehouseBatchesDataConverter = (data, volumeWeightCoefficient) =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    destination: item.boxes[0].destination?.name,
    tariff: getNewTariffTextForBoxOrOrder(item.boxes[0]),
    humanFriendlyId: item.humanFriendlyId,

    title: item.title,

    updatedAt: item.updatedAt,

    storekeeper: item.storekeeper?.name,

    volumeWeight: item.boxes.reduce(
      (prev, box) => (prev = prev + calcVolumeWeightForBox(box, volumeWeightCoefficient)),
      0,
    ),

    // finalWeight: item.boxes.reduce(
    //   (prev, box) => (prev = prev + calcFinalWeightForBox(box, volumeWeightCoefficient)),
    //   0,
    // ),
    finalWeight: item.finalWeight,

    totalPrice: item.boxes.reduce((prev, box) => (prev = prev + calcPriceForBox(box)), 0),
    // totalPrice: getTariffRateForBoxOrOrder(item) * item.finalWeight,

    // deliveryTotalPrice: item.boxes.reduce((prev, box) => (prev = prev + box.deliveryTotalPrice), 0),

    deliveryTotalPrice: getTariffRateForBoxOrOrder(item.boxes[0]) * item.finalWeight,
    arrivalDate: item?.arrivalDate,
    trackingNumber: item?.trackingNumber,
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
    // asin: Array.from(
    //   new Set(
    //     `${item.boxesBefore.reduce(
    //       (ac, c) => (ac += c.items.reduce((acc, cur) => (acc += cur.product.asin + ', '), '')),
    //       '',
    //     )}`.split(', '),
    //   ),
    // ),

    asin: Array.from(
      new Set(
        item?.boxesBefore?.reduce(
          (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur?.product?.asin && cur?.product?.asin], [])],
          [],
        ),
      ),
    ),
    // .join(', ')
    // .slice(0, -2),

    // orderId: Array.from(
    //   new Set(
    //     `${item.boxesBefore.reduce(
    //       (ac, c) => (ac += c.items.reduce((acc, cur) => (acc += cur.order.id + ', '), '')),
    //       '',
    //     )}`.split(', '),
    //   ),
    // ),

    orderId: Array.from(
      new Set(
        item.boxesBefore.reduce(
          (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur.order.id && cur.order.id], [])],
          [],
        ),
      ),
    ),
    // .join(', ')
    // .slice(0, -2),

    // item: Array.from(
    //   new Set(
    //     `${item.boxesBefore.reduce(
    //       (ac, c) => (ac += c.items.reduce((acc, cur) => (acc += cur.order.item + ', '), '')),
    //       '',
    //     )}`.split(', '),
    //   ),
    // ),

    item: Array.from(
      new Set(
        item.boxesBefore.reduce(
          (ac, c) => [...ac, ...c.items.reduce((acc, cur) => [...acc, cur.order.item && cur.order.item], [])],
          [],
        ),
      ),
    ),
    // .filter(el => !!parseInt(el))
    // .join(', '),

    // trackNumber: Array.from(
    //   new Set(`${item.boxesBefore.reduce((ac, c) => (ac += c.trackNumberText + ', '),'' )}`.split(', ')),
    // ),
    // .join(', ')
    // .slice(0, -2),
    trackNumber: Array.from(
      new Set(item.boxesBefore.reduce((ac, c) => [...ac, c.trackNumberText && c.trackNumberText], [])),
    ),

    barcode: !item[item.boxes?.length ? 'boxes' : 'boxesBefore'].some(box =>
      box.items.some(item => !item.isBarCodeAlreadyAttachedByTheSupplier && !item.isBarCodeAttachedByTheStorekeeper),
    ),
  }))

export const adminProductsDataConverter = data =>
  data.map(item => ({
    originalData: item,

    status: ProductStatusByCode[item.status],
    strategyStatus: mapProductStrategyStatusEnum[item.strategyStatus],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    amazon: item.amazon,
    profit: item.profit,
    margin: item.margin,
    bsr: item.bsr,
    id: item._id,
    fbafee: item.fbafee,
    fbaamount: item.fbaamount,
    barCode: item.barCode,
    asin: item.asin,
    clientName: item.client?.name,
    createdBy: item.createdBy?.name,
    supervisor: item.checkedBy?.name,
    buyer: item.buyer?.name,
  }))

export const adminOrdersDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item.id,

    barCode: item.product.barCode,
    totalPrice: item.totalPrice,
    grossWeightKg: item.product.weight * item.amount,
    status: OrderStatusTranslate(OrderStatusByCode[item.status]),

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    amount: item.amount,
    trackingNumberChina: item.trackingNumberChina,
    asin: item.product.asin,
    buyer: item.buyer?.name,
    storekeeper: item.storekeeper?.name,
    warehouses: item.destination?.name,
    client: item.product.client?.name,

    surcharge: item.totalPriceChanged - item.totalPrice,
  }))

export const adminTasksDataConverter = data =>
  data.map(item => ({
    originalData: item,

    id: item._id,
    operationType: mapTaskOperationTypeToLabel[mapTaskOperationTypeKeyToEnum[item.operationType]],
    status: mapTaskStatusKeyToEnum[item.status],
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    description: item.description,
    storekeeper: item.storekeeper?.name || '',
  }))

export const adminBoxesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    qty: item.items.reduce((acc, cur) => (acc += cur.amount), 0),

    amazonPrice: calcPriceForBox(item),

    trackNumber: item.trackNumberText,
    finalWeight: calcFinalWeightForBox(item),
    grossWeight: item.weighGrossKgWarehouse ? item.weighGrossKgWarehouse : item.weighGrossKgSupplier,

    warehouses: item.destination?.name,

    client: item.items[0]?.product.client.name,
    storekeeper: item.storekeeper?.name,

    humanFriendlyId: item.humanFriendlyId,

    isDraft: item.isDraft,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
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

export const adminBatchesDataConverter = data =>
  data.map((item, i) => ({
    originalData: item,
    id: i,

    finalWeight: item.boxes.reduce(
      (prev, box) => (prev = prev + calcFinalWeightForBox(box)),

      0,
    ),
    totalPrice: calcTotalPriceForBatch(item),
  }))

export const financesDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    creatorName: item.createdBy?.name,
    recipientName: item.recipient?.name,
    createdAt: item.createdAt,
    comment: item.comment,
    sum: item.sum,
    type: item.sum > 0 ? 'replenish' : item.sum < 0 ? 'fine' : 'zero',
    paymentType: item.paymentType,
    entityId: item.entityId,
  }))

export const adminUsersDataConverter = data =>
  data.map(item => ({
    originalData: item,

    id: item._id,
    role: UserRoleCodeMap[item.role],
    active: item.active === true ? 'Active' : 'Banned',

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    name: item.name,
    balance: item.balance,
    balanceFreeze: item.balanceFreeze,
    email: item.email,
    rate: item.rate,
    isSubUser: item.masterUser ? 'SUB-USER' : 'USER',
  }))

export const adminSinglePermissionsDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    role: UserRoleCodeMap[item.role],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    key: item.key,
    title: item.title,
    description: item.description,
  }))

export const adminGroupPermissionsDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    role: UserRoleCodeMap[item.role],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    key: item.key,
    title: item.title,
    description: item.description,
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
    typeTask: item?.typeTask,
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

export const supplierApproximateCalculationsDataConverter = (
  tariffLogistics,
  product,
  supplier,
  volumeWeightCoefficient,
) => {
  const fInalWeightOfUnit =
    Math.max(
      roundSafely(
        (supplier.boxProperties?.boxLengthCm *
          supplier?.boxProperties?.boxWidthCm *
          supplier?.boxProperties?.boxHeightCm) /
          volumeWeightCoefficient,
      ) || 0,
      parseFloat(supplier?.boxProperties?.boxWeighGrossKg) || 0,
    ) / supplier.boxProperties.amountInBox

  return tariffLogistics
    ?.filter(tariffLogistic => tariffLogistic.tariffType === tariffTypes.WITHOUT_WEIGHT_LOGISTICS_TARIFF)
    ?.map((item, i) => {
      const costDeliveryToChina =
        (+supplier.price * (+supplier.amount || 0) + +supplier.batchDeliveryCostInDollar) / +supplier.amount

      const costDeliveryToUsa =
        costDeliveryToChina +
        Math.max(
          item.conditionsByRegion.central.rate,
          item.conditionsByRegion.east.rate,
          item.conditionsByRegion.west.rate,
        ) *
          fInalWeightOfUnit

      const roi = ((product.amazon - calcTotalFbaForProduct(product) - costDeliveryToUsa) / costDeliveryToUsa) * 100

      return {
        originalData: item,
        id: i,

        name: item.name,
        costDeliveryToChina,
        costDeliveryToUsa,
        roi,
      }
    })
}

export const supplierWeightBasedApproximateCalculationsDataConverter = (
  tariffLogistics,
  product,
  supplier,
  volumeWeightCoefficient,
) => {
  const fInalWeightOfUnit =
    Math.max(
      roundSafely(
        (supplier.boxProperties?.boxLengthCm *
          supplier?.boxProperties?.boxWidthCm *
          supplier?.boxProperties?.boxHeightCm) /
          volumeWeightCoefficient,
      ) || 0,
      parseFloat(supplier?.boxProperties?.boxWeighGrossKg) || 0,
    ) / supplier.boxProperties.amountInBox

  return tariffLogistics
    ?.filter(tariffLogistic => tariffLogistic.tariffType === tariffTypes.WEIGHT_BASED_LOGISTICS_TARIFF)
    ?.map((tariffLogistic, i) => {
      const costDeliveryToChina =
        (+supplier?.price * (+supplier?.amount || 0) + +supplier?.batchDeliveryCostInDollar) / +supplier?.amount

      const destinationVariations = tariffLogistic?.destinationVariations?.map(destinationVariation => {
        const deliveryToUsa = costDeliveryToChina + destinationVariation?.pricePerKgUsd * fInalWeightOfUnit

        return {
          ...destinationVariation,
          roi: ((product?.amazon - calcTotalFbaForProduct(product) - deliveryToUsa) / deliveryToUsa) * 100,
          costDeliveryToUsa: deliveryToUsa,
        }
      })

      return {
        id: i,
        originalData: tariffLogistic,
        name: tariffLogistic?.name,
        costDeliveryToChina,
        destinationVariations,
      }
    })
}

export const notificationDataConverter = data =>
  data.map(item => ({
    ...item,
    originalData: item,
    id: item._id,

    product: item.data?.[0]?.parentProduct,
  }))
