import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {Input} from '@components/input'

import {StyleClass} from '../../../typings/class-name-types'
import {useClassNames} from './field.style'

interface Props {
  label: string
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  containerClasses?: StyleClass
  labelClasses?: StyleClass
  inputClasses?: StyleClass
  inputComponent?: React.ComponentType
  error?: string
  oneLine?: boolean
}

export const Field: FC<Props> = observer(
  ({
    label,
    labelClasses,
    containerClasses,
    inputClasses,
    inputComponent,
    error,
    oneLine,
    tooltipAttentionContent,
    tooltipInfoContent,
    ...restProps
  }) => {
    const classNames = useClassNames()
    return (
      <div className={clsx(classNames.root, containerClasses, {[classNames.rootOneLine]: oneLine})}>
        <div className={classNames.labelWrapper}>
          <Typography className={clsx(classNames.label, labelClasses, {[classNames.labelOneLine]: oneLine})}>
            {label}
          </Typography>

          {(tooltipAttentionContent || tooltipInfoContent) && label ? (
            <div className={classNames.tooltipsWrapper}>
              {tooltipAttentionContent ? (
                <Tooltip arrow title={tooltipAttentionContent} placement="top-end">
                  <img className={classNames.tooltip} src="/assets/icons/attention.svg" />
                </Tooltip>
              ) : null}

              {tooltipInfoContent ? (
                <Tooltip arrow title={tooltipInfoContent} placement="top-end">
                  <img className={clsx(classNames.tooltip, classNames.tooltipInfo)} src="/assets/icons/info-q.svg" />
                </Tooltip>
              ) : null}
            </div>
          ) : null}
        </div>
        {inputComponent || (
          <Input className={clsx(classNames.input, inputClasses, {[classNames.errorActive]: error})} {...restProps} />
        )}
        {error && <Typography className={classNames.errorText}>{error}</Typography>}
      </div>
    )
  },
)
