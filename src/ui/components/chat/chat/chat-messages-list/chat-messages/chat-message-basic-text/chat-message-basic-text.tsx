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

import { useStyles } from './chat-message-basic-text.style'

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
    if (!sw) {
      return
    }
    const swLow = sw?.toLowerCase()
    singleTextWordsWithPos.forEach((s: SingleTextWordsWithPos) => {
      if (s?.word?.includes(swLow)) {
        const start = s?.index
        const end = s?.index + s?.word?.length
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
    const { classes: styles, cx } = useStyles()
    const [photoFiles, setPhotoFiles] = useState(() => [
      ...message.files.filter(url => imagesRegex.test(url)),
      ...message.images,
    ])
    const [anotherFiles, setAnotherFiles] = useState(() => message.files.filter(url => !imagesRegex.test(url)))

    useEffect(() => {
      setPhotoFiles([...message.files.filter(url => imagesRegex.test(url)), ...message.images])
      setAnotherFiles(message.files.filter(url => !imagesRegex.test(url)))
    }, [message])

    return (
      <div
        className={cx(
          styles.root,
          { [styles.rootIsIncomming]: isIncomming },
          { [styles.isFound]: isFound },
          { [styles.isFoundIncomming]: isFound && isIncomming },
        )}
      >
        <div className={styles.subWrapper}>
          {showName ? <UserLink name={message.user?.name} userId={message.user?._id} /> : null}

          {!!photoFiles.length && !anotherFiles.length ? (
            <div className={styles.filesMainWrapper}>
              <ImagesTile images={photoFiles} />
            </div>
          ) : undefined}

          {message.text && (
            <Highlighter
              autoEscape
              highlightClassName="YourHighlightClass"
              searchWords={searchPhrase ? ['http', '.com', '.ru', searchPhrase] : ['http', '.com', '.ru']}
              textToHighlight={he.decode(message.text)}
              className={styles.messageText}
              findChunks={findChunks}
              highlightTag={({ children }: HighlightTag) => (
                <Linkify>
                  <span
                    className={cx({
                      [styles.highlight]: searchPhrase ? children?.toLowerCase().includes(searchPhrase) : false,
                    })}
                  >
                    {children}
                  </span>
                </Linkify>
              )}
            />
          )}
          {anotherFiles.length ? (
            <div className={styles.filesMainWrapper}>
              <ChatMessageFiles files={[...message.files, ...message.images]} />
            </div>
          ) : undefined}
        </div>

        <div className={styles.infoContainer}>
          <p className={styles.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</p>

          {!isIncomming && unReadMessage ? (
            <NoReadIcon className={cx(styles.icon, styles.noReadIcon)} />
          ) : (
            <IsReadIcon className={cx(styles.icon, styles.isReadIcon)} />
          )}
        </div>
      </div>
    )
  },
)
