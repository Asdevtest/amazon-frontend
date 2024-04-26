/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useMemo, useState } from 'react'

import { IRadioBottonsSetting } from '@components/shared/radio-buttons/radio-buttons'

import { wholeIntegersList } from '../../whole-integers-list'

interface useNumbersColumnMenuParams {
  fields: IRadioBottonsSetting[]
  table: string
  filtersData: any
  onClickFilterBtn: (field: string, table: string) => void
}

export const useNumbersColumnMenu = ({ fields, table, filtersData, onClickFilterBtn }: useNumbersColumnMenuParams) => {
  const [currentField, setCurrentField] = useState<string>(fields?.[0]?.value as string)
  const [chosenItems, setChosenItems] = useState<number[]>([])

  const [fromSearchValue, setFromSearchValue] = useState('')
  const [toSearchValue, setToSearchValue] = useState('')
  const [nameSearchValue, setNameSearchValue] = useState('')

  const { filterData, currentFilterData } = useMemo(() => {
    return filtersData?.[currentField]
  }, [currentField, filtersData?.[currentField]])

  const dataforRender: number[] = useMemo(() => {
    return filterData
  }, [filterData])

  const isWholeNumber = useMemo(() => {
    return wholeIntegersList.includes(currentField)
  }, [currentField])

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

  const handleSelectField = useCallback((field: string) => {
    setCurrentField(field)
    onClickFilterBtn(field, table)
  }, [])

  useEffect(() => {
    onClickFilterBtn(currentField, table)
  }, [])

  useEffect(() => {
    setChosenItems(currentFilterData)
  }, [currentFilterData])

  return {
    dataforRender,
    isWholeNumber,

    onClickItem,
    handleSelectField,

    chosenItems,
    setChosenItems,

    currentField,
    setCurrentField,

    fromSearchValue,
    setFromSearchValue,

    toSearchValue,
    setToSearchValue,

    nameSearchValue,
    setNameSearchValue,
  }
}
