/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IFilter } from '@utils/data-grid-filters'
import { t } from '@utils/translations'

import { HookParams } from '../../column-menu.type'
import { getItemKey } from '../helpers/get-item-key'

export interface ObjectItemColumnMenu {
  _id: string | null
}

interface useObjectColumnMenuParams<T> extends HookParams<T> {
  hideEmptyObject?: boolean
  sortOptions?: string
}

export const useObjectColumnMenu = <T extends ObjectItemColumnMenu>({
  field,
  table,
  filtersData,
  additionalFilterSettings,
  fieldNameFilter,
  onClickFilterBtn,
  hideEmptyObject,
  sortOptions,
}: useObjectColumnMenuParams<T>) => {
  const [chosenItems, setChosenItems] = useState<T[]>([])

  const [nameSearchValue, setNameSearchValue] = useState('')

  const { filterData, currentFilterData }: IFilter<T> = useMemo(() => {
    if (!hideEmptyObject) {
      // @ts-ignore
      filtersData?.filterData?.push({
        _id: null,
        title: t(TranslationKey.Empty),
      })
    }

    return filtersData
  }, [filtersData])

  const dataforRender: T[] = useMemo(() => {
    const filteredData = filterData?.filter(item => {
      if (!nameSearchValue) {
        return true
      }

      const itemProperty = getItemKey(item)

      return String(item[itemProperty]).toLowerCase().includes(nameSearchValue.toLowerCase())
    })

    if (sortOptions) {
      filteredData?.sort((a, b) => {
        const itemProperty = getItemKey(a)

        if (sortOptions === 'asc') {
          return a[itemProperty] > b[itemProperty] ? 1 : -1
        } else {
          return a[itemProperty] < b[itemProperty] ? 1 : -1
        }
      })
    }

    return filteredData
  }, [filterData, nameSearchValue])

  const onClickItem = useCallback(
    (selectedItem: T) =>
      setChosenItems(prev => {
        if (prev.some(item => item?._id === selectedItem?._id)) {
          return prev.filter(item => item?._id !== selectedItem?._id)
        } else {
          return [...prev, selectedItem]
        }
      }),
    [],
  )

  useEffect(() => {
    onClickFilterBtn(fieldNameFilter || field, table, additionalFilterSettings)
  }, [fieldNameFilter, field])

  useEffect(() => {
    setChosenItems(currentFilterData)
  }, [currentFilterData])

  return {
    dataforRender,

    chosenItems,
    setChosenItems,

    onClickItem,

    nameSearchValue,
    setNameSearchValue,
  }
}
