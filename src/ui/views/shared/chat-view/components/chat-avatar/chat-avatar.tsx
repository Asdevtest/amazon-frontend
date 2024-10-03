import { Avatar } from 'antd'
import { FC, memo } from 'react'

import { FavoritesIcon } from '@components/shared/svg-icons/favorites-icon/favorites-icon'

import { useStyles } from './chat-avatar.styles'

interface ChatAvatarProps {
  avatarSrc: string
  isFavoritesChat: boolean
  size?: number
}

export const ChatAvatar: FC<ChatAvatarProps> = memo(props => {
  const { classes: styles, cx } = useStyles()

  const { isFavoritesChat, avatarSrc, size = 48 } = props

  const defaultStyles = { height: size, minWidth: size }

  return (
    <>
      {isFavoritesChat ? (
        <FavoritesIcon style={defaultStyles} className={cx(styles.favoritesIcon, styles.avatar)} />
      ) : (
        <Avatar shape="circle" style={defaultStyles} src={avatarSrc} className={styles.avatar} />
      )}
    </>
  )
})
