import SearchIcon from '@mui/icons-material/Search'
import TextField from '@mui/material/TextField'

import React, {FC, ReactElement, useEffect, useState} from 'react'

import {InputAdornment} from '@material-ui/core'
import {observer} from 'mobx-react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import {TranslationKey} from '@constants/translations/translation-key'

import {ChatContract} from '@models/chat-model/contracts'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'

import {t} from '@utils/translations'

import {ChatFilesInput} from './chat-files-input'
import {ChatMessagesList, ChatMessageUniversalHandlers} from './chat-messages-list'
import {ChatTextInput} from './chat-text-input'
import {useClassNames} from './chat.style'

export enum ChatInputMode {
  TEXT = 'TEXT',
  FILES = 'FILES',
}

export interface RenderAdditionalButtonsParams {
  message: string
  files: any[]
}

export interface MessageStateParams {
  message: string
  files: any[]
}

interface Props {
  chat: ChatContract
  messages: ChatMessageContract[]
  userId: string
  chatMessageHandlers?: ChatMessageUniversalHandlers
  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  onSubmitMessage: (message: string, files: any[]) => void
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
    const [inputMode, setInputMode] = useState<ChatInputMode>(ChatInputMode.TEXT)

    const messageInitialState: MessageStateParams = SettingsModel.chatMessageState?.[chat._id] || {
      message: '',
      files: [],
    }

    const [message, setMessage] = useState(messageInitialState.message)

    const [files, setFiles] = useState<any[]>(
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

    const changeFilesAndState = (value: any[]) => {
      setFiles(value)
      SettingsModel.setChatMessageState({message, files: value}, chat._id)
    }

    const classNames = useClassNames()

    const resetAllInputs = () => {
      setMessage('')
      setFiles(() => [])
      SettingsModel.setChatMessageState({message: '', files: []}, chat._id)

      setInputMode(ChatInputMode.FILES) // КОСТЫЛЬ
      setTimeout(() => setInputMode(ChatInputMode.TEXT)) // СКИДЫВАЕТ СЧЕТЧИКИ С ИКОНКИ ФАЙЛОВ И ССЫЛОК
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

      setInputMode(ChatInputMode.FILES) // КОСТЫЛЬ
      setTimeout(() => setInputMode(ChatInputMode.TEXT)) // СКИДЫВАЕТ СЧЕТЧИКИ
    }, [chat?._id])

    return (
      <div className={classNames.root}>
        <div className={classNames.scrollViewWrapper}>
          <ChatMessagesList userId={userId} messages={messages} handlers={chatMessageHandlers} />
        </div>
        <div className={classNames.bottomPartWrapper}>
          {/* {(() => {
            switch (inputMode) {
              case ChatInputMode.TEXT:
                return (
                  <ChatTextInput
                    files={files}
                    message={message}
                    setMessage={changeMessageAndState}
                    setInputMode={setInputMode}
                    changeFilesAndState={changeFilesAndState}
                    onSubmitKeyPress={onSubmitMessageInternal}
                  />
                )
              case ChatInputMode.FILES:
                return <ChatFilesInput files={files} setFiles={changeFilesAndState} />
            }
          })()} */}

          <ChatFilesInput files={files} setFiles={changeFilesAndState} />

          <TextField
            // multiline
            id="outlined-multiline-flexible"
            maxRows={6}
            inputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
            // endAdornment={
            //   <InputAdornment position="start">
            //     <SearchIcon color="primary" />
            //   </InputAdornment>
            // }
            value={message}
            onChange={(e: any) => changeMessageAndState(e.target.value)}
          />

          <div className={classNames.btnsWrapper}>
            {inputMode === ChatInputMode.TEXT && renderAdditionalButtons
              ? renderAdditionalButtons({message, files}, resetAllInputs)
              : undefined}

            {inputMode === ChatInputMode.FILES && (
              <Button className={classNames.backBtn} onClick={() => setInputMode(ChatInputMode.TEXT)}>
                {t(TranslationKey.Back)}
              </Button>
            )}

            <Button
              disabled={!message && inputMode === ChatInputMode.TEXT && !files.length}
              onClick={() => {
                if (inputMode === ChatInputMode.TEXT) {
                  onSubmitMessageInternal()
                } else {
                  setInputMode(ChatInputMode.TEXT)
                }
              }}
            >
              {inputMode === ChatInputMode.TEXT ? t(TranslationKey['Send message']) : t(TranslationKey['Attach file'])}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)
