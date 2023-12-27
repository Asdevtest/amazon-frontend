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

  const noSelectedRows = !selectedRows?.length

  return (
    <div className={styles.root}>
      <div className={styles.buttonsWrapper}>
        <Button disabled={noSelectedRows} variant="contained" onClick={onSubmitMoveToInventoryGoods}>
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
