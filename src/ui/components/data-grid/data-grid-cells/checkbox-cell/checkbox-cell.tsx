import React, { FC } from 'react'

import { Checkbox } from '@mui/material'

import { useStyles } from './checkbox-cell.style'

interface CheckboxCellProps {
  checked: boolean
  disabled: boolean
  onClick: VoidFunction
}

export const CheckboxCell: FC<CheckboxCellProps> = React.memo(({ checked, disabled, onClick }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.checkboxWrapper}>
      <Checkbox
        disabled={disabled}
        checked={checked}
        onClick={e => {
          e.stopPropagation()
          onClick()
        }}
      />
    </div>
  )
})
