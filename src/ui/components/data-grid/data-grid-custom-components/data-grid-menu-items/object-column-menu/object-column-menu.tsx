/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { useStyles as useSharedStyles } from '../column-menu.style'

import { ColumnMenuProps } from '../column-menu.type'
import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useObjectColumnMenu } from './hooks/use-object-column-menu'

interface IObjectColumnMenuProps extends ColumnMenuProps<any> {
  hideEmptyObject?: boolean
  sortOptions?: string
}

export const ObjectColumnMenu: FC<IObjectColumnMenuProps> = memo(props => {
  const { classes: sharedStyles } = useSharedStyles()

  const {
    field,
    table,
    filtersData,
    filterRequestStatus,
    hideEmptyObject,
    sortOptions,
    additionalFilterSettings,
    fieldNameFilter,
    onClose,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickAccept,
  } = props

  const {
    dataforRender,
    chosenItems,
    setChosenItems,

    onClickItem,

    nameSearchValue,
    setNameSearchValue,
  } = useObjectColumnMenu({
    field,
    table,
    filtersData,
    hideEmptyObject,
    sortOptions,
    additionalFilterSettings,
    fieldNameFilter,
    onClickFilterBtn,
  })

  return (
    <div className={sharedStyles.columnMenuWrapper}>
      <CustomInputSearch
        allowClear
        placeholder="Search"
        value={nameSearchValue}
        wrapperClassName={sharedStyles.searchInput}
        onChange={e => setNameSearchValue(e.target.value)}
      />

      <DataWrapperColumnMenu
        dataforRender={dataforRender}
        filterRequestStatus={filterRequestStatus}
        chosenItems={chosenItems}
        setChosenItems={setChosenItems}
      >
        {dataforRender?.map((el, index) => {
          const value = 'name' in el ? el?.name : 'title' in el ? el?.title : ''
          const valueChecked = chosenItems?.some(item => item?._id === el?._id)

          return (
            <div key={index} className={sharedStyles.filterWrapper}>
              <CustomCheckbox key={index} checked={valueChecked} onChange={() => onClickItem(el)} />
              <p title={value as string} className={sharedStyles.filterTitle}>
                {value as string}
              </p>
            </div>
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
