import { FC } from 'react'

import { SoundOffIcon, SoundOnIcon } from '@components/shared/svg-icons'

import { useClassNames } from './chat-sound-notification.styles'

interface СhatSoundNotificationProps {
  isMuteCurrentChat: boolean
  onToggleMuteCurrentChat: () => void
}

export const СhatSoundNotification: FC<СhatSoundNotificationProps> = props => {
  const { classes: classNames } = useClassNames()

  const { isMuteCurrentChat, onToggleMuteCurrentChat } = props

  return (
    <>
      {isMuteCurrentChat ? (
        <SoundOffIcon className={classNames.soundOffIcon} onClick={onToggleMuteCurrentChat} />
      ) : (
        <SoundOnIcon className={classNames.soundOnIcon} onClick={onToggleMuteCurrentChat} />
      )}
    </>
  )
}
