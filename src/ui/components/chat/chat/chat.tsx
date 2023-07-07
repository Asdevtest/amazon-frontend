import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { cx } from '@emotion/css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { Avatar, ClickAwayListener, InputAdornment, Typography } from '@mui/material'
import TextField from '@mui/material/TextField'

import React, { FC, KeyboardEvent, ReactElement, useContext, useEffect, useRef, useState } from 'react'

import { observer } from 'mobx-react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { chatsType } from '@constants/keys/chats'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { CurrentOpponent, IFile } from '../multiple-chats'
import { ChatFilesInput } from './chat-files-input'
import { ChatMessagesList, ChatMessageUniversalHandlers } from './chat-messages-list'
import { useClassNames } from './chat.style'
import { ChatMessageByType } from './chat-messages-list/chat-message-by-type'
import { toFixed } from '@utils/text'
import { ChatInfo } from '@components/chat/chat/chat-info/chat-info'
import { HideArrowIcon } from '@components/shared/svg-icons'

export interface RenderAdditionalButtonsParams {
  message: string
  files: IFile[]
}

export interface OnEmojiSelectEvent {
  id: string
  keywords: string[]
  name: string
  native: string
  shortcodes: string
  unified: string
}

export interface MessageStateParams {
  message: string
  files: IFile[]
}

