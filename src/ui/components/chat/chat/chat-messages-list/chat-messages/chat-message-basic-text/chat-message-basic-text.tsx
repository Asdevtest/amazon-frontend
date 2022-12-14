import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {FC} from 'react'

import {observer} from 'mobx-react'
// import ECHighlighter from 'react-ec-highlighter'
// import Highlighter from 'react-highlight-words'
import Linkify from 'react-linkify-always-blank'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'

import {useClassNames} from './chat-message-basic-text.style'

interface Props {
  message: ChatMessageContract
  isIncomming: boolean
  unReadMessage: boolean
  isFound?: boolean
  searchPhrase?: string
}

// const findChunks = ({autoEscape, caseSensitive, sanitize, searchWords, textToHighlight}: any) => {
//   const chunks: any[] = []
//   const textLow = textToHighlight.toLowerCase()
//   const sep = /[\s]+/

//   const singleTextWords = textLow.split(sep)

//   let fromIndex = 0
//   const singleTextWordsWithPos = singleTextWords.map((s: any) => {
//     const indexInWord = textLow.indexOf(s, fromIndex)
//     fromIndex = indexInWord
//     return {
//       word: s,
//       index: indexInWord,
//     }
//   })

//   searchWords.forEach((sw: any) => {
//     const swLow = sw.toLowerCase()
//     singleTextWordsWithPos.forEach((s: any) => {
//       if (s.word.includes(swLow)) {
//         const start = s.index
//         const end = s.index + s.word.length
//         chunks.push({
//           start,
//           end,
//         })
//       }
//     })
//   })

//   return chunks
// }

export const ChatMessageBasicText: FC<Props> = observer(
  ({message, isIncomming, unReadMessage, isFound /* , searchPhrase*/}) => {
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
          <Linkify>
            <Typography paragraph className={classNames.messageText}>
              {message.text}
            </Typography>

            {/* {message.text && (
              <Highlighter
                autoEscape
                highlightClassName="YourHighlightClass"
                searchWords={searchPhrase ? ['http', '.com', '.ru', searchPhrase] : ['http', '.com', '.ru']}
                textToHighlight={message.text}
                className={classNames.messageText}
                findChunks={findChunks}
                highlightTag={({children, highlightIndex}: any) => (
                  <Linkify>
                    <span
                      className={cx(classNames.highlightText, {
                        [classNames.highlight]: searchPhrase ? message.text.includes(searchPhrase) : false,
                      })}
                    >
                      {children}
                    </span>
                  </Linkify>
                )}
              />
            )} */}

            {/* {message.text && (
              <ECHighlighter
                searchPhrase={searchPhrase || ''}
                text={message.text}
                highlightClassName={classNames.highlightClassName}
                className={classNames.messageText}

                // highlightClassName="color: red"
                // highlightStyle={{color: 'red !important', backgroundColor: 'red'}}
              />
            )} */}
          </Linkify>

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
