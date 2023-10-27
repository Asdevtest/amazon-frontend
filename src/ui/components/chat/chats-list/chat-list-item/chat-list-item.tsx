import { cx } from '@emotion/css'
import he from 'he'
import { observer } from 'mobx-react'
import { FC, useContext } from 'react'

import { Avatar } from '@mui/material'

import { chatsType } from '@constants/keys/chats'
import { UserRole, UserRoleCodeMap, mapUserRoleEnumToKey } from '@constants/keys/user-roles'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract, ChatUserContract } from '@models/chat-model/contracts'
import { UserModel } from '@models/user-model'

import { UserInfoSchema } from '@services/rest-api-service/codegen'
import { ChatMessageType } from '@services/websocket-chat-service'
import { ChatMessageTextType, OnTypingMessageResponse } from '@services/websocket-chat-service/interfaces'

import { IsReadIcon, NoReadIcon, SoundOffIcon } from '@components/shared/svg-icons'

import { formatDateWithoutTime } from '@utils/date-time'
import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { useClassNames } from './chat-list-item.styles'

interface Props {
  chat: ChatContract
  userId: string
  onClick: (chat: ChatContract) => void
  typingUsers?: OnTypingMessageResponse[]
  isMutedChat?: boolean
}

export const ChatListItem: FC<Props> = observer(({ chat, userId, onClick, typingUsers, isMutedChat }) => {
  const { classes: classNames } = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const currentProposal = chatRequestAndRequestProposal.requestProposals?.find(
    requestProposal => requestProposal?.proposal?.chatId === chat?._id,
  )

  const { messages, users, lastMessage } = chat

  // const lastMessage = messages[messages.length - 1] || {}

  const isGroupChat = chat.type === chatsType.GROUP

  const isCurrentUser = lastMessage?.user?._id === userId

  const oponentUser = users.filter(
    (user: ChatUserContract) => {
      const isOwnerUser = user._id === userId
      const isRequestAndProposalSub = user._id === chatRequestAndRequestProposal.request?.request?.sub?._id
      const isRequestAndProposalCreator = user._id === chatRequestAndRequestProposal.request?.request?.createdBy?._id
      const isCurrentProposalSub = user._id === currentProposal?.proposal?.sub?._id
      const isCurrentProposalCreator = user._id === currentProposal?.proposal?.createdBy?._id
      const isOwnerUserSub = userId === chatRequestAndRequestProposal.request?.request?.sub?._id
      const isMasterUser =
        UserRoleCodeMap[(UserModel.userInfo as unknown as UserInfoSchema)!.role!] === UserRole.FREELANCER
          ? user.role === mapUserRoleEnumToKey[UserRole.FREELANCER as keyof typeof mapUserRoleEnumToKey] &&
            !user.masterUser
          : user.role === mapUserRoleEnumToKey[UserRole.CLIENT as keyof typeof mapUserRoleEnumToKey] && !user.masterUser
      console.log(user)
      const result =
        !isOwnerUser &&
        !isRequestAndProposalSub &&
        !isCurrentProposalSub &&
        (isOwnerUserSub ? !isRequestAndProposalCreator : !isCurrentProposalCreator)

      return result
      // return (
      //   user._id !== userId &&
      //   user._id !== chatRequestAndRequestProposal.request?.request?.sub?._id &&
      //   user._id !== currentProposal?.proposal?.sub?._id &&
      //   (userId === chatRequestAndRequestProposal.request?.request?.sub?._id
      //     ? user._id !== chatRequestAndRequestProposal.request?.request?.createdBy?._id
      //     : user._id !== currentProposal?.proposal?.createdBy?._id)
      // )
    },
    // user._id !== userId &&
    // ((user._id !== chatRequestAndRequestProposal.request?.request?.sub?._id &&
    //   userId !== currentProposal?.proposal?.createdBy?._id) ||
    //   (user._id !== currentProposal?.proposal?.sub?._id &&
    //     userId !== chatRequestAndRequestProposal.request?.request?.createdBy?._id)),
  )?.[0]

  const title = typeof oponentUser?.name === 'string' ? oponentUser.name : t(TranslationKey['System message'])

  const unReadMessages = messages.filter(el => !el.isRead && el.user?._id !== userId)

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
      <IsReadIcon className={classNames.isReadIcon} />
    ) : (
      <NoReadIcon className={classNames.noReadIcon} />
    )

  return (
    <div className={classNames.root} onClick={() => onClick(chat)}>
      <Avatar
        src={
          isGroupChat && Object.keys(chatRequestAndRequestProposal).length === 0
            ? chat.info?.image
            : getUserAvatarSrc(oponentUser?._id)
        }
        className={classNames.avatar}
      />

      <div className={classNames.rightSide}>
        <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>
            {isGroupChat && Object.keys(chatRequestAndRequestProposal).length === 0 ? chat.info?.title : title}
          </p>

          {lastMessage?.updatedAt ? (
            <p className={classNames.messageDate}>{formatDateWithoutTime(lastMessage.updatedAt)}</p>
          ) : null}
        </div>

        {lastMessage && (
          <div className={classNames.lastMessageWrapper}>
            {typingUsers?.find(el => el.chatId === chat._id && el.userId === oponentUser?._id) ? (
              <div className={classNames.lastMessageSubWrapper}>
                <p className={classNames.nickName}>{oponentUser?.name}</p>
                <p
                  className={cx(classNames.lastMessageText, {
                    [classNames.lastMessageTextBold]: unReadMessages.length > 0,
                  })}
                >
                  {t(TranslationKey.Writes) + '...'}
                </p>
              </div>
            ) : (
              <div className={classNames.lastMessageSubWrapper}>
                {isCurrentUser && isGroupChat && <p className={classNames.nickName}>{`${t(TranslationKey.You)}:`}</p>}
                {!isCurrentUser && isGroupChat && (
                  <p className={classNames.nickName}>{lastMessage.user && `${lastMessage.user?.name}:`}</p>
                )}

                <p
                  className={cx(classNames.lastMessageText, {
                    [classNames.lastMessageTextBold]: unReadMessages.length > 0,
                  })}
                >
                  {message + (lastMessage.files?.length ? `*${t(TranslationKey.Files)}*` : '')}
                </p>
              </div>
            )}

            <div className={classNames.badgeWrapper}>
              {isMutedChat && <SoundOffIcon className={classNames.soundOffIcon} />}

              {unReadMessages.length > 0 ? (
                <span className={classNames.badge}>{unReadMessages.length}</span>
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