interface Props {
  chat: ChatContract
  messages: ChatMessageContract[]
  userId: string
  currentOpponent?: CurrentOpponent
  chatMessageHandlers?: ChatMessageUniversalHandlers
  toScrollMesId?: string | undefined
  messagesFound?: ChatMessageContract[]
  searchPhrase?: string

  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  onSubmitMessage: (message: string, files: IFile[], replyMessageId: string | null) => void
  updateData: () => void
  onTypingMessage: (chatId: string) => void
  onClickBackButton: () => void
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const Chat: FC<Props> = observer(
  ({
    searchPhrase,
    toScrollMesId,
    messagesFound,
    chat,
    messages,
    userId,
    currentOpponent,
    chatMessageHandlers,
    onSubmitMessage,
    renderAdditionalButtons,
    updateData,
    onTypingMessage,
    onClickBackButton,
    onClickAddUsersToGroupChat,
    onRemoveUsersFromGroupChat,
    onClickEditGroupChatInfo,
  }) => {
    const messageInput = useRef<HTMLTextAreaElement | null>(null)
    const messagesWrapperRef = useRef<HTMLDivElement | null>(null)

    const [startMessagesCount, setStartMessagesCount] = useState(0)
    const [unreadMessages, setUnreadMessages] = useState<null | ChatMessageContract[]>([])

    const [showFiles, setShowFiles] = useState(false)

    const [showEmojis, setShowEmojis] = useState(false)

    const [showChatInfo, setShowChatInfo] = useState(false)

    const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

    const [messageToReply, setMessageToReply] = useState<null | ChatMessageContract>(null)
    const [messageToScroll, setMessageToScroll] = useState<null | ChatMessageContract>(null)

    // console.log('chatRequestAndRequestProposal', chatRequestAndRequestProposal)

    const isGroupChat = chat.type === chatsType.GROUP

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    const messageInitialState: MessageStateParams = SettingsModel.chatMessageState?.[chat._id] || {
      message: '',
      files: [],
    }

    const [message, setMessage] = useState(messageInitialState.message)

    const [files, setFiles] = useState<IFile[]>(
      messageInitialState.files.some(el => !el.file.size) ? [] : messageInitialState.files,
    )

    const [isSendTypingPossible, setIsSendTypingPossible] = useState(true)

    useEffect(() => {
      setStartMessagesCount(messages.length)
    }, [])

    useEffect(() => {
      if (isSendTypingPossible && message) {
        onTypingMessage(chat._id)
        setIsSendTypingPossible(false)
        setTimeout(() => setIsSendTypingPossible(true), 3000)
      }
    }, [message])

    useEffect(() => {
      if (messageToReply !== null) {
        messageInput.current?.focus()
      }
    }, [messageToReply])

    useEffect(() => {
      if (updateData && messages?.[messages.length - 1]?.text === 'PROPOSAL_STATUS_CHANGED') {
        updateData()
      }

      if (startMessagesCount > 0) {
        const currentScrollPosition = toFixed(
          messagesWrapperRef.current!.scrollTop + messagesWrapperRef.current!.clientHeight,
        )
        const scrolledFromBottom = messagesWrapperRef.current!.scrollHeight - currentScrollPosition

        if (scrolledFromBottom > messagesWrapperRef.current!.clientHeight) {
          setUnreadMessages(messages.slice(startMessagesCount, messages.length).filter(el => el.user?._id !== userId))
        } else {
          setStartMessagesCount(messages.length)
        }
      }
    }, [messages?.length])

    useEffect(() => {
      setMessage(messageInitialState.message)
      setFiles(messageInitialState.files.some(el => !el.file.size) ? [] : messageInitialState.files)
      setShowChatInfo(false)

      return () => {
        setMessageToReply(null)
      }
    }, [chat?._id])

    useEffect(() => {
      if (files?.length) {
        setShowFiles(true)
      } else {
        setShowFiles(false)
      }
    }, [files?.length])

    const changeMessageAndState = (value: string) => {
      setMessage(value)
      SettingsModel.setChatMessageState({ message: value, files }, chat._id)
    }

    const changeFilesAndState = (value: IFile[]) => {
      setFiles(value)
      SettingsModel.setChatMessageState({ message, files: value }, chat._id)
    }

    const { classes: classNames } = useClassNames()

    const resetAllInputs = () => {
      setMessage('')
      setFiles(() => [])
      SettingsModel.setChatMessageState({ message: '', files: [] }, chat._id)
    }

    const onSubmitMessageInternal = () => {
      onSubmitMessage(message, files, messageToReply ? messageToReply._id : null)
      setMessageToReply(null)
      resetAllInputs()
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
      if (!disabledSubmit && event.key === 'Enter' && !event.shiftKey) {
        onSubmitMessageInternal()
        event.preventDefault()
      }
    }

    const onPasteFiles = async (evt: React.ClipboardEvent) => {
      if (evt.clipboardData.files.length === 0) {
        return
      } else {
        const filesArr = Array.from(evt.clipboardData.files)

        const filesAlowLength = 50 - files.length

        evt.preventDefault()

        const readyFilesArr: IFile[] = filesArr.map((el: File) => ({
          data_url: URL.createObjectURL(el),
          file: new File([el], el.name?.replace(/ /g, ''), {
            type: el.type,
            lastModified: el.lastModified,
          }),
        }))

        changeFilesAndState([...files, ...readyFilesArr.slice(0, filesAlowLength)])
      }
    }

    const onClickScrollToBottom = () => {
      setMessageToScroll({ ...(unreadMessages?.[0] || messages.at(-1)!) })
      setStartMessagesCount(messages.length)
      setUnreadMessages([])
    }

    const disabledSubmit = !message.replace(/\n/g, '') && !files.length

    const userContainedInChat = chat.users.some(el => el._id === userId)

    // console.log('messageToReply', messageToReply)

    return (
      <div className={classNames.root}>
        <div className={classNames.opponentWrapper}>
          <ArrowBackIosIcon color="primary" onClick={onClickBackButton} />
          <div className={classNames.opponentSubWrapper}>
            <Avatar src={getUserAvatarSrc(currentOpponent?._id)} className={classNames.avatarWrapper} />
            <Typography className={classNames.opponentName}>{currentOpponent?.name}</Typography>
          </div>
        </div>
        <div className={classNames.scrollViewWrapper}>
          <ChatMessagesList
            messagesWrapperRef={messagesWrapperRef}
            isGroupChat={isGroupChat}
            userId={userId}
            messages={messages}
            handlers={chatMessageHandlers}
            toScrollMesId={toScrollMesId}
            messagesFound={messagesFound}
            searchPhrase={searchPhrase}
            messageToScroll={messageToScroll}
            setMessageToScroll={setMessageToScroll}
            setMessageToReply={setMessageToReply}
          />

          <div className={cx(classNames.hideAndShowIconWrapper)} onClick={() => setShowChatInfo(!showChatInfo)}>
            {showChatInfo ? (
              <HideArrowIcon className={cx(classNames.arrowIcon, classNames.hideArrow)} />
            ) : (
              <MoreVertOutlinedIcon className={classNames.arrowIcon} />
            )}
          </div>

          <div className={classNames.scrollToBottom} onClick={onClickScrollToBottom}>
            <KeyboardArrowDownIcon />
            {!!unreadMessages?.length && <div className={classNames.scrollToBottomBadge}>{unreadMessages?.length}</div>}
          </div>
          {showChatInfo && (
            <ChatInfo
              chat={chat}
              currentOpponent={currentOpponent}
              isGroupChat={isGroupChat}
              userId={userId}
              onClickAddUsersToGroupChat={onClickAddUsersToGroupChat}
              onRemoveUsersFromGroupChat={onRemoveUsersFromGroupChat}
              onClickEditGroupChatInfo={onClickEditGroupChatInfo}
            />
          )}
        </div>

        {messageToReply && (
          <div
            className={classNames.messageToReplyWrapper}
            onClick={() => {
              setMessageToScroll(messageToReply)
              setTimeout(() => setMessageToScroll(null), 1000)
            }}
          >
            <ReplyOutlinedIcon className={classNames.messageToReplyIcon} />
            <div className={classNames.messageToReplySubWrapper}>
              <ChatMessageByType
                isIncomming
                showName
                messageItem={messageToReply}
                unReadMessage={false}
                isLastMessage={false}
              />
            </div>
            <CloseOutlinedIcon
              className={classNames.messageToReplyCloseIcon}
              onClick={e => {
                e.stopPropagation()
                setMessageToReply(null)
              }}
            />
          </div>
        )}

        <div className={classNames.bottomPartWrapper}>
          {showFiles ? <ChatFilesInput files={files} setFiles={changeFilesAndState} /> : null}

          {showEmojis ? (
            <ClickAwayListener
              mouseEvent="onMouseDown"
              onClickAway={event => {
                if ((event.target as HTMLElement).id !== 'emoji-icon') {
                  setShowEmojis(false)
                }
              }}
            >
              <div className={classNames.emojisWrapper}>
                <Picker
                  theme={SettingsModel.uiTheme === UiTheme.light ? 'light' : 'dark'}
                  data={data}
                  locale={SettingsModel.languageTag}
                  onEmojiSelect={(e: OnEmojiSelectEvent) => changeMessageAndState(message + e.native)}
                />
              </div>
            </ClickAwayListener>
          ) : null}

          <div className={classNames.inputWrapper}>
            <TextField
              multiline
              autoFocus
              inputRef={messageInput}
              disabled={!userContainedInChat}
              type="text"
              id="outlined-multiline-flexible"
              size="small"
              className={cx(classNames.input, { [classNames.inputFilled]: !!message || !!focused })}
              classes={{ root: classNames.input }}
              maxRows={6}
              placeholder={t(TranslationKey['Write a message'])}
              inputProps={{ maxLength: 1000 }}
              InputProps={
                userContainedInChat ? (
                  {
                    endAdornment: (
                      <InputAdornment position="end" classes={{ root: classNames.endAdornment }}>
                        <div className={classNames.filesIconWrapper}>
                          <img
                            id="emoji-icon"
                            src={showEmojis ? '/assets/icons/emoji-active.svg' : '/assets/icons/emoji.svg'}
                            className={cx(classNames.inputIcon, classNames.emojiIconPos)}
                            onClick={() => setShowEmojis(!showEmojis)}
                          />
                        </div>

                        <div className={classNames.filesIconWrapper}>
                          <img
                            src={showFiles ? '/assets/icons/files-active.svg' : '/assets/icons/files.svg'}
                            className={cx(classNames.inputIcon, classNames.fileIconPos)}
                            onClick={() => setShowFiles(!showFiles)}
                          />
                          {files.length ? <div className={classNames.badge}>{files.length}</div> : undefined}
                        </div>
                      </InputAdornment>
                    ),
                  }
                ) : (
                  <div />
                )
              }
              value={message}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyPress={handleKeyPress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeMessageAndState(e.target.value)}
              onPaste={evt => onPasteFiles(evt)}
            />

            <Button disabled={disabledSubmit} className={classNames.sendBtn} onClick={() => onSubmitMessageInternal()}>
              <div className={classNames.sendBtnTextWrapper}>
                <Typography className={classNames.sendBtnText}>{t(TranslationKey.Send)}</Typography>
                <img src="/assets/icons/send.svg" className={classNames.sendBtnIcon} />
              </div>
            </Button>
          </div>

          {renderAdditionalButtons ? renderAdditionalButtons({ message, files }, resetAllInputs) : undefined}
        </div>
      </div>
    )
  },
)
