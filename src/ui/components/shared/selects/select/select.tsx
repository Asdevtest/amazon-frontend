import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SearchInput } from '@components/shared/search-input'
import { ArrowDownIcon, RatingStarIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useDebounce } from '@hooks/use-debounce'

import { useStyles } from './select.style'

interface SelectProps {
  items: any[]
  disabled?: boolean
  currentItem?: any
  withFaworites?: boolean
  destinationsFavourites?: string[]
  setDestinationsFavouritesItem?: (favourite: string) => void
}

export const Select: FC<SelectProps> = memo(props => {
  const { items, disabled, currentItem, withFaworites, destinationsFavourites, setDestinationsFavouritesItem } = props

  const { classes: styles, cx } = useStyles()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filteredItems, setFilteredItems] = useState<any[]>([])
  const debouncedSearchValue = useDebounce(searchValue)

  useEffect(() => {
    if (currentItem) {
      setSelectedItem(currentItem)
    } else {
      setSelectedItem(t(TranslationKey['Not chosen']))
    }
  }, [currentItem])

  useEffect(() => {
    if (items.length) {
      setFilteredItems(items)
    }
  }, [currentItem])

  useEffect(() => {
    const filtered = items.filter(item => item.name.toLowerCase().includes(debouncedSearchValue.toLowerCase()))

    setFilteredItems(filtered)
  }, [debouncedSearchValue, items])

  const handleToggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleChangeSelectedItem = (item: string) => {
    setSelectedItem(item)
    setIsOpen(!isOpen)
  }

  const checkIsFavoriteSelectedItem = (destinationName: string) =>
    !!destinationsFavourites?.find((name: string) => name === destinationName)

  return (
    <div className={styles.wrapper}>
      <button disabled={disabled} className={styles.button} onClick={handleToggleMenu}>
        <p className={styles.text}>{selectedItem}</p>
        <div className={cx(styles.iconButton, { [styles.iconRotate]: isOpen })}>
          <ArrowDownIcon className={styles.icon} />
        </div>
      </button>

      <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        <div className={styles.searchInputWrapper}>
          <SearchInput
            value={searchValue}
            placeholder={t(TranslationKey.Search)}
            inputClasses={styles.searchInput}
            onChange={e => setSearchValue(e.target.value)}
          />
        </div>

        <ul className={styles.menuItems}>
          <button className={styles.menuItem} onClick={() => handleChangeSelectedItem(t(TranslationKey['Not chosen']))}>
            <p className={styles.menuItemText}>{t(TranslationKey['Not chosen'])}</p>
          </button>

          {filteredItems.map((item, index) => (
            <button key={index} className={styles.menuItem} onClick={() => handleChangeSelectedItem(item.name)}>
              <p className={styles.menuItemText}>{item.name}</p>
              {withFaworites && (
                <button
                  className={styles.starButton}
                  onClick={e => {
                    e.stopPropagation()
                    setDestinationsFavouritesItem ? setDestinationsFavouritesItem(item.name) : undefined
                  }}
                >
                  <RatingStarIcon
                    className={cx(styles.starIcon, {
                      [styles.starIconFavorite]: checkIsFavoriteSelectedItem(item.name),
                    })}
                  />
                </button>
              )}
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
})
