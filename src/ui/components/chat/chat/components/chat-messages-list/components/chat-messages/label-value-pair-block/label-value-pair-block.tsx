import { ClassNamesArg } from '@emotion/react'
import { FC, ReactNode } from 'react'

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
      {label && <p className={cx(styles.labelText, labelClasses)}>{label}</p>}

      {typeof value === 'string' ? (
        <p style={valueStyle} className={styles.valueText}>
          {value}
        </p>
      ) : (
        value
      )}
    </div>
  )
}
