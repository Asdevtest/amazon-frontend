import React, {FC} from 'react'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataProposalStatusChangedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {formatDateTime} from '@utils/date-time'

import {LabelValuePairBlock} from '../label-value-pair-block'
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

  const renderDetails = () => {
    switch (message.data.status) {
      case RequestProposalStatus.TO_CORRECT:
        return (
          <div className={classNames.detailsWrapper}>
            <div className={classNames.titleWrapper}>
              <p className={classNames.titleText}>Причина:</p>
            </div>
            <div className={classNames.reasonWrapper}>
              <p className={classNames.reasonText}>{message.data.reason}</p>
            </div>
            <div className={classNames.footerWrapper}>
              <div className={classNames.footerRow}>
                {message.data.timeLimitInMinutes ? (
                  <div className={classNames.labelValueBlockWrapper}>
                    <LabelValuePairBlock
                      label="Ограничени по времени на исправление (мин)"
                      value={message.data.timeLimitInMinutes.toString()}
                      bgColor="white"
                    />
                  </div>
                ) : undefined}
              </div>
            </div>
          </div>
        )
      case RequestProposalStatus.CORRECTED:
        return (
          <div className={classNames.detailsWrapper}>
            <div className={classNames.titleWrapper}>
              <p className={classNames.titleText}>Исправления:</p>
            </div>
            <div className={classNames.reasonWrapper}>
              <p className={classNames.reasonText}>{message.data.reason}</p>
            </div>
          </div>
        )
    }
  }

  return (
    <div className={classNames.root}>
      <div className={classNames.statusWrapper}>
        <p className={classNames.statusTextDesciption}>
          Новый статус предложения: <span className={classNames.statusText}>{message.data.status}</span>
        </p>
      </div>
      {renderDetails()}
    </div>
  )
}
