import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './controll-buttons.style'

import { tabsValues } from '../helpers/tabs-value'

interface СontrollButtonsProps {
  selectedRows: string[]
  currentTabKey: tabsValues
  onClickMoveGoodsToInventory: () => void
  onClickBindStockGoodsToInventory: () => void
  onClickDeleteBtn: () => void
}

export const ControllButtons: FC<СontrollButtonsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const {
    selectedRows,
    currentTabKey,
    onClickMoveGoodsToInventory,
    onClickBindStockGoodsToInventory,
    onClickDeleteBtn,
  } = props

  const noSelectedRows = !selectedRows?.length
  const disableButton = currentTabKey !== tabsValues.STOCK_REPORT || noSelectedRows

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
