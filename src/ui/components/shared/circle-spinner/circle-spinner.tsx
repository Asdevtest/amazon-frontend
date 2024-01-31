import { FC, memo } from 'react'

import { useStyles } from './circle-spinner.style'

interface CircleSpinnerProps {
  size?: number
}

export const CircleSpinner: FC<CircleSpinnerProps> = memo(({ size }) => {
  const { classes: styles } = useStyles()

  const validSize = size ? `${size}px` : '100%'

  return (
    <div style={{ width: validSize, height: validSize }} className={styles.spinner}>
      <div></div>
      <div></div>
    </div>
  )
})
