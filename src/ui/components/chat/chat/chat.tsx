/* eslint-disable @typescript-eslint/no-explicit-any */

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
import { PaginationDirection } from '@constants/pagination/pagination-direction'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatModel } from '@models/chat-model'
import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { CircleSpinner } from '@components/shared/circle-spinner'
import { EmojiIcon, FileIcon, HideArrowIcon, SendIcon } from '@components/shared/svg-icons'

import { checkIsExternalVideoLink } from '@utils/checks'
import { t } from '@utils/translations'

import { UploadFileType } from '@typings/shared/upload-file'

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
  requestStatus: loadingStatuses
  headerChatComponent?: (...args: { [key: string]: any }[]) => ReactElement
  onChangeRequestStatus: (status: loadingStatuses) => void
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
    headerChatComponent,
    onSubmitMessage,
    renderAdditionalButtons,
    updateData,
    onTypingMessage,
    onClickAddUsersToGroupChat,
    onRemoveUsersFromGroupChat,
    onClickEditGroupChatInfo,
    isFreelanceOwner,
    classNamesWrapper,
    requestStatus,
    onChangeRequestStatus,
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
      disabledSubmit,

      onPasteFiles,
      onFocus,
      onBlur,
      changeMessageAndState,
      resetAllInputs,
      changeFilesAndState,
    } = useChatInputControl(messageInitialState)

    const START_INDEX = Math.max(chat?.messagesCount || 0, 1000000000)
    const prevChatId = usePrevious(chat?._id)

    const messageInput = useRef<HTMLTextAreaElement | null>(null)
    const messagesWrapperRef = useRef<VirtuosoHandle | undefined>(null)
    const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    const [isShowChatInfo, setIsShowChatInfo] = useState(false)
    const [isShowScrollToBottomBtn, setIsShowScrollToBottomBtn] = useState(false)
    const [isSendTypingPossible, setIsSendTypingPossible] = useState(true)

    const [messageToReply, setMessageToReply] = useState<null | ChatMessageContract>(null)
    const [messageToScroll, setMessageToScroll] = useState<number | undefined>(undefined)
    const [firstItemIndex, setFirstItemIndex] = useState(START_INDEX - messages.length)

    const [messageToFind, setMessageToFind] = useState<number | undefined>(undefined)

    const isGroupChat = chat.type === chatsType.GROUP && !isFreelanceOwner
    const userContainedInChat = chat.users.some(el => el._id === userId)

    // FIXME: Костыль
    // Описание костыля: если в чате нет выбранного replyMessage, фронт делает запрос, оно загружается, но массив сообщений не успевает обновится => messageIndex === -1
    // Чтобы избегать, был создан стейт messageToFind, в котором хранится индекс выбранного сообщения, когда массив сообщений обновляется
    // Только тогда происходит проскролл к нужному сообщению
    // Как исправить: возможно поможет уйти от хранения сообщения в объекте чата
    const handleLoadMoreMessages = async (direction?: PaginationDirection, selectedMessageId?: string) => {
      if (requestStatus === loadingStatuses.IS_LOADING) {
        return
      }

      onChangeRequestStatus(loadingStatuses.IS_LOADING)
      if (selectedMessageId) {
        const result = await ChatModel.getChatMessage(chat?._id, selectedMessageId)

        if (result?.isExist) {
          scrollToMessage(result?.messageIndex)
        } else if (!result?.isExist) {
          setMessageToFind(result?.messageIndex)
        }
      } else {
        await ChatModel.getChatMessages?.(chat?._id, direction)

        if (direction === PaginationDirection.NEXT) {
          setFirstItemIndex(START_INDEX - messages.length)
        }
      }
      onChangeRequestStatus(loadingStatuses.SUCCESS)
    }

    // FIXME
    useEffect(() => {
      if (messageToFind !== undefined && messageToFind !== -1) {
        scrollToMessage(messageToFind)
        setFirstItemIndex(START_INDEX - messages.length)
      }
    }, [messages])

    const handleScrollToBottomButtonVisibility = (bottomState: boolean) => setIsShowScrollToBottomBtn(!bottomState)

    const onClickScrollToBottom = async () => {
      if (!messagesWrapperRef.current) return

      if (!chat.isAllPreviousMessagesLoaded) {
        onChangeRequestStatus(loadingStatuses.IS_LOADING)

        await ChatModel.getChatMessages?.(chat?._id, PaginationDirection.START)
        setFirstItemIndex(START_INDEX - messages.length)

        onChangeRequestStatus(loadingStatuses.SUCCESS)
      }

      messagesWrapperRef.current?.scrollToIndex({ index: 'LAST' })
    }

    const onSubmitMessageInternal = async () => {
      setMessageToReply(null)
      resetAllInputs()
      await onClickScrollToBottom()
      onSubmitMessage(message.trim(), files, messageToReply ? messageToReply._id : null)
    }

    const handleKeyPress = (event: KeyboardEvent<HTMLElement>) => {
      if (!isTabletResolution && !disabledSubmit && event.key === 'Enter' && !event.shiftKey) {
        onSubmitMessageInternal()
        event.preventDefault()
      }
    }

    const scrollToMessage = (messageIndex: number) => {
      if (messagesWrapperRef?.current) {
        if (highlightTimerRef.current) {
          clearTimeout(highlightTimerRef.current)
        }

        messagesWrapperRef.current.scrollToIndex({ index: messageIndex })
        setMessageToScroll(messageIndex)
        setMessageToFind(undefined)

        highlightTimerRef.current = setTimeout(() => {
          setMessageToScroll(undefined)
        }, 1000)
      }
    }

    useEffect(() => {
      if (isSendTypingPossible && message) {
        onTypingMessage(chat?._id)
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
        ChatModel.getChatMessages?.(chat?._id, PaginationDirection.START)
      }

      setMessage(messageInitialState.message)
      setFiles(messageInitialState.files)
      setIsShowChatInfo(false)

      return () => {
        setMessageToReply(null)
      }
    }, [chat?._id])

    useEffect(() => {
      if (toScrollMesId) {
        handleLoadMoreMessages(undefined, toScrollMesId)
      }
    }, [toScrollMesId])

    if (prevChatId !== chat?._id && prevChatId !== undefined) {
      return null
    }

    return (
      <>
        {headerChatComponent ? headerChatComponent({ handleLoadMoreMessages }) : null}

        <div className={cx(styles.scrollViewWrapper, classNamesWrapper)}>
          {requestStatus === loadingStatuses.IS_LOADING && (
            <div className={styles.spinnerContainer}>
              <CircleSpinner />
            </div>
          )}

          <ChatMessagesList
            chat={chat}
            messagesWrapperRef={messagesWrapperRef}
            isGroupChat={isGroupChat}
            userId={userId}
            messages={messages}
            isShowChatInfo={isShowChatInfo}
            handlers={chatMessageHandlers}
            messagesFound={messagesFound}
            searchPhrase={searchPhrase}
            messageToScroll={messageToScroll}
            isFreelanceOwner={isFreelanceOwner}
            setMessageToReply={setMessageToReply}
            firstItemIndex={firstItemIndex}
            handleLoadMoreMessages={handleLoadMoreMessages}
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
