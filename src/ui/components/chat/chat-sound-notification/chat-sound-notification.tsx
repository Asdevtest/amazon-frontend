import { FC } from 'react'

import { SoundOffIcon, SoundOnIcon } from '@components/shared/svg-icons'

import { useStyles } from './chat-sound-notification.style'

interface Props {
  isMuteChat: boolean
  onToggleMuteChat?: () => void
}

export const ChatSoundNotification: FC<Props> = props => {
  const { classes: styles } = useStyles()

  const { isMuteChat, onToggleMuteChat } = props

  return isMuteChat ? (
    <SoundOffIcon className={styles.soundOffIcon} onClick={onToggleMuteChat} />
  ) : (
    <SoundOnIcon className={styles.soundOnIcon} onClick={onToggleMuteChat} />
  )
}
