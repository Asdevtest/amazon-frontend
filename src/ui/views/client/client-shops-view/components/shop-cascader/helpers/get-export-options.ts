import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'

export const createBoxesOptions = () => [
  { label: t(TranslationKey['Select all']), value: 'select-all-boxes' },
  { value: 'NEW', label: 'New' },
  { value: 'IN_STOCK', label: 'In Stock' },
  { value: 'REQUESTED_SEND_TO_BATCH', label: 'Requested Send to Batch' },
  { value: 'NEED_CONFIRMING_TO_DELIVERY_PRICE_CHANGE', label: 'Need Confirming to Delivery Price Change' },
  { value: 'IN_BATCH', label: 'In Batch' },
  { value: 'IN_BATCH_ON_THE_WAY', label: 'In Batch on the Way' },
  { value: 'FINISH_PREP_CENTR_USA', label: 'Finish Prep Center USA' },
  { value: 'NEED_TO_UPDATE_THE_TARIFF', label: 'Need to Update the Tariff' },
  { value: 'ACCEPTED_IN_PROCESSING', label: 'Accepted in Processing' },
]

export const createOrdersOptions = () => [
  { label: t(TranslationKey['Select all']), value: 'select-all-orders' },
  { value: 'FORMED', label: 'Formed' },
  { value: 'PENDING', label: 'Pending' },
  { value: 'READY_FOR_BUYOUT', label: 'Ready to buy' },
  { value: 'NEW', label: 'New' },
  { value: 'READY_TO_PROCESS', label: 'Ready to process' },
  { value: 'AT_PROCESS', label: 'At process' },
  { value: 'READY_FOR_PAYMENT', label: 'Ready for payment' },
  { value: 'PARTIALLY_PAID', label: 'Partially paid' },
  { value: 'NEED_CONFIRMING_TO_PRICE_CHANGE', label: 'To price change' },
  { value: 'PAID_TO_SUPPLIER', label: 'Paid to supplier' },
  { value: 'TRACK_NUMBER_ISSUED', label: 'Track number issued' },
  { value: 'VERIFY_RECEIPT', label: 'Verify receipt' },
  { value: 'IN_STOCK', label: 'In stock' },
  { value: 'CANCELED_BY_BUYER', label: 'Return order' },
  { value: 'CANCELED_BY_CLIENT', label: 'Closed' },
  { value: 'AWAITING_SHIPMENT', label: 'Awaiting shipment' },
  { value: 'SHIPPED', label: 'Shipped' },
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
      value: 'INVENTORY',
      disabled: checkDisabled('INVENTORY', selectedTableOptions),
    },
    {
      label: t(TranslationKey.Orders),
      value: 'ORDERS',
      children: createOrdersOptions(),
      disabled: checkDisabled('ORDERS', selectedTableOptions),
    },
    {
      label: t(TranslationKey.Boxes),
      value: 'BOXES',
      children: createBoxesOptions(),
      disabled: checkDisabled('BOXES', selectedTableOptions),
    },
    {
      label: t(TranslationKey.Batches),
      value: 'BATCHES',
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
      disabled: checkDisabled('BATCHES', selectedTableOptions),
    },
  ]

  return result
}
