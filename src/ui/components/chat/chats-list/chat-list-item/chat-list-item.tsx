/* eslint-disable @typescript-eslint/ban-ts-comment */
import he from 'he'
import { observer } from 'mobx-react'
import { FC, useContext } from 'react'

import { Avatar } from '@mui/material'

import { chatsType } from '@constants/keys/chats'
import { UserRole, UserRoleCodeMap } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract, ChatUserContract } from '@models/chat-model/contracts'
import { UserModel } from '@models/user-model'

import { InlineResponse20083 } from '@services/rest-api-service/codegen'
import { ChatMessageType } from '@services/websocket-chat-service'
import { ChatMessageTextType, OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { IsReadIcon, NoReadIcon, SoundOffIcon } from '@components/shared/svg-icons'

import { checkIsClient } from '@utils/checks'
import { formatDateWithoutTime } from '@utils/date-time'
import { getAmazonImageUrl } from '@utils/get-amazon-image-url'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useStyles } from './chat-list-item.style'

interface Props {
  chat: ChatContract
  userId: string
  onClick: (chat: ChatContract) => void
  typingUsers?: OnTypingMessageResponse[]
  isMutedChat?: boolean
  typeOfChat?: string
}

export const ChatListItem: FC<Props> = observer(({ chat, userId, onClick, typingUsers, isMutedChat, typeOfChat }) => {
  const { classes: styles, cx } = useStyles()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const currentProposal = chatRequestAndRequestProposal.requestProposals?.find(
    requestProposal => requestProposal?.proposal?.chatId === chat?._id,
  )

  const { users, lastMessage, unread } = chat

  // @ts-ignore
  const currentUserRole = UserRoleCodeMap[(UserModel?.userInfo as InlineResponse20083)?.role]

  const isGroupChat = chat.type === chatsType.GROUP

  const isCurrentUser = lastMessage?.user?._id === userId

  const usersList = users?.filter((user: ChatUserContract) => {
    const isOwnerUser = user._id === userId
    const isRequestAndProposalSub = user._id === chatRequestAndRequestProposal.request?.request?.sub?._id
    const isRequestAndProposalCreator = user._id === chatRequestAndRequestProposal.request?.request?.createdBy?._id
    const isCurrentProposalSub = user._id === currentProposal?.proposal?.sub?._id
    const isCurrentProposalCreator = user._id === currentProposal?.proposal?.createdBy?._id
    const isOwnerUserSub = userId === chatRequestAndRequestProposal.request?.request?.sub?._id

    const result =
      !isOwnerUser &&
      !isRequestAndProposalSub &&
      !isCurrentProposalSub &&
      (isOwnerUserSub ? !isRequestAndProposalCreator : !isCurrentProposalCreator)

    return result
  })

  const getUserByChatType = () => {
    if (typeOfChat === 'inWorkChat' || typeOfChat === 'solvedChat') {
      const userByChatType = users?.find((user: ChatUserContract) => {
        const userRole = UserRoleCodeMap[Number(user.role)]
        return (
          (checkIsClient(currentUserRole) ? userRole === UserRole.FREELANCER : userRole === UserRole.CLIENT) &&
          !user.masterUser
        )
      })

      return userByChatType || usersList?.[0]
    } else {
      return usersList?.[0]
    }
  }

  const oponentUser = getUserByChatType()

  const title = typeof oponentUser?.name === 'string' ? oponentUser.name : t(TranslationKey['System message'])

  const message = lastMessage?.text
    ? (() => {
        switch (lastMessage?.text) {
          case ChatMessageType.CREATED_NEW_PROPOSAL_PROPOSAL_DESCRIPTION:
            return t(TranslationKey['Created new proposal, proposal description'])
          case ChatMessageType.CREATED_NEW_PROPOSAL_REQUEST_DESCRIPTION:
            return t(TranslationKey['Created new proposal, request description'])
          case ChatMessageType.CREATED_NEW_BLOGGER_PROPOSAL:
            return t(TranslationKey['Created new proposal, proposal description'])
          case ChatMessageType.CREATED_NEW_DESIGNER_PROPOSAL:
            return t(TranslationKey['Created new proposal, proposal description'])
          case ChatMessageType.PROPOSAL_RESULT_EDITED:
            return t(TranslationKey['Proposal result edited'])

          case ChatMessageType.PROPOSAL_EDITED:
            return t(TranslationKey['Proposal changed'])

          case ChatMessageType.BLOGGER_PROPOSAL_RESULT_EDITED:
            return t(TranslationKey['Proposal result edited'])
          case ChatMessageType.DESIGNER_PROPOSAL_RESULT_EDITED:
            return t(TranslationKey['Proposal result edited'])
          case ChatMessageType.PROPOSAL_STATUS_CHANGED:
            return t(TranslationKey['Proposal status changed'])

          case ChatMessageTextType.ADD_USERS_TO_GROUP_CHAT_BY_ADMIN:
            return t(TranslationKey['added to the group chat'])
          case ChatMessageTextType.REMOVE_USERS_FROM_GROUP_CHAT_BY_ADMIN:
            return t(TranslationKey['deleted from group chat'])
          case ChatMessageTextType.PATCH_INFO:
            return t(TranslationKey['changed the chat info'])
          default:
            return he.decode(lastMessage.text)
        }
      })()
    : ''

  const readingTick =
    isCurrentUser && lastMessage.isRead ? (
      <IsReadIcon className={styles.isReadIcon} />
    ) : (
      <NoReadIcon className={styles.noReadIcon} />
    )

  return (
    <div className={styles.root} onClick={() => onClick(chat)}>
      <Avatar
        src={
          isGroupChat && Object.keys(chatRequestAndRequestProposal).length === 0
            ? getAmazonImageUrl(chat.info?.image)
            : getUserAvatarSrc(oponentUser?._id)
        }
        className={styles.avatar}
      />

      <div className={styles.rightSide}>
        <div className={styles.titleWrapper}>
          <p className={styles.titleText}>
            {isGroupChat && Object.keys(chatRequestAndRequestProposal).length === 0 ? chat.info?.title : title}
          </p>

          {lastMessage?.updatedAt ? (
            <p className={styles.messageDate}>{formatDateWithoutTime(lastMessage.updatedAt)}</p>
          ) : null}
        </div>

        {lastMessage && (
          <div className={styles.lastMessageWrapper}>
            {typingUsers?.find(el => el.chatId === chat._id && el.userId === oponentUser?._id) ? (
              <div className={styles.lastMessageSubWrapper}>
                <p className={styles.nickName}>{oponentUser?.name}</p>
                <p
                  className={cx(styles.lastMessageText, {
                    [styles.lastMessageTextBold]: Number(unread) > 0,
                  })}
                >
                  {t(TranslationKey.Writes) + '...'}
                </p>
              </div>
            ) : (
              <div className={styles.lastMessageSubWrapper}>
                {isCurrentUser && isGroupChat && <p className={styles.nickName}>{`${t(TranslationKey.You)}:`}</p>}
                {!isCurrentUser && isGroupChat && (
                  <p className={styles.nickName}>{lastMessage.user && `${lastMessage.user?.name}:`}</p>
                )}

                <p
                  className={cx(styles.lastMessageText, {
                    [styles.lastMessageTextBold]: Number(unread) > 0,
                  })}
                >
                  {message + (lastMessage.files?.length ? `*${t(TranslationKey.Files)}*` : '')}
                </p>
              </div>
            )}

            <div className={styles.badgeWrapper}>
              {isMutedChat && <SoundOffIcon className={styles.soundOffIcon} />}

              {Number(unread) > 0 ? (
                <span className={styles.badge}>{Number(unread)}</span>
              ) : isCurrentUser ? (
                readingTick
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
})
