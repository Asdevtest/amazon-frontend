import { FC, memo } from 'react'
import { FiPlus } from 'react-icons/fi'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Avatar } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { Button } from '@components/shared/button'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { useStyles } from './chat-group-users.style'

interface ChatGroupUsersProps {
  chat: ChatContract
  userId: string
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const ChatGroupUsers: FC<ChatGroupUsersProps> = memo(props => {
  const { chat, userId, onRemoveUsersFromGroupChat, onClickAddUsersToGroupChat } = props
  const { classes: styles } = useStyles()

  return (
    <div className={styles.groupSettingsWrapper}>
      {userId === chat.info?.createdBy ? (
        <Button onClick={onClickAddUsersToGroupChat}>
          {t(TranslationKey['Add member'])}
          <FiPlus />
        </Button>
      ) : null}

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
                <CloseOutlinedIcon
                  className={styles.pencilEditIcon}
                  fontSize="small"
                  onClick={() => onRemoveUsersFromGroupChat([el._id])}
                />
              ) : null}
            </div>
          ))}
      </div>
    </div>
  )
})
