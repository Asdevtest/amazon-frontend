/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

interface objectItemColumnMenu {
  _id: string
}

interface useObjectColumnMenuParams {
  currentColumn: string
  table: string
  filtersData: any
  onClickFilterBtn: (field: string, table: string) => void
  hideEmptyObject?: boolean
}

export const useObjectColumnMenu = <T extends objectItemColumnMenu>({
  currentColumn,
  table,
  filtersData,
  onClickFilterBtn,
  hideEmptyObject,
}: useObjectColumnMenuParams) => {
  const [chosenItems, setChosenItems] = useState<T[]>([])

  const [nameSearchValue, setNameSearchValue] = useState('')

  const { filterData, currentFilterData }: { filterData: T[]; currentFilterData: T[] } = useMemo(() => {
    if (!hideEmptyObject) {
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
    onClickFilterBtn(currentColumn, table)
  }, [])

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
