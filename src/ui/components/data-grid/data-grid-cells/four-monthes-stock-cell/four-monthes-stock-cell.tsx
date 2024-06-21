import { ChangeInputCell } from '..'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './four-monthes-stock-cell.style'

interface FourMonthesStockCellProps {
  rowId: string
  value: string
  fourMonthesStockValue: string
  onClick: (rowId: string, value: string | number) => void
  title?: string
  disabled?: boolean
  isNotPepurchase?: boolean
}

export const FourMonthesStockCell: FC<FourMonthesStockCellProps> = memo(props => {
  const { title, rowId, value, fourMonthesStockValue, isNotPepurchase, onClick, disabled = false } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{`${title || t(TranslationKey['To repurchase'])}: ${value}`}</p>

      <ChangeInputCell
        isInteger
        isPepurchase={!isNotPepurchase}
        disabled={disabled}
        rowId={rowId}
        text={fourMonthesStockValue}
        onClickSubmit={onClick}
      />
    </div>
  )
})
