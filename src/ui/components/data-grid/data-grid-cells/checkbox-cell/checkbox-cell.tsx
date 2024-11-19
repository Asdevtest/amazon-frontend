import { FC, memo } from 'react'

import { CustomCheckbox } from '@components/shared/custom-checkbox'

import { useStyles } from './checkbox-cell.style'

interface CheckboxCellProps {
  checked: boolean
  disabled?: boolean
  onClick?: VoidFunction
}

export const CheckboxCell: FC<CheckboxCellProps> = memo(({ checked, disabled, onClick }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.root}>
      <CustomCheckbox
        disabled={disabled}
        checked={checked}
        onChange={e => {
          e.stopPropagation()
          onClick?.()
        }}
      />
    </div>
  )
})
