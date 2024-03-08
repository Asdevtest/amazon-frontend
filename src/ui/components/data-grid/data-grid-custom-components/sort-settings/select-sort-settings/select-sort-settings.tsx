import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { IItem, useSelect } from '@hooks/use-select'

import { useStyles } from './select-sort-settings.style'

interface SelectSortSettingsProps {
  customSortFields: IItem[]
  onClickField: (field?: string) => void
  sortField?: string
}

export const SelectSortSettings: FC<SelectSortSettingsProps> = memo(({ sortField, customSortFields, onClickField }) => {
  const { classes: styles, cx } = useStyles()

  const currentName = customSortFields?.find(field => field?._id === sortField)?.name

  const { selectRef, isOpen, onToggleSelect, selectedItemName, filteredItems, searchValue, setSearchValue } = useSelect(
    customSortFields,
    currentName,
  )

  return (
    <div ref={selectRef} className={styles.root}>
      <Button styleType={ButtonStyle.DEFAULT} className={styles.mainButton} onClick={onToggleSelect}>
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
              onClick={() => {
                onClickField(item._id)
                onToggleSelect()
              }}
            >
              {item.name}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
})
