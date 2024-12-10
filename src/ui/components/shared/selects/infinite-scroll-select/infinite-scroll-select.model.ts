import { BaseOptionType } from 'antd/es/select'
import { t } from 'i18n-js'
import { action, computed, makeObservable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { FilterOptionsType, ICallback } from '@models/infinite-scroll-model/infinite-scroll.model'

type GetOptionsProps<T> = {
  data: T[]
  value?: keyof T
  label?: keyof T
}

export type OptionGeneratorType<T> = (data: T[]) => BaseOptionType[]

interface InfiniteScrollSelectModelProps<T> {
  method: ICallback
  optionValue: keyof T
  optionLabel: keyof T
  filterOptions?: FilterOptionsType
  searchFields?: string[]
  filterFields?: string[]
}

const observerConfig = {
  items: computed,
  onDropdownVisibleChange: action.bound,
}

const getOptions = <T>({ data, value, label }: GetOptionsProps<T>): BaseOptionType[] =>
  data?.map(item => ({
    ...item,
    value: value ? item?.[value] : null,
    label: label ? item?.[label] : t(TranslationKey.Missing),
  }))

export class InfiniteScrollSelectModel<T> extends InfiniteScrollModel<T> {
  optionValue: keyof T
  optionLabel: keyof T

  get items() {
    return getOptions<T>({ data: this.data, value: this.optionValue, label: this.optionLabel })
  }

  constructor({
    method,
    optionValue,
    optionLabel,
    filterOptions,
    searchFields,
    filterFields,
  }: InfiniteScrollSelectModelProps<T>) {
    super({ method, filterOptions, searchFields, filterFields })
    this.optionValue = optionValue
    this.optionLabel = optionLabel

    makeObservable(this, observerConfig)
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }
}
