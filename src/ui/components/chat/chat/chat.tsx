import React, {FC, KeyboardEvent, useState} from 'react'

import {observer} from 'mobx-react'
import ReactMde from 'react-mde'
import 'react-mde/lib/styles/css/react-mde-all.css'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {Button} from '@components/buttons/button'

import {getTextFromMarkdown} from '@utils/text'

import {ChatMessagesList} from './chat-messages-list'
import {useClassNames} from './chat.style'

interface Props {
  messages: ChatMessageContract[]
  userId: string
  onSubmitMessage: (message: string) => void
}

export const Chat: FC<Props> = observer(({messages, userId, onSubmitMessage}) => {
  const [message, setMessage] = useState('')
  const [mdeSelectedTab, setMdeSelectedTab] = React.useState<'write' | 'preview'>('write')
  const classNames = useClassNames()

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onSubmitMessage(message)
      setMessage('')
      event.preventDefault()
    }
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.scrollViewWrapper}>
        <ChatMessagesList userId={userId} messages={messages} />
      </div>
      <div className={classNames.bottomPartWrapper}>
        <div className={classNames.textInputWrapper}>
          <ReactMde
            value={message}
            selectedTab={mdeSelectedTab}
            generateMarkdownPreview={markdown => Promise.resolve(getTextFromMarkdown(markdown))}
            maxEditorHeight={100}
            heightUnits="%"
            childProps={{
              textArea: {
                onKeyPress: handleKeyPress,
              },
            }}
            onChange={setMessage}
            onTabChange={setMdeSelectedTab}
          />
        </div>
        <div className={classNames.btnsWrapper}>
          <Button
            onClick={() => {
              onSubmitMessage(message)
              setMessage('')
            }}
          >
            Отправить сообщение
          </Button>
        </div>
      </div>
    </div>
  )
})
