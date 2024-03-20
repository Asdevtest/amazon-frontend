import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { CopyValue } from '@components/shared/copy-value'

import { checkIsString } from '@utils/checks'
import { getShortenStringIfLongerThanCount } from '@utils/text'

import { useStyles } from './multiline-text-align-left-cell.style'

interface MultilineTextAlignLeftCellProps {
  text: string
  withTooltip?: boolean
  isAsin?: boolean
  pointer?: boolean
  fourLines?: boolean
}

export const MultilineTextAlignLeftCell: FC<MultilineTextAlignLeftCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const { text, withTooltip, isAsin, pointer, fourLines } = props

  return withTooltip ? (
    <Tooltip title={text}>
      <div className={styles.multilineTextAlignLeftWrapper}>
        <p
          className={cx(
            styles.multilineTextAlignLeft,
            { [styles.cursorPointer]: pointer },
            { [styles.fourLinesTextAlignLeft]: fourLines },
          )}
        >
          {getShortenStringIfLongerThanCount(text, 150)}
        </p>
      </div>
    </Tooltip>
  ) : (
    <div className={styles.multilineTextAlignLeftWrapper}>
      {isAsin ? (
        <p className={cx(styles.multilineAsinTextAlignLeft, { [styles.fourLinesTextAlignLeft]: fourLines })}>
          {checkIsString(text) ? text.replace(/\n/g, ' ') : text}
        </p>
      ) : (
        <p
          className={cx(styles.multilineTextAlignLeft, {
            [styles.multilineTextAlignLeftSub]: isAsin,
            [styles.cursorPointer]: pointer,
            [styles.fourLinesTextAlignLeft]: fourLines,
          })}
        >
          {checkIsString(text) ? text.replace(/\n/g, ' ') : text}
        </p>
      )}
      {isAsin ? <CopyValue text={text} /> : null}
    </div>
  )
})
