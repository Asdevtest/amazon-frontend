/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { FC } from 'react'
import { useClassNames } from './alert-shield.style'
import { Alert } from '@mui/material'
import { cx } from '@emotion/css'

interface AlertShieldProps {
  acceptMessage?: string
  showAcceptMessage?: boolean
}

export const AlertShield: FC<AlertShieldProps> = React.memo(props => {
  const { classes: classNames } = useClassNames()

  const { acceptMessage, showAcceptMessage } = props

  return (
    <div
      // @ts-ignore
      className={cx(classNames.acceptMessageWrapper, {
        [classNames.fadeInAnimation]: showAcceptMessage && acceptMessage,
        [classNames.fadeOutAnimation]: !showAcceptMessage && acceptMessage,
      })}
    >
      <Alert classes={{ root: classNames.alertRoot, icon: classNames.alertIcon }} severity="success">
        {acceptMessage}
      </Alert>
    </div>
  )
})
