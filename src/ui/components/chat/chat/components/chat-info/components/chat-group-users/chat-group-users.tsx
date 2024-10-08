import { FC, memo } from 'react'
import { MdClose } from 'react-icons/md'

import { Avatar } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './chat-group-users.style'

interface ChatGroupUsersProps {
  chat: ChatContract
  userId: string
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const ChatGroupUsers: FC<ChatGroupUsersProps> = memo(props => {
  const { chat, userId, onRemoveUsersFromGroupChat } = props
  const { classes: styles } = useStyles()

  return (
    <div className={styles.groupSettingsWrapper}>
      <div className={styles.membersWrapper}>
        {chat.users
          .slice()
          .sort((a, b) => Number(b._id === chat.info?.createdBy) - Number(a._id === chat.info?.createdBy))
          .map(el => (
            <div key={el._id} className={styles.memberWrapper}>
              <div className={styles.memberInfo}>
                <Avatar src={getUserAvatarSrc(el._id)} className={styles.avatarWrapper} />
                <p className={styles.opponentName}>{el?.name}</p>
                {el._id === chat.info?.createdBy ? (
                  <p className={styles.ownerSign}>{`(${t(TranslationKey.Owner)})`}</p>
                ) : null}
              </div>

              {el._id !== chat.info?.createdBy && userId === chat.info?.createdBy ? (
                <MdClose
                  size={22}
                  className={styles.pencilEditIcon}
                  onClick={() => onRemoveUsersFromGroupChat([el._id])}
                />
              ) : null}
            </div>
          ))}
      </div>
    </div>
  )
})
