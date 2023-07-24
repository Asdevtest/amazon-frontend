import React from 'react'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'

import { useChatInfoHeaderStyles } from '@components/chat/chat/chat-info/chat-info-header/chat-info-header.styles'
import { CurrentOpponent } from '@components/chat/multiple-chats'
import { Pencil } from '@components/shared/svg-icons'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

interface ChatInfoHeaderProps {
  chat: ChatContract
  currentOpponent?: CurrentOpponent
  isGroupChat?: boolean
  userId: string
  onClickEditGroupChatInfo: () => void
}

export const ChatInfoHeader = (props: ChatInfoHeaderProps) => {
  const { chat, currentOpponent, isGroupChat, userId, onClickEditGroupChatInfo } = props
  const { classes: styles } = useChatInfoHeaderStyles()

  return (
    <div className={styles.chatHeader}>
      <img
        src={
          (!isGroupChat && getUserAvatarSrc(currentOpponent?._id)) || chat?.info?.image || '/assets/img/no-photo.jpg'
        }
        alt=""
      />
      <div className={styles.chatHeaderOverlay}>
        <Typography className={styles.chatTitle}>
          {(isGroupChat && chat?.info?.title) || currentOpponent?.name}
        </Typography>
        <Typography className={styles.chatSubTitle}>
          {isGroupChat && `${chat?.users?.length} ${t(TranslationKey.Participants).toLocaleLowerCase()}`}
        </Typography>
        {isGroupChat && userId === chat.info?.createdBy && (
          <Pencil className={styles.pencilEditIcon} onClick={onClickEditGroupChatInfo} />
        )}
      </div>
    </div>
  )
}
