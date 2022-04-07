import React, {FC, useState} from 'react'

import {observer} from 'mobx-react'
import 'react-mde/lib/styles/css/react-mde-all.css'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {Button} from '@components/buttons/button'

import {ChatLinksInput} from './chat-links-input'
import {ChatMessagesList} from './chat-messages-list'
import {ChatTextInput} from './chat-text-input'
import {useClassNames} from './chat.style'

export enum ChatInputMode {
  TEXT = 'TEXT',
  LINKS = 'LINKS',
  FILES = 'FILES',
}

interface Props {
  messages: ChatMessageContract[]
  userId: string
  onSubmitMessage: (message: string, links: string[], files: string[]) => void
}

export const Chat: FC<Props> = observer(({messages, userId, onSubmitMessage}) => {
  const [inputMode, setInputMode] = useState<ChatInputMode>(ChatInputMode.TEXT)
  const [message, setMessage] = useState('')
  const [links, setLinks] = useState<string[]>([''])
  const [files, setFiles] = useState<string[]>([])
  const classNames = useClassNames()

  const onSubmitMessageInternal = () => {
    onSubmitMessage(message, links, files)
    setMessage('')
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
        <ChatMessagesList userId={userId} messages={messages} />
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
              return <div />
            case ChatInputMode.LINKS:
              return <ChatLinksInput links={links} setLink={setLink} />
          }
        })()}
        <div className={classNames.btnsWrapper}>
          <Button
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
})
