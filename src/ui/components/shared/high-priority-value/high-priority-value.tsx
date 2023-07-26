import React, { FC } from 'react'

import { Typography } from '@mui/material'

import { useClassNames } from './high-priority-value.style'

interface HighPriorityValueProps {
  value: string | number
}

export const HighPriorityValue: FC<HighPriorityValueProps> = props => {
  const { value } = props
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.body}>
      <Typography className={classNames.value}>{value}</Typography>
      <img src="/assets/icons/fire.svg" />
    </div>
  )
}
