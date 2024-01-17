import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { SearchInput } from '@components/shared/search-input'
import { ArrowDownIcon, RatingStarIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './select.style'

import { IItem } from './select.type'
import { useSelect } from './use-select'

interface SelectProps {
  items: IItem[]
  onChangeSelectedItem: (id: string | null) => void
  currentItemName?: string
  disabled?: boolean
  withFaworites?: boolean
  destinationsFavourites?: string[]
  setDestinationsFavouritesItem?: (favourite: string) => void
}

export const Select: FC<SelectProps> = memo(props => {
  const {
    items,
    disabled,
    currentItemName,
    withFaworites,
    destinationsFavourites,
    setDestinationsFavouritesItem,
    onChangeSelectedItem,
  } = props

  const { classes: styles, cx } = useStyles()

  const { selectRef, isOpen, onToggleSelect, selectedItemName, filteredItems, searchValue, setSearchValue } = useSelect(
    items,
    currentItemName,
  )

  const checkIsFavoriteSelectedItem = (destinationName: string) =>
    !!destinationsFavourites?.find((name: string) => name === destinationName)

  const handleChangeSelectedItem = (id: string | null) => {
    onChangeSelectedItem(id)
    onToggleSelect()
  }

  return (
    <div ref={selectRef} className={styles.wrapper}>
      <button disabled={disabled} className={styles.button} onClick={onToggleSelect}>
        <p className={styles.text}>{selectedItemName || t(TranslationKey['Not chosen'])}</p>
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
          <button className={styles.menuItem} onClick={() => handleChangeSelectedItem(null)}>
            <p className={styles.menuItemText}>{t(TranslationKey['Not chosen'])}</p>
          </button>

          {filteredItems.map((item, index) => (
            <button key={index} className={styles.menuItem} onClick={() => handleChangeSelectedItem(item._id)}>
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
