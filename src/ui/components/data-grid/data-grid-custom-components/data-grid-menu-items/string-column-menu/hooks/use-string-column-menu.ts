import { useCallback, useEffect, useMemo, useState } from 'react'

import { IFilter } from '@utils/data-grid-filters'

import { HookParams } from '../../column-menu.type'

export const useStringColumnMenu = ({ field, table, filtersData, onClickFilterBtn }: HookParams<string>) => {
  const [chosenItems, setChosenItems] = useState<string[]>([])

  const [searchValue, setSearchValue] = useState('')

  const { filterData, currentFilterData }: IFilter<string> = useMemo(() => {
    return filtersData
  }, [field, filtersData])

  const dataforRender: string[] = useMemo(() => {
    return filterData?.filter(item => String(item).toLowerCase().includes(searchValue.toLowerCase()))
  }, [filterData, searchValue])

  const onClickItem = useCallback((value: string) => {
    setChosenItems(prev => {
      if (prev.some(item => item === value)) {
        return prev.filter(item => item !== value)
      } else {
        return [...prev, value]
      }
    })
  }, [])

  useEffect(() => {
    onClickFilterBtn(field, table)
  }, [field])

  useEffect(() => {
    setChosenItems(currentFilterData)
  }, [currentFilterData])

  return {
    chosenItems,
    setChosenItems,

    searchValue,
    setSearchValue,

    dataforRender,

    onClickItem,
  }
}
