import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'

import { t } from '@utils/translations'

import { useStyles } from './controll-buttons.style'

interface IControllButtonsProps {
  selectedRows: string[]
  onSubmitMoveToInventoryGoods: () => void
  onClickBindStockGoodsToInventoryBtn: () => void
  onClickDeleteBtn: () => void
}

export const ControllButtons: FC<IControllButtonsProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { selectedRows, onSubmitMoveToInventoryGoods, onClickBindStockGoodsToInventoryBtn, onClickDeleteBtn } = props

  return (
    <div className={styles.root}>
      <div className={styles.buttonsWrapper}>
        <Button
          tooltipInfoContent={t(
            TranslationKey['Moves selected products to the "Inventory" section with linked integration'],
          )}
          disabled={selectedRows.length === 0}
          variant="contained"
          onClick={onSubmitMoveToInventoryGoods}
        >
          {t(TranslationKey['Move to inventory'])}
        </Button>

        <Button
          tooltipInfoContent={t(
            TranslationKey['Adds integration from the report to the selected item from the inventory'],
          )}
          disabled={selectedRows.length === 0}
          variant="contained"
          onClick={onClickBindStockGoodsToInventoryBtn}
        >
          {t(TranslationKey['Bind to an item in the inventory'])}
        </Button>
      </div>

      <Button
        danger
        disabled={!selectedRows.length || selectedRows.length > 1}
        variant="contained"
        onClick={onClickDeleteBtn}
      >
        {t(TranslationKey.Remove)}
      </Button>
    </div>
  )
})
