/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'

import { Chip } from '@mui/material'

import { trimBarcode } from '@utils/text'

import { useStyles } from './change-chip-cell.style'

interface ChangeChipCellProps {
  row?: any
  value?: string
  onClickChip: (row?: any) => void
  onDoubleClickChip?: (row?: any) => void
  onDeleteChip?: (row?: any) => void
  text?: string
  disabled?: boolean
  label?: string
  isChipOutTable?: boolean
}

export const ChangeChipCell: FC<ChangeChipCellProps> = React.memo(props => {
  const { classes: styles, cx } = useStyles()
  const { row, value, onClickChip, onDoubleClickChip, onDeleteChip, text, disabled, label, isChipOutTable } = props

  return (
    <>
      {label ? <p className={styles.changeChipCellLabel}>{label}</p> : null}
      <Chip
        disabled={disabled}
        classes={{
          root: cx(styles.barcodeChip, { [styles.barcodeChipOutTable]: isChipOutTable }),
          clickable: styles.barcodeChipHover,
          deletable: styles.barcodeChipHover,
          deleteIcon: styles.barcodeChipIcon,
        }}
        className={cx(styles.chipStock, { [styles.barcodeChipNoExists]: !value })}
        size="small"
        label={value ? trimBarcode(value) : text}
        onClick={e => {
          e.stopPropagation()

          onClickChip(row)
        }}
        onDoubleClick={e => {
          e.stopPropagation()
          !!onDoubleClickChip && onDoubleClickChip(row)
        }}
        onDelete={
          !value
            ? undefined
            : e => {
                e.stopPropagation()
                !!onDeleteChip && onDeleteChip(row)
              }
        }
      />
    </>
  )
})
