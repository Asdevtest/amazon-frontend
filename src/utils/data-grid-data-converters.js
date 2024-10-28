import { TranslationKey } from '@constants/translations/translation-key'

import { Notification } from '@typings/enums/notification'

import {
  calcPriceForBox,
  checkActualBatchWeightGreaterVolumeBatchWeight,
  getTariffRateForBoxOrOrder,
} from './calculation'
import { getNewTariffTextForBoxOrOrder } from './text'
import { t } from './translations'

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

    xid: item.xid,
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
      ?.reduce((acc, cur) => (acc += cur.order?.xid + ', '), '')
      .slice(0, -2)}  item №: ${item.items
      ?.reduce((acc, cur) => (acc += (cur.order?.item ? cur.order?.item : '-') + ', '), '')
      .slice(0, -2)}`,
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
              xid: item?.data?.[0]?.id,
            }
          : item?.data?.needConfirmOrders?.[0]?.product
          ? {
              ...item?.data?.needConfirmOrders?.[0]?.product,
              xid: item?.data?.needConfirmOrders?.[0]?.id,
            }
          : {
              ...item?.data?.vacOrders?.[0]?.product,
              xid: item?.data?.vacOrders?.[0]?.id,
            }
        : item.type === Notification.Proposal
        ? {
            ...item?.data?.[0]?.request?.product,
            xid: item?.data?.[0]?.request?.xid,
            title: item?.data?.[0]?.request?.title,
          }
        : item.type === Notification.Request
        ? {
            ...item?.data?.[0]?.product,
            xid: item?.data?.[0]?.xid,
            title: item?.data?.[0]?.title,
          }
        : item.type === Notification.Launch
        ? item?.data?.[0]?.product
        : {
            ...item?.data?.items?.[0]?.product,
            xid: item?.data?.xid,
          },
    sub: item.type === Notification.Proposal ? item?.data?.[0]?.sub : undefined,
    type: item?.type,
  }))
