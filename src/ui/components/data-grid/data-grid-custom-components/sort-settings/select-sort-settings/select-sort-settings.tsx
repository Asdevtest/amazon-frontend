import { FC, memo } from 'react'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import '@typings/enums/button-style'

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
      <CustomButton className={styles.mainButton} onClick={onToggleSelect}>
        {selectedItemName}
      </CustomButton>

      <div className={cx(styles.menuContainer, { [styles.menuContainerAnimation]: isOpen })}>
        <CustomInputSearch
          allowClear
          value={searchValue}
          placeholder="Search"
          wrapperClassName={styles.searchInput}
          onChange={e => setSearchValue(e.target.value)}
        />

        <div className={styles.menuItems}>
          {filteredItems.map((item, index) => (
            <CustomButton
              key={index}
              title={item.name}
              className={styles.button}
              onClick={() => {
                onClickField(item._id)
                onToggleSelect()
              }}
            >
              <p>{item.name}</p>
            </CustomButton>
          ))}
        </div>
      </div>
    </div>
  )
})
