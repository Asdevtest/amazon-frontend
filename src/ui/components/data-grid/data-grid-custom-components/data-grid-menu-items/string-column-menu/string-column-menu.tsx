import { FC, memo } from 'react'

import { Checkbox } from '@components/shared/checkbox'
import { SearchInput } from '@components/shared/search-input'

import { useStyles as useSharedStyles } from '../column-menu.style'

import { ColumnMenuProps } from '../column-menu.type'
import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useStringColumnMenu } from './hooks/use-string-column-menu'

interface StringColumnMenuProps extends ColumnMenuProps<string> {
  transformValueMethod: (value: string) => string
}

export const StringColumnMenu: FC<StringColumnMenuProps> = memo(props => {
  const { classes: sharedStyles } = useSharedStyles()

  const {
    field,
    table,
    filtersData,
    filterRequestStatus,
    transformValueMethod,
    onClose,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickAccept,
  } = props

  const {
    chosenItems,
    setChosenItems,

    searchValue,
    setSearchValue,

    dataforRender,

    onClickItem,
  } = useStringColumnMenu({
    field,
    table,
    filtersData,
    onClickFilterBtn,
  })

  return (
    <div className={sharedStyles.columnMenuWrapper}>
      <SearchInput
        value={searchValue}
        inputClasses={sharedStyles.searchInput}
        onChange={e => setSearchValue(e.target.value)}
      />

      <DataWrapperColumnMenu
        dataforRender={dataforRender}
        filterRequestStatus={filterRequestStatus}
        chosenItems={chosenItems}
        setChosenItems={setChosenItems}
      >
        {dataforRender?.map((el, index) => {
          const value = transformValueMethod ? transformValueMethod(el) : el
          const valueChecked = chosenItems?.some(item => item === el)

          return (
            <Checkbox key={index} checked={valueChecked} onClick={() => onClickItem(el)}>
              <p title={value} className={sharedStyles.filterTitle}>
                {value}
              </p>
            </Checkbox>
          )
        })}
      </DataWrapperColumnMenu>

      <ControlButtonsColumnMenu
        onClose={onClose}
        onChangeFullFieldMenuItem={() => onChangeFullFieldMenuItem(chosenItems, field)}
        onClickAccept={onClickAccept}
      />
    </div>
  )
})
