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
  onClickRepurchase?: (rowId: string, value: string | number) => void
  title?: string
  disabled?: boolean
  isNotPepurchase?: boolean
  minValue?: number
  maxValue?: number
}

export const FourMonthesStockCell: FC<FourMonthesStockCellProps> = memo(props => {
  const {
    title,
    rowId,
    value,
    fourMonthesStockValue,
    isNotPepurchase,
    minValue,
    maxValue,
    onClick,
    onClickRepurchase,
    disabled = false,
  } = props

  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{`${title || t(TranslationKey['To repurchase'])}: `} </p>
      <p
        className={styles.multilineLink}
        onClick={e => {
          e.stopPropagation()
          onClickRepurchase?.(rowId, value)
        }}
      >
        {value}
      </p>
      <ChangeInputCell
        isInteger
        isPepurchase={!isNotPepurchase}
        disabled={disabled}
        rowId={rowId}
        text={fourMonthesStockValue}
        minValue={minValue}
        maxValue={maxValue}
        onClickSubmit={onClick}
      />
    </div>
  )
})
