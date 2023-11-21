import { cx } from '@emotion/css'
import he from 'he'
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'
import Highlighter from 'react-highlight-words'
import Linkify from 'react-linkify-always-blank'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

import { ChatMessageFiles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files'
import { ImagesTile } from '@components/chat/chat/chat-messages-list/chat-messages/images-tile/images-tile'
import { IsReadIcon, NoReadIcon } from '@components/shared/svg-icons'
import { UserLink } from '@components/user/user-link'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'
import { imagesRegex } from '@utils/text'

import { useClassNames } from './chat-message-basic-text.style'

interface Props {
  showName: boolean
  message: ChatMessageContract
  isIncomming: boolean
  unReadMessage: boolean
  isFound?: boolean
  searchPhrase?: string
}

interface SingleTextWordsWithPos {
  word: string
  index: number
}

interface HighlightTag {
  children: string
  highlightIndex: number
}

interface Chunk {
  start: number
  end: number
}

interface FindChunksProps {
  searchWords: string[]
  textToHighlight: string
}

const findChunks = ({ searchWords, textToHighlight }: FindChunksProps) => {
  const chunks: Chunk[] = []
  const textLow = textToHighlight.toLowerCase()
  const sep = /[\s]+/

  const singleTextWords = textLow.split(sep)

  let fromIndex = 0
  const singleTextWordsWithPos = singleTextWords.map((s: string) => {
    const indexInWord = textLow.indexOf(s, fromIndex)
    fromIndex = indexInWord
    return {
      word: s,
      index: indexInWord,
    }
  })

  searchWords.forEach((sw: string) => {
    const swLow = sw.toLowerCase()
    singleTextWordsWithPos.forEach((s: SingleTextWordsWithPos) => {
      if (s.word.includes(swLow)) {
        const start = s.index
        const end = s.index + s.word.length
        chunks.push({
          start,
          end,
        })
      }
    })
  })

  return chunks
}

export const ChatMessageBasicText: FC<Props> = observer(
  ({ message, isIncomming, unReadMessage, isFound, searchPhrase, showName }) => {
    const { classes: classNames } = useClassNames()
    const [photoFiles, setPhotoFiles] = useState(() => [
      ...message.files.filter(url => imagesRegex.test(url)),
      ...message.images,
    ])
    const [anotherFiles, setAnotherFiles] = useState(() => message.files.filter(url => !imagesRegex.test(url)))

    useEffect(() => {
      setPhotoFiles([...message.files.filter(url => imagesRegex.test(url)), ...message.images])
      setAnotherFiles(message.files.filter(url => !imagesRegex.test(url)))
    }, [message])

    // console.log('isIncomming', isIncomming)
    // console.log('isFound', isFound)

    console.log('findChunks', findChunks)

    return (
      <div
        className={cx(
          classNames.root,
          { [classNames.rootIsIncomming]: isIncomming },
          { [classNames.isFound]: isFound },
          { [classNames.isFoundIncomming]: isFound && isIncomming },
        )}
      >
        <div className={classNames.subWrapper}>
          {showName ? <UserLink name={message.user?.name} userId={message.user?._id} /> : null}

          {!!photoFiles.length && !anotherFiles.length ? (
            <div className={classNames.filesMainWrapper}>
              <ImagesTile images={photoFiles} />
            </div>
          ) : undefined}

          {message.text && (
            <Highlighter
              autoEscape
              highlightClassName="YourHighlightClass"
              searchWords={searchPhrase ? ['http', '.com', '.ru', searchPhrase] : ['http', '.com', '.ru']}
              textToHighlight={he.decode(message.text)}
              className={classNames.messageText}
              findChunks={findChunks}
              highlightTag={({ children }: HighlightTag) => (
                <Linkify>
                  <span
                    className={cx({
                      [classNames.highlight]: searchPhrase ? children?.toLowerCase().includes(searchPhrase) : false,
                    })}
                  >
                    {children}
                  </span>
                </Linkify>
              )}
            />
          )}
          {anotherFiles.length ? (
            <div className={classNames.filesMainWrapper}>
              <ChatMessageFiles files={[...message.files, ...message.images]} />
            </div>
          ) : undefined}
        </div>

        <div className={classNames.infoContainer}>
          <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>

          {!isIncomming && unReadMessage ? (
            <NoReadIcon className={cx(classNames.icon, classNames.noReadIcon)} />
          ) : (
            <IsReadIcon className={cx(classNames.icon, classNames.isReadIcon)} />
          )}
        </div>
      </div>
    )
  },
)
