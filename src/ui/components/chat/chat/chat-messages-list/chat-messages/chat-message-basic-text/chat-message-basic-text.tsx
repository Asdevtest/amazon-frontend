import React, {FC} from 'react'

import {Typography} from '@material-ui/core'
import clsx from 'clsx'
import {observer} from 'mobx-react'

import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'
import {getTextFromMarkdown} from '@utils/text'

import {useClassNames} from './chat-message-basic-text.style'

interface Props {
  message: ChatMessageContract
  isIncomming: boolean
}

export const ChatMessageBasicText: FC<Props> = observer(({message, isIncomming}) => {
  const classNames = useClassNames()
  return (
    <div className={clsx(classNames.root, {[classNames.rootIsIncomming]: isIncomming})}>
      <div
        dangerouslySetInnerHTML={{__html: getTextFromMarkdown(message.text)}}
        className={classNames.messageText}
      ></div>
      <Typography className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.updatedAt)}</Typography>
    </div>
  )
})
