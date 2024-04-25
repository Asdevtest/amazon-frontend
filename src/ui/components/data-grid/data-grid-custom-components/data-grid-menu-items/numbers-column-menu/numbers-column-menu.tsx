import { memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CircleSpinner } from '@components/shared/circle-spinner'
import { Input } from '@components/shared/input'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './numbers-column-menu.style'

import { DataGridSelectAllFilters } from '../../data-grid-select-all-filters/data-grid-select-all-filters'

export const NumbersColumnMenu = memo(props => {
  const { classes: styles } = useStyles()

  const {
    fields,
    data,
    onClose,
    table,
    filterRequestStatus,
    onChangeFullFieldMenuItem,
    defaultOption,
    onClickAccept,
    onClickFilterBtn,
  } = props

  return (
    <div className={cx({ [styles.shopsDataWrapper]: !asBlock, [styles.shopsDataWrapperBlocked]: asBlock })}>
      <div className={styles.numInputsWrapper}>
        <Input
          title={t(TranslationKey.From)}
          className={styles.numInput}
          classes={{ input: styles.numInput }}
          placeholder={t(TranslationKey.From)}
          value={fromValue}
          onChange={e => inputNumberCheckHandler(e.target.value)}
        />
        <Input
          title={t(TranslationKey.To)}
          className={styles.numInput}
          classes={{ input: styles.numInput }}
          placeholder={t(TranslationKey.To)}
          value={toValue}
          onChange={e => inputNumberCheckHandler(e.target.value, true)}
        />
      </div>

      <div className={styles.searchInputWrapper}>
        <SearchInput
          inputClasses={styles.searchInput}
          placeholder={t(TranslationKey.Search)}
          onChange={e => {
            setNameSearchValue(e.target.value)
          }}
        />
      </div>
      <div className={styles.shopsWrapper}>
        <div className={styles.shopsBody}>
          {filterRequestStatus === loadingStatus.IS_LOADING ? (
            <CircleSpinner size={20} />
          ) : (
            <>
              {itemsForRender?.length ? (
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
                      <div key={index} className={styles.shop}>
                        <Checkbox color="primary" checked={valueChecked} onClick={() => onClickItem(el)} />
                        <div title={value} className={styles.shopName}>
                          {value}
                        </div>
                      </div>
                    )
                  })}
                </>
              ) : (
                <p title={t(TranslationKey['No options'])} className={styles.noOptionText}>
                  {t(TranslationKey['No options'])}
                </p>
              )}
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonsWrapper}>
        <Button
          onClick={e => {
            onClose(e)
            onChangeFullFieldMenuItem(choosenItems, field)
            onClickAccept()
          }}
        >
          {t(TranslationKey.Accept)}
        </Button>
        <Button variant={ButtonVariant.OUTLINED} onClick={onClose}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
