import { useCallback, useEffect, useMemo, useState } from 'react'

import { IFilter } from '@utils/data-grid-filters'

import { HookParams } from '../../column-menu.type'

interface useStringColumnMenuProps extends HookParams<string> {
  transformValueMethod: (value: string) => string
}

export const useStringColumnMenu = ({
  field,
  table,
  filtersData,
  additionalFilterSettings,
  fieldNameFilter,
  transformValueMethod,
  onClickFilterBtn,
}: useStringColumnMenuProps) => {
  const [chosenItems, setChosenItems] = useState<string[]>([])

  const [searchValue, setSearchValue] = useState('')

  const { filterData, currentFilterData }: IFilter<string> = useMemo(() => {
    return filtersData
  }, [field, filtersData])

  const dataforRender: string[] = useMemo(() => {
    return filterData?.filter(item =>
      String(transformValueMethod ? transformValueMethod(item) : item)
        .toLowerCase()
        .includes(searchValue.toLowerCase()),
    )
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
    onClickFilterBtn(field, table, additionalFilterSettings, fieldNameFilter)
  }, [fieldNameFilter, field])

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
