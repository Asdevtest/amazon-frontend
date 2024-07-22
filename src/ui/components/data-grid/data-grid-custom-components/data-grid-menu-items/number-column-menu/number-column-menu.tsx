import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useStyles as useSharedStyles } from '../column-menu.style'
import { useStyles } from './number-column-menu.style'

import { ColumnMenuProps } from '../column-menu.type'
import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

import { useNumberColumnMenu } from './hooks/use-number-column-menu'

export const NumberColumnMenu: FC<ColumnMenuProps<number>> = memo(props => {
  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  const {
    field,
    table,
    filtersData,
    filterRequestStatus,
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
    onClickFilterBtn,
  })

  return (
    <div className={sharedStyles.columnMenuWrapper}>
      <div className={styles.inputsWrapper}>
        <CustomInputSearch
          allowClear
          placeholder={t(TranslationKey.From)}
          value={fromSearchValue}
          wrapperClassName={sharedStyles.searchInput}
          onChange={e => setFromSearchValue(e.target.value)}
        />

        <CustomInputSearch
          allowClear
          placeholder={t(TranslationKey.To)}
          value={toSearchValue}
          wrapperClassName={sharedStyles.searchInput}
          onChange={e => setToSearchValue(e.target.value)}
        />
      </div>

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
          const value = isWholeNumber ? el : toFixed(el)
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
