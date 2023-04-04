import {cx} from '@emotion/css'
import {Typography} from '@mui/material'

import React, {FC, useContext} from 'react'

import Linkify from 'react-linkify-always-blank'

import {RequestProposalStatus} from '@constants/request-proposal-status'
import {TranslationKey} from '@constants/translations/translation-key'

import {ChatMessageDataProposalStatusChangedContract} from '@models/chat-model/contracts/chat-message-data.contract'
import {ChatMessageContract} from '@models/chat-model/contracts/chat-message.contract'
import {UserModel} from '@models/user-model'

import {Button} from '@components/buttons/button'
import {PhotoAndFilesCarousel} from '@components/custom-carousel/custom-carousel'
import {RequestStatusCell} from '@components/data-grid-cells/data-grid-cells'

import {formatDateTime} from '@utils/date-time'
import {t} from '@utils/translations'

import {ChatRequestAndRequestProposalContext} from '@contexts/chat-request-and-request-proposal-context'

import {ChatMessageRequestProposalResultEditedHandlers} from '../chat-message-request-proposal-result-edited'
import {LabelValuePairBlock} from '../label-value-pair-block'
import {useClassNames} from './chat-message-proposal-status-changed.style'

interface Props {
  message: ChatMessageContract<ChatMessageDataProposalStatusChangedContract>
  handlers: ChatMessageRequestProposalResultEditedHandlers
}

export const ChatMessageProposalStatusChanged: FC<Props> = ({message, handlers}) => {
  const {classes: classNames} = useClassNames()

  const chatRequestAndRequestProposal = useContext(ChatRequestAndRequestProposalContext)

  const curUserId: string | undefined = UserModel.userId

  if (message.data.status === RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED) {
    return (
      <div className={classNames.root}>
        <p className={classNames.statusTextDesciption}>
          {`${t(TranslationKey['The proposal is accepted by the Client and taken on work'])} ${formatDateTime(
            message.createdAt,
          )}`}
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
              <p className={classNames.titleText}>{`${t(TranslationKey.Reason)}:`}</p>
            </div>
            <div className={classNames.reasonWrapper}>
              <p className={classNames.reasonText}>{message.data.reason}</p>
            </div>

            <PhotoAndFilesCarousel notToShowEmpty small files={message.data.linksToMediaFiles} width="340px" />

            <div className={classNames.footerWrapper}>
              <div className={classNames.footerRow}>
                {message.data.timeLimitInMinutes ? (
                  <div className={classNames.labelValueBlockWrapper}>
                    <LabelValuePairBlock
                      label={`${t(TranslationKey['Time limit for correction'])} (${t(TranslationKey.minute)})`}
                      value={message.data.timeLimitInMinutes.toString()}
                      bgColor="green"
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
              <Typography className={classNames.titleText}>{`${t(TranslationKey.Corrections)}:`}</Typography>
            </div>
            <div className={classNames.reasonWrapper}>
              <Linkify>
                <Typography className={classNames.reasonText}>{message.data.reason}</Typography>
              </Linkify>
            </div>

            <PhotoAndFilesCarousel notToShowEmpty small files={message.data.linksToMediaFiles} width="340px" />

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
                      color="primary"
                      btnWrapperStyle={classNames.actionBtnWrapperStyle}
                      className={cx(classNames.actionButton, classNames.editBtn)}
                      onClick={() =>
                        chatRequestAndRequestProposal.requestProposal &&
                        handlers.onClickProposalResultToCorrect(
                          chatRequestAndRequestProposal.requestProposal.proposal._id,
                        )
                      }
                    >
                      {t(TranslationKey['Send in for rework'])}
                    </Button>
                  )}
                  <Button
                    color="primary"
                    btnWrapperStyle={cx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
                    className={cx(classNames.actionButton, classNames.successBtn)}
                    onClick={() =>
                      chatRequestAndRequestProposal.requestProposal &&
                      handlers.onClickProposalResultAccept(chatRequestAndRequestProposal.requestProposal.proposal._id)
                    }
                  >
                    {t(TranslationKey.Receive)}
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
          {`${t(TranslationKey['New proposal status'])}:`}
          <span className={classNames.statusText}>
            <RequestStatusCell isChat status={message.data.status} />
          </span>
        </p>
      </div>
      {renderDetails()}
    </div>
  )
}
