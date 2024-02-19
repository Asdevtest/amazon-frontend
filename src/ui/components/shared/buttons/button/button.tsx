/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren, ReactElement, memo, useContext } from 'react'

import { Tooltip } from '@mui/material'

import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { ButtonType, ButtonVariant, TooltipPositions } from '@typings/types/button.type'

import { useStyles } from './button.style'

interface Props extends PropsWithChildren {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  tooltipPosition?: TooltipPositions

  disabled?: boolean
  onClick?: (target?: any) => void
  disableElevation?: boolean

  defaultButtonTooltip?: string
  startIcon?: ReactElement

  type?: ButtonType
  variant?: ButtonVariant
  className?: string
  fullWidth?: boolean
}

export const Button: FC<Props> = memo(props => {
  const {
    defaultButtonTooltip,
    tooltipAttentionContent,
    tooltipInfoContent,
    tooltipPosition,

    disabled,

    children,
    type = ButtonType.PRIMARY,
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
        [styles.transparent]: type === ButtonType.TRANSPARENT,
        [styles.casual]: type === ButtonType.CASUAL,
        [styles.default]: type === ButtonType.DEFAULT,
        [styles.primary]: type === ButtonType.PRIMARY && !isOutlined,
        [styles.danger]: type === ButtonType.DANGER && !isOutlined,
        [styles.success]: type === ButtonType.SUCCESS && !isOutlined,
        [styles.outlinedPrimary]: type === ButtonType.PRIMARY && isOutlined,
        [styles.outlinedSuccess]: type === ButtonType.SUCCESS && isOutlined,
        [styles.outlinedDanger]: type === ButtonType.DANGER && isOutlined,
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
