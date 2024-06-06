/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { wholeIntegersList } from '../../whole-integers-list'

interface useNumberColumnMenuParams {
  field: string
  table: string
  filtersData: any
  onClickFilterBtn: (field: string, table: string) => void
}

export const useNumberColumnMenu = ({ field, table, filtersData, onClickFilterBtn }: useNumberColumnMenuParams) => {
  const [chosenItems, setChosenItems] = useState<number[]>([])

  const [fromSearchValue, setFromSearchValue] = useState('')
  const [toSearchValue, setToSearchValue] = useState('')
  const [nameSearchValue, setNameSearchValue] = useState('')

  const { filterData, currentFilterData }: { filterData: number[]; currentFilterData: number[] } = useMemo(() => {
    return filtersData
  }, [field, filtersData])

  const dataforRender: number[] = useMemo(() => {
    return filterData?.filter(item => {
      const nameSearchCondition = !nameSearchValue || Number(item) === Number(nameSearchValue)
      const fromValueCondition =
        (!fromSearchValue && fromSearchValue !== '0') || Number(item) >= Number(fromSearchValue)
      const toValueCondition = (!toSearchValue && toSearchValue !== '0') || Number(item) <= Number(toSearchValue)

      return nameSearchCondition && fromValueCondition && toValueCondition
    })
  }, [filterData, nameSearchValue, fromSearchValue, toSearchValue])

  const isWholeNumber = useMemo(() => {
    return wholeIntegersList.includes(field)
  }, [])

  const onClickItem = useCallback(
    (selectedItem: number) =>
      setChosenItems(prev => {
        if (prev.some(item => item === selectedItem)) {
          return prev.filter(item => item !== selectedItem)
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
    isWholeNumber,

    chosenItems,
    setChosenItems,

    fromSearchValue,
    setFromSearchValue,

    toSearchValue,
    setToSearchValue,

    nameSearchValue,
    setNameSearchValue,

    onClickItem,
  }
}
