import { FC, memo } from 'react'

import { ShopReportsTabsValues } from '@constants/tabs/shop-report'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { useStyles } from './controll-buttons.style'

interface СontrollButtonsProps {
  currentSearchValue: string
  selectedRows: string[]
  currentTabKey: ShopReportsTabsValues
  onClickMoveGoodsToInventory: () => void
  onClickBindStockGoodsToInventory: () => void
  onClickDeleteBtn: () => void
  onChangeSearchValue: (value: string) => void
}

export const ControllButtons: FC<СontrollButtonsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    currentSearchValue,
    selectedRows,
    currentTabKey,
    onClickMoveGoodsToInventory,
    onClickBindStockGoodsToInventory,
    onClickDeleteBtn,
    onChangeSearchValue,
  } = props

  const noSelectedRows = !selectedRows?.length
  const disableButton = currentTabKey !== ShopReportsTabsValues.STOCK_REPORT || noSelectedRows

  return (
    <div className={styles.root}>
      <div className={styles.buttonsWrapper}>
        <Button disabled={disableButton} variant="contained" onClick={onClickMoveGoodsToInventory}>
          {t(TranslationKey['Move to inventory'])}
        </Button>

        <Button disabled={disableButton} variant="contained" onClick={onClickBindStockGoodsToInventory}>
          {t(TranslationKey['Bind to an item in the inventory'])}
        </Button>
      </div>

      <SearchInput
        value={currentSearchValue}
        placeholder={`${t(TranslationKey['Search by'])} ${t(TranslationKey.ASIN)}, ${t(TranslationKey.SKU)}`}
        onSubmit={onChangeSearchValue}
      />

      <Button
        danger
        disabled={noSelectedRows || selectedRows.length > 1}
        variant="contained"
        onClick={onClickDeleteBtn}
      >
        {t(TranslationKey.Remove)}
      </Button>
    </div>
  )
})
