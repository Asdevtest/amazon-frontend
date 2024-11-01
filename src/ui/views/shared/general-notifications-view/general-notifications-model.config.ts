import { action, computed, observable } from 'mobx'

import { Notification } from '@typings/enums/notification'
import { INotification } from '@typings/shared/notification'

export const observerConfig = {
  curNotificationType: observable,
  isArchive: observable,
  showIdeaModal: observable,
  currentProduct: observable,
  currentIdeaId: observable,
  sortFields: observable,

  userInfo: computed,
  currentConvertedData: computed,

  onClickReadButton: action.bound,
  toggleVariationHandler: action.bound,
  navigateToHandler: action.bound,
  onClickToChangeNotificationType: action.bound,
}

export const notificationDataConverter = (data: INotification[]) =>
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
