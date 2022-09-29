import React, {FC} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'
import Linkify from 'react-linkify-always-blank'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'

import {useClassNames} from './chat-message-basic-text.style'

interface Props {
  message: ChatMessageContract
  isIncomming: boolean
  unReadMessage: boolean
}

export const ChatMessageBasicText: FC<Props> = observer(({message, isIncomming, unReadMessage}) => {
  const classNames = useClassNames()

  // console.log('message.text', message.text)
  return (
    <div className={clsx(classNames.root, {[classNames.rootIsIncomming]: isIncomming})}>
      <div className={classNames.subWrapper}>
        <Linkify
        // properties={{target: '_blank', style: {color: 'red', fontWeight: 'bold', textDecoration: 'none'}}} // ЗАЯВЛЕННЫЕ ПРОПЫ НЕ РАБОТАЮТ
        >
          <Typography paragraph className={classNames.messageText}>
            {message.text}
          </Typography>
        </Linkify>

        {message.files.length ? (
          <div className={classNames.filesMainWrapper}>
            <PhotoAndFilesCarousel notToShowEmpty small files={message.files} width="300px" />
          </div>
        ) : undefined}
      </div>

      <Typography className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.updatedAt)}</Typography>

      {!isIncomming ? (
        <div className={classNames.readIconsWrapper}>
          <img src={unReadMessage ? '/assets/icons/no-read.svg' : '/assets/icons/is-read.svg'} />
        </div>
      ) : null}
    </div>
  )
})
