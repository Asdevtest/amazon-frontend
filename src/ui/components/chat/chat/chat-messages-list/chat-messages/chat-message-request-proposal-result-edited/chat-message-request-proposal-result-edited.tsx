import React, {FC, useContext} from 'react'

import clsx from 'clsx'

import {RequestProposalStatus} from '@constants/request-proposal-status'

import {ChatMessageDataProposalResultEditedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {UserModel} from '@models/user-model'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'

import {formatDateTimeHourAndMinutes} from '@utils/date-time'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {useClassNames} from './chat-message-request-proposal-result-edited.style'

export interface ChatMessageRequestProposalResultEditedHandlers {
  onClickProposalResultToCorrect: (proposalId: string) => void
  onClickProposalResultAccept: (proposalId: string) => void
}

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalResultEditedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

export const ChatMessageRequestProposalResultEdited: FC<Props> = ({message, handlers}) => {
  const classNames = useClassNames()
  const proposal = message.data.proposal

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.userId

  console.log(chatRequestAndRequestProposal.requestProposal?.proposal?.status)
  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <p className={classNames.headerText}>Результат</p>
        </div>
        <div className={classNames.timeWrapper}>
          <p className={classNames.timeText}>{formatDateTimeHourAndMinutes(message.updatedAt)}</p>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        {/* <div className={classNames.titleWrapper}>
          <p className={classNames.titleText}>{message.data.request.title}</p>
        </div> */}
        <div className={classNames.descriptionWrapper}>
          <p className={classNames.descriptionText}>{}</p>
        </div>
      </div>
      <div className={classNames.resultTextWrapper}>
        <p className={classNames.resultText}>{message.data.edited.result}</p>
      </div>
      <div className={classNames.resultWrapper}>
        <PhotoAndFilesCarousel small files={message.data.edited.linksToMediaFiles} width="340px" />

        <div className={classNames.resultRightSide}>
          <div className={classNames.timeToCheckBlockWrapper}>
            <p className={classNames.timeToCheckBlockLabelText}>Время на проверку</p>
            <div className={classNames.timeToCheckBlockValueWrapper}>
              <p className={classNames.timeToCheckBlockValueText}>24 ч 00м</p>
            </div>
          </div>
        </div>
      </div>
      <div className={classNames.footerWrapper}>
        {chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY) &&
        curUserId &&
        message.data.needApproveBy?.includes(curUserId) ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                variant="contained"
                color="primary"
                btnWrapperStyle={classNames.actionBtnWrapperStyle}
                className={clsx(classNames.actionButton, classNames.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
              >
                Отправить на доработку
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              btnWrapperStyle={clsx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
              className={clsx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalResultAccept(proposal._id)}
            >
              Принять
            </Button>
          </div>
        ) : undefined}

        {/* {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== 'ACCEPTED_BY_CLIENT' && (
          <div className={classNames.btnEditWrapper}>
            <Button
              variant="contained"
              color="primary"
             
            >
              Редактировать
            </Button>
          </div>
        )} */}
      </div>
    </div>
  )
}
