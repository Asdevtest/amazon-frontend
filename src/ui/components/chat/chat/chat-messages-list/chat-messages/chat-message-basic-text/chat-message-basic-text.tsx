import { cx } from '@emotion/css'
import { Typography } from '@mui/material'

import React, { FC, useEffect, useState } from 'react'

import he from 'he'
import { observer } from 'mobx-react'
import Highlighter from 'react-highlight-words'
import Linkify from 'react-linkify-always-blank'

import { ChatMessageContract } from '@models/chat-model/contracts/chat-message.contract'

// import {Button} from '@components/buttons/button'
import { ChatMessageFiles } from '@components/chat/chat/chat-messages-list/chat-messages/chat-message-files/chat-message-files'
import { ImagesTile } from '@components/chat/chat/chat-messages-list/chat-messages/images-tile/images-tile'
import { UserLink } from '@components/user/user-link'

import { formatDateTimeHourAndMinutes } from '@utils/date-time'

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

const findChunks = ({ /* autoEscape, caseSensitive, sanitize, */ searchWords, textToHighlight }: FindChunksProps) => {
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

const imagesRegex =
  /(http[s]?:\/\/.*\.(?:bmp|cdr|gif|heif|ico|jpeg|jpg|pbm|pcx|pgm|png|ppm|psd|raw|svg|tga|tif|wbmp|webp|xbm|xpm))/i

export const ChatMessageBasicText: FC<Props> = observer(
  ({ message, isIncomming, unReadMessage, isFound, searchPhrase, showName }) => {
    const { classes: classNames } = useClassNames()
    const [photoFiles, setPhotoFiles] = useState(() => message.files.filter(url => imagesRegex.test(url)))
    const [anotherFiles, setAnotherFiles] = useState(() => message.files.filter(url => !imagesRegex.test(url)))

    useEffect(() => {
      setPhotoFiles(message.files.filter(url => imagesRegex.test(url)))
      setAnotherFiles(message.files.filter(url => !imagesRegex.test(url)))
    }, [message])

    // console.log('message', message)

    // console.log('photoFiles', photoFiles)

    // console.log('anotherFiles', anotherFiles)

    // console.log('message.text', message.text, he.decode(message.text))

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
          {/* <Typography paragraph className={classNames.messageText}> // КОНТРОЛЬНЫЙ ТЕКСТ
              {message.text}
            </Typography> */}

          {showName ? (
            <UserLink
              name={message.user?.name}
              userId={message.user?._id}
              blackText={undefined}
              withAvatar={undefined}
              maxNameWidth={undefined}
              customStyles={{ marginBottom: 10 }}
              customClassNames={undefined}
            />
          ) : null}

          {!!photoFiles.length && !anotherFiles.length ? (
            <div className={classNames.filesMainWrapper}>
              <ImagesTile images={photoFiles} /* controls={(imageIndex, image) => <Button>Download</Button>}  */ />
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
              highlightTag={({ children /* , highlightIndex*/ }: HighlightTag) => (
                <Linkify>
                  <span
                    className={cx(
                      /* classNames.highlightText, */ {
                        [classNames.highlight]: searchPhrase ? children?.toLowerCase().includes(searchPhrase) : false,
                      },
                    )}
                  >
                    {children}
                  </span>
                </Linkify>
              )}
            />
          )}
          {anotherFiles.length ? (
            <div className={classNames.filesMainWrapper}>
              <ChatMessageFiles files={message.files} />
            </div>
          ) : undefined}
        </div>

        <Typography className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.createdAt)}</Typography>

        {!isIncomming ? (
          <div className={classNames.readIconsWrapper}>
            <img src={unReadMessage ? '/assets/icons/no-read.svg' : '/assets/icons/is-read.svg'} />
          </div>
        ) : null}
      </div>
    )
  },
)
