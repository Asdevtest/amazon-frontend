/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { ChangeEvent, FC, KeyboardEvent, ReactElement, memo, useEffect, useRef, useState } from 'react'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { VirtuosoHandle } from 'react-virtuoso'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { ClickAwayListener, InputAdornment } from '@mui/material'
import TextField from '@mui/material/TextField'

import { chatsType } from '@constants/keys/chats'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { EmojiIcon, FileIcon, HideArrowIcon, SendIcon } from '@components/shared/svg-icons'

import { checkIsExternalVideoLink } from '@utils/checks'
import { t } from '@utils/translations'

import { UploadFileType } from '@typings/upload-file'

import { useCreateBreakpointResolutions } from '@hooks/use-create-breakpoint-resolutions'

import { useStyles } from './chat.style'

import { CurrentOpponent } from '../multiple-chats'

import { ChatMessageRequestProposalDesignerResultEditedHandlers } from './components/chat-messages-list/components/chat-messages/chat-message-designer-proposal-edited-result'
import { ChatCurrentReplyMessage, ChatFilesInput, ChatInfo, ChatMessagesList } from './components/index'
import { OnEmojiSelectEvent, RenderAdditionalButtonsParams } from './helpers/chat.interface'
import { useChatInputControl } from './hooks/use-chat-area'
import { usePrevious } from './hooks/use-previous'

interface ChatProps {
  chat: ChatContract
  messages: ChatMessageContract[]
  userId: string
  currentOpponent?: CurrentOpponent
  chatMessageHandlers?: ChatMessageRequestProposalDesignerResultEditedHandlers
  toScrollMesId?: string | undefined
  messagesFound?: ChatMessageContract[]
  isFreelanceOwner?: boolean
  searchPhrase?: string
  classNamesWrapper?: string
  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  onSubmitMessage: (message: string, files: UploadFileType[], replyMessageId: string | null) => void
  updateData: () => void
  onTypingMessage: (chatId: string) => void
  onClickAddUsersToGroupChat: () => void
  onRemoveUsersFromGroupChat: (usersIds: string[]) => void
  onClickEditGroupChatInfo: () => void
}

