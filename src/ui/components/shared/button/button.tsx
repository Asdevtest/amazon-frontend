import { ButtonHTMLAttributes, FC, ReactElement, memo, useContext } from 'react'

import { Tooltip } from '@mui/material'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { ButtonStyle, ButtonVariant, TooltipPositions } from '@typings/enums/button-style'

import { useStyles } from './button.style'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipAttentionContent?: string
  tooltipInfoContent?: string
  tooltipPosition?: TooltipPositions
  defaultButtonTooltip?: string

  disabled?: boolean
  disableElevation?: boolean
  startIcon?: ReactElement

  isTableButton?: boolean
  isSmallButton?: boolean

  styleType?: ButtonStyle
  variant?: ButtonVariant
  className?: string

  fullWidth?: boolean
  iconButton?: boolean
  buttonIconSize?: number
  smallIconButton?: boolean
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
    isSmallButton = false,
    isTableButton = false,
    fullWidth = false,
    iconButton = false,
    smallIconButton = false,
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
          [styles.tableButton]: isTableButton,
          [styles.smallButton]: isSmallButton,

          [styles.iconButton]: iconButton,
          [styles.smallIconButton]: smallIconButton,

          [styles.primaryIconButton]: iconButton && styleType === ButtonStyle.PRIMARY,
          [styles.successIconButton]: iconButton && styleType === ButtonStyle.SUCCESS,
          [styles.dangerIconButton]: iconButton && styleType === ButtonStyle.DANGER,

          [styles.transparent]: styleType === ButtonStyle.TRANSPARENT,
          [styles.casual]: styleType === ButtonStyle.CASUAL,
          [styles.default]: styleType === ButtonStyle.DEFAULT,

          [styles.primary]: styleType === ButtonStyle.PRIMARY && !isOutlined,
          [styles.danger]: styleType === ButtonStyle.DANGER && !isOutlined,
          [styles.success]: styleType === ButtonStyle.SUCCESS && !isOutlined,

          [styles.outlinedPrimary]: styleType === ButtonStyle.PRIMARY && isOutlined,
          [styles.outlinedSuccess]: styleType === ButtonStyle.SUCCESS && isOutlined,
          [styles.outlinedDanger]: styleType === ButtonStyle.DANGER && isOutlined,
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
