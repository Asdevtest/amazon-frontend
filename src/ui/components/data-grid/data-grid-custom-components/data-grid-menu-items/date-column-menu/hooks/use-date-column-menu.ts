import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { IFilter } from '@utils/data-grid-filters'

import { HookParams } from '../../column-menu.type'

export const useDateColumnMenu = ({
  field,
  table,
  filtersData,
  additionalFilterSettings,
  fieldNameFilter,
  onClickFilterBtn,
}: HookParams<string>) => {
  const [chosenItems, setChosenItems] = useState<string[]>([])
  const [rangeDate, setRangeDate] = useState<(Dayjs | null)[]>([])

  const { filterData, currentFilterData }: IFilter<string> = useMemo(() => {
    return filtersData
  }, [field, filtersData])

  const dataforRender: string[] = useMemo(() => {
    const dateFrom = rangeDate[0] ? rangeDate[0]?.startOf('day') : null
    const dateTo = rangeDate[1] ? rangeDate[1]?.endOf('day') : null

    return filterData?.filter(item => {
      const currentDate = dayjs(item).startOf('day')

      if (!dateFrom && !dateTo) {
        return true
      }

      return (
        (currentDate.isAfter(dateFrom) || currentDate.isSame(dateFrom)) &&
        (currentDate.isBefore(dateTo) || currentDate.isSame(dateFrom))
      )
    })
  }, [filterData, rangeDate])

  const onChangeRangeDate = useCallback((dates: null | (Dayjs | null)[]) => {
    if (dates?.length) {
      setRangeDate(dates)
    } else {
      setRangeDate([])
    }
  }, [])

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

    onChangeRangeDate,

    dataforRender,

    onClickItem,
  }
}
