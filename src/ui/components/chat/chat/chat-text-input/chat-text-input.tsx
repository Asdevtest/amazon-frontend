import React, {FC, KeyboardEvent} from 'react'

import ReactMde, {Command} from 'react-mde'
import {GetIcon} from 'react-mde/lib/definitions/types'

import {getTextFromMarkdown} from '@utils/text'

import {ChatInputMode} from '../chat'
import {useClassNames} from './chat-text-input.style'

interface Props {
  files: any[]
  links: string[]
  message: string
  setMessage: (message: string) => void
  setInputMode: (inputMode: ChatInputMode) => void
  onSubmitKeyPress: () => void
}

export const ChatTextInput: FC<Props> = ({links, files, message, setMessage, setInputMode, onSubmitKeyPress}) => {
  const [mdeSelectedTab, setMdeSelectedTab] = React.useState<'write' | 'preview'>('write')
  const classNames = useClassNames()

  const handleKeyPress = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      onSubmitKeyPress()
      event.preventDefault()
    }
  }

  const linkCommand: Command = {
    icon: (getIconFromProvider: GetIcon) => (
      <div className={classNames.iconWrapper}>
        {getIconFromProvider('link')}
        {links.filter(link => !!link).length ? (
          <div className={classNames.badge}>{links.filter(link => !!link).length}</div>
        ) : undefined}
      </div>
    ),
    execute: () => {
      setInputMode(ChatInputMode.LINKS)
    },
  }

  const fileCommand: Command = {
    icon: (getIconFromProvider: GetIcon) => (
      <div className={classNames.iconWrapper}>
        {getIconFromProvider('image')}
        {files.length ? <div className={classNames.badge}>{files.length}</div> : undefined}
      </div>
    ),
    execute: () => {
      setInputMode(ChatInputMode.FILES)
    },
  }

  return (
    <div className={classNames.root}>
      <ReactMde
        value={message}
        selectedTab={mdeSelectedTab}
        generateMarkdownPreview={markdown => Promise.resolve(getTextFromMarkdown(markdown))}
        maxEditorHeight={100}
        heightUnits="%"
        commands={{
          link: linkCommand,
          file: fileCommand,
        }}
        toolbarCommands={[
          ['header', 'bold', 'italic', 'strikethrough'],
          ['link', 'quote', 'code', 'file'],
        ]}
        childProps={{
          textArea: {
            onKeyPress: handleKeyPress,
          },
        }}
        onChange={setMessage}
        onTabChange={setMdeSelectedTab}
      />
    </div>
  )
}
