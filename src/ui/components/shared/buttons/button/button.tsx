import { ButtonHTMLAttributes, FC, ReactElement, memo, useContext } from 'react'

import { Tooltip } from '@mui/material'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { ButtonStyle, ButtonVariant, TooltipPositions } from '@typings/enums/button-style'

import { useStyles } from './button.style'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  tooltipPosition?: TooltipPositions

  disabled?: boolean
  disableElevation?: boolean

  defaultButtonTooltip?: string
  startIcon?: ReactElement

  isTableButton?: boolean
  styleType?: ButtonStyle
  variant?: ButtonVariant
  className?: string
  fullWidth?: boolean
}

export const Button: FC<ButtonProps> = memo(props => {
  const {
    defaultButtonTooltip,
    tooltipAttentionContent,
    tooltipInfoContent,
    tooltipPosition,

    disabled,

    children,
    styleType = ButtonStyle.PRIMARY,
    variant = ButtonVariant.CONTAINED,
    className,
    isTableButton = false,
    fullWidth = false,
    ...restProps
  } = props

  const { hints } = useContext(HintsContext)

  const { classes: styles, cx } = useStyles()

  const isOutlined = variant === ButtonVariant.OUTLINED
  const isNeedTooltip = hints && !!(tooltipAttentionContent || tooltipInfoContent)
  const tooltipPositionStyle =
    isNeedTooltip && tooltipPosition === TooltipPositions.CENTER ? styles.tooltipsCenterWrapper : styles.tooltipsWrapper

  return (
    <button
      title={defaultButtonTooltip || ''}
      disabled={disabled}
      className={cx(
        styles.root,
        {
          [styles.fullWidth]: fullWidth,
          [styles.transparent]: styleType === ButtonStyle.TRANSPARENT,
          [styles.casual]: styleType === ButtonStyle.CASUAL,
          [styles.default]: styleType === ButtonStyle.DEFAULT,
          [styles.primary]: styleType === ButtonStyle.PRIMARY && !isOutlined,
          [styles.danger]: styleType === ButtonStyle.DANGER && !isOutlined,
          [styles.success]: styleType === ButtonStyle.SUCCESS && !isOutlined,
          [styles.outlinedPrimary]: styleType === ButtonStyle.PRIMARY && isOutlined,
          [styles.outlinedSuccess]: styleType === ButtonStyle.SUCCESS && isOutlined,
          [styles.outlinedDanger]: styleType === ButtonStyle.DANGER && isOutlined,
          [styles.tableButton]: isTableButton,
        },
        className,
      )}
      {...restProps}
    >
      {children}
      {isNeedTooltip ? (
        <div className={tooltipPositionStyle}>
          <Tooltip arrow title={tooltipAttentionContent || tooltipInfoContent}>
            <div>
              {tooltipAttentionContent ? (
                <TooltipAttention className={cx(styles.tooltip, { [styles.tableTooltip]: isTableButton })} />
              ) : (
                <TooltipInfoIcon
                  className={cx(styles.tooltip, styles.tooltipInfo, { [styles.tableTooltip]: isTableButton })}
                />
              )}
            </div>
          </Tooltip>
        </div>
      ) : null}
    </button>
  )
})
