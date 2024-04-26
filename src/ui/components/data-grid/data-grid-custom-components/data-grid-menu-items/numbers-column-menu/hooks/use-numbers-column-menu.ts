import { useEffect, useMemo, useState } from 'react'

import { IRadioBottonsSetting } from '@components/shared/radio-buttons/radio-buttons'

interface useNumbersColumnMenuParams {
  fields: IRadioBottonsSetting[]
  table: string
  filtersData: any
  onClickFilterBtn: (field: string, table: string) => void
}

export const useNumbersColumnMenu = ({ fields, table, filtersData, onClickFilterBtn }: useNumbersColumnMenuParams) => {
  const [currentField, setCurrentField] = useState<string>(fields?.[0]?.value as string)
  const [choosenItems, setChoosenItems] = useState([])

  const [fromSearchValue, setFromSearchValue] = useState('')
  const [toSearchValue, setToSearchValue] = useState('')
  const [nameSearchValue, setNameSearchValue] = useState('')

  const { filterData, currentFilterData } = useMemo(() => {
    return filtersData?.[currentField]
  }, [currentField])

  const dataforRender = useMemo(() => {}, [])

  const handleGetFilterData = () => {}

  useEffect(() => {
    onClickFilterBtn(currentField, table)
  }, [])

  useEffect(() => {
    setChoosenItems(currentFilterData)
  }, [currentFilterData])

  return {
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
