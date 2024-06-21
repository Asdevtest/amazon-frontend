import { ChangeEvent, FC, memo } from 'react'

import { useStyles } from './switch.style'

interface SwitchProps {
  isChecked: boolean
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const Switch: FC<SwitchProps> = memo(props => {
  const { isChecked = false, onChange, disabled = false } = props

  const { classes: styles, cx } = useStyles()

  return (
    <label className={styles.switch}>
      <input type="checkbox" disabled={disabled} checked={isChecked} className={styles.input} onChange={onChange} />
      <span className={cx(styles.slider, { [styles.disabled]: disabled })} />
    </label>
  )
})
