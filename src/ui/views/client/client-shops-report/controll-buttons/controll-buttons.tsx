import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { SearchInput } from '@components/shared/search-input'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { ShopReportsTabsValues } from '@typings/enums/shop-report'

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
  const isInventoryShipments = currentTabKey === ShopReportsTabsValues.INVENTORY_SHIPMENTS

  const disableButton = currentTabKey !== ShopReportsTabsValues.STOCK_REPORT || noSelectedRows

  const disableBindButton =
    currentTabKey !== ShopReportsTabsValues.INVENTORY &&
    (currentTabKey !== ShopReportsTabsValues.STOCK_REPORT || noSelectedRows)

  return (
    <div className={styles.root}>
      <div className={styles.buttonsWrapper}>
        <Button disabled={disableButton} onClick={onClickMoveGoodsToInventory}>
          {t(TranslationKey['Move to inventory'])}
        </Button>

        <Button disabled={disableBindButton} onClick={onClickBindStockGoodsToInventory}>
          {t(TranslationKey['Inventory integration'])}
        </Button>
      </div>

      <SearchInput
        value={currentSearchValue}
        placeholder={`${t(TranslationKey['Search by'])} ${
          !isInventoryShipments ? t(TranslationKey.ASIN) + ', ' : ''
        }${t(TranslationKey.SKU)}`}
        onSubmit={onChangeSearchValue}
      />

      <Button
        styleType={ButtonStyle.DANGER}
        disabled={noSelectedRows || selectedRows.length > 1}
        onClick={onClickDeleteBtn}
      >
        {t(TranslationKey.Remove)}
      </Button>
    </div>
  )
})
