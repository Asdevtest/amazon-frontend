import {cx} from '@emotion/css'
import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement, useEffect, useState} from 'react'

import {observer} from 'mobx-react'

import {SettingsModel} from '@models/settings-model'

import {useClassNames} from './button.style'
import {StyledButton} from './styled-button'

enum tooltipPositions {
  Corner = 'corner',
  Center = 'center',
}

interface Props {
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  tooltipPosition?: tooltipPositions.Center | tooltipPositions.Corner
  variant?: string
  color?: string
  success?: boolean
  danger?: boolean
  className: string
  disabled?: boolean
  onClick?: () => void
  disableElevation?: boolean
  btnWrapperStyle?: string
  children?: string
}

export const Button: FC<Props> = observer(
  ({
    tooltipAttentionContent,
    tooltipInfoContent,
    tooltipPosition,
    variant,
    color,
    children,
    success,
    danger,
    className,
    disabled,
    btnWrapperStyle,
    ...restProps
  }) => {
    const {classes: classNames} = useClassNames()

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={cx(classNames.btnWrapper, btnWrapperStyle)}>
        <StyledButton
          disableElevation
          color={color || 'primary'}
          disabled={disabled}
          variant={variant || 'contained'}
          // className={cx(classNames.root, className, {
          //   [classNames.success]: success,
          //   [classNames.danger]: danger,
          //   [classNames.disabled]: disabled,
          // })}
          classes={{
            root: cx(
              classNames.root,
              {
                [classNames.success]: success,
                [classNames.danger]: danger,
                [classNames.disabled]: disabled,

                // [classNames.text]: variant === 'text',
              },
              className,
            ),

            // text: classNames.text,
          }}
          {...restProps}
        >
          {children}
        </StyledButton>
        {tooltipAttentionContent || tooltipInfoContent ? (
          <div className={tooltipPosition === 'center' ? classNames.tooltipsCenterWrapper : classNames.tooltipsWrapper}>
            {tooltipAttentionContent ? (
              <Tooltip arrow title={tooltipAttentionContent} placement="top-end">
                <img className={classNames.tooltip} src="/assets/icons/attention.svg" />
              </Tooltip>
            ) : null}

            {tooltipInfoContent && showHints ? (
              <Tooltip arrow title={tooltipInfoContent} placement="top-end">
                <img className={cx(classNames.tooltip, classNames.tooltipInfo)} src="/assets/icons/info-q.svg" />
              </Tooltip>
            ) : null}
          </div>
        ) : null}
      </div>
    )
  },
)

// export const Button = withStyles(ButtonRaw, styles)
