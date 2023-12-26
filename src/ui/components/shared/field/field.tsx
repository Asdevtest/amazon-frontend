import { cx } from '@emotion/css'
import { ClassNamesArg } from '@emotion/react'
import { observer } from 'mobx-react'
import React, { FC, InputHTMLAttributes, ReactElement, useContext, useState } from 'react'

import { Typography } from '@mui/material'
import Tooltip from '@mui/material/Tooltip'

import { Input } from '@components/shared/input'
import { InputWithIcon } from '@components/shared/input/input'
import { TooltipAttention, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { useClassNames } from './field.style'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  containerClasses?: ClassNamesArg | undefined
  labelClasses?: ClassNamesArg | undefined
  inputClasses?: ClassNamesArg | undefined
  inputComponent?: React.ComponentType | ReactElement
  error?: string | boolean
  successText?: string
  oneLine?: boolean
  withIcon?: boolean
  inputProps?: {
    maxLength?: number
  }
  multiline?: boolean
  minRows?: number
  maxRows?: number
}

export const Field: FC<Props> = observer(
  ({
    label,
    labelClasses,
    containerClasses,
    inputClasses,
    inputComponent,
    error,
    successText,
    oneLine,
    tooltipAttentionContent,
    tooltipInfoContent,
    withIcon,

    ...restProps
  }) => {
    const { classes: classNames } = useClassNames()

    const [openInfoTooltip, setOpenInfoTooltip] = useState(false)
    const [openAttentionTooltip, setOpenAttentionTooltip] = useState(false)

    const { hints } = useContext(HintsContext)

    return (
      <div className={cx(classNames.root, { [classNames.rootOneLine]: oneLine }, containerClasses)}>
        <>
          <div className={classNames.labelWrapper}>
            {label ? (
              <Typography className={cx(classNames.label, labelClasses, { [classNames.labelOneLine]: oneLine })}>
                {label}
              </Typography>
            ) : null}

            {(tooltipAttentionContent || tooltipInfoContent) && label ? (
              <div className={classNames.tooltipsWrapper}>
                {tooltipAttentionContent ? (
                  <Tooltip
                    arrow
                    open={openAttentionTooltip}
                    title={tooltipAttentionContent}
                    placement="top-end"
                    onClose={() => setOpenAttentionTooltip(false)}
                    onOpen={() => setOpenAttentionTooltip(true)}
                  >
                    <div>
                      <TooltipAttention
                        className={cx(classNames.tooltip)}
                        onClick={() => setOpenAttentionTooltip(true)}
                      />
                    </div>
                  </Tooltip>
                ) : null}

                {tooltipInfoContent && hints ? (
                  <Tooltip
                    arrow
                    open={openInfoTooltip}
                    title={tooltipInfoContent}
                    placement="top-end"
                    onClose={() => setOpenInfoTooltip(false)}
                    onOpen={() => setOpenInfoTooltip(true)}
                  >
                    <div>
                      <TooltipInfoIcon
                        className={cx(classNames.tooltip, classNames.tooltipInfo)}
                        onClick={() => setOpenInfoTooltip(true)}
                      />
                    </div>
                  </Tooltip>
                ) : null}
              </div>
            ) : null}
          </div>
          {inputComponent ||
            (withIcon ? (
              <InputWithIcon
                className={cx(/* classNames.input,  */ inputClasses, { [classNames.errorActive]: !!error })}
                {...restProps}
              />
            ) : (
              <Input
                className={cx(/* classNames.input,  */ inputClasses, { [classNames.errorActive]: !!error })}
                {...restProps}
              />
            ))}
          {error && typeof error === 'string' && <Typography className={classNames.errorText}>{error}</Typography>}
          {successText && <Typography className={classNames.successText}>{successText}</Typography>}
        </>
      </div>
    )
  },
)
