import Tooltip from '@mui/material/Tooltip'

import React, {FC, ReactElement, useState, useEffect} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {SettingsModel} from '@models/settings-model'

import {Input} from '@components/input'
import {InputWithIcon} from '@components/input/input'

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
  withIcon?: boolean
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
    withIcon,
    ...restProps
  }) => {
    const classNames = useClassNames()

    const [showHints, setShowHints] = useState(SettingsModel.showHints)

    useEffect(() => {
      setShowHints(SettingsModel.showHints)
    }, [SettingsModel.showHints])

    return (
      <div className={clsx(classNames.root, containerClasses, {[classNames.rootOneLine]: oneLine})}>
        <div className={classNames.labelWrapper}>
          {label ? (
            <Typography className={clsx(classNames.label, labelClasses, {[classNames.labelOneLine]: oneLine})}>
              {label}
            </Typography>
          ) : null}

          {(tooltipAttentionContent || tooltipInfoContent) && label ? (
            <div className={classNames.tooltipsWrapper}>
              {tooltipAttentionContent ? (
                <Tooltip arrow title={tooltipAttentionContent} placement="top-end">
                  <img className={classNames.tooltip} src="/assets/icons/attention.svg" />
                </Tooltip>
              ) : null}

              {tooltipInfoContent && showHints ? (
                <Tooltip arrow title={tooltipInfoContent} placement="top-end">
                  <img className={clsx(classNames.tooltip, classNames.tooltipInfo)} src="/assets/icons/info-q.svg" />
                </Tooltip>
              ) : null}
            </div>
          ) : null}
        </div>
        {inputComponent ||
          (withIcon ? (
            <InputWithIcon
              className={clsx(classNames.input, inputClasses, {[classNames.errorActive]: error})}
              {...restProps}
            />
          ) : (
            <Input className={clsx(classNames.input, inputClasses, {[classNames.errorActive]: error})} {...restProps} />
          ))}
        {error && <Typography className={classNames.errorText}>{error}</Typography>}
      </div>
    )
  },
)
