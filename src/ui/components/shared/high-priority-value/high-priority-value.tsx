import { FC, memo } from 'react'

import { Typography } from '@mui/material'

import { useStyles } from './high-priority-value.style'

interface HighPriorityValueProps {
  value: string | number
}

export const HighPriorityValue: FC<HighPriorityValueProps> = memo(({ value }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.body}>
      <Typography className={styles.value}>{value}</Typography>
      <img src="/assets/icons/fire.svg" />
    </div>
  )
})
