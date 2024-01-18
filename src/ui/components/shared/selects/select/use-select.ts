import { useEffect, useRef, useState } from 'react'

import { useDebounce } from '@hooks/use-debounce'

import { IItem } from './select.type'

export const useSelect = (items: IItem[], currentItem?: string) => {
  const selectRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [filteredItems, setFilteredItems] = useState<IItem[]>([])
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue)

  const handleToggleSelect = () => setIsOpen(!isOpen)

  const handleChangeSelectedItem = (item: string) => {
    setSelectedItem(item)
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    setFilteredItems(items)

    if (currentItem) {
      setSelectedItem(currentItem)
    }
  }, [currentItem, items])

  useEffect(() => {
    const filtered = items.filter(item => item.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))

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

    selectedItem,
    filteredItems,

    searchValue,
    setSearchValue,

    onChangeSelectedItem: handleChangeSelectedItem,
  }
}
