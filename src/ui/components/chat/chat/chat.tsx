/* eslint-disable @typescript-eslint/no-non-null-assertion */
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import React, { FC, KeyboardEvent, ReactElement, useEffect, useRef, useState } from 'react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { ClickAwayListener, InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField'

import { isTabletResolution } from '@constants/configs/sizes-settings'
import { chatsType } from '@constants/keys/chats'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { ChatInfo } from '@components/chat/chat/chat-info/chat-info'
import { Button } from '@components/shared/buttons/button'
import { EmojiIcon, FileIcon, HideArrowIcon, SendIcon } from '@components/shared/svg-icons'

import { toFixed } from '@utils/text'
import { t } from '@utils/translations'

import { useClassNames } from './chat.styles'

import { CurrentOpponent, IFile } from '../multiple-chats'

import { ChatCurrentReplyMessage } from './chat-current-reply-message'
import { ChatFilesInput } from './chat-files-input'
import { ChatMessageUniversalHandlers, ChatMessagesList } from './chat-messages-list'

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
    onClickAddUsersToGroupChat,
    onRemoveUsersFromGroupChat,
    onClickEditGroupChatInfo,
  }) => {
    const { classes: classNames } = useClassNames()

    const messageInput = useRef<HTMLTextAreaElement | null>(null)
    const messagesWrapperRef = useRef<HTMLDivElement | null>(null)

    const [isShowScrollToBottomBtn, setIsShowScrollToBottomBtn] = useState(false)

    const [startMessagesCount, setStartMessagesCount] = useState(0)
    const [unreadMessages, setUnreadMessages] = useState<null | ChatMessageContract[]>([])

    const [showFiles, setShowFiles] = useState(false)

    const [isShowEmojis, setIsShowEmojis] = useState(false)

    const [isShowChatInfo, setIsShowChatInfo] = useState(false)

    const [messageToReply, setMessageToReply] = useState<null | ChatMessageContract>(null)
    const [messageToScroll, setMessageToScroll] = useState<null | ChatMessageContract>(null)

    const isGroupChat = chat.type === chatsType.GROUP

    const [focused, setFocused] = useState(false)
    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    useEffect(() => {
      const handleScrollToBottomButtonVisibility = (e: Event) => {
        const target = e.target as HTMLDivElement
        if (target.clientHeight / 2 < target.scrollHeight - (target.scrollTop + target.clientHeight)) {
          setIsShowScrollToBottomBtn(true)
        } else {
          setIsShowScrollToBottomBtn(false)
        }
      }

      if (messagesWrapperRef.current) {
        messagesWrapperRef.current?.addEventListener('scroll', handleScrollToBottomButtonVisibility)
      }

      return () => {
        if (messagesWrapperRef.current) {
          messagesWrapperRef.current?.removeEventListener('scroll', handleScrollToBottomButtonVisibility)
        }
      }
    }, [])

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
      if (isSendTypingPossible && message) {
        onTypingMessage(chat._id)
        setIsSendTypingPossible(false)
        setTimeout(() => setIsSendTypingPossible(true), 10000)
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

      if (startMessagesCount > 0 && messagesWrapperRef.current) {
        const currentScrollPosition = toFixed(
          messagesWrapperRef.current.scrollTop + messagesWrapperRef.current.clientHeight,
        )
        const scrolledFromBottom = messagesWrapperRef.current.scrollHeight - currentScrollPosition

        if (scrolledFromBottom > messagesWrapperRef.current.clientHeight) {
          setUnreadMessages(messages.slice(startMessagesCount, messages.length).filter(el => el.user?._id !== userId))
        } else {
          setStartMessagesCount(messages.length)
          setUnreadMessages([])
        }
      }
    }, [messages?.length])

    useEffect(() => {
      setMessage(messageInitialState.message)
      setFiles(messageInitialState.files.some(el => !el.file.size) ? [] : messageInitialState.files)
      setIsShowChatInfo(false)
      setStartMessagesCount(messages.length)

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

    const resetAllInputs = () => {
      setMessage('')
      setFiles(() => [])
      SettingsModel.setChatMessageState({ message: '', files: [] }, chat._id)
    }

    const onSubmitMessageInternal = () => {
      onSubmitMessage(message, files, messageToReply ? messageToReply._id : null)
      setMessageToReply(null)
      resetAllInputs()
      onClickScrollToBottom()
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
      setMessageToScroll({ ...messages.at(-1)! })
      setStartMessagesCount(messages.length)
      setUnreadMessages([])
    }

    const disabledSubmit = !message.replace(/\n/g, '') && !files.length

    const userContainedInChat = chat.users.some(el => el._id === userId)

    return (
      <>
        <div className={classNames.scrollViewWrapper}>
          <ChatMessagesList
            chatId={chat._id}
            messagesWrapperRef={messagesWrapperRef}
            isGroupChat={isGroupChat}
            userId={userId}
            messages={messages}
            isShowChatInfo={isShowChatInfo}
            handlers={chatMessageHandlers}
            toScrollMesId={toScrollMesId}
            messagesFound={messagesFound}
            searchPhrase={searchPhrase}
            messageToScroll={messageToScroll}
            setMessageToScroll={setMessageToScroll}
            setMessageToReply={setMessageToReply}
          />

          <div className={classNames.hideAndShowIconWrapper} onClick={() => setIsShowChatInfo(!isShowChatInfo)}>
            {isShowChatInfo ? (
              <HideArrowIcon className={cx(classNames.arrowIcon, classNames.hideArrow)} />
            ) : (
              <MoreVertOutlinedIcon className={classNames.arrowIcon} />
            )}
          </div>

          {isShowScrollToBottomBtn && (
            <div
              className={cx(classNames.scrollToBottom, {
                [classNames.scrollToBottomRight]: isShowChatInfo,
                [classNames.hideElement]: isShowChatInfo && isTabletResolution,
              })}
              onClick={onClickScrollToBottom}
            >
              <KeyboardArrowDownIcon />
              {!!unreadMessages?.length && (
                <div className={classNames.scrollToBottomBadge}>{unreadMessages?.length}</div>
              )}
            </div>
          )}

          {isShowChatInfo && (
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

        {messageToReply ? (
          <ChatCurrentReplyMessage
            message={messageToReply}
            setMessageToReply={setMessageToReply}
            setMessageToScroll={setMessageToScroll}
          />
        ) : null}

        {showFiles ? <ChatFilesInput files={files} setFiles={changeFilesAndState} /> : null}

        <div className={classNames.bottomPartWrapper}>
          {isShowEmojis ? (
            <ClickAwayListener
              mouseEvent="onMouseDown"
              onClickAway={event => {
                if ((event.target as HTMLElement).id !== 'emoji-icon') {
                  setIsShowEmojis(false)
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className={classNames.icons}>
                    <EmojiIcon
                      id="emoji-icon"
                      className={cx(classNames.inputIcon, {
                        [classNames.inputIconActive]: isShowEmojis,
                      })}
                      onClick={() => setIsShowEmojis(!isShowEmojis)}
                    />
                    <div className={classNames.filesIconWrapper}>
                      <FileIcon
                        className={cx(classNames.inputIcon, {
                          [classNames.inputIconActive]: showFiles,
                        })}
                        onClick={() => setShowFiles(!showFiles)}
                      />
                      {files.length ? <div className={classNames.badge}>{files.length}</div> : undefined}
                    </div>
                  </InputAdornment>
                ),
              }}
              value={message}
              onFocus={onFocus}
              onBlur={onBlur}
              onKeyPress={handleKeyPress}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => changeMessageAndState(e.target.value)}
              onPaste={evt => onPasteFiles(evt)}
            />

            <Button disabled={disabledSubmit} className={classNames.sendBtn} onClick={() => onSubmitMessageInternal()}>
              <div className={classNames.sendBtnTextWrapper}>
                <p className={classNames.sendBtnText}>{t(TranslationKey.Send)}</p>
                <SendIcon className={classNames.sendBtnIcon} />
              </div>
            </Button>
          </div>

          {renderAdditionalButtons ? renderAdditionalButtons({ message, files }, resetAllInputs) : undefined}
        </div>
      </>
    )
  },
)
