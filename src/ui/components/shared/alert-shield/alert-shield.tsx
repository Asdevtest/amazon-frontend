import { ClassNamesArg, cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { FC } from 'react'

import Alert from '@mui/material/Alert'

import { useClassNames } from './alert-shield.style'

interface AlertShieldProps {
  acceptMessage?: string
  showAcceptMessage?: boolean
  alertShieldWrapperStyle?: ClassNamesArg
  error?: boolean
}

export const AlertShield: FC<AlertShieldProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { acceptMessage, showAcceptMessage, alertShieldWrapperStyle, error = false, ...rest } = props

  return (
    <div
      className={cx(classNames.acceptMessageWrapper, alertShieldWrapperStyle, {
        [classNames.fadeInAnimation]: !!showAcceptMessage && !!acceptMessage,
        [classNames.fadeOutAnimation]: !showAcceptMessage && !!acceptMessage,
      })}
    >
      <Alert
        severity={error ? 'error' : 'success'}
        classes={{ root: classNames.alertRoot, icon: classNames.alertIcon }}
        {...rest}
      >
        {acceptMessage}
      </Alert>
    </div>
  )
})
