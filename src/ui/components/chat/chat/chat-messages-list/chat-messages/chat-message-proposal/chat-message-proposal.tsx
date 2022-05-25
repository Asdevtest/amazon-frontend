import React, {FC, useContext} from 'react'

import clsx from 'clsx'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataCreatedNewProposalProposalDescriptionContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'

import {Button} from '@components/buttons/button'

import {formatNormDateTime} from '@utils/date-time'
import {minsToTimeRus, toFixedWithDollarSign} from '@utils/text'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal.style'

export interface ChatMessageProposalHandlers {
  onClickProposalAccept: (proposalId: string) => void
  onClickProposalRegect: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataCreatedNewProposalProposalDescriptionContract>
  handlers: ChatMessageProposalHandlers
}

export const ChatMessageProposal: FC<Props> = ({message, handlers}) => {
  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)
  const classNames = useClassNames()

  console.log(
    `chatRequestAndRequestProposal.requestProposal?.proposal?.status`,
    chatRequestAndRequestProposal.requestProposal?.proposal?.status,
  )
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>ПРЕДЛОЖЕНИЕ</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatNormDateTime(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        {/* <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>Сделаю за другую сумму</p>
        </div> */}
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>{message.data.comment}</p>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        <div className={classNames.leftSide}>
          <div className={classNames.labelValueBlockWrapper}>
            <LabelValuePairBlock label="Время на выполнение" value={minsToTimeRus(message.data.execution_time)} />
          </div>
          <div className={clsx(classNames.labelValueBlockWrapper, classNames.labelValueBlockWrapperNotFirst)}>
            <LabelValuePairBlock label="Стоимость" value={toFixedWithDollarSign(message.data.price, 2)} />
          </div>
        </div>
        {chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.CREATED ? (
          <div className={classNames.rightSide}>
            <Button
              variant="contained"
              color="primary"
              className={clsx(classNames.actionButton, classNames.cancelBtn)}
              onClick={() => handlers.onClickProposalRegect(message.data._id)}
            >
              Отклонить
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={clsx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalAccept(message.data._id)}
            >
              Принять
            </Button>
          </div>
        ) : undefined}
      </div>
    </div>
  )
}
