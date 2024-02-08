import { ClassNamesArg } from '@emotion/react'
import { FC, ReactNode } from 'react'

import { Typography } from '@mui/material'
import { CSSProperties } from '@mui/styles'

import { useStyles } from './label-value-pair-block.style'

interface Props {
  bgColor?: 'white' | 'green' | 'yellow'
  label: string | undefined
  value: string | undefined | ReactNode
  labelClasses?: ClassNamesArg | undefined
  rootClasses?: ClassNamesArg | undefined
  valueStyle?: CSSProperties
}

export const LabelValuePairBlock: FC<Props> = ({ bgColor, label, value, labelClasses, rootClasses, valueStyle }) => {
  const { classes: styles, cx } = useStyles()
  return (
    <div
      className={cx(
        styles.root,
        { [styles.rootGreen]: bgColor === 'green' },
        { [styles.rootYellow]: bgColor === 'yellow' },
        rootClasses,
      )}
    >
      {label && <Typography className={cx(styles.labelText, labelClasses)}>{label}</Typography>}

      {typeof value === 'string' ? (
        <Typography style={valueStyle} className={styles.valueText}>
          {value}
        </Typography>
      ) : (
        value
      )}
    </div>
  )
}
