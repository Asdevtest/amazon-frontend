import React from 'react'

import { Checkbox } from '@components/shared/checkbox'
import { Field } from '@components/shared/field/field'

import { useStyles } from './checkbox-cell.style'

interface CheckboxCellProps {
  checked: boolean
  disabled?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  label: string
  tooltipInfoContent?: string
  labelClasses?: string
  containerClasses?: string
}

const CheckboxCell: React.FC<CheckboxCellProps> = ({
  checked,
  disabled = false,
  onChange,
  label,
  tooltipInfoContent,
  labelClasses,
  containerClasses,
}) => {
  const { classes: styles, cx } = useStyles()

  return (
    <Checkbox color="primary" checked={checked} disabled={disabled} onChange={e => onChange(e)}>
      <Field
        tooltipInfoContent={tooltipInfoContent}
        label={label}
        inputClasses={styles.hidden}
        labelClasses={cx(styles.label, labelClasses)}
        containerClasses={cx(styles.labelWrapper, containerClasses)}
      />
    </Checkbox>
  )
}

export default CheckboxCell
