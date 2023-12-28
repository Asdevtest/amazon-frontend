import { FC, memo } from 'react'

import { useStyles } from './switch.style'

interface SwitchProps {
  isChecked: boolean
  onChange: () => void
}

export const Switch: FC<SwitchProps> = memo(({ isChecked = false, onChange }) => {
  const { classes: styles } = useStyles()

  return (
    <label className={styles.switch}>
      <input type="checkbox" checked={isChecked} className={styles.input} onChange={onChange} />
      <span className={styles.slider} />
    </label>
  )
})
