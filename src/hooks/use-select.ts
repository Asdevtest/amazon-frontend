import { useEffect, useRef, useState } from 'react'

import { useDebounce } from '@hooks/use-debounce'

export interface IItem {
  _id: string
  name: string
}

export const useSelect = <T>(items: T[], currentItemName?: string) => {
  const selectRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItemName, setSelectedItemName] = useState<string | undefined>(undefined)
  const [filteredItems, setFilteredItems] = useState<T[]>([])
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue)

  const handleToggleSelect = () => setIsOpen(!isOpen)

  useEffect(() => {
    setFilteredItems(items)

    setSelectedItemName(currentItemName)
  }, [currentItemName, items])

  useEffect(() => {
    const filtered = items.filter(item => item?.name?.toLowerCase().includes(debouncedSearchValue.toLowerCase()))

    setFilteredItems(filtered)
  }, [debouncedSearchValue, items])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  return {
    selectRef,
    isOpen,
    onToggleSelect: handleToggleSelect,

    selectedItemName,
    filteredItems,

    searchValue,
    setSearchValue,
  }
}
