import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { useStyles as useSharedStyles } from '../column-menu.style'

import { ColumnMenuProps } from '../column-menu.type'
import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useStringColumnMenu } from './hooks/use-string-column-menu'

interface StringColumnMenuProps extends ColumnMenuProps<string> {
  isShowFullText: boolean
  transformValueMethod: (value: string) => string
}

export const StringColumnMenu: FC<StringColumnMenuProps> = memo(props => {
  const { classes: sharedStyles, cx } = useSharedStyles()

  const {
    field,
    table,
    filtersData,
    filterRequestStatus,
    isShowFullText,
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
    transformValueMethod,
    onClickFilterBtn,
  })

  return (
    <div className={sharedStyles.columnMenuWrapper}>
      <CustomInputSearch
        allowClear
        value={searchValue}
        wrapperClassName={sharedStyles.searchInput}
        placeholder="Search by SKU, ASIN, Title, Launch type"
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
            <Checkbox
              key={index}
              checked={valueChecked}
              wrapperClassName={sharedStyles.filterWrapper}
              onClick={() => onClickItem(el)}
            >
              <p
                title={value}
                className={cx(sharedStyles.filterTitle, {
                  [sharedStyles.filterFullTitle]: isShowFullText,
                })}
              >
                {value || t(TranslationKey.Empty)}
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
