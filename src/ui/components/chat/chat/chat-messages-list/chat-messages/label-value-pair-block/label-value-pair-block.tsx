import { cx } from '@emotion/css'
import { ClassNamesArg } from '@emotion/react'
import { FC, ReactNode } from 'react'

import { Typography } from '@mui/material'

import { useClassNames } from './label-value-pair-block.style'

interface Props {
  bgColor?: 'white' | 'green' | 'yellow'
  label: string | undefined
  value: string | undefined | ReactNode
  labelClasses?: ClassNamesArg | undefined
  rootClasses?: ClassNamesArg | undefined
}

export const LabelValuePairBlock: FC<Props> = ({ bgColor, label, value, labelClasses, rootClasses }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div
      className={cx(
        classNames.root,
        rootClasses,
        { [classNames.rootGreen]: bgColor === 'green' },
        { [classNames.rootYellow]: bgColor === 'yellow' },
      )}
    >
      {label && <Typography className={cx(classNames.labelText, labelClasses)}>{label}</Typography>}

      <div>{typeof value === 'string' ? <Typography className={classNames.valueText}>{value}</Typography> : value}</div>
    </div>
  )
}
