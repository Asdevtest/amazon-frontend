import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {FC} from 'react'

import {useClassNames} from './label-value-pair-block.style'

interface Props {
  bgColor?: 'white' | 'green' | 'yellow'
  label: string
  value: string | undefined | React.ReactNode
}

export const LabelValuePairBlock: FC<Props> = ({bgColor, label, value}) => {
  const {classes: classNames} = useClassNames()
  return (
    <div
      className={cx(
        classNames.root,
        {[classNames.rootGreen]: bgColor === 'green'},
        {[classNames.rootYellow]: bgColor === 'yellow'},
      )}
    >
      <div className={classNames.labelWrapper}>
        <Typography className={classNames.labelText}>{label}</Typography>
      </div>
      <div className={classNames.valueWrapper}>
        {typeof value === 'string' ? <Typography className={classNames.valueText}>{value}</Typography> : value}
      </div>
    </div>
  )
}
