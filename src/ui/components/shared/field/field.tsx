import { ClassNamesArg } from '@emotion/react'
import { observer } from 'mobx-react'
import { ComponentType, FC, InputHTMLAttributes, ReactElement, useContext } from 'react'

import Tooltip from '@mui/material/Tooltip'

import { Input } from '@components/shared/input'
import { InputWithIcon } from '@components/shared/input/input'
import { TooltipAttentionIcon, TooltipInfoIcon } from '@components/shared/svg-icons'

import { HintsContext } from '@contexts/hints-context'

import { useStyles } from './field.style'

import { CopyValue } from '../copy-value'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  tooltipAttentionContent?: ReactElement | string
  tooltipInfoContent?: ReactElement | string
  containerClasses?: ClassNamesArg | undefined
  labelClasses?: ClassNamesArg | undefined
  inputClasses?: ClassNamesArg | undefined
  inputComponent?: ComponentType | ReactElement
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
  withCopy?: boolean
  classes?: {
    input?: string
    focused?: string
    error?: string
    disabled?: string
    root?: string
    multiline?: string
  }
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
    withCopy,

    ...restProps
  }) => {
    const { classes: styles, cx } = useStyles()
    const { hints } = useContext(HintsContext)

    return (
      <div className={cx(styles.root, { [styles.rootOneLine]: oneLine }, containerClasses)}>
        <div className={styles.labelWrapper}>
          {label ? <p className={cx(styles.label, labelClasses, { [styles.labelOneLine]: oneLine })}>{label}</p> : null}

          {(tooltipAttentionContent || tooltipInfoContent) && label ? (
            <div className={styles.tooltipsWrapper}>
              {tooltipAttentionContent ? (
                <div>
                  <Tooltip arrow title={tooltipAttentionContent} placement="top-end">
                    <div>
                      <TooltipAttentionIcon className={styles.tooltip} />
                    </div>
                  </Tooltip>
                </div>
              ) : null}

              {tooltipInfoContent && hints ? (
                <div>
                  <Tooltip arrow title={tooltipInfoContent} placement="top-end">
                    <div>
                      <TooltipInfoIcon className={cx(styles.tooltip, styles.tooltipInfo)} />
                    </div>
                  </Tooltip>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
        <>
          {inputComponent ||
            (withIcon ? (
              <InputWithIcon className={cx(inputClasses, { [styles.errorActive]: !!error })} {...restProps} />
            ) : (
              <div className={styles.inputWrapper}>
                <Input className={cx(inputClasses, { [styles.errorActive]: !!error })} {...restProps} />

                {withCopy && restProps.value && <CopyValue text={restProps.value as string} />}
              </div>
            ))}
        </>
        {error && typeof error === 'string' ? <p className={styles.errorText}>{error}</p> : null}
        {successText ? <p className={styles.successText}>{successText}</p> : null}
      </div>
    )
  },
)
