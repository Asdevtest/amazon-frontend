import { CSSProperties, FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { MAX_LENGTH_TITLE } from '@constants/text'

import { checkIsString } from '@utils/checks'
import { getShortenStringIfLongerThanCount } from '@utils/text'

import { useStyles } from './multiline-text-cell.style'

interface MultilineTextCellProps {
  text?: string
  noText?: string
  color?: CSSProperties | string
  withTooltip?: boolean
  leftAlign?: boolean
  tooltipText?: string
  withLineBreaks?: boolean
  oneLines?: boolean
  twoLines?: boolean
  threeLines?: boolean
  illuminationCell?: boolean
  customTextStyles?: CSSProperties
  maxLength?: number
  customTextClass?: string
  link?: boolean
  startIcon?: JSX.Element | null
  endIcon?: JSX.Element | null
  onClickText?: () => void
}

export const MultilineTextCell: FC<MultilineTextCellProps> = memo(props => {
  const { classes: styles, cx } = useStyles()
  const {
    text = '',
    noText,
    color,
    withTooltip,
    leftAlign,
    tooltipText,
    withLineBreaks,
    onClickText,
    oneLines,
    twoLines,
    threeLines,
    illuminationCell,
    customTextStyles,
    maxLength,
    customTextClass,
    link,
    startIcon,
    endIcon,
  } = props

  const maxTextLength = maxLength ?? MAX_LENGTH_TITLE
  const isValidTextLength = text?.length <= maxTextLength
  const oneLineText =
    isValidTextLength || oneLines ? text : getShortenStringIfLongerThanCount(text, maxLength ?? maxTextLength)
  const textForRender = threeLines || twoLines ? text : oneLineText
  const isTooltip = withTooltip || tooltipText || !isValidTextLength

  return (
    <div
      className={cx(styles.multilineTextWrapper, {
        [styles.illuminationCell]: illuminationCell && textForRender,
      })}
    >
      {startIcon ? startIcon : null}

      <Tooltip title={isTooltip ? tooltipText || text : ''}>
        <p
          className={cx(
            styles.multilineText,
            { [styles.multilineLeftAlignText]: leftAlign },
            { [styles.multilineLink]: link },
            { [styles.oneMultilineText]: oneLines },
            { [styles.twoMultilineText]: twoLines },
            { [styles.threeMultilineText]: threeLines },
            customTextClass,
          )}
          // @ts-ignore
          style={customTextStyles || (color && { color })}
          onClick={onClickText && onClickText}
        >
          {checkIsString(textForRender) && !withLineBreaks
            ? textForRender.replace(/\n/g, ' ')
            : textForRender || noText || '0'}
        </p>
      </Tooltip>

      {endIcon ? endIcon : null}
    </div>
  )
})
