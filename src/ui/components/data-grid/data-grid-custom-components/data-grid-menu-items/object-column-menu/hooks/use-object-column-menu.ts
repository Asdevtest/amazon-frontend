/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { IFilter } from '@utils/data-grid-filters'
import { t } from '@utils/translations'

import { HookParams } from '../../column-menu.type'

interface ObjectItemColumnMenu {
  _id: string | null
}

interface useObjectColumnMenuParams<T> extends HookParams<T> {
  hideEmptyObject?: boolean
}

export const useObjectColumnMenu = <T extends ObjectItemColumnMenu>({
  field,
  table,
  filtersData,
  onClickFilterBtn,
  hideEmptyObject,
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
    return filterData?.filter(item => {
      if (!nameSearchValue) {
        return true
      }

      let itemProperty

      if ('name' in item) {
        itemProperty = 'name'
      } else {
        itemProperty = 'title'
      }

      return String(item[itemProperty as keyof T])
        .toLowerCase()
        .includes(nameSearchValue.toLowerCase())
    })
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
    onClickFilterBtn(field, table)
  }, [field])

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
