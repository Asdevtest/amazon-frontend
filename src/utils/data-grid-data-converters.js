import {OrderStatusByCode, OrderStatusTranslate} from '@constants/order-status'
import {ProductStatusByCode, productStatusTranslateKey} from '@constants/product-status'
import {mapProductStrategyStatusEnum} from '@constants/product-strategy-status'
import {mapTaskOperationTypeKeyToEnum, mapTaskOperationTypeToLabel} from '@constants/task-operation-type'
import {mapTaskStatusKeyToEnum} from '@constants/task-status'
import {UserRoleCodeMap} from '@constants/user-roles'

import {calcFinalWeightForBox, calcPriceForBox, calcTotalPriceForBatch, calcVolumeWeightForBox} from './calculation'
import {getFullTariffTextForBoxOrOrder} from './text'
import {t} from './translations'

export const addIdDataConverter = data => data.map((item, index) => ({...item, id: item._id ? item._id : index}))

export const myRequestsDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,
    status: item.status,
    title: item.title,
    price: item.price,
    updatedAt: item.updatedAt,
    timeoutAt: item.timeoutAt,
    acceptedProposals: item.countProposalsByStatuses.acceptedProposals,
    allProposals: item.countProposalsByStatuses.allProposals,
    atWorkProposals: item.countProposalsByStatuses.atWorkProposals,
    verifyingProposals: item.countProposalsByStatuses.verifyingProposals,
    waitedProposals: item.countProposalsByStatuses.waitedProposals,
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
    status: t(productStatusTranslateKey(ProductStatusByCode[item.status])),
    strategyStatus: mapProductStrategyStatusEnum[item.strategyStatus],
    createdAt: item.createdAt,
    amazon: item.amazon,
    bsr: item.bsr,
    asin: item.asin,
    id: item._id,
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
  data.map(item => ({
    originalData: item,

    status: t(productStatusTranslateKey(ProductStatusByCode[item.status])),
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
    amazon: item.amazon,
    profit: item.profit,
    bsr: item.bsr,
    id: item._id,
    fbaamount: item.fbaamount,
    asin: item.asin,
  }))

export const buyerMyOrdersDataConverter = data =>
  data.map(item => ({
    originalData: item,

    barCode: item.product.barCode,

    status: OrderStatusTranslate(OrderStatusByCode[item.status]),

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    amount: item.amount,
    clientComment: item.clientComment,
    buyerComment: item.buyerComment,
    ID: item.id,
    id: item._id,
    asin: item.product.asin,
    storekeeper: item.storekeeper?.name,
    warehouses: item.destination?.name,
    client: item.product.client?.name,
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

    id: item._id,
    asin: item.product.asin,
    storekeeper: item.storekeeper?.name,
    client: item.product.client?.name,
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

export const clientInventoryDataConverter = data =>
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
    amountInOrders: item.amountInOrders,
    amountInBoxes: item.amountInBoxes,
    stockValue: item.productsInWarehouse?.reduce((ac, cur) => (ac += cur.fbaFbmStock), 0),
    reserved: item.productsInWarehouse?.reduce((ac, cur) => (ac += cur.reserved), 0),
    inBoard: item.productsInWarehouse?.reduce((ac, cur) => (ac += cur.sentToFba), 0),
    stockSum:
      item.amountInOrders +
      item.amountInBoxes +
      item.productsInWarehouse?.reduce((ac, cur) => (ac += cur.fbaFbmStock), 0) +
      item.productsInWarehouse?.reduce((ac, cur) => (ac += cur.reserved), 0) +
      item.productsInWarehouse?.reduce((ac, cur) => (ac += cur.sentToFba), 0),

    hsCode: item.hsCode,
    fourMonthesStock: item.fourMonthesStock,
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
  }))

export const clientOrdersDataConverter = data =>
  data.map(item => ({
    originalData: item,
    id: item.id,

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
  }))

export const clientWarehouseDataConverter = (data, volumeWeightCoefficient) =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    qty: item.items.reduce((acc, cur) => (acc += cur.amount), 0),

    amazonPrice: calcPriceForBox(item),

    finalWeight: calcFinalWeightForBox(item, volumeWeightCoefficient),
    grossWeight: item.weighGrossKgWarehouse,

    destination: item.destination?.name,
    storekeeper: item.storekeeper?.name,
    logicsTariff: getFullTariffTextForBoxOrOrder(item),
    client: item.client?.name,

    isDraft: item.isDraft,

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,

    humanFriendlyId: item.humanFriendlyId,
    deliveryTotalPrice: item.deliveryTotalPrice,

    deliveryTotalPriceChanged: item.deliveryTotalPriceChanged,

    shippingLabel: item.shippingLabel,
    fbaShipment: item.fbaShipment,
    volumeWeightCoefficient,
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
    tariff: getFullTariffTextForBoxOrOrder(item.boxes[0]),
    humanFriendlyId: item.humanFriendlyId,

    updatedAt: item.updatedAt,

    storekeeper: item.storekeeper?.name,

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

export const warehouseTasksDataConverter = data =>
  data.map(item => ({
    originalData: item,

    id: item._id,
    operationType: mapTaskOperationTypeToLabel[mapTaskOperationTypeKeyToEnum[item.operationType]],
    status: mapTaskStatusKeyToEnum[item.status],

    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    storekeeper: item.storekeeper?.name,
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

    trackingNumberChina: item.items[0].order.trackingNumberChina,
    finalWeight: calcFinalWeightForBox(item),
    grossWeight: item.weighGrossKgWarehouse ? item.weighGrossKgWarehouse : item.weighGrossKgSupplier,

    warehouses: item.destination?.name,

    client: item.items[0].product.client.name,
    storekeeper: item.storekeeper?.name,

    humanFriendlyId: item.humanFriendlyId,

    isDraft: item.isDraft,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  }))

export const warehouseBoxesDataConverter = (data, volumeWeightCoefficient) =>
  data.map(item => ({
    originalData: item,
    id: item._id,
    _id: item._id,

    warehouse: item.destination?.name,
    logicsTariff: getFullTariffTextForBoxOrOrder(item),

    client: item.items[0].product.client.name,

    humanFriendlyId: item.humanFriendlyId,
    qty: item.items.reduce((acc, cur) => (acc += cur.amount), 0),

    isDraft: item.isDraft,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    batchId: item.batch?.humanFriendlyId,
    volumeWeightCoefficient,
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
