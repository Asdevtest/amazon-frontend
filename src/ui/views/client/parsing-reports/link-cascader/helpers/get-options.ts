import { TranslationKey } from '@constants/translations/translation-key'

import { convertToSentenceCase } from '@utils/text'
import { t } from '@utils/translations'

import { IShop } from '@typings/models/shops/shop'

import { ParsingReportsType } from '../../parsing-reports.type'

export interface IExportOption {
  value: string
  label: string
  disabled?: boolean
  children?: IExportOption[]
}

export const getTableOptions = (): IExportOption[] => [
  { label: t(TranslationKey['Select all']), value: 'select-all-tables' },
  { label: 'FBA inventory', value: ParsingReportsType.FBA_INVENTORY },
  { label: convertToSentenceCase(ParsingReportsType.INVENTORY), value: ParsingReportsType.INVENTORY },
  {
    label: convertToSentenceCase(ParsingReportsType.INVENTORY_SHIPMENTS),
    value: ParsingReportsType.INVENTORY_SHIPMENTS,
  },
  { label: convertToSentenceCase(ParsingReportsType.ORDERS), value: ParsingReportsType.ORDERS },
  { label: 'PPC organic', value: ParsingReportsType.PPC_ORGANIC },
  { label: convertToSentenceCase(ParsingReportsType.RETURNS), value: ParsingReportsType.RETURNS },
  { label: convertToSentenceCase(ParsingReportsType.VOICE), value: ParsingReportsType.VOICE },
]

export const getShopsOptions = (options: IShop[], inputValue: string = ''): IExportOption[] => {
  const result: IExportOption[] = options.map(({ name, _id }) => ({ label: name, value: _id }))
  const filteredOptions = result.filter(option => option?.label?.toLowerCase().includes(inputValue.toLowerCase()))
  const selectAllOption =
    filteredOptions.length > 1 ? { label: t(TranslationKey['Select all']), value: 'select-all-shops' } : null

  return selectAllOption ? [selectAllOption, ...filteredOptions] : filteredOptions
}
