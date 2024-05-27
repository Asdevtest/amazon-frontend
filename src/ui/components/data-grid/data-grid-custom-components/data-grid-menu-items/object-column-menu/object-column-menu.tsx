/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { Checkbox } from '@components/shared/checkbox'
import { SearchInput } from '@components/shared/search-input'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './object-column-menu.style'

import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useObjectColumnMenu } from './hooks/use-object-column-menu'

interface IObjectColumnMenuProps {
  field: string
  table: string
  filtersData: any
  filterRequestStatus: loadingStatus
  onClose: () => void
  onClickFilterBtn: (field: string, table: string) => void
  onChangeFullFieldMenuItem: (chosenItems: any[], field: string) => void
  onClickAccept: () => void
  hideEmptyObject?: boolean
}

export const ObjectColumnMenu: FC<IObjectColumnMenuProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    field,
    table,
    filtersData,
    filterRequestStatus,
    hideEmptyObject,
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
    currentColumn: field,
    table,
    filtersData,
    hideEmptyObject,
    onClickFilterBtn,
  })

  return (
    <div className={styles.columnMenuWrapper}>
      <SearchInput
        value={nameSearchValue}
        inputClasses={styles.searchInput}
        onChange={e => setNameSearchValue(e.target.value)}
      />

      <DataWrapperColumnMenu
        dataforRender={dataforRender}
        filterRequestStatus={filterRequestStatus}
        chosenItems={chosenItems}
        setChosenItems={setChosenItems}
      >
        {dataforRender
          ?.filter(el => el)
          ?.map((el, index) => {
            const value = 'name' in el ? el?.name : 'title' in el ? el?.title : ''
            const valueChecked = chosenItems?.some(item => item?._id === el?._id)

            return (
              <Checkbox key={index} checked={valueChecked} onClick={() => onClickItem(el)}>
                <p title={value as string} className={styles.filterTitle}>
                  {value as string}
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
