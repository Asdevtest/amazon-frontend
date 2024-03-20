import { ClassNamesArg, cx } from '@emotion/css'
import { FC, memo } from 'react'

import Alert from '@mui/material/Alert'

import { useStyles } from './alert-shield.style'

interface AlertShieldProps {
  acceptMessage?: string
  showAcceptMessage?: boolean
  alertShieldWrapperStyle?: ClassNamesArg
  error?: boolean
}

export const AlertShield: FC<AlertShieldProps> = memo(props => {
  const { classes: styles } = useStyles()

  const { acceptMessage, showAcceptMessage, alertShieldWrapperStyle, error = false, ...rest } = props

  return (
    <div
      className={cx(styles.acceptMessageWrapper, alertShieldWrapperStyle, {
        [styles.fadeInAnimation]: !!showAcceptMessage && !!acceptMessage,
        [styles.fadeOutAnimation]: !showAcceptMessage && !!acceptMessage,
      })}
    >
      <Alert
        severity={error ? 'error' : 'success'}
        classes={{ root: styles.alertRoot, icon: styles.alertIcon }}
        {...rest}
      >
        {acceptMessage}
      </Alert>
    </div>
  )
})
