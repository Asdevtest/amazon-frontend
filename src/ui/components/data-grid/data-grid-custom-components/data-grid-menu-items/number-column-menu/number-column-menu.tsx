import { FC, memo } from 'react'

import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { toFixed } from '@utils/text'

import { useStyles as useSharedStyles } from '../column-menu.style'
import { useStyles } from './number-column-menu.style'

import { ColumnMenuProps } from '../column-menu.type'
import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useNumberColumnMenu } from './hooks/use-number-column-menu'

interface NumberColumnMenuProps extends ColumnMenuProps<number> {
  transformValueMethod: (value: number) => number
}

export const NumberColumnMenu: FC<NumberColumnMenuProps> = memo(props => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const {
    field,
    table,
    filtersData,
    filterRequestStatus,
    additionalFilterSettings,
    fieldNameFilter,
    transformValueMethod,
    onClose,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickAccept,
  } = props

  const {
    dataforRender,
    isWholeNumber,

    chosenItems,
    setChosenItems,

    fromSearchValue,
    setFromSearchValue,

    toSearchValue,
    setToSearchValue,

    nameSearchValue,
    setNameSearchValue,

    onClickItem,
  } = useNumberColumnMenu({
    field,
    table,
    filtersData,
    additionalFilterSettings,
    fieldNameFilter,
    onClickFilterBtn,
  })

  return (
    <div className={sharedStyles.columnMenuWrapper}>
      <div className={styles.inputsWrapper}>
        <CustomInputSearch
          allowClear
          placeholder="From"
          value={fromSearchValue}
          wrapperClassName={sharedStyles.searchInput}
          onChange={e => setFromSearchValue(e.target.value)}
        />

        <CustomInputSearch
          allowClear
          placeholder="To"
          value={toSearchValue}
          wrapperClassName={sharedStyles.searchInput}
          onChange={e => setToSearchValue(e.target.value)}
        />
      </div>

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
          let value

          if (transformValueMethod) {
            value = transformValueMethod(el)
          } else {
            value = isWholeNumber ? el : toFixed(el)
          }

          const valueChecked = chosenItems?.some(item => item === el)

          return (
            <div key={index} className={sharedStyles.filterWrapper}>
              <CustomCheckbox key={index} checked={valueChecked} onChange={() => onClickItem(el)} />
              <p title={value} className={sharedStyles.filterTitle}>
                {value}
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
