import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {FC} from 'react'

import {useClassNames} from './label-value-pair-block.style'

interface Props {
  bgColor?: 'white' | 'green'
  label: string
  value: string | undefined | React.ReactNode
}

export const LabelValuePairBlock: FC<Props> = ({bgColor, label, value}) => {
  const {classes: classNames} = useClassNames()
  return (
    <div className={cx(classNames.root, {[classNames.rootGreen]: bgColor === 'green'})}>
      <div className={classNames.labelWrapper}>
        <Typography className={classNames.labelText}>{label}</Typography>
      </div>
      <div className={classNames.valueWrapper}>
        <Typography className={classNames.valueText}>{value}</Typography>
      </div>
    </div>
  )
}
