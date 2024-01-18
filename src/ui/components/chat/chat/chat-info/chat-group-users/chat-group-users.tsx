import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { Avatar, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { useChatGroupUsersStyles } from '@components/chat/chat/chat-info/chat-group-users/chat-group-users.style'
import { Button } from '@components/shared/buttons/button'
import { MemberPlus } from '@components/shared/svg-icons'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

interface ChatGroupUsersProps {
  chat: ChatContract
  userId: string
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const ChatGroupUsers = (props: ChatGroupUsersProps) => {
  const { chat, userId, onRemoveUsersFromGroupChat, onClickAddUsersToGroupChat } = props
  const { classes: styles } = useChatGroupUsersStyles()

  return (
    <div className={styles.groupSettingsWrapper}>
      {userId === chat.info?.createdBy ? (
        <Button onClick={onClickAddUsersToGroupChat}>
          <div className={styles.addMemberBtnWrapper}>
            <Typography className={styles.addMemberBtnText}>{t(TranslationKey['Add member'])}</Typography>

            <MemberPlus className={styles.arrowIcon} />
          </div>
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
                <Typography className={styles.opponentName}>{el?.name}</Typography>
                {el._id === chat.info?.createdBy ? (
                  <Typography className={styles.ownerSign}>{`(${t(TranslationKey.Owner)})`}</Typography>
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
}
