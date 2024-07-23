/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles as useSharedStyles } from '../column-menu.style'

import { ColumnMenuProps } from '../column-menu.type'
import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useObjectColumnMenu } from './hooks/use-object-column-menu'

interface IObjectColumnMenuProps extends ColumnMenuProps<any> {
  hideEmptyObject?: boolean
}

export const ObjectColumnMenu: FC<IObjectColumnMenuProps> = memo(props => {
  const { classes: sharedStyles } = useSharedStyles()

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
    field,
    table,
    filtersData,
    hideEmptyObject,
    onClickFilterBtn,
  })

  return (
    <div className={sharedStyles.columnMenuWrapper}>
      <CustomInputSearch
        allowClear
        placeholder={t(TranslationKey.Search)}
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
            <Checkbox key={index} checked={valueChecked} onClick={() => onClickItem(el)}>
              <p title={value as string} className={sharedStyles.filterTitle}>
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
