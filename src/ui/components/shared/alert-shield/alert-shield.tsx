/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react'
import { useClassNames } from './alert-shield.style'
import { ClassNamesArg, cx } from '@emotion/css'
import Alert from '@mui/material/Alert'

interface AlertShieldProps {
  acceptMessage?: string
  showAcceptMessage?: boolean
  alertShieldWrapperStyle?: ClassNamesArg
}

export const AlertShield: FC<AlertShieldProps> = React.memo(props => {
  const { classes: classNames } = useClassNames()

  const { acceptMessage, showAcceptMessage, alertShieldWrapperStyle, ...rest } = props

  return (
    <div
      className={cx(classNames.acceptMessageWrapper, alertShieldWrapperStyle, {
        [classNames.fadeInAnimation]: !!showAcceptMessage && !!acceptMessage,
        [classNames.fadeOutAnimation]: !showAcceptMessage && !!acceptMessage,
      })}
    >
      <Alert classes={{ root: classNames.alertRoot, icon: classNames.alertIcon }} {...rest}>
        {acceptMessage}
      </Alert>
    </div>
  )
})
