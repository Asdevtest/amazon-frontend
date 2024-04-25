import { useEffect, useMemo, useState } from 'react'

export const useNumbersColumnMenu = ({ fields, data }: { fields: string[]; data: any }) => {
  const [currentField, setCurrentField] = useState(fields[0])
  const [choosenItems, setChoosenItems] = useState([])

  const [fromSearchValue, setFromSearchValue] = useState('')
  const [toSearchValue, setToSearchValue] = useState('')
  const [nameSearchValue, setNameSearchValue] = useState('')

  const { filterData, currentFilterData } = useMemo(() => {
    return data?.[currentField]
  }, [currentField])

  useEffect(() => {
    setChoosenItems(currentFilterData)
  }, [currentFilterData])

  const dataforRender = useMemo(() => {}, [])
}
