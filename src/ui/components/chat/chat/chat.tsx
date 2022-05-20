import React, {FC, ReactElement, useState} from 'react'

import {observer} from 'mobx-react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

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

interface Props {
  messages: ChatMessageContract[]
  userId: string
  chatMessageHandlers?: ChatMessageUniversalHandlers
  renderAdditionalButtons?: (params: RenderAdditionalButtonsParams, resetAllInputs: () => void) => ReactElement
  onSubmitMessage: (message: string, links: string[], files: any[]) => void
}

export const Chat: FC<Props> = observer(
  ({messages, userId, chatMessageHandlers, onSubmitMessage, renderAdditionalButtons}) => {
    const [inputMode, setInputMode] = useState<ChatInputMode>(ChatInputMode.TEXT)
    const [message, setMessage] = useState('')
    const [links, setLinks] = useState<string[]>([])
    const [files, setFiles] = useState<any[]>([])
    const classNames = useClassNames()

    const resetAllInputs = () => {
      setMessage('')
      setLinks([])
      setFiles([])
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
                    message={message}
                    setMessage={setMessage}
                    setInputMode={setInputMode}
                    onSubmitKeyPress={onSubmitMessageInternal}
                  />
                )
              case ChatInputMode.FILES:
                return <ChatFilesInput files={files} setFiles={setFiles} />
              case ChatInputMode.LINKS:
                return <ChatLinksInput links={links} setLink={setLink} setLinks={setLinks} inputMode={inputMode} />
            }
          })()}
          <div className={classNames.btnsWrapper}>
            {inputMode === ChatInputMode.TEXT && renderAdditionalButtons
              ? renderAdditionalButtons({message, links, files}, resetAllInputs)
              : undefined}
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
