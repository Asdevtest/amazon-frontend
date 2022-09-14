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
  changeFilesAndState: (files: any[]) => void
}

export const ChatTextInput: FC<Props> = ({
  links,
  files,
  message,
  setMessage,
  setInputMode,
  onSubmitKeyPress,
  changeFilesAndState,
}) => {
  // const [mdeSelectedTab, setMdeSelectedTab] = React.useState<'write' | 'preview'>('write')
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

  const onPasteFiles = async (evt: any) => {
    if (evt.clipboardData.files.length === 0) {
      return
    } else {
      const filesArr = Array.from(evt.clipboardData.files)

      evt.preventDefault()

      const readyFilesArr: any[] = filesArr.map((el: any) => ({
        data_url: URL.createObjectURL(el),
        file: new File([el], el.name?.replace(/ /g, ''), {
          type: el.type,
          lastModified: el.file?.lastModified,
        }),
      }))

      setInputMode(ChatInputMode.FILES)

      changeFilesAndState([...files, ...readyFilesArr])
    }
  }

  return (
    <div className={classNames.root}>
      <ReactMde
        value={message}
        // selectedTab={mdeSelectedTab}
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
            autoFocus: true,
            maxlength: '1000',
            onKeyPress: handleKeyPress,
            onPaste: evt => onPasteFiles(evt),
          },
        }}
        onChange={e => setMessage(e)}
        // onTabChange={setMdeSelectedTab}
      />
    </div>
  )
}
