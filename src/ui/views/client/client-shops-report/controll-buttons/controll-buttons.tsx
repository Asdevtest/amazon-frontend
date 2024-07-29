import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'

import { t } from '@utils/translations'

import { ShopReportsTabsValues } from '@typings/enums/shop-report'

import { useStyles } from './controll-buttons.style'

interface СontrollButtonsProps {
  currentSearchValue: string
  selectedRows: string[]
  currentTabKey: ShopReportsTabsValues
  onClickMoveGoodsToInventory: () => void
  onClickBindStockGoodsToInventory: () => void
  onClickDeleteBtn: () => void
  onSearchSubmit: (value: string) => void
}

export const ControllButtons: FC<СontrollButtonsProps> = memo(props => {
  const {
    selectedRows,
    currentTabKey,
    onClickMoveGoodsToInventory,
    onClickBindStockGoodsToInventory,
    onClickDeleteBtn,
    onSearchSubmit,
  } = props

  const { classes: styles } = useStyles()

  const noSelectedRows = !selectedRows?.length
  const disableButton = currentTabKey !== ShopReportsTabsValues.STOCK_REPORT || noSelectedRows
  const disableBindButton =
    currentTabKey !== ShopReportsTabsValues.INVENTORY &&
    (currentTabKey !== ShopReportsTabsValues.STOCK_REPORT || noSelectedRows)

  return (
    <div className={styles.root}>
      <div className={styles.buttonsWrapper}>
        <CustomButton size="large" type="primary" disabled={disableButton} onClick={onClickMoveGoodsToInventory}>
          {t(TranslationKey['Move to inventory'])}
        </CustomButton>
        <CustomButton
          size="large"
          type="primary"
          disabled={disableBindButton}
          onClick={onClickBindStockGoodsToInventory}
        >
          {t(TranslationKey['Inventory integration'])}
        </CustomButton>
      </div>

      <CustomInputSearch
        enterButton
        allowClear
        size="large"
        placeholder="Search by SKU, ASIN, Title"
        onSearch={onSearchSubmit}
      />

      <CustomButton
        danger
        size="large"
        type="primary"
        disabled={noSelectedRows || selectedRows.length > 1}
        onClick={onClickDeleteBtn}
      >
        {t(TranslationKey.Remove)}
      </CustomButton>
    </div>
  )
})
