import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { cx } from '@emotion/css'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ArrowRightOutlinedIcon from '@mui/icons-material/ArrowRightOutlined'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined'
import { InputAdornment, Typography, ClickAwayListener, Avatar } from '@mui/material'
import TextField from '@mui/material/TextField'

import React, { FC, ReactElement, useEffect, useState, KeyboardEvent, useContext } from 'react'

import { observer } from 'mobx-react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import { chatsType } from '@constants/keys/chats'
import { UiTheme } from '@constants/theme/themes'
import { TranslationKey } from '@constants/translations/translation-key'

import { ChatContract } from '@models/chat-model/contracts'
import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'
import { SettingsModel } from '@models/settings-model'

import { Button } from '@components/shared/buttons/button'
import { MemberPlus, Pencil } from '@components/shared/svg-icons'

import { getUserAvatarSrc } from '@utils/get-user-avatar'
import { t } from '@utils/translations'

import { ChatRequestAndRequestProposalContext } from '@contexts/chat-request-and-request-proposal-context'

import { CurrentOpponent, IFile } from '../multiple-chats'
import { ChatFilesInput } from './chat-files-input'
import { ChatMessagesList, ChatMessageUniversalHandlers } from './chat-messages-list'
import { useClassNames } from './chat.style'

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
  onSubmitMessage: (message: string, files: IFile[]) => void
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
    const [showFiles, setShowFiles] = useState(false)

    const [showEmojis, setShowEmojis] = useState(false)

    const [showGroupSettings, setShowGroupSettings] = useState(false)

    const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

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
      if (isSendTypingPossible && message) {
        onTypingMessage(chat._id)
        setIsSendTypingPossible(false)
        setTimeout(() => setIsSendTypingPossible(true), 3000)
      }
    }, [message])

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
      onSubmitMessage(message, files)
      resetAllInputs()
    }

    useEffect(() => {
      if (updateData && messages?.[messages.length - 1]?.text === 'PROPOSAL_STATUS_CHANGED') {
        updateData()
      }
    }, [messages?.length])

    useEffect(() => {
      setMessage(messageInitialState.message)
      setFiles(messageInitialState.files.some(el => !el.file.size) ? [] : messageInitialState.files)
      setShowGroupSettings(false)
    }, [chat?._id])

    useEffect(() => {
      if (files?.length) {
        setShowFiles(true)
      } else {
        setShowFiles(false)
      }
    }, [files?.length])

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

    const disabledSubmit = !message.replace(/\n/g, '') && !files.length

    const userContainedInChat = chat.users.some(el => el._id === userId)

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
            isGroupChat={isGroupChat}
            userId={userId}
            messages={messages}
            handlers={chatMessageHandlers}
            toScrollMesId={toScrollMesId}
            messagesFound={messagesFound}
            searchPhrase={searchPhrase}
          />

          {isGroupChat && Object.keys(chatRequestAndRequestProposal).length === 0 ? (
            <div
              className={cx(classNames.hideAndShowIconWrapper, { [classNames.hideAndShowIcon]: showGroupSettings })}
              onClick={() => setShowGroupSettings(!showGroupSettings)}
            >
              {showGroupSettings ? (
                <div className={classNames.collapseWrapper}>
                  <Typography className={classNames.collapseText}>{t(TranslationKey.Hide)}</Typography>

                  <ArrowRightOutlinedIcon className={classNames.arrowIcon} />
                </div>
              ) : (
                <MoreVertOutlinedIcon className={classNames.arrowIcon} />
              )}
            </div>
          ) : null}
          {showGroupSettings ? (
            <div className={classNames.groupSettingsWrapper}>
              <div className={classNames.groupSettingsImageWrapper}>
                <img src={chat.info?.image || '/assets/img/no-photo.jpg'} className={classNames.groupSettingsImage} />
                <div className={classNames.groupSettingsImageShadow}></div>

                <div className={classNames.groupSettingsInfoWrapper}>
                  <div>
                    <Typography className={classNames.groupSettingsInfoTitle}>{chat.info?.title}</Typography>
                    <Typography className={classNames.usersCount}>{`${chat.users?.length} ${t(
                      TranslationKey.Members,
                    ).toLocaleLowerCase()}`}</Typography>
                  </div>

                  {userId === chat.info?.createdBy ? (
                    <Pencil className={classNames.pencilEditIcon} onClick={onClickEditGroupChatInfo} />
                  ) : null}
                </div>
              </div>

              {userId === chat.info?.createdBy ? (
                <Button onClick={onClickAddUsersToGroupChat}>
                  <div className={classNames.addMemberBtnWrapper}>
                    <Typography className={classNames.addMemberBtnText}>{t(TranslationKey['Add member'])}</Typography>

                    <MemberPlus className={classNames.arrowIcon} />
                  </div>
                </Button>
              ) : null}

              <div className={classNames.membersWrapper}>
                {chat.users
                  .slice()
                  .sort((a, b) => Number(b._id === chat.info?.createdBy) - Number(a._id === chat.info?.createdBy))
                  .map(el => (
                    <div key={el._id} className={classNames.memberWrapper}>
                      <div className={classNames.memberInfo}>
                        <Avatar src={getUserAvatarSrc(el._id)} className={classNames.avatarWrapper} />
                        <Typography className={classNames.opponentName}>{el?.name}</Typography>
                        {el._id === chat.info?.createdBy ? (
                          <Typography className={classNames.ownerSign}>{`(${t(TranslationKey.Owner)})`}</Typography>
                        ) : null}
                      </div>

                      {el._id !== chat.info?.createdBy && userId === chat.info?.createdBy ? (
                        <CloseOutlinedIcon
                          className={classNames.pencilEditIcon}
                          fontSize="small"
                          onClick={() => onRemoveUsersFromGroupChat([el._id])}
                        />
                      ) : null}
                    </div>
                  ))}
              </div>
            </div>
          ) : null}
        </div>
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
