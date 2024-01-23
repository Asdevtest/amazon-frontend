/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { ChangeEvent, FC, KeyboardEvent, ReactElement, Ref, memo, useEffect, useRef, useState } from 'react'
import 'react-mde/lib/styles/css/react-mde-all.css'
import { ListRange, VirtuosoHandle } from 'react-virtuoso'

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
import { MessageStateParams, OnEmojiSelectEvent, RenderAdditionalButtonsParams } from './helpers/chat.interface'
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

    const messageInput = useRef<HTMLTextAreaElement | null>(null)
    const messagesWrapperRef = useRef<VirtuosoHandle | undefined>(null)

    console.log('messagesWrapperRef', messagesWrapperRef)

    const chatBottomRef = useRef<HTMLDivElement | null>(null)

    const messageInitialState: MessageStateParams = {
      message: '',
      files: [],
    }

    const [message, setMessage] = useState(messageInitialState.message)
    const [files, setFiles] = useState<UploadFileType[]>(messageInitialState.files)

    const [focused, setFocused] = useState(false)
    const [showFiles, setShowFiles] = useState(false)
    const [isShowEmojis, setIsShowEmojis] = useState(false)
    const [isShowChatInfo, setIsShowChatInfo] = useState(false)
    const [isShowScrollToBottomBtn, setIsShowScrollToBottomBtn] = useState(false)
    const [isSendTypingPossible, setIsSendTypingPossible] = useState(true)

    const [lastReadedMessage, setLastReadedMessage] = useState<ChatMessageContract>()
    const [unreadMessages, setUnreadMessages] = useState<null | ChatMessageContract[]>([])

    const [messageToReply, setMessageToReply] = useState<null | ChatMessageContract>(null)
    const [messageToScroll, setMessageToScroll] = useState<null | ChatMessageContract>(null)

    const prevChatId = usePrevious(chat?._id)

    const disabledSubmit = !message.trim() && !files.length
    const isGroupChat = chat.type === chatsType.GROUP && !isFreelanceOwner
    const userContainedInChat = chat.users.some(el => el._id === userId)

    const onFocus = () => setFocused(true)
    const onBlur = () => setFocused(false)

    //

    const handleScrollToBottomButtonVisibility = (range: ListRange) => {
      if (range && range.endIndex + 1 !== 1000) {
        chatBottomRef?.current?.style.setProperty('display', 'flex')
      } else {
        chatBottomRef?.current?.style.setProperty('display', 'none')
      }
    }

    // const handleLoadMoreMessages = (e: Event) => {
    //   const target = e.target as HTMLDivElement

    //   if (target.scrollTop && target.scrollTop < 350 && !messagesLoadingStatus.current) {
    //     messagesLoadingStatus.current = true
    //     ChatModel.getChatMessages?.(chat?._id).finally(() => {
    //       messagesLoadingStatus.current = false
    //     })
    //   }
    // }

    useEffect(() => {
      const handleScroll = (e: Event) => {
        // handleLoadMoreMessages(e)
      }
    }, [chat?._id])

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

      // if (messages?.length > 0 && messagesWrapperRef.current) {
      //   const currentScrollPosition = toFixed(
      //     messagesWrapperRef.current.scrollTop + messagesWrapperRef.current.clientHeight,
      //   )
      //   const scrolledFromBottom = messagesWrapperRef.current.scrollHeight - currentScrollPosition

      //   if (
      //     scrolledFromBottom > messagesWrapperRef.current.clientHeight &&
      //     messages.at(-1)?._id !== lastReadedMessage?._id
      //   ) {
      //     const lastReadedMessageIndex = messages.findIndex(el => el._id === lastReadedMessage?._id)
      //     setUnreadMessages(
      //       messages.slice(lastReadedMessageIndex + 1, messages.length).filter(el => el.user?._id !== userId),
      //     )
      //   } else {
      //     setUnreadMessages([])
      //     setLastReadedMessage(messages[messages.length - 1])
      //   }
      // }
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

    const changeMessageAndState = (value: string) => {
      setMessage(value)
    }
    const changeFilesAndState = (value: UploadFileType[]) => {
      setFiles(value)
    }

    const resetAllInputs = () => {
      setMessage('')
      setFiles(() => [])
    }

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

    const onPasteFiles = async (evt: React.ClipboardEvent) => {
      const сopiedText = evt.clipboardData.getData('Text')

      if (checkIsExternalVideoLink(сopiedText)) {
        setShowFiles(true)
        changeFilesAndState([...files, сopiedText])
      } else if (evt.clipboardData.files.length === 0) {
        return
      } else {
        const filesArr = Array.from(evt.clipboardData.files)

        const filesAlowLength = 50 - files.length

        evt.preventDefault()

        const readyFilesArr: UploadFileType[] = filesArr.map((el: File) => ({
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
      messagesWrapperRef.current?.scrollToIndex({ index: 'LAST' })

      // if (unreadMessages?.length) {
      //   setMessageToScroll({ ...unreadMessages[0] })
      // } else {
      //   setMessageToScroll({ ...messages.at(-1)! })
      // }
      // setUnreadMessages([])
    }

    useEffect(() => {
      setMessageToScroll(toScrollMesId ? messages.find(el => el._id === toScrollMesId) || null : null)
    }, [toScrollMesId])

    if (prevChatId !== chat?._id) {
      return null
    }

    return (
      <>
        <div className={cx(styles.scrollViewWrapper, classNamesWrapper)}>
          <ChatMessagesList
            chatId={chat._id}
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
            setMessageToScroll={setMessageToScroll}
            setMessageToReply={setMessageToReply}
            handleScrollToBottomButtonVisibility={handleScrollToBottomButtonVisibility}
          />

          <div className={styles.hideAndShowIconWrapper} onClick={() => setIsShowChatInfo(!isShowChatInfo)}>
            {isShowChatInfo ? (
              <HideArrowIcon className={cx(styles.arrowIcon, styles.hideArrow)} />
            ) : (
              <MoreVertOutlinedIcon className={styles.arrowIcon} />
            )}
          </div>

          {/* {isShowScrollToBottomBtn && ( */}
          <div
            ref={chatBottomRef}
            className={cx(styles.scrollToBottom, {
              [styles.scrollToBottomRight]: isShowChatInfo,
              [styles.hideElement]: isShowChatInfo && isTabletResolution,
            })}
            onClick={onClickScrollToBottom}
          >
            <KeyboardArrowDownIcon />
            {!!unreadMessages?.length && <div className={styles.scrollToBottomBadge}>{unreadMessages?.length}</div>}
          </div>
          {/* )} */}

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
