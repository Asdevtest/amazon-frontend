import React, {FC} from 'react'

import {useClassNames} from './chat-links-input.style'

interface Props {
  links: string[]
  setLink: (index: number) => (value: string) => void
}

export const ChatLinksInput: FC<Props> = ({links, setLink}) => {
  const classNames = useClassNames()
  console.log('links ', links)
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
