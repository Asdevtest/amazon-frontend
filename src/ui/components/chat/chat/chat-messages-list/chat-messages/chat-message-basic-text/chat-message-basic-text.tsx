import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {FC} from 'react'

import {observer} from 'mobx-react'
import Highlighter from 'react-highlight-words'
import Linkify from 'react-linkify-always-blank'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {UserLink} from '@components/user-link'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'

import {useClassNames} from './chat-message-basic-text.style'

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

const findChunks = ({/* autoEscape, caseSensitive, sanitize, */ searchWords, textToHighlight}: FindChunksProps) => {
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
  ({message, isIncomming, unReadMessage, isFound, searchPhrase, showName}) => {
    const {classes: classNames} = useClassNames()

    return (
      <div
        className={cx(
          classNames.root,
          {[classNames.rootIsIncomming]: isIncomming},
          {[classNames.isFound]: isFound},
          {[classNames.isFoundIncomming]: isFound && isIncomming},
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
              customStyles={{marginBottom: 10}}
              customClassNames={undefined}
            />
          ) : null}

          {message.text && (
            <Highlighter
              autoEscape
              highlightClassName="YourHighlightClass"
              searchWords={searchPhrase ? ['http', '.com', '.ru', searchPhrase] : ['http', '.com', '.ru']}
              textToHighlight={message.text}
              className={classNames.messageText}
              findChunks={findChunks}
              highlightTag={({children /* , highlightIndex*/}: HighlightTag) => (
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

          {message.files.length ? (
            <div className={classNames.filesMainWrapper}>
              <PhotoAndFilesCarousel
                notToShowEmpty
                small
                files={message.files}
                width={window.innerWidth < 768 ? '150px' : '250px'}
              />
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
