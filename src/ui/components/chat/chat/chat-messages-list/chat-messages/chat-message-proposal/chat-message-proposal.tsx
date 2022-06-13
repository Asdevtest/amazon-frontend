import React, {FC, useContext} from 'react'

import clsx from 'clsx'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataCreatedNewProposalProposalDescriptionContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {Button} from '@components/buttons/button'
import {FilesCarousel} from '@components/custom-carousel/custom-carousel'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'
import {minsToTime, toFixedWithDollarSign} from '@utils/text'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal.style'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string, price: number) => void
  onClickProposalRegect: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>
  handlers: ChatMessageProposalHandlers
}

export const ChatMessageProposal: FC<Props> = ({message, handlers}) => {
  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)
  const classNames = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>ПРЕДЛОЖЕНИЕ</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainWrapper}>
        <div className={classNames.mainInfoWrapper}>
          <div className={classNames.descriptionWrapper}>
            <p className={classNames.descriptionText}>{message.data.comment}</p>
          </div>

          <div className={classNames.leftSide}>
            <div className={classNames.labelValueBlockWrapper}>
              <LabelValuePairBlock
                label="Время на выполнение"
                value={minsToTime(message.data.execution_time)}
                bgColor="green"
              />
            </div>
            <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
              <LabelValuePairBlock
                label="Стоимость"
                value={toFixedWithDollarSign(message.data.price, 2)}
                bgColor="green"
              />
            </div>
          </div>
        </div>
        <div className={classNames.rightSideWrapper}>
          <FilesCarousel files={message.images} width="70%" />

          <div className={classNames.footerWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CREATED ||
            chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
              RequestProposalStatus.OFFER_CONDITIONS_REJECTED ||
            chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
              RequestProposalStatus.OFFER_CONDITIONS_CORRECTED ? (
              <div className={classNames.rightSide}>
                {chatRequestAndRequestProposal.requestProposal?.proposal?.status !==
                RequestProposalStatus.OFFER_CONDITIONS_REJECTED ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className={clsx(classNames.actionButton, classNames.cancelBtn)}
                    onClick={() => handlers.onClickProposalRegect(message.data._id)}
                  >
                    Отклонить
                  </Button>
                ) : null}
                <Button
                  variant="contained"
                  color="primary"
                  className={clsx(classNames.actionButton, classNames.successBtn)}
                  onClick={() => handlers.onClickProposalAccept(message.data._id, message.data.price)}
                >
                  {`Принять за $${message.data.price}`}
                </Button>
              </div>
            ) : undefined}
          </div>
        </div>
      </div>
    </div>
  )
}
