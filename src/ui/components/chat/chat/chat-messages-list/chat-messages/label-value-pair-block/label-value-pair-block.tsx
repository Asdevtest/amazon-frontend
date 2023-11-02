import { cx } from '@emotion/css'
import { ClassNamesArg } from '@emotion/react'
import { FC, ReactNode } from 'react'

import { Typography } from '@mui/material'
import { CSSProperties } from '@mui/styles'

import { useClassNames } from './label-value-pair-block.style'

interface Props {
  bgColor?: 'white' | 'green' | 'yellow'
  label: string | undefined
  value: string | undefined | ReactNode
  labelClasses?: ClassNamesArg | undefined
  rootClasses?: ClassNamesArg | undefined
  valueStyle?: CSSProperties
}

export const LabelValuePairBlock: FC<Props> = ({ bgColor, label, value, labelClasses, rootClasses, valueStyle }) => {
  const { classes: classNames } = useClassNames()
  return (
    <div
      className={cx(
        classNames.root,
        { [classNames.rootGreen]: bgColor === 'green' },
        { [classNames.rootYellow]: bgColor === 'yellow' },
        rootClasses,
      )}
    >
      {label && <Typography className={cx(classNames.labelText, labelClasses)}>{label}</Typography>}

      {typeof value === 'string' ? (
        <Typography style={valueStyle} className={classNames.valueText}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </div>
  )
}
