import { FC, memo } from 'react'
import { IoClose } from 'react-icons/io5'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { IFullUser } from '@typings/shared/full-user'

import { useStyles } from './chat-info-user-control.style'

import { ChatAvatar } from '../chat-avatar'

interface ChatInfoUserControlProps {
  user: IFullUser
  isOwner: boolean
  onClickDeleteUserForGroupChat: () => void
}

export const ChatInfoUserControl: FC<ChatInfoUserControlProps> = memo(props => {
  const { user, isOwner, onClickDeleteUserForGroupChat } = props
  const { classes: styles } = useStyles()

  const avatarSrc = getUserAvatarSrc(user?._id)

  return (
    <div className={styles.userWrapper}>
      <div className={styles.userInfo}>
        <ChatAvatar avatarSrc={avatarSrc} isFavoritesChat={false} size={30} />
        <p>{`${user?.name}${isOwner ? ` (${t(TranslationKey.Owner)})` : ''}`}</p>
      </div>

      <CustomButton type="text" icon={<IoClose size={20} />} onClick={onClickDeleteUserForGroupChat} />
    </div>
  )
})
