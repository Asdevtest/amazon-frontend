import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './controll-buttons.style'

interface СontrollButtonsProps {
  selectedRows: string[]
  onClickMoveGoodsToInventory: () => void
  onClickBindStockGoodsToInventoryBtn: () => void
  onClickDeleteBtn: () => void
}

export const ControllButtons: FC<СontrollButtonsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { selectedRows, onClickMoveGoodsToInventory, onClickBindStockGoodsToInventoryBtn, onClickDeleteBtn } = props

  const noSelectedRows = !selectedRows?.length

  return (
    <div className={styles.root}>
      <div className={styles.buttonsWrapper}>
        <Button disabled={noSelectedRows} variant="contained" onClick={onClickMoveGoodsToInventory}>
          {t(TranslationKey['Move to inventory'])}
        </Button>

        <Button disabled={noSelectedRows} variant="contained" onClick={onClickBindStockGoodsToInventoryBtn}>
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
