import { OrderStatus } from '@constants/orders/order-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { DiagramIcon, DollarIcon, ItemsIcon, SandglassIcon } from '@components/shared/svg-icons'

import { formatShortDateTime } from '@utils/date-time'
import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { IOrderStatus } from './information.type'

export const getInfoItems = (order: any, diagramClassName?: string) => [
  {
    icon: <DollarIcon />,
    title: t(TranslationKey['Order amount']),
    value: `$ ${toFixed(order?.totalPrice, 2)}`,
  },
  {
    icon: <DiagramIcon className={diagramClassName} />,
    title: t(TranslationKey['Order number']),
    value: `№ ${order?.id}`,
  },
  { icon: <ItemsIcon />, title: 'Item', value: order?.item || '-' },
  {
    icon: <SandglassIcon />,
    title: t(TranslationKey.Created),
    value: formatShortDateTime(order?.createdAt),
  },
]

export const trackedOrderStatuses: IOrderStatus[] = [
  { status: OrderStatus.READY_TO_PROCESS, statusCode: 10 },
  { status: OrderStatus.AT_PROCESS, statusCode: 15 },
  { status: OrderStatus.READY_FOR_PAYMENT, statusCode: 16 },
  { status: OrderStatus.PARTIALLY_PAID, statusCode: 17 },
  { status: OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE, statusCode: 19 },
  { status: OrderStatus.PAID_TO_SUPPLIER, statusCode: 20 },
  { status: OrderStatus.TRACK_NUMBER_ISSUED, statusCode: 25 },
  { status: OrderStatus.VERIFY_RECEIPT, statusCode: 27 },
  { status: OrderStatus.IN_STOCK, statusCode: 30 },
]

export const negativeTrackedOrderStatuses = [
  { status: OrderStatus.CANCELED_BY_BUYER, statusCode: 35 },
  { status: OrderStatus.CANCELED_BY_CLIENT, statusCode: 40 },
]