export const Chat: FC<ChatProps> = memo(
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
    isFreelanceOwner,
    classNamesWrapper,
  }) => {
    const { classes: styles, cx } = useStyles()
    const { isTabletResolution } = useCreateBreakpointResolutions()

    const messageInitialState = {
      message: '',
      files: [],
    }

    const {
      showFiles,
      setShowFiles,

      message,
      setMessage,

      files,
      setFiles,

      isShowEmojis,
      setIsShowEmojis,

      focused,

      onPasteFiles,

      onFocus,
      onBlur,
      changeMessageAndState,
      resetAllInputs,
      changeFilesAndState,
    } = useChatInputControl(messageInitialState)

    const prevChatId = usePrevious(chat?._id)

    const messageInput = useRef<HTMLTextAreaElement | null>(null)
    const messagesWrapperRef = useRef<VirtuosoHandle | undefined>(null)
    const highlightRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [isShowChatInfo, setIsShowChatInfo] = useState(false)
    const [isShowScrollToBottomBtn, setIsShowScrollToBottomBtn] = useState(false)
    const [isSendTypingPossible, setIsSendTypingPossible] = useState(true)

    const [messageToReply, setMessageToReply] = useState<null | ChatMessageContract>(null)
    const [messageToScroll, setMessageToScroll] = useState<number | undefined>(undefined)

    const disabledSubmit = !message.trim() && !files.length
    const isGroupChat = chat.type === chatsType.GROUP && !isFreelanceOwner
    const userContainedInChat = chat.users.some(el => el._id === userId)

    const START_INDEX = chat?.messagesCount || 1000000

    const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX - messages.length)

    const handleLoadMoreMessages = () => {
      ChatModel.getChatMessages?.(chat?._id)?.finally(() => setFirstItemIndex(START_INDEX - messages.length))
    }

    const handleScrollToBottomButtonVisibility = (bottomState: boolean) => {
      if (!bottomState) {
        setIsShowScrollToBottomBtn(true)
      } else {
        setIsShowScrollToBottomBtn(false)
      }
    }

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
    }, [messages?.length])

    useEffect(() => {
      if (!messages.length) {
        ChatModel.getChatMessages?.(chat?._id)
      }

      setMessage(messageInitialState.message)
      setFiles(messageInitialState.files)
      setIsShowChatInfo(false)

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

    const onSubmitMessageInternal = () => {
      onSubmitMessage(message.trim(), files, messageToReply ? messageToReply._id : null)
      setMessageToReply(null)
      resetAllInputs()
      onClickScrollToBottom()
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
      if (!isTabletResolution && !disabledSubmit && event.key === 'Enter' && !event.shiftKey) {
        onSubmitMessageInternal()
        event.preventDefault()
      }
    }

    const onClickScrollToBottom = () => {
      if (!messagesWrapperRef.current) {
        return
      }
      messagesWrapperRef.current?.scrollToIndex({ index: 'LAST' })
    }

    useEffect(() => {
      if (toScrollMesId) {
        scrollToMessage(messages.findIndex(el => el._id === toScrollMesId))
      }
    }, [toScrollMesId])

    const scrollToMessage = (messageIndex: number) => {
      if (messagesWrapperRef?.current) {
        if (highlightRef.current) {
          clearTimeout(highlightRef.current)
        }

        messagesWrapperRef.current.scrollToIndex({ index: messageIndex })
        setMessageToScroll(messageIndex)

        highlightRef.current = setTimeout(() => {
          setMessageToScroll(undefined)
        }, 1000)
      }
    }

    if (prevChatId !== chat?._id && prevChatId !== undefined) {
      return null
    }

    return (
      <>
        <div className={cx(styles.scrollViewWrapper, classNamesWrapper)}>
          <ChatMessagesList
            chatId={chat._id}
            messagesWrapperRef={messagesWrapperRef}
            isGroupChat={isGroupChat}
            userId={userId}
            messages={messages}
            isShowChatInfo={isShowChatInfo}
            handlers={chatMessageHandlers}
            messagesFound={messagesFound}
            searchPhrase={searchPhrase}
            messageToScroll={messageToScroll}
            scrollToMessage={scrollToMessage}
            isFreelanceOwner={isFreelanceOwner}
            setMessageToReply={setMessageToReply}
            firstItemIndex={firstItemIndex}
            prependItems={handleLoadMoreMessages}
            handleScrollToBottomButtonVisibility={handleScrollToBottomButtonVisibility}
          />

          <div className={styles.hideAndShowIconWrapper} onClick={() => setIsShowChatInfo(!isShowChatInfo)}>
            {isShowChatInfo ? (
              <HideArrowIcon className={cx(styles.arrowIcon, styles.hideArrow)} />
            ) : (
              <MoreVertOutlinedIcon className={styles.arrowIcon} />
            )}
          </div>

          {isShowScrollToBottomBtn && (
            <div
              className={cx(styles.scrollToBottom, {
                [styles.scrollToBottomRight]: isShowChatInfo,
                [styles.hideElement]: isShowChatInfo && isTabletResolution,
              })}
              onClick={onClickScrollToBottom}
            >
              <KeyboardArrowDownIcon />
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
            scrollToMessage={() => scrollToMessage(messages.findIndex(el => el._id === messageToReply?._id))}
          />
        ) : null}

        {showFiles ? <ChatFilesInput files={files} setFiles={changeFilesAndState} /> : null}

        <div className={styles.bottomPartWrapper}>
          <div key={SettingsModel.languageTag}>
            {isShowEmojis && (
              <ClickAwayListener
                mouseEvent="onMouseDown"
                onClickAway={event => {
                  if ((event.target as HTMLElement).id !== 'emoji-icon') {
                    setIsShowEmojis(false)
                  }
                }}
              >
                <div className={styles.emojisWrapper}>
                  <Picker
                    data={data}
                    perLine={isTabletResolution ? 7 : 9}
                    theme={SettingsModel.uiTheme}
                    locale={SettingsModel.languageTag}
                    onEmojiSelect={(e: OnEmojiSelectEvent) => changeMessageAndState(message + e.native)}
                  />
                </div>
              </ClickAwayListener>
            )}
          </div>

          <div className={styles.inputWrapper}>
            <TextField
              multiline
              autoFocus={!isTabletResolution}
              inputRef={messageInput}
              disabled={!userContainedInChat}
              type="text"
              id="outlined-multiline-flexible"
              size="small"
              className={cx(styles.input, { [styles.inputFilled]: !!message || !!focused })}
              maxRows={6}
              placeholder={t(TranslationKey['Write a message'])}
              inputProps={{ maxLength: 1000 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" className={styles.icons}>
                    <EmojiIcon
                      id="emoji-icon"
                      className={cx(styles.inputIcon, {
                        [styles.inputIconActive]: isShowEmojis,
                      })}
                      onClick={() => setIsShowEmojis(!isShowEmojis)}
                    />
                    <div className={styles.filesIconWrapper}>
                      <FileIcon
                        className={cx(styles.inputIcon, {
                          [styles.inputIconActive]: showFiles,
                        })}
                        onClick={() => setShowFiles(!showFiles)}
                      />
                      {files.length ? <div className={styles.badge}>{files.length}</div> : undefined}
                    </div>
                  </InputAdornment>
                ),
              }}
              value={message}
              onFocus={!isTabletResolution ? onFocus : undefined}
              onBlur={!isTabletResolution ? onBlur : undefined}
              onKeyPress={handleKeyPress}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                if (checkIsExternalVideoLink(e.target.value)) {
                  return
                }
                changeMessageAndState(e.target.value)
              }}
              onPaste={evt => onPasteFiles(evt)}
            />

            <Button disabled={disabledSubmit} className={styles.sendBtn} onClick={() => onSubmitMessageInternal()}>
              <div className={styles.sendBtnTextWrapper}>
                <p className={styles.sendBtnText}>{t(TranslationKey.Send)}</p>
                <SendIcon className={styles.sendBtnIcon} />
              </div>
            </Button>
          </div>

          {renderAdditionalButtons
            ? renderAdditionalButtons(
                {
                  message,
                  files,
                },
                resetAllInputs,
              )
            : undefined}
        </div>
      </>
    )
  },
)
