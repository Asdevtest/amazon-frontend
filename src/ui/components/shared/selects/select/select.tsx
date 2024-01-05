import { FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ArrowDownIcon, ArrowUpIcon, RatingStarIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './select.style'

interface SelectProps {
  items: any[]
  currentItem?: any
  withFaworites?: boolean
  favourites?: any
  onChangeFavourite?: () => void
}

export const Select: FC<SelectProps> = memo(props => {
  const { items, currentItem, withFaworites, favourites, onChangeFavourite } = props

  const { classes: styles, cx } = useStyles()

  const [isOpen, setIsOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [isTransition, setIsTransition] = useState(false)

  useEffect(() => {
    if (currentItem) {
      setSelectedItem(currentItem)
    } else {
      setSelectedItem(t(TranslationKey['Not chosen']))
    }
  }, [currentItem])

  const handleToggleMenu = () => {
    setIsTransition(true)
    setIsOpen(!isOpen)

    setTimeout(() => {
      setIsTransition(false)
    }, 0)
  }

  const handleChangeSelectedItem = (item: string) => {
    setSelectedItem(item)
    setIsOpen(!isOpen)
  }

  const checkIsFavoriteSelectedItem = (itemName: string) => favourites.find((name: string) => name === itemName)

  return (
    <div className={styles.wrapper}>
      <button className={styles.button} onClick={handleToggleMenu}>
        <p className={styles.text}>{selectedItem}</p>
        <button className={cx(styles.iconButton, { [styles.iconRotate]: isOpen })}>
          <ArrowDownIcon className={styles.icon} />
        </button>
      </button>

      <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        <div>search</div>

        <ul className={styles.menuItems}>
          <button className={styles.menuItem} onClick={() => handleChangeSelectedItem(t(TranslationKey['Not chosen']))}>
            <p className={styles.menuItemText}>{t(TranslationKey['Not chosen'])}</p>
          </button>

          {items.map((item, index) => (
            <button key={index} className={styles.menuItem} onClick={() => handleChangeSelectedItem(item.name)}>
              <p className={styles.menuItemText}>{item.name}</p>
              {withFaworites && (
                <RatingStarIcon
                  className={cx(styles.starIcon, {
                    [styles.starIconFavorite]: checkIsFavoriteSelectedItem(item.name),
                  })}
                />
              )}
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
})
