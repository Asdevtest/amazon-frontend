import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Checkbox } from '@components/shared/checkbox'
import { Input } from '@components/shared/input'
import { RadioButtons } from '@components/shared/radio-buttons'
import { IRadioBottonsSetting } from '@components/shared/radio-buttons/radio-buttons'
import { SearchInput } from '@components/shared/search-input'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './number-column-menu.style'

import { ControlButtonsColumnMenu } from '../control-buttons-column-menu'
import { DataWrapperColumnMenu } from '../data-wrapper-column-menu'

export const NumberColumnMenu: FC<any> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    fields,
    filtersData,
    table,
    filterRequestStatus,
    onClose,
    onClickFilterBtn,
    onChangeFullFieldMenuItem,
    onClickAccept,
  } = props

  return (
    <div className={styles.columnMenuWrapper}>
      <div className={styles.radioButtonsWrapper}>
        <RadioButtons
          verticalDirection
          radioBottonsSettings={fields}
          currentValue={currentField}
          onClickRadioButton={selectedStatus => handleSelectField(selectedStatus as string)}
        />
      </div>

      <div className={styles.inputsWrapper}>
        <Input
          title={t(TranslationKey.From)}
          className={styles.input}
          classes={{ input: styles.inputInnerSpace }}
          placeholder={t(TranslationKey.From)}
          value={fromSearchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setFromSearchValue(e.target.value)}
        />
        <Input
          title={t(TranslationKey.To)}
          className={styles.input}
          classes={{ input: styles.inputInnerSpace }}
          placeholder={t(TranslationKey.To)}
          value={toSearchValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setToSearchValue(e.target.value)}
        />
      </div>

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
        {dataforRender?.map((el, index) => {
          const value = isWholeNumber ? el : toFixed(el)
          const valueChecked = chosenItems?.some(item => item === el)

          return (
            <Checkbox key={index} checked={valueChecked} onClick={() => onClickItem(el)}>
              <p title={value} className={styles.filterTitle}>
                {value}
              </p>
            </Checkbox>
          )
        })}
      </DataWrapperColumnMenu>

      <ControlButtonsColumnMenu
        onClose={onClose}
        onChangeFullFieldMenuItem={() => onChangeFullFieldMenuItem(chosenItems, currentField)}
        onClickAccept={onClickAccept}
      />
    </div>
  )
})
