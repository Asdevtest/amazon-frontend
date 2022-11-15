import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {FC} from 'react'

import {observer} from 'mobx-react'
// import ECHighlighter from 'react-ec-highlighter'
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

export const ChatMessageBasicText: FC<Props> = observer(
  ({message, isIncomming, unReadMessage, isFound /* searchPhrase*/}) => {
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
          <Linkify
          // properties={{target: '_blank', style: {color: 'red', fontWeight: 'bold', textDecoration: 'none'}}} // ЗАЯВЛЕННЫЕ ПРОПЫ НЕ РАБОТАЮТ
          >
            <Typography paragraph className={classNames.messageText}>
              {message.text}
            </Typography>

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
