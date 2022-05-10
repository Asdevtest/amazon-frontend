import React, {FC} from 'react'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataProposalStatusChangedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatDateTime} from '@utils/date-time'

import {useClassNames} from './chat-message-proposal-status-changed.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalStatusChangedContract>
}

export const ChatMessageProposalStatusChanged: FC<Props> = ({message}) => {
  const classNames = useClassNames()
  if (message.data.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
    return (
      <div className={classNames.root}>
        <p className={classNames.statusTextDesciption}>
          Предложение принято Клиентом и взято в работу {formatDateTime(message.createdAt)}
        </p>
      </div>
    )
  }

  return (
    <div className={classNames.root}>
      <p className={classNames.statusTextDesciption}>
        Новый статус предложения: <span className={classNames.statusText}>{message.data.status}</span>
      </p>
    </div>
  )
}
