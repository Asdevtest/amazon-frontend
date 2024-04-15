import { useCallback, useEffect, useRef, useState } from 'react'

import { useDebounce } from './use-debounce'

export const useSelectsServer = () => {
  const selectRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebounce(searchValue)
  const handleToggleSelect = useCallback(() => setIsOpen(prev => !prev), [])

  useEffect(() => {
    if (!isOpen) {
      setSearchValue('')
    }
  }, [isOpen])

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

    searchValue,
    setSearchValue,
  }
}
