import { ChangeEvent, FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { Checkbox } from '@components/shared/checkbox'
import { CircleSpinner } from '@components/shared/circle-spinner'
import { Input } from '@components/shared/input'
import { RadioButtons } from '@components/shared/radio-buttons'
import { IRadioBottonsSetting } from '@components/shared/radio-buttons/radio-buttons'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './numbers-column-menu.style'

import { DataGridSelectAllFilters } from '../../data-grid-select-all-filters/data-grid-select-all-filters'

import { useNumbersColumnMenu } from './hooks/use-numbers-column-menu'

interface INumbersColumnMenuProps {
  fields: IRadioBottonsSetting[]
  filterRequestStatus: loadingStatus
  filtersData: any
  table: string
  defaultOption?: string
  onClickAccept: () => void
  onClose: () => void
  onClickFilterBtn: (field: string, table: string) => void
  onChangeFullFieldMenuItem: (chosenItems: string[], field: string) => void
}

export const NumbersColumnMenu: FC<INumbersColumnMenuProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

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

  const {
    currentField,
    setCurrentField,

    fromSearchValue,
    setFromSearchValue,

    toSearchValue,
    setToSearchValue,

    nameSearchValue,
    setNameSearchValue,
  } = useNumbersColumnMenu({ fields, table, filtersData, onClickFilterBtn })

  return (
    <div className={styles.columnMenuWrapper}>
      <div className={styles.radioButtonsWrapper}>
        <RadioButtons
          verticalDirection
          radioBottonsSettings={fields}
          currentValue={currentField}
          onClickRadioButton={selectedStatus => setCurrentField(selectedStatus as string)}
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

      <div className={styles.filterItemsWrapper}>
        {filterRequestStatus === loadingStatus.IS_LOADING ? (
          <CircleSpinner size={20} />
        ) : (
          <>
            {/* {itemsForRender?.length ? (
              <>
                <DataGridSelectAllFilters
                  choosenItems={choosenItems}
                  itemsForRender={itemsForRender}
                  setChoosenItems={setChoosenItems}
                />
                {itemsForRender?.map((el, index) => {
                  const value = isNotFixedValue ? el : toFixed(el, 2) || 0
                  const valueChecked = choosenItems?.some(item => item === el)

                  return (
                    <Checkbox key={index} checked={valueChecked} onClick={() => onClickItem(el)}>
                      <p title={value} className={styles.shopName}>
                        {value}
                      </p>
                    </Checkbox>
                  )
                })}
              </>
            ) : (
              <p className={styles.noOptionText}>{t(TranslationKey['No options'])}</p>
            )} */}
          </>
        )}
      </div>

      <div className={styles.buttonsWrapper}>
        {/* <Button
          onClick={e => {
            onClose(e)
            onChangeFullFieldMenuItem(choosenItems, currentField)
            onClickAccept()
          }}
        >
          {t(TranslationKey.Accept)}
        </Button> */}

        <Button variant={ButtonVariant.OUTLINED} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
