import { FC } from 'react'

import { SoundOffIcon, SoundOnIcon } from '@components/shared/svg-icons'

import { useClassNames } from './chat-sound-notification.styles'

interface Props {
  isMuteChat: boolean
  onToggleMuteChat: () => void
}

export const ChatSoundNotification: FC<Props> = props => {
  const { classes: classNames } = useClassNames()

  const { isMuteChat, onToggleMuteChat } = props

  return isMuteChat ? (
    <SoundOffIcon className={classNames.soundOffIcon} onClick={onToggleMuteChat} />
  ) : (
    <SoundOnIcon className={classNames.soundOnIcon} onClick={onToggleMuteChat} />
  )
}
