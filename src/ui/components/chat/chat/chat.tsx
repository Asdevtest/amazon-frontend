import TextField from '@mui/material/TextField'

// import TextareaAutosize from '@mui/base/TextareaAutosize'
import React, {FC, ReactElement, useEffect, useState, KeyboardEvent} from 'react'

import {InputAdornment, Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatContract} from '@models/chat-model/contracts'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {IFile} from '../multiple-chats'
import {ChatFilesInput} from './chat-files-input'
import {ChatMessagesList, ChatMessageUniversalHandlers} from './chat-messages-list'
import {useClassNames} from './chat.style'

export interface RenderAdditionalButtonsParams {
  message: string
  files: IFile[]
}

export interface MessageStateParams {
  message: string
  files: IFile[]
}

interface Props {
  chat: ChatContract
  messages: ChatMessageContract[]
  userId: string
  chatMessageHandlers?: ChatMessageUniversalHandlers
  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  onSubmitMessage: (message: string, files: IFile[]) => void
  updateData: () => void
  onTypingMessage: (chatId: string) => void
}

export const Chat: FC<Props> = observer(
  ({
    chat,
    messages,
    userId,
    chatMessageHandlers,
    onSubmitMessage,
    renderAdditionalButtons,
    updateData,
    onTypingMessage,
  }) => {
    const [showFiles, setShowFiles] = useState(false)

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
      SettingsModel.setChatMessageState({message: value, files}, chat._id)
    }

    const changeFilesAndState = (value: IFile[]) => {
      setFiles(value)
      SettingsModel.setChatMessageState({message, files: value}, chat._id)
    }

    const classNames = useClassNames()

    const resetAllInputs = () => {
      setMessage('')
      setFiles(() => [])
      SettingsModel.setChatMessageState({message: '', files: []}, chat._id)
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

    return (
      <div className={classNames.root}>
        <div className={classNames.scrollViewWrapper}>
          <ChatMessagesList userId={userId} messages={messages} handlers={chatMessageHandlers} />
        </div>
        <div className={classNames.bottomPartWrapper}>
          {showFiles ? <ChatFilesInput files={files} setFiles={changeFilesAndState} /> : null}

          <div className={classNames.inputWrapper}>
            {/* <TextareaAutosize
              multiline
              autoFocus
              id="outlined-multiline-flexible"
              size="small"
              className={clsx(classNames.input, {[classNames.inputFilled]: message || focused})}
              maxRows={6}
              placeholder={t(TranslationKey['Write a message'])}
              inputProps={{maxLength: 1000}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" classes={{root: classNames.endAdornment}}>
                    <div className={classNames.filesIconWrapper}>
                      <img
                        src={showFiles ? '/assets/icons/files-active.svg' : '/assets/icons/files.svg'}
                        className={classNames.inputIcon}
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
            /> */}

            <TextField
              multiline
              autoFocus
              type="text"
              id="outlined-multiline-flexible"
              size="small"
              className={clsx(classNames.input, {[classNames.inputFilled]: message || focused})}
              maxRows={6}
              placeholder={t(TranslationKey['Write a message'])}
              inputProps={{maxLength: 1000}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" classes={{root: classNames.endAdornment}}>
                    <div className={classNames.filesIconWrapper}>
                      <img
                        src={showFiles ? '/assets/icons/files-active.svg' : '/assets/icons/files.svg'}
                        className={classNames.inputIcon}
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
              {
                <div className={classNames.sendBtnTextWrapper}>
                  <Typography>{t(TranslationKey.Send)}</Typography>
                  <img src="/assets/icons/send.svg" className={classNames.sendBtnIcon} />
                </div>
              }
            </Button>
          </div>

          {renderAdditionalButtons ? renderAdditionalButtons({message, files}, resetAllInputs) : undefined}
        </div>
      </div>
    )
  },
)
