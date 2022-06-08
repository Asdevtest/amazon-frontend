import React, {FC, useState} from 'react'

import {Avatar, Grid, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import ScrollView from 'react-inverted-scrollview'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {SettingsModel} from '@models/settings-model'

import {BigImagesModal} from '@components/modals/big-images-modal'

import {formatNormDateTime} from '@utils/date-time'
import {getUserAvatarSrc} from '@utils/get-user-avatar'
import {
  checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract,
  checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract,
  checkIsChatMessageDataProposalResultEditedContract,
  checkIsChatMessageDataProposalStatusChangedContract,
} from '@utils/ts-checks'

import {useClassNames} from './chat-messages-list.style'
import {ChatMessageBasicText} from './chat-messages/chat-message-basic-text'
import {ChatMessageProposal, ChatMessageProposalHandlers} from './chat-messages/chat-message-proposal'
import {ChatMessageProposalStatusChanged} from './chat-messages/chat-message-proposal-status-changed'
import {ChatMessageRequest} from './chat-messages/chat-message-request'
import {
  ChatMessageRequestProposalResultEdited,
  ChatMessageRequestProposalResultEditedHandlers,
} from './chat-messages/chat-message-request-proposal-result-edited'

export type ChatMessageUniversalHandlers = ChatMessageProposalHandlers & ChatMessageRequestProposalResultEditedHandlers

interface Props {
  userId: string
  messages?: ChatMessageContract[]
  handlers?: ChatMessageUniversalHandlers
}

export const ChatMessagesList: FC<Props> = observer(({messages, userId, handlers}) => {
  const classNames = useClassNames()

  console.log('messages-ChatMessagesList', messages)

  const renderMessageByType = (isIncomming: boolean, messageItem: ChatMessageContract) => {
    if (checkIsChatMessageDataCreatedNewProposalRequestDescriptionContract(messageItem)) {
      return <ChatMessageRequest message={messageItem} />
    } else if (handlers && checkIsChatMessageDataCreatedNewProposalProposalDescriptionContract(messageItem)) {
      return (
        <ChatMessageProposal
          message={messageItem}
          handlers={{
            onClickProposalAccept: handlers.onClickProposalAccept,
            onClickProposalRegect: handlers.onClickProposalRegect,
          }}
        />
      )
    } else if (handlers && checkIsChatMessageDataProposalStatusChangedContract(messageItem)) {
      return (
        <ChatMessageProposalStatusChanged
          message={messageItem}
          handlers={{
            onClickProposalResultAccept: handlers.onClickProposalResultAccept,
            onClickProposalResultToCorrect: handlers.onClickProposalResultToCorrect,
          }}
        />
      )
    } else if (handlers && checkIsChatMessageDataProposalResultEditedContract(messageItem)) {
      return (
        <ChatMessageRequestProposalResultEdited
          message={messageItem}
          handlers={{
            onClickProposalResultAccept: handlers.onClickProposalResultAccept,
            onClickProposalResultToCorrect: handlers.onClickProposalResultToCorrect,
          }}
        />
      )
    } else {
      return <ChatMessageBasicText isIncomming={isIncomming} message={messageItem} />
    }
  }

  const [showImageModal, setShowImageModal] = useState(false)

  const [bigImagesOptions, setBigImagesOptions] = useState({images: [] as string[], imgIndex: 0})

  return (
    <div className={classNames.root}>
      <ScrollView width="100%" height="100%" style={{padding: '20px 12px'}}>
        {messages
          ? messages.map((messageItem: ChatMessageContract, index: number) => {
              const isIncomming = userId !== messageItem.userId
              const isNotPersonal = !messageItem.userId
              const isLastMessage = index === messages.length - 1
              const isNextMessageSameAuthor =
                !isLastMessage && messages[index + 1]?.userId === messageItem.userId && !isNotPersonal
              return (
                <div
                  key={`chatMessage_${messageItem._id}`}
                  className={clsx(classNames.messageWrapper, {
                    [classNames.messageWrapperIsIncomming]: isIncomming,
                    [classNames.messageWrapperIsNextMessageSameAuthor]: isNextMessageSameAuthor,
                    [classNames.messageWrapperIsLastMessage]: isLastMessage,
                    [classNames.messageWrapperisNotPersonal]: isNotPersonal,
                  })}
                >
                  {!isNextMessageSameAuthor && !isNotPersonal ? (
                    <Avatar
                      src={getUserAvatarSrc(messageItem.userId)}
                      className={clsx(classNames.messageAvatarWrapper, {
                        [classNames.messageAvatarWrapperIsIncomming]: isIncomming,
                      })}
                    />
                  ) : undefined}
                  <div
                    className={clsx(classNames.messageInner, {
                      [classNames.messageInnerIsIncomming]: isIncomming,
                      [classNames.messageInnerIsNextMessageSameAuthor]: isNextMessageSameAuthor && !isIncomming,
                      [classNames.messageInnerIsNextMessageSameAuthorIsInclomming]:
                        isNextMessageSameAuthor && isIncomming,
                    })}
                  >
                    <div className={classNames.messageInnerContentWrapper}>
                      {renderMessageByType(isIncomming, messageItem)}
                      {messageItem.files.length ? (
                        <div>
                          <Typography className={classNames.timeText}>{'ФАЙЛЫ:'}</Typography>

                          <Grid container className={classNames.filesWrapper}>
                            {messageItem.files.map((file, fileIndex) => (
                              <Grid key={fileIndex} item className={classNames.imageWrapper}>
                                <img
                                  className={classNames.image}
                                  src={file}
                                  onClick={() => {
                                    setShowImageModal(!showImageModal)
                                    setBigImagesOptions({images: messageItem.files, imgIndex: fileIndex})
                                  }}
                                />
                              </Grid>
                            ))}
                          </Grid>
                        </div>
                      ) : undefined}
                    </div>
                    <div className={classNames.timeTextWrapper}>
                      <Typography className={classNames.timeText}>
                        {formatNormDateTime(messageItem.updatedAt)}
                      </Typography>
                    </div>
                  </div>
                </div>
              )
            })
          : undefined}
      </ScrollView>

      <BigImagesModal
        isAmazone
        openModal={showImageModal}
        setOpenModal={() => setShowImageModal(!showImageModal)}
        images={bigImagesOptions.images}
        imgIndex={bigImagesOptions.imgIndex}
      />
    </div>
  )
})
