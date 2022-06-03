import React, {FC, useContext} from 'react'

import clsx from 'clsx'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataProposalStatusChangedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {UserModel} from '@models/user-model'

import {Button} from '@components/buttons/button'

import {formatDateTime} from '@utils/date-time'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {ChatMessageRequestProposalResultEditedHandlers} from '../chat-message-request-proposal-result-edited'
import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal-status-changed.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalStatusChangedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

export const ChatMessageProposalStatusChanged: FC<Props> = ({message, handlers}) => {
  const classNames = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.userId

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
                      label="Ограничение по времени на исправление (мин)"
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

            <div className={classNames.footerWrapper}>
              {chatRequestAndRequestProposal &&
              (chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CORRECTED ||
                chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
                  RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
                chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
                  RequestProposalStatus.READY_TO_VERIFY) &&
              curUserId ? (
                <div className={classNames.btnsWrapper}>
                  {chatRequestAndRequestProposal.requestProposal?.proposal?.status !==
                    RequestProposalStatus.TO_CORRECT && (
                    <Button
                      variant="contained"
                      color="primary"
                      btnWrapperStyle={classNames.actionBtnWrapperStyle}
                      className={clsx(classNames.actionButton, classNames.cancelBtn)}
                      onClick={() =>
                        chatRequestAndRequestProposal.requestProposal &&
                        handlers.onClickProposalResultToCorrect(
                          chatRequestAndRequestProposal.requestProposal.proposal._id,
                        )
                      }
                    >
                      Отправить на доработку
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    btnWrapperStyle={clsx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
                    className={clsx(classNames.actionButton, classNames.successBtn)}
                    onClick={() =>
                      chatRequestAndRequestProposal.requestProposal &&
                      handlers.onClickProposalResultAccept(chatRequestAndRequestProposal.requestProposal.proposal._id)
                    }
                  >
                    Принять
                  </Button>
                </div>
              ) : undefined}
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
