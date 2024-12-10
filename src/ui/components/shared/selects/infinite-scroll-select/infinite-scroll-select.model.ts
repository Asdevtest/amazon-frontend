import { BaseOptionType } from 'antd/es/select'
import { t } from 'i18n-js'
import { action, computed, makeObservable } from 'mobx'

import { TranslationKey } from '@constants/translations/translation-key'

import { InfiniteScrollModel } from '@models/infinite-scroll-model'
import { ICallback } from '@models/infinite-scroll-model/infinite-scroll.model'

const observerConfig = {
  items: computed,
  onDropdownVisibleChange: action.bound,
}

type GetOptionsProps<T> = {
  data: T[]
  value?: keyof T
  label?: keyof T
}

const getOptions = <T>({ data, value, label }: GetOptionsProps<T>): BaseOptionType[] =>
  data?.map(item => ({
    ...item,
    value: value ? item?.[value] : null,
    label: label ? item?.[label] : t(TranslationKey.Missing),
  }))

export type GenerateOptionType<T> = (data: T[]) => BaseOptionType[]

interface InfiniteScrollSelectModelProps<T> {
  method: ICallback
  optionValue?: keyof T
  optionLabel?: keyof T
}

export class InfiniteScrollSelectModel<T> extends InfiniteScrollModel<T> {
  optionValue?: keyof T
  optionLabel?: keyof T

  get items() {
    return getOptions<T>({ data: this.data, value: this.optionValue, label: this.optionLabel })
  }

  constructor({ method }: InfiniteScrollSelectModelProps<T>) {
    super({ method })

    makeObservable(this, observerConfig)
  }

  onDropdownVisibleChange = (isOpen: boolean) => {
    if (isOpen) {
      this.getData()
    }
  }
}
