import { ButtonHTMLAttributes, FC, ReactElement, memo, useContext } from 'react'

import { Tooltip } from '@mui/material'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { ButtonType, ButtonVariant, TooltipPositions } from '@typings/types/button.type'

import { useStyles } from './button.style'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  tooltipPosition?: TooltipPositions

  disabled?: boolean
  disableElevation?: boolean

  defaultButtonTooltip?: string
  startIcon?: ReactElement

  styleType?: ButtonType
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
    styleType = ButtonType.PRIMARY,
    variant = ButtonVariant.CONTAINED,
    className,
    fullWidth = false,
    ...restProps
  } = props

  const { hints } = useContext(HintsContext)

  const { classes: styles, cx } = useStyles()

  const isOutlined = variant === ButtonVariant.OUTLINED

  return (
    <button
      title={defaultButtonTooltip || ''}
      disabled={disabled}
      className={cx(styles.root, className, {
        [styles.fullWidth]: fullWidth,
        [styles.transparent]: styleType === ButtonType.TRANSPARENT,
        [styles.casual]: styleType === ButtonType.CASUAL,
        [styles.default]: styleType === ButtonType.DEFAULT,
        [styles.primary]: styleType === ButtonType.PRIMARY && !isOutlined,
        [styles.danger]: styleType === ButtonType.DANGER && !isOutlined,
        [styles.success]: styleType === ButtonType.SUCCESS && !isOutlined,
        [styles.outlinedPrimary]: styleType === ButtonType.PRIMARY && isOutlined,
        [styles.outlinedSuccess]: styleType === ButtonType.SUCCESS && isOutlined,
        [styles.outlinedDanger]: styleType === ButtonType.DANGER && isOutlined,
      })}
      {...restProps}
    >
      {children}
      {hints && (tooltipAttentionContent || tooltipInfoContent) ? (
        <div
          className={
            tooltipPosition === TooltipPositions.CENTER ? styles.tooltipsCenterWrapper : styles.tooltipsWrapper
          }
        >
          <Tooltip arrow title={tooltipAttentionContent || tooltipInfoContent}>
            <div>
              {tooltipAttentionContent ? (
                <TooltipAttention className={cx(styles.tooltip)} />
              ) : (
                <TooltipInfoIcon className={cx(styles.tooltip, styles.tooltipInfo)} />
              )}
            </div>
          </Tooltip>
        </div>
      ) : null}
    </button>
  )
})
