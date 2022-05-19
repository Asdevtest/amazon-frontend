import React, {FC, useEffect} from 'react'

import {ChatInputMode} from '../chat'
import {useClassNames} from './chat-links-input.style'

interface Props {
  links: string[]
  setLink: (index: number) => (value: string) => void
  setLinks: (array: string[]) => void
  inputMode: ChatInputMode
}

export const ChatLinksInput: FC<Props> = ({links, setLink, setLinks, inputMode}) => {
  const classNames = useClassNames()
  console.log('links ', links)

  useEffect(() => {
    if (inputMode === ChatInputMode.LINKS) {
      setLinks([...links.filter(el => el !== ''), ''])
    }
  }, [inputMode])

  return (
    <div className={classNames.root}>
      {links.map((link: string, index: number) => (
        <div key={`chatLinksInput_link_${index}`} className={classNames.linkWrapper}>
          <input
            value={link}
            className={classNames.linkInput}
            placeholder="Введите ссылку"
            onChange={e => setLink(index)(e.target.value)}
          />
        </div>
      ))}
    </div>
  )
}
