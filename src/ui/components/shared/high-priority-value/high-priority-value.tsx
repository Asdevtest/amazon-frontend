import { FC, memo } from 'react'

import { useStyles } from './high-priority-value.style'

interface HighPriorityValueProps {
  value: string | number
}

export const HighPriorityValue: FC<HighPriorityValueProps> = memo(({ value }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.body}>
      <p className={styles.value}>{value}</p>
      <img src="/assets/icons/fire.svg" />
    </div>
  )
})
