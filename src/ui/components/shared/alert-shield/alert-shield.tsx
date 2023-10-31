import { ClassNamesArg, cx } from '@emotion/css'
import { FC, memo } from 'react'

import Alert from '@mui/material/Alert'

import { useClassNames } from './alert-shield.style'

interface AlertShieldProps {
  acceptMessage?: string
  showAcceptMessage?: boolean
  alertShieldWrapperStyle?: ClassNamesArg
}

export const AlertShield: FC<AlertShieldProps> = memo(props => {
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
