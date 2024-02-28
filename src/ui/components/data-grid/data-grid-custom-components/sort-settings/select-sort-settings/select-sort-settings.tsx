import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useSelect } from '@hooks/use-select'

import { useStyles } from './select-sort-settings.style'

export const SelectSortSettings = memo(({ currentSortModel, customSortFields }) => {
  const { classes: styles, cx } = useStyles()

  const currentName = customSortFields?.find(field => field?._id === currentSortModel?.field)?.name

  const { selectRef, isOpen, onToggleSelect, selectedItemName, filteredItems, searchValue, setSearchValue } = useSelect(
    customSortFields,
    currentName,
  )

  return (
    <div ref={selectRef} style={{ height: '100%', position: 'relative' }}>
      <Button styleType={ButtonStyle.DEFAULT} className={styles.root} onClick={onToggleSelect}>
        {selectedItemName}
      </Button>

      <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        <SearchInput
          value={searchValue}
          placeholder={t(TranslationKey.Search)}
          inputClasses={styles.searchInput}
          onChange={e => setSearchValue(e.target.value)}
        />

        <div className={styles.menuItems}>
          {filteredItems.map((item, index) => (
            <Button
              key={index}
              className={styles.button}
              styleType={ButtonStyle.DEFAULT}
              onClick={() => console.log(item._id)}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
})
