import { useMemo, useState } from 'react'

import { getColumnMenuByType } from '../helpers/get-column-by-type'
import { MultipleColumnMenuProps } from '../multiple-column-menu'

interface useNumberColumnMenuParams {
  fields: MultipleColumnMenuProps['fields']
  filtersData: MultipleColumnMenuProps['filtersData']
  columnMenuConfig: MultipleColumnMenuProps['columnMenuConfig']
}

export const useMultipleColumnMenu = ({ fields, filtersData, columnMenuConfig }: useNumberColumnMenuParams) => {
  const [currentColumnMenu, setCurrentColumnMenu] = useState<string>(fields?.[0]?.value as string)

  const currentColumnMenuSettings = useMemo(() => {
    return columnMenuConfig?.[currentColumnMenu]
  }, [currentColumnMenu])

  const CurrentColumnMenuComponent = useMemo(() => {
    return getColumnMenuByType(currentColumnMenuSettings.columnKey)
  }, [currentColumnMenuSettings, currentColumnMenu])

  const currentFilterData = useMemo(() => {
    return filtersData?.[currentColumnMenuSettings.field]
  }, [currentColumnMenu, filtersData])

  const handleChangeCurrentColumnMenu = (value: string) => {
    setCurrentColumnMenu(value)
  }

  return {
    currentColumnMenu,
    handleChangeCurrentColumnMenu,

    currentFilterData,

    CurrentColumnMenuComponent,

    currentColumnMenuSettings,
  }
}
