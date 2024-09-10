import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { BoxStatus } from '@typings/enums/box/box-status'
import { OrderStatus } from '@typings/enums/order/order-status'
import { Table } from '@typings/enums/table'
import { IShop } from '@typings/models/shops/shop'

export const createBoxesOptions = () => [
  { label: t(TranslationKey['Select all']), value: 'select-all-boxes' },
  { value: BoxStatus.IN_STOCK, label: t(TranslationKey['In stock']) },
  { value: BoxStatus.NEW, label: t(TranslationKey['On the way to the warehouse']) },
  { value: BoxStatus.ACCEPTED_IN_PROCESSING, label: t(TranslationKey['Accepted in processing']) },
  { value: BoxStatus.REQUESTED_SEND_TO_BATCH, label: t(TranslationKey['Awaiting shipment in batches']) },
  {
    value: BoxStatus.NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE,
    label: t(TranslationKey['Needs confirmation of shipping cost']),
  },
  { value: BoxStatus.NEED_TO_UPDATE_THE_TARIFF, label: t(TranslationKey['Need to update the tariff']) },
]

export const createOrdersOptions = () => [
  { label: t(TranslationKey['Select all']), value: 'select-all-orders' },
  { value: OrderStatus.READY_TO_PROCESS, label: t(TranslationKey['Waiting to be processed by a buyer']) },
  { value: OrderStatus.VERIFY_RECEIPT, label: t(TranslationKey['Verify receipt']) },
  { value: OrderStatus.TRACK_NUMBER_ISSUED, label: t(TranslationKey['Track number issued']) },
  { value: OrderStatus.CANCELED_BY_BUYER, label: t(TranslationKey['Canceled by Buyer']) },
  { value: OrderStatus.PAID_TO_SUPPLIER, label: t(TranslationKey['Paid to supplier']) },
  { value: OrderStatus.IN_STOCK, label: t(TranslationKey['Order complete']) },
  { value: OrderStatus.NEED_CONFIRMING_TO_PRICE_CHANGE, label: t(TranslationKey['Need confirming to price change']) },
  { value: OrderStatus.CANCELED_BY_CLIENT, label: t(TranslationKey['Canceled by Client']) },
  { value: OrderStatus.AT_PROCESS, label: t(TranslationKey['At process']) },
  { value: OrderStatus.PARTIALLY_PAID, label: t(TranslationKey['Partially paid']) },
  { value: OrderStatus.READY_FOR_PAYMENT, label: t(TranslationKey['Ready for payment']) },
]

export interface IExportOption {
  value: string | number
  label: string
  disabled?: boolean
  children?: IExportOption[]
}

const checkDisabled = (table: string, options: string[][]) =>
  !!options.find(option => option?.[0] && option?.[0] !== table)

export const getShopsOptions = (options: IShop[], inputValue: string = ''): IExportOption[] => {
  const result: IExportOption[] = options.map(({ name, _id }) => ({ label: name, value: _id }))
  const filteredOptions = result.filter(option => option?.label?.toLowerCase().includes(inputValue.toLowerCase()))
  const selectAllOption =
    filteredOptions.length > 1 ? { label: t(TranslationKey['Select all']), value: 'select-all-shops' } : null

  return selectAllOption ? [selectAllOption, ...filteredOptions] : filteredOptions
}

export const getTableOptions = (selectedTableOptions: string[][]): IExportOption[] => {
  const result: IExportOption[] = [
    {
      label: t(TranslationKey.Products),
      value: Table.INVENTORY,
      disabled: checkDisabled(Table.INVENTORY, selectedTableOptions),
    },
    {
      label: t(TranslationKey.Orders),
      value: Table.ORDERS,
      children: createOrdersOptions(),
      disabled: checkDisabled(Table.ORDERS, selectedTableOptions),
    },
    {
      label: t(TranslationKey.Boxes),
      value: Table.BOXES,
      children: createBoxesOptions(),
      disabled: checkDisabled(Table.BOXES, selectedTableOptions),
    },
    {
      label: t(TranslationKey.Batches),
      value: Table.BATCHES,
      children: [
        {
          label: 'On Amazon',
          value: 1, // Convert number to string
        },
        {
          label: 'Prep-center',
          value: 0, // Convert number to string
        },
      ],
      disabled: checkDisabled(Table.BATCHES, selectedTableOptions),
    },
  ]

  return result
}
