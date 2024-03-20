import { TranslationKey } from '@constants/translations/translation-key'

import { IOrderWithAdditionalFields } from '@components/modals/my-order-modal/my-order-modal.type'
import { CalendarIcon, DiagramIcon, DollarIcon, SandglassIcon } from '@components/shared/svg-icons'

import { formatShortDateTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { OrderStatus } from '@typings/enums/order-status'

interface IInfoItem {
  icon: JSX.Element
  title: string
  value: string
}

export interface IOrderStatus {
  status: string
  statusCode: number
}

export const getInfoItems = (formFields: IOrderWithAdditionalFields, blueBackgroundForIcon?: string): IInfoItem[] => [
  {
    icon: <DollarIcon />,
    title: t(TranslationKey['Order amount']),
    value: formFields?.totalPrice ? `$ ${toFixed(formFields?.totalPrice, 2)}` : t(TranslationKey['No data']),
  },
  {
    icon: <DiagramIcon className={blueBackgroundForIcon} />,
    title: t(TranslationKey['Order number']),
    value: formFields?.id ? `№ ${formFields?.id}` : t(TranslationKey['No data']),
  },
  {
    icon: <CalendarIcon className={blueBackgroundForIcon} />,
    title: t(TranslationKey['Payment date']),
    value: formatShortDateTime(formFields?.paymentDateToSupplier) || t(TranslationKey['No data']),
  },
  {
    icon: <SandglassIcon />,
    title: t(TranslationKey.Created),
    value: formatShortDateTime(formFields?.createdAt) || t(TranslationKey['No data']),
  },
]

export const trackedOrderStatuses: IOrderStatus[] = [
  { status: OrderStatus[OrderStatus.READY_TO_PROCESS], statusCode: OrderStatus.READY_TO_PROCESS },
  { status: OrderStatus[OrderStatus.AT_PROCESS], statusCode: OrderStatus.AT_PROCESS },
  { status: OrderStatus[OrderStatus.READY_FOR_PAYMENT], statusCode: OrderStatus.READY_FOR_PAYMENT },
  { status: OrderStatus[OrderStatus.PARTIALLY_PAID], statusCode: OrderStatus.PARTIALLY_PAID },
  {
    status: OrderStatus[OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE],
    statusCode: OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE,
  },
  { status: OrderStatus[OrderStatus.PAID_TO_SUPPLIER], statusCode: OrderStatus.PAID_TO_SUPPLIER },
  { status: OrderStatus[OrderStatus.TRACK_NUMBER_ISSUED], statusCode: OrderStatus.TRACK_NUMBER_ISSUED },
  { status: OrderStatus[OrderStatus.VERIFY_RECEIPT], statusCode: OrderStatus.VERIFY_RECEIPT },
  { status: OrderStatus[OrderStatus.IN_STOCK], statusCode: OrderStatus.IN_STOCK },
]

export const negativeTrackedOrderStatuses: IOrderStatus[] = [
  { status: OrderStatus[OrderStatus.CANCELED_BY_BUYER], statusCode: OrderStatus.CANCELED_BY_BUYER },
  { status: OrderStatus[OrderStatus.CANCELED_BY_CLIENT], statusCode: OrderStatus.CANCELED_BY_CLIENT },
]
