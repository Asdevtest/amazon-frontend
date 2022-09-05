import React, {FC, ReactElement, useEffect, useState} from 'react'

import {observer} from 'mobx-react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import {ChatContract} from '@models/chat-model/contracts'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {SettingsModel} from '@models/settings-model'

import {Button} from '@components/buttons/button'

import {ChatFilesInput} from './chat-files-input'
import {ChatLinksInput} from './chat-links-input'
import {ChatMessagesList, ChatMessageUniversalHandlers} from './chat-messages-list'
import {ChatTextInput} from './chat-text-input'
import {useClassNames} from './chat.style'

export enum ChatInputMode {
  TEXT = 'TEXT',
  LINKS = 'LINKS',
  FILES = 'FILES',
}

export interface RenderAdditionalButtonsParams {
  message: string
  links: string[]
  files: any[]
}

export interface MessageStateParams {
  message: string
  links: string[]
  files: any[]
}

interface Props {
  chat: ChatContract
  messages: ChatMessageContract[]
  userId: string
  chatMessageHandlers?: ChatMessageUniversalHandlers
  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  onSubmitMessage: (message: string, links: string[], files: any[]) => void
  updateData: () => void
}

export const Chat: FC<Props> = observer(
  ({chat, messages, userId, chatMessageHandlers, onSubmitMessage, renderAdditionalButtons, updateData}) => {
    const [inputMode, setInputMode] = useState<ChatInputMode>(ChatInputMode.TEXT)

    const messageInitialState: MessageStateParams = SettingsModel.chatMessageState?.[chat._id] || {
      message: '',
      links: [],
      files: [],
    }

    const [message, setMessage] = useState(messageInitialState.message)
    const [links, setLinks] = useState<string[]>(messageInitialState.links)
    const [files, setFiles] = useState<any[]>(messageInitialState.files)

    const changeMessageAndState = (value: string) => {
      setMessage(value)
      SettingsModel.setChatMessageState({message: value, links, files}, chat._id)
    }

    const changeLinksAndState = (value: string[]) => {
      setLinks(value)
      SettingsModel.setChatMessageState({message, links: value, files}, chat._id)
    }

    const changeFilesAndState = (value: any[]) => {
      setFiles(value)
      SettingsModel.setChatMessageState({message, links, files: value}, chat._id)
    }

    const classNames = useClassNames()

    const resetAllInputs = () => {
      setMessage('')
      setLinks(() => [])
      setFiles(() => [])
      SettingsModel.setChatMessageState({message: '', links: [], files: []}, chat._id)

      setInputMode(ChatInputMode.FILES) // КОСТЫЛЬ
      setTimeout(() => setInputMode(ChatInputMode.TEXT)) // СКИДЫВАЕТ СЧЕТЧИКИ С ИКОНКИ ФАЙЛОВ И ССЫЛОК
    }

    const onSubmitMessageInternal = () => {
      onSubmitMessage(message, links, files)
      resetAllInputs()
    }

    const setLink = (index: number) => (value: string) => {
      const linksNewState = [...links]
      linksNewState[index] = value
      if (index === linksNewState.length - 1) {
        linksNewState[index + 1] = ''
      }
      setLinks(
        linksNewState.filter((link: string, linksNewStateIndex: number) =>
          linksNewStateIndex !== linksNewState.length - 1 ? !!link : true,
        ),
      )
    }

    useEffect(() => {
      if (updateData && messages?.[messages.length - 1]?.text === 'PROPOSAL_STATUS_CHANGED') {
        updateData()
      }
    }, [messages?.length])

    useEffect(() => {
      setMessage(messageInitialState.message)
      setLinks(messageInitialState.links)
      setFiles(messageInitialState.files)

      setInputMode(ChatInputMode.LINKS) // КОСТЫЛЬ
      setTimeout(() => setInputMode(ChatInputMode.TEXT)) // СКИДЫВАЕТ СЧЕТЧИКИ
    }, [chat?._id])

    return (
      <div className={classNames.root}>
        <div className={classNames.scrollViewWrapper}>
          <ChatMessagesList userId={userId} messages={messages} handlers={chatMessageHandlers} />
        </div>
        <div className={classNames.bottomPartWrapper}>
          {(() => {
            switch (inputMode) {
              case ChatInputMode.TEXT:
                return (
                  <ChatTextInput
                    links={links}
                    files={files}
                    message={message}
                    setMessage={changeMessageAndState}
                    setInputMode={setInputMode}
                    onSubmitKeyPress={onSubmitMessageInternal}
                  />
                )
              case ChatInputMode.FILES:
                return <ChatFilesInput files={files} setFiles={changeFilesAndState} />
              case ChatInputMode.LINKS:
                return (
                  <ChatLinksInput
                    links={links}
                    setLink={setLink}
                    setLinks={changeLinksAndState}
                    inputMode={inputMode}
                  />
                )
            }
          })()}
          <div className={classNames.btnsWrapper}>
            {inputMode === ChatInputMode.TEXT && renderAdditionalButtons
              ? renderAdditionalButtons({message, links, files}, resetAllInputs)
              : undefined}

            {(inputMode === ChatInputMode.FILES || inputMode === ChatInputMode.LINKS) && (
              <Button className={classNames.backBtn} onClick={() => setInputMode(ChatInputMode.TEXT)}>
                {'Назад'}
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
              {inputMode === ChatInputMode.TEXT ? 'Отправить сообщение' : 'Прикрепить'}
            </Button>
          </div>
        </div>
      </div>
    )
  },
)
